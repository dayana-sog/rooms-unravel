import { useEffect, useRef } from "react";

export function useInfiniteScroll(callback:any) {
  const sentinelRef = useRef(null);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) callback();
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, [callback]);

  return sentinelRef;
}
