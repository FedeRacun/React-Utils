type Task<T> = () => Promise<T>;

export class ConcurrentQueue<T> {
  private queue: (() => void)[] = [];  // Cola de tareas pendientes
  private activeCount: number = 0;     // Número de tareas activas
  private concurrencyLimit: number;    // Límite de concurrencia

  constructor(concurrencyLimit: number) {
    this.concurrencyLimit = concurrencyLimit;
  }

  // Añadir una nueva tarea a la cola
  add(task: Task<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      const runTask = () => {
        if (this.activeCount < this.concurrencyLimit) {
          this.activeCount++;
          task()
            .then(resolve)   // Resolución de la tarea
            .catch(reject)   // Manejo de errores
            .finally(() => {
              this.activeCount--;
              this.next(); // Ejecuta la siguiente tarea en la cola
            });
        } else {
          // Si no se puede ejecutar aún, queda en la cola
          this.queue.push(runTask);
        }
      };

      runTask();
    });
  }

  // Ejecuta la siguiente tarea en la cola si el límite de concurrencia lo permite
  private next() {
    if (this.queue.length > 0 && this.activeCount < this.concurrencyLimit) {
      const nextTask = this.queue.shift();
      if (nextTask) nextTask();
    }
  }
}

// Ejemplo de uso:
/**
// Crear la cola con un límite de concurrencia de 2 tareas simultáneas
const queue = new ConcurrentQueue<string>(2);

// Definimos algunas tareas simuladas
const createTask = (name: string, delay: number): Task<string> => () =>
  new Promise(resolve => {
    console.log(`${name} empezando...`);
    setTimeout(() => {
      console.log(`${name} completada`);
      resolve(`${name} completada`);
    }, delay);
  });

// Añadimos tareas a la cola
queue.add(createTask("Tarea 1", 1000)).then(console.log);
queue.add(createTask("Tarea 2", 500)).then(console.log);
queue.add(createTask("Tarea 3", 300)).then(console.log);
queue.add(createTask("Tarea 4", 700)).then(console.log);
*/
