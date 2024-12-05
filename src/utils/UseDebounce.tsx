import { useState, useEffect, useRef } from "react";

export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debounceValue, setDebounceValue] = useState<T>(value);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    // Si el valor ya es el mismo, no hace falta volver a hacer un set
    if (debounceValue === value) return;

    // Limpiamos el timeout anterior
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // Establecemos un nuevo timeout
    timerRef.current = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    // Limpieza en el return
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [value, delay, debounceValue]);

  return debounceValue;
}

// Ejemplo de uso:
/**

const [search, setSearch] = useState('')
const debouncedSearch = useDebounce(search, 1000)


*/
