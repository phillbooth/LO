import type { CliCommand, CliContext, CliResult } from "./types.js";
import { runGraphCommand } from "./graph-command.js";
import { runTaskCommand } from "./task-command.js";

function notImplemented(command: string): CliResult {
  return {
    ok: false,
    code: 2,
    message: `lo ${command} is defined but not implemented yet.`
  };
}

function createPlaceholderCommand(name: string, description: string): CliCommand {
  return {
    name,
    description,
    run: async (_context: CliContext) => notImplemented(name)
  };
}

export const commands: readonly CliCommand[] = [
  createPlaceholderCommand("check", "Parse and type-check a LO project."),
  createPlaceholderCommand("build", "Build project outputs."),
  createPlaceholderCommand("run", "Run a LO entrypoint."),
  createPlaceholderCommand("serve", "Start the API server package."),
  createPlaceholderCommand("reports", "Generate or display reports."),
  createPlaceholderCommand("security:check", "Check security rules and unsafe features."),
  createPlaceholderCommand("routes", "List declared API routes."),
  createPlaceholderCommand("benchmark", "Run LO benchmark diagnostics."),
  {
    name: "task",
    description: "Run a safe task through lo-tasks.",
    run: runTaskCommand
  },
  {
    name: "graph",
    description: "Generate or query the LO project graph.",
    run: runGraphCommand
  }
];

export function findCommand(name: string): CliCommand | undefined {
  return commands.find((command) => command.name === name);
}
