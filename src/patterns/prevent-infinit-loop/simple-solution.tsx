import { useState, useEffect } from "react";

interface Task {
  id: number;
  name: string;
}
export function TodoApp() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [triggerFetch, setTriggerFetch] = useState(false); // Un trigger para controlar las actualizaciones manuales.

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch("https://api.example.com/tasks");
      const data = await response.json();
      setTasks(data);
    };
    fetchTasks();
  }, [triggerFetch]); // Solo se dispara al cargar o cuando triggerFetch cambia.

  const addTask = async (newTask: Task) => {
    await fetch("https://api.example.com/tasks", {
      method: "POST",
      body: JSON.stringify(newTask),
      headers: { "Content-Type": "application/json" },
    });
    setTriggerFetch((prev) => !prev); // Forzar el refetch de tareas.
  };

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
