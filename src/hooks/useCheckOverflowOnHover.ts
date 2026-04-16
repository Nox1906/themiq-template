import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Attaches to a DOM element and reports whether it overflows its container.
 * Checks on mount and re-checks whenever the element or viewport resizes,
 * so the result is always up to date without requiring a hover event.
 */
function useCheckOverflowOnHover<T extends HTMLElement>({
  x = false,
  y = false,
}): [React.RefCallback<T>, boolean] {
  const [isOverflown, setIsOverflown] = useState(false);
  const nodeRef = useRef<T | null>(null);

  const checkOverflow = useCallback(() => {
    if (!nodeRef.current) return;
    const { scrollWidth, clientWidth, scrollHeight, clientHeight } =
      nodeRef.current;
    setIsOverflown(
      (x && scrollWidth > clientWidth) || (y && scrollHeight > clientHeight),
    );
  }, [x, y]);

  const ref = useCallback(
    (node: T | null) => {
      nodeRef.current = node;
      checkOverflow();
    },
    [checkOverflow],
  );

  useEffect(() => {
    const observer = new ResizeObserver(checkOverflow);
    if (nodeRef.current) {
      observer.observe(nodeRef.current);
    }
    return () => observer.disconnect();
  }, [checkOverflow]);

  return [ref, isOverflown];
}

export default useCheckOverflowOnHover;
