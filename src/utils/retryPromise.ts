export function retryPromise<T>(
  fn: () => Promise<T>,
  retries: number = 3,
  delay: number = 1000
): Promise<T> {
  return fn().catch((err: any) => {
    if (retries > 0) {
      return new Promise<void>((resolve) => setTimeout(resolve, delay)).then(() =>
        retryPromise(fn, retries - 1, delay)
      );
    } else {
      return Promise.reject(err);
    }
  });
}

// Ejemplo de uso:

/**
function fetchData(): Promise<ResponseData> {
  try {
    const response = await fetch(this._urlBase)
    return response.json();
  } catch (error) {
    console.error(`Error al enviar los datos, intento ${attempt} de ${maxRetries}:`, error);
  }
}

retryPromise(fetchData, 3, 2000)
  .then(result => console.log(result))
  .catch(err => console.error('Error final:', err));

 */
