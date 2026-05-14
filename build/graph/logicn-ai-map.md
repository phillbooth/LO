# LogicN AI Map

## logicn-core

LogicN / LogicN language package, examples, schemas and prototype CLI.

## logicn-core-compiler

LogicN compiler pipeline contracts for parsing, checking, IR, diagnostics and reports.

Provides:
- CompilerInput
- SourceLocation
- CompilerDiagnostic
- CompilerResult
- CompilerSourceText
- CoreSyntaxSafetyOptions
- validateCoreSyntaxSafety

## logicn-core-runtime

LogicN execution engine contracts for checked and compiled runtime execution.

Provides:
- RuntimeMode
- RuntimeContext
- RuntimeError
- RuntimeResult
- RuntimeReport

## logicn-core-network

LogicN core network I/O policy, profile, permission and report contracts.

## logicn-core-security

Reusable LogicN security primitives, redaction helpers, permission models and security report contracts.

Provides:
- SecuritySeverity
- SecretClassification
- PermissionEffect
- PermissionAction
- CryptoAlgorithm
- WeakCryptoAlgorithm
- SecureStringReference
- SecurityDiagnostic
- RedactionRule
- RedactionMatch
- RedactionFailureMode
- RedactionOptions

## logicn-core-config

LogicN project configuration, environment mode and policy loading contracts.

Provides:
- ENVIRONMENT_MODES
- EnvironmentMode
- ConfigDiagnosticSeverity
- ConfigDiagnostic
- ProjectPackageReference
- ProductionPackageOverride
- ConfigPathMap
- ProjectConfig
- EnvironmentVariableScope
- EnvironmentVariableReference
- EnvironmentConfig
- ProductionStrictnessPolicy

## logicn-core-reports

Shared LogicN report schemas and report-writing contracts.

Provides:
- ReportSeverity
- ReportStatus
- ReportKind
- ReportGenerator
- ReportMetadata
- ReportSourceLocation
- ReportDiagnostic
- DiagnosticSummary
- LoReportBase
- BuildReport
- SecurityReport
- TargetReport

## logicn-core-logic

LogicN multi-state logic concepts including Tri, LogicN and future Omni logic.

Provides:
- Tri
- TRI_FALSE
- TRI_UNKNOWN
- TRI_TRUE
- TriBoolPolicy
- LogicDiagnosticSeverity
- LogicDiagnostic
- LogicState
- LogicDefinition
- TruthTableRow
- LogicReport
- isTri

## logicn-core-vector

LogicN vector value, lane, operation and report concepts.

Provides:
- VectorDimension
- NumericElementType
- VectorType
- MatrixShape
- MatrixType
- TensorShape
- TensorType
- QuantizedType
- VectorOperation
- TensorOperation
- VectorReport

## logicn-core-compute

LogicN compute planning, capability and target selection concepts.

Provides:
- ComputeTarget
- ComputeWorkloadKind
- ComputeDiagnosticSeverity
- ComputeDiagnostic
- ComputeCapability
- ComputeBudget
- ComputePlan
- ComputeAutoPolicy
- ComputeTargetSelection
- ComputeDataLocation
- ComputeDataMovement
- ComputeOffloadStage

## logicn-ai

LogicN AI inference contracts, model metadata, safety policy and reports.

Provides:
- AiTaskKind
- AiOutputTrust
- AiModelFormat
- AiInferenceTarget
- AiDiagnosticSeverity
- AiDiagnostic
- AiMemoryEstimate
- AiModelCapability
- AiModelDescriptor
- AiModelRegistryEntry
- AiModelRegistry
- AiTargetSelection

## logicn-ai-lowbit

LogicN low-bit AI inference contracts with BitNet as an optional backend.

Provides:
- LowBitAiTarget
- LowBitAiBackendId
- LowBitAiDevice
- LowBitAiWeightFormat
- LowBitAiQuantization
- LowBitAiEmbeddingQuantization
- LowBitAiKernelFamily
- LowBitAiRuntimeKind
- LowBitAiDiagnosticSeverity
- LowBitAiDiagnostic
- LowBitAiBackendAdapter
- LowBitAiModelReference

## logicn-ai-agent

LogicN supervised AI agent, tool permission, task group and report contracts.

Provides:
- AgentToolDecision
- AgentFailureBehaviour
- AgentToolPermission
- AgentLimits
- AgentDefinition
- AgentTaskGroupPlan
- AgentFinding
- AgentResult
- AgentMergePolicy
- AgentReport

## logicn-ai-neural

LogicN neural network model, layer, inference and training boundary contracts.

Provides:
- NeuralTask
- ActivationFunction
- LossFunction
- OptimizerName
- TensorShapeRef
- NeuralTensorRef
- NeuralLayer
- NeuralModelDefinition
- NeuralInferencePlan
- NeuralTrainingPlan
- NeuralReport

## logicn-ai-neuromorphic

LogicN neuromorphic and spiking event model contracts.

Provides:
- Spike
- SpikeTrain
- EventSignal
- SpikingModel
- NeuromorphicPlan
- NeuromorphicReport

## logicn-core-photonic

LogicN photonic and wavelength concepts, models, APIs and simulation contracts.

Provides:
- Wavelength
- Phase
- Amplitude
- OpticalSignal
- OpticalChannel
- PhotonicMapping

## logicn-target-cpu

LogicN CPU target capability, fallback and execution planning contracts.

Provides:
- CpuArchitecture
- CpuSimdFeature
- CpuWorkloadClass
- CpuThreadingPolicy
- CpuTargetCapability
- CpuTargetPlan
- CpuTargetReport
- CpuFeatureProbe
- CpuTargetDiagnosticSeverity
- CpuTargetDiagnostic
- CpuCalibrationSample
- CpuCalibrationReport

## logicn-cpu-kernels

LogicN optimized CPU kernel contracts for scalar, vector, matrix and low-bit workloads.

Provides:
- CpuKernelOperation
- CpuKernelDataType
- CpuKernelFeature
- CpuKernelTilePlan
- CpuKernelPlan
- CpuKernelBenchmark
- CpuKernelReport
- CpuKernelNativeAbi
- CpuKernelCalibrationEntry
- CpuKernelCalibrationCache
- CpuKernelDiagnosticSeverity
- CpuKernelDiagnostic

## logicn-target-binary

LogicN binary and native target planning concepts.

Provides:
- BinaryTarget
- BinaryArtefact
- BinaryTargetReport

## logicn-target-wasm

LogicN WebAssembly target planning and output contracts.

Provides:
- WasmTarget
- WasmArtefact
- WasmTargetReport

## logicn-target-gpu

LogicN GPU target planning and output contracts.

Provides:
- GpuTargetCapability
- GpuKernelPlan
- GpuTargetReport

## logicn-target-ai-accelerator

LogicN NPU, TPU and AI accelerator target planning contracts.

Provides:
- AiAcceleratorKind
- AiAcceleratorWorkloadKind
- AiAcceleratorPrecision
- AiAcceleratorFramework
- AiAcceleratorTopology
- AiAcceleratorMemoryProfile
- AiAcceleratorBackendProfile
- AiAcceleratorCapability
- AiAcceleratorPlan
- AiAcceleratorReport
- INTEL_GAUDI3_HL338_PROFILE

## logicn-target-photonic

LogicN photonic target backend planning concepts.

Provides:
- PhotonicActualTarget
- PhotonicTargetStatus
- PhotonicOperationKind
- OpticalInterconnectMode
- OpticalTransferFormat
- PhotonicTargetCapability
- OpticalIoCapability
- PhotonicTargetInput
- PhotonicLoweringPlan
- PhotonicOperationMapping
- UnsupportedPhotonicOperation
- PhotonicSimulationTarget

## logicn-framework-app-kernel

Optional LogicN secure runtime kernel design for typed APIs, validation, auth, workload controls, jobs and reports.

## logicn-framework-api-server

`logicn-framework-api-server` is the first concrete HTTP API-serving package for LogicN.

## logicn-core-cli

LogicN developer command-line interface for checking, building, serving, reporting and running safe tasks.

Provides:
- parseEnvironment
- commands
- findCommand
- Dirent
- Stats
- mkdir
- readdir
- readFile
- stat
- writeFile
- dirname
- join

## logicn-core-tasks

Safe typed task runner for LogicN project automation.

Provides:
- checkTaskPermissions
- TaskDependencyPlan
- resolveTaskDependencies
- DryRunPlan
- createDryRunPlan
- dryRunTask
- LoadedTasks
- parseTasksSource
- readFile
- RunTaskOptions
- TaskReport
- TaskRunReport

## logicn-tools-benchmark

LogicN benchmark and diagnostics contracts for logic, compute targets, fallback behaviour and safe reporting.

Provides:
- BenchmarkMode
- BenchmarkTrigger
- BenchmarkTarget
- BenchmarkStatus
- BenchmarkPrivacyPolicy
- BenchmarkConfig
- BenchmarkSystemInfo
- BenchmarkTestResult
- BenchmarkScores
- BenchmarkReport
- BenchmarkSubmitPayload
- DEFAULT_BENCHMARK_CONFIG

## logicn-devtools-project-graph

LogicN project knowledge graph contracts for package, document, policy and report relationships.

Provides:
- ProjectGraphNodeKind
- ProjectGraphEdgeKind
- ProjectGraphConfidence
- ProjectGraphDiagnosticSeverity
- ProjectGraphBackendId
- ProjectGraphBackendSourceKind
- ProjectGraphBackendCapability
- ProjectGraphDiagnostic
- ProjectGraphNode
- ProjectGraphEdge
- ProjectGraph
- ProjectGraphWorkspacePackage

## logicn-framework-example-app

`packages-logicn/logicn-framework-example-app` is the bespoke application package for this workspace.
