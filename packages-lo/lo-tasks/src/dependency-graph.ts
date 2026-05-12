import type { LoadedTasks } from "./load-tasks.js";
import type { TaskDefinition, TaskError } from "./types.js";

export interface TaskDependencyPlan {
  readonly task: string;
  readonly order: readonly TaskDefinition[];
  readonly error?: TaskError;
}

export function resolveTaskDependencies(
  loadedTasks: LoadedTasks,
  taskName: string,
): TaskDependencyPlan {
  const tasksByName = new Map(loadedTasks.tasks.map((task) => [task.name, task]));
  const visiting = new Set<string>();
  const visited = new Set<string>();
  const order: TaskDefinition[] = [];

  const visit = (name: string, path: readonly string[]): TaskError | undefined => {
    const task = tasksByName.get(name);

    if (task === undefined) {
      return {
        task: taskName,
        code: "LO_TASK_DEPENDENCY_MISSING",
        safeMessage: `Task dependency is not defined: ${name}`,
        internalDiagnostic: `Dependency path: ${[...path, name].join(" -> ")}`,
        suggestedFix: "Add the missing task or remove it from the depends list."
      };
    }

    if (visiting.has(name)) {
      return {
        task: taskName,
        code: "LO_TASK_DEPENDENCY_CYCLE",
        safeMessage: `Task dependencies contain a cycle at: ${name}`,
        internalDiagnostic: `Dependency path: ${[...path, name].join(" -> ")}`,
        suggestedFix: "Remove or split one dependency in the cycle."
      };
    }

    if (visited.has(name)) {
      return undefined;
    }

    visiting.add(name);

    for (const dependency of task.depends ?? []) {
      const error = visit(dependency, [...path, name]);
      if (error !== undefined) {
        return error;
      }
    }

    visiting.delete(name);
    visited.add(name);
    order.push(task);
    return undefined;
  };

  const error = visit(taskName, []);

  return {
    task: taskName,
    order,
    ...(error === undefined ? {} : { error })
  };
}
