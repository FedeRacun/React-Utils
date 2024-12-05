import { createContext, useContext, useState, useEffect } from "react";

interface Task {
  id: number;
  name: string;
}
interface TaskContextType {
  tasks: Task[];
  addTask: (newTask: Task) => Promise<void>;
}

// const TaskContext = createContext<TaskContextType | undefined>(undefined);
const TaskContext = createContext<TaskContextType>({
  tasks: [],
  addTask: async () => {},
});

export function TaskProvider({ children }: { children: React.ReactNode }) {
  // El _ es una convención para marcar que es una variable privada.
  const [tasks, _setTasks] = useState<Task[]>([]);

  // Creamos una funcion "Privada" que se disparará en el useEffect y al añadir una tarea.
  const _fetchTasks = async () => {
    const response = await fetch("https://api.example.com/tasks");
    const data = await response.json();
    _setTasks(data);
  };

  const addTask = async (newTask: Task) => {
    await fetch("https://api.example.com/tasks", {
      method: "POST",
      body: JSON.stringify(newTask),
      headers: { "Content-Type": "application/json" },
    });
    _fetchTasks(); // Refrescar tareas.
  };

  useEffect(() => {
    _fetchTasks(); // Solo al montar el componente.
  }, []);

  return <TaskContext.Provider value={{ tasks, addTask }}>{children}</TaskContext.Provider>;
}

export function useTasks() {
  return useContext(TaskContext);
}

/** ================================= */
/**            COMO USAR              */
/** ================================= */

export function TodoList() {
  const { tasks, addTask } = useTasks();

  return (
    <div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.name}</li>
        ))}
      </ul>
      <button onClick={() => addTask({ id: tasks.length + 1, name: "New Task" })}>Add Task</button>
    </div>
  );
}

export const myApp = () => {
  return (
    <TaskProvider>
      <TodoList />
    </TaskProvider>
  );
};
