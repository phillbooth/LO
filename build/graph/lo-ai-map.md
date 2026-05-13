# LO AI Map

## lo-core

LO / Logic Omni language package, examples, schemas and prototype CLI.

## lo-core-compiler

LO compiler pipeline contracts for parsing, checking, IR, diagnostics and reports.

Provides:
- CompilerInput
- SourceLocation
- CompilerDiagnostic
- CompilerResult

## lo-core-runtime

LO execution engine contracts for checked and compiled runtime execution.

Provides:
- RuntimeMode
- RuntimeContext
- RuntimeError
- RuntimeResult
- RuntimeReport

## lo-core-security

Reusable LO security primitives, redaction helpers, permission models and security report contracts.

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
- RedactionResult
- PermissionGrant

## lo-core-config

LO project configuration, environment mode and policy loading contracts.

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

## lo-core-reports

Shared LO report schemas and report-writing contracts.

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

## lo-core-logic

LO multi-state logic concepts including Tri, Logic<N> and future Omni logic.

Provides:
- Tri
- LogicState
- LogicDefinition
- TruthTableRow
- LogicReport

## lo-core-vector

LO vector value, lane, operation and report concepts.

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

## lo-core-compute

LO compute planning, capability and target selection concepts.

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

## lo-ai

LO AI inference contracts, model metadata, safety policy and reports.

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

## lo-ai-lowbit

LO low-bit AI inference contracts with BitNet as an optional backend.

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

## lo-ai-agent

LO supervised AI agent, tool permission, task group and report contracts.

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

## lo-ai-neural

LO neural network model, layer, inference and training boundary contracts.

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

## lo-ai-neuromorphic

LO neuromorphic and spiking event model contracts.

Provides:
- Spike
- SpikeTrain
- EventSignal
- SpikingModel
- NeuromorphicPlan
- NeuromorphicReport

## lo-core-photonic

LO photonic and wavelength concepts, models, APIs and simulation contracts.

Provides:
- Wavelength
- Phase
- Amplitude
- OpticalSignal
- OpticalChannel
- PhotonicMapping

## lo-target-cpu

LO CPU target capability, fallback and execution planning contracts.

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

## lo-cpu-kernels

LO optimized CPU kernel contracts for scalar, vector, matrix and low-bit workloads.

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

## lo-target-binary

LO binary and native target planning concepts.

Provides:
- BinaryTarget
- BinaryArtefact
- BinaryTargetReport

## lo-target-wasm

LO WebAssembly target planning and output contracts.

Provides:
- WasmTarget
- WasmArtefact
- WasmTargetReport

## lo-target-gpu

LO GPU target planning and output contracts.

Provides:
- GpuTargetCapability
- GpuKernelPlan
- GpuTargetReport

## lo-target-ai-accelerator

LO NPU, TPU and AI accelerator target planning contracts.

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

## lo-target-photonic

LO photonic target backend planning concepts.

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

## lo-framework-app-kernel

Optional LO secure runtime kernel design for typed APIs, validation, auth, workload controls, jobs and reports.

## lo-framework-api-server

`lo-framework-api-server` is the first concrete HTTP API-serving package for LO.

## lo-core-cli

LO developer command-line interface for checking, building, serving, reporting and running safe tasks.

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

## lo-core-tasks

Safe typed task runner for LO project automation.

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

## lo-tools-benchmark

LO benchmark and diagnostics contracts for logic, compute targets, fallback behaviour and safe reporting.

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

## lo-devtools-project-graph

LO project knowledge graph contracts for package, document, policy and report relationships.

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

## lo-finance-core

Grouped LO finance package contracts for financial maths, market data, FIX, audit, risk and pricing planning.

## lo-electrical-core

Grouped LO electrical infrastructure contracts for assets, monitoring, capacity, energy, maintenance, protection records and audit planning.

## lo-ot-core

Grouped LO operational-technology contracts for telemetry gateways, OT network policy, protocol adapter boundaries, signed commands and audit planning.

## lo-framework-example-app

`packages-lo/lo-framework-example-app` is the bespoke application package for this workspace.
