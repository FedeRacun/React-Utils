type Task<T> = () => Promise<T>;

export function throttlePromises<T>(tasks: Task<T>[], limit: number): Promise<T[]> {
  let active = 0;                       // Cantidad de promesas activas
  let results: (T | undefined)[] = [];   // Array para almacenar resultados
  let taskIndex = 0;                     // Índice de la próxima tarea a ejecutar

  return new Promise<T[]>((resolve) => {
    const nextTask = () => {
      if (taskIndex >= tasks.length) {
        // Si ya se han lanzado todas las tareas y no quedan activas, resolvemos
        if (active === 0) {
          resolve(results as T[]);
        }
        return;
      }

      const index = taskIndex++;  // Obtenemos el índice actual y lo incrementamos
      active++;                   // Incrementamos la cantidad de tareas activas

      tasks[index]()
        .then(result => results[index] = result) // Guardamos el resultado
        .finally(() => {
          active--;  // Reducimos el conteo de tareas activas
          nextTask();  // Ejecutamos la siguiente tarea
        });
    };

    // Iniciar el número de tareas especificadas por el límite
    for (let i = 0; i < limit; i++) {
      nextTask();
    }
  });
}

// Ejemplo de uso:

/**
const myTask = (name: string, time: number): Task<string> => () =>
  new Promise(resolve => {
    console.log(`${name} empezando...`);
    setTimeout(() => {
      console.log(`${name} completada`);
      resolve(`${name} completada`);
    }, time);
  });

const tasks = [
  myTask('Tarea 1', 1000),
  myTask('Tarea 2', 500),
  myTask('Tarea 3', 300),
  myTask('Tarea 4', 700),
  myTask('Tarea 5', 200),
  myTask('Tarea 6', 300),
  myTask('Tarea 7', 500),
  myTask('Tarea 8', 2000),
  myTask('Tarea 9', 1500),
  myTask('Tarea 10', 700),
  myTask('Tarea 11', 300),
  myTask('Tarea 12', 1000),
];

 // Limitar concurrencia a 4 tareas simultáneas
throttlePromises(tasks, 4)
  .then(results => console.log('Resultados:', results));
*/