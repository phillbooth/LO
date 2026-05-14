export interface CompilerInput {
  readonly projectRoot: string;
  readonly entryFiles: readonly string[];
}

export interface SourceLocation {
  readonly file: string;
  readonly line: number;
  readonly column: number;
}

export interface CompilerDiagnostic {
  readonly code: string;
  readonly message: string;
  readonly location?: SourceLocation;
  readonly severity: "info" | "warning" | "error";
}

export interface CompilerResult {
  readonly ok: boolean;
  readonly diagnostics: readonly CompilerDiagnostic[];
  readonly reports: readonly string[];
}

export interface CompilerSourceText {
  readonly file: string;
  readonly text: string;
}

export interface CoreSyntaxSafetyOptions {
  readonly scanSecrets?: boolean;
  readonly scanUnsafeDynamicCode?: boolean;
}

type KnownCoreType = "Bool" | "Tri" | "Decision";

interface KnownSymbol {
  readonly name: string;
  readonly type: KnownCoreType;
  readonly location: SourceLocation;
}

interface FlowScope {
  readonly kind: "flow" | "secure flow" | "pure flow";
  readonly startLine: number;
  readonly braceDepth: number;
}

interface MatchBlock {
  readonly symbol: KnownSymbol;
  readonly startLine: number;
  readonly braceDepth: number;
  readonly cases: Set<string>;
}

const TRI_CASES = ["Positive", "Neutral", "Negative"] as const;

export function validateCoreSyntaxSafety(
  source: CompilerSourceText,
  options: CoreSyntaxSafetyOptions = {},
): CompilerResult {
  const diagnostics: CompilerDiagnostic[] = [];
  const symbols = new Map<string, KnownSymbol>();
  const lines = source.text.split(/\r?\n/);
  let flowScope: FlowScope | undefined;
  let matchBlock: MatchBlock | undefined;
  let braceDepth = 0;

  lines.forEach((line, index) => {
    const lineNumber = index + 1;
    const trimmed = line.trim();

    collectFlowSymbols(source.file, line, lineNumber, symbols);
    collectVariableSymbol(source.file, line, lineNumber, symbols);

    const flowStart = parseFlowStart(line, lineNumber, braceDepth);

    if (flowStart !== undefined) {
      flowScope = flowStart;
    }

    if (matchBlock !== undefined) {
      collectMatchCases(line, matchBlock);
    }

    if (matchBlock === undefined) {
      matchBlock = parseTriMatchStart(source.file, line, lineNumber, braceDepth, symbols);
    }

    diagnostics.push(
      ...detectTriBranchCondition(source.file, line, lineNumber, symbols),
      ...detectUnsafeCoreAssignment(source.file, line, lineNumber, symbols),
      ...detectRiskyTriBoolPolicy(source.file, line, lineNumber, flowScope),
    );

    if (options.scanSecrets ?? true) {
      diagnostics.push(...detectSecretLiteral(source.file, line, lineNumber));
    }

    if (options.scanUnsafeDynamicCode ?? true) {
      diagnostics.push(...detectUnsafeDynamicCode(source.file, line, lineNumber));
    }

    braceDepth += countBraceDelta(line);

    if (
      matchBlock !== undefined &&
      braceDepth < matchBlock.braceDepth
    ) {
      diagnostics.push(...validateTriMatchExhaustive(source.file, matchBlock));
      matchBlock = undefined;
    }

    if (flowScope !== undefined && braceDepth < flowScope.braceDepth) {
      flowScope = undefined;
    }

    if (trimmed === "") {
      return;
    }
  });

  if (matchBlock !== undefined) {
    diagnostics.push(...validateTriMatchExhaustive(source.file, matchBlock));
  }

  return {
    ok: !diagnostics.some((diagnostic) => diagnostic.severity === "error"),
    diagnostics,
    reports: [],
  };
}

function collectFlowSymbols(
  file: string,
  line: string,
  lineNumber: number,
  symbols: Map<string, KnownSymbol>,
): void {
  const flowMatch = line.match(
    /^\s*(?:secure\s+|pure\s+)?flow\s+[A-Za-z_][A-Za-z0-9_]*\s*\(([^)]*)\)/,
  );

  if (flowMatch?.[1] === undefined) {
    return;
  }

  for (const parameter of flowMatch[1].split(",")) {
    const parameterMatch = parameter.match(
      /\b([A-Za-z_][A-Za-z0-9_]*)\s*:\s*(Bool|Tri|Decision)\b/,
    );

    if (parameterMatch?.[1] === undefined || parameterMatch[2] === undefined) {
      continue;
    }

    symbols.set(parameterMatch[1], {
      name: parameterMatch[1],
      type: parameterMatch[2] as KnownCoreType,
      location: { file, line: lineNumber, column: line.indexOf(parameterMatch[1]) + 1 },
    });
  }
}

function collectVariableSymbol(
  file: string,
  line: string,
  lineNumber: number,
  symbols: Map<string, KnownSymbol>,
): void {
  const variableMatch = line.match(
    /^\s*(?:let|const)\s+([A-Za-z_][A-Za-z0-9_]*)\s*:\s*(Bool|Tri|Decision)\b/,
  );

  if (variableMatch?.[1] === undefined || variableMatch[2] === undefined) {
    return;
  }

  symbols.set(variableMatch[1], {
    name: variableMatch[1],
    type: variableMatch[2] as KnownCoreType,
    location: { file, line: lineNumber, column: line.indexOf(variableMatch[1]) + 1 },
  });
}

function parseFlowStart(
  line: string,
  lineNumber: number,
  braceDepth: number,
): FlowScope | undefined {
  const flowMatch = line.match(/^\s*(secure\s+|pure\s+)?flow\b/);

  if (flowMatch === null) {
    return undefined;
  }

  const prefix = flowMatch[1]?.trim();
  const kind =
    prefix === "secure" ? "secure flow" : prefix === "pure" ? "pure flow" : "flow";

  return {
    kind,
    startLine: lineNumber,
    braceDepth: braceDepth + Math.max(countBraceDelta(line), 1),
  };
}

function parseTriMatchStart(
  file: string,
  line: string,
  lineNumber: number,
  braceDepth: number,
  symbols: Map<string, KnownSymbol>,
): MatchBlock | undefined {
  const match = line.match(/^\s*match\s+([A-Za-z_][A-Za-z0-9_]*)\s*\{/);

  if (match?.[1] === undefined) {
    return undefined;
  }

  const symbol = symbols.get(match[1]);

  if (symbol?.type !== "Tri") {
    return undefined;
  }

  return {
    symbol: {
      ...symbol,
      location: { file, line: lineNumber, column: line.indexOf(match[1]) + 1 },
    },
    startLine: lineNumber,
    braceDepth: braceDepth + 1,
    cases: new Set<string>(),
  };
}

function collectMatchCases(line: string, matchBlock: MatchBlock): void {
  const caseMatch = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=>/);

  if (caseMatch?.[1] !== undefined) {
    matchBlock.cases.add(caseMatch[1]);
  }
}

function detectTriBranchCondition(
  file: string,
  line: string,
  lineNumber: number,
  symbols: Map<string, KnownSymbol>,
): readonly CompilerDiagnostic[] {
  const conditionMatch = line.match(/^\s*if\s+([A-Za-z_][A-Za-z0-9_]*)\s*\{/);
  const symbol = conditionMatch?.[1] === undefined ? undefined : symbols.get(conditionMatch[1]);

  if (symbol?.type !== "Tri") {
    return [];
  }

  return [
    createCompilerDiagnostic(
      "LO_COMPILER_TRI_BRANCH_CONDITION",
      "error",
      "Tri values must not be used directly as branch conditions. Use exhaustive match or an explicit conversion policy.",
      file,
      lineNumber,
      line.indexOf(symbol.name) + 1,
    ),
  ];
}

function detectUnsafeCoreAssignment(
  file: string,
  line: string,
  lineNumber: number,
  symbols: Map<string, KnownSymbol>,
): readonly CompilerDiagnostic[] {
  const assignmentMatch = line.match(
    /^\s*(?:let|const)\s+[A-Za-z_][A-Za-z0-9_]*\s*:\s*(Bool|Tri|Decision)\s*=\s*([A-Za-z_][A-Za-z0-9_]*)\b/,
  );

  if (assignmentMatch?.[1] === undefined || assignmentMatch[2] === undefined) {
    return [];
  }

  const targetType = assignmentMatch[1] as KnownCoreType;
  const sourceSymbol = symbols.get(assignmentMatch[2]);

  if (sourceSymbol === undefined || sourceSymbol.type === targetType) {
    return [];
  }

  if (
    (sourceSymbol.type === "Tri" && (targetType === "Bool" || targetType === "Decision")) ||
    (sourceSymbol.type === "Decision" && targetType === "Tri")
  ) {
    return [
      createCompilerDiagnostic(
        "LO_COMPILER_UNSAFE_LOGIC_ASSIGNMENT",
        "error",
        `${sourceSymbol.type} must not implicitly convert to ${targetType}. Use an explicit policy-bearing conversion flow.`,
        file,
        lineNumber,
        line.indexOf(sourceSymbol.name) + 1,
      ),
    ];
  }

  return [];
}

function detectRiskyTriBoolPolicy(
  file: string,
  line: string,
  lineNumber: number,
  flowScope: FlowScope | undefined,
): readonly CompilerDiagnostic[] {
  if (!/\bunknown_as(?:\s*:\s*true|_true)\b/.test(line)) {
    return [];
  }

  const secure = flowScope?.kind === "secure flow";

  return [
    createCompilerDiagnostic(
      "LO_COMPILER_TRI_UNKNOWN_AS_TRUE",
      secure ? "error" : "warning",
      secure
        ? "secure flow must not convert Tri unknown to true."
        : "Converting Tri unknown to true is risky and must be justified by policy.",
      file,
      lineNumber,
      line.search(/\bunknown_as/) + 1,
    ),
  ];
}

function detectSecretLiteral(
  file: string,
  line: string,
  lineNumber: number,
): readonly CompilerDiagnostic[] {
  const secretMatch = line.match(
    /\b(api[_-]?key|token|secret|password)\b\s*[:=]\s*"([^"]+)"/i,
  );

  if (secretMatch?.[2] === undefined || isPlaceholderSecret(secretMatch[2])) {
    return [];
  }

  return [
    createCompilerDiagnostic(
      "LO_COMPILER_SECRET_LITERAL",
      "error",
      "Source must not contain raw secret literals. Use SecureString or an environment reference.",
      file,
      lineNumber,
      line.indexOf(secretMatch[2]) + 1,
    ),
  ];
}

function detectUnsafeDynamicCode(
  file: string,
  line: string,
  lineNumber: number,
): readonly CompilerDiagnostic[] {
  if (!/\b(?:eval|Function|unsafe_exec|raw_shell)\s*\(/.test(line)) {
    return [];
  }

  return [
    createCompilerDiagnostic(
      "LO_COMPILER_UNSAFE_DYNAMIC_CODE",
      "error",
      "Unsafe dynamic code execution must not appear in core LO source.",
      file,
      lineNumber,
      Math.max(line.search(/\b(?:eval|Function|unsafe_exec|raw_shell)\s*\(/) + 1, 1),
    ),
  ];
}

function validateTriMatchExhaustive(
  file: string,
  matchBlock: MatchBlock,
): readonly CompilerDiagnostic[] {
  const missing = TRI_CASES.filter((triCase) => !matchBlock.cases.has(triCase));

  if (missing.length === 0) {
    return [];
  }

  return [
    createCompilerDiagnostic(
      "LO_COMPILER_TRI_MATCH_NOT_EXHAUSTIVE",
      "error",
      `Tri match is missing cases: ${missing.join(", ")}.`,
      file,
      matchBlock.startLine,
      matchBlock.symbol.location.column,
    ),
  ];
}

function createCompilerDiagnostic(
  code: string,
  severity: CompilerDiagnostic["severity"],
  message: string,
  file: string,
  line: number,
  column: number,
): CompilerDiagnostic {
  return {
    code,
    severity,
    message,
    location: { file, line, column },
  };
}

function countBraceDelta(line: string): number {
  let delta = 0;

  for (const character of line) {
    if (character === "{") {
      delta += 1;
    }

    if (character === "}") {
      delta -= 1;
    }
  }

  return delta;
}

function isPlaceholderSecret(value: string): boolean {
  return /^(?:example|placeholder|redacted|change-me|todo|SecureString\(redacted\))$/i.test(
    value,
  );
}
