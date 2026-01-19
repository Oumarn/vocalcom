import { useRef, useCallback } from 'react';

export function useEvent<T extends (...args: any[]) => any>(handler: T): T {
  const handlerRef = useRef<T>(handler);
  handlerRef.current = handler;
  return useCallback((...args: Parameters<T>) => handlerRef.current(...args), []) as T;
}
