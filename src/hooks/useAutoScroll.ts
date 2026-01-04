import { useEffect, useRef, type RefObject } from 'react';

export function useAutoScroll<T extends HTMLElement>(
  dependency: unknown
): RefObject<T | null> {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [dependency]);

  return ref;
}
