import { useRef, useCallback } from 'react';

export function useEvent<T extends (...args: any[]) => any>(handler: T): T {
  const handlerRef = useRef<T>(handler);
  handlerRef.current = handler;
  return useCallback<T>((...args) => handlerRef.current(...args) as any, []);
}
