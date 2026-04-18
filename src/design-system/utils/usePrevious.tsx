import { useLayoutEffect, useRef } from "react";

/**
 * Returns the value from the **previous render**.
 *
 * On the very first render it returns `undefined` because there is no prior value.
 * The snapshot is taken with `useLayoutEffect`, which runs synchronously after the
 * DOM is updated but before the browser paints — so the returned value is always
 * one render behind the current one.
 *
 * Used internally by `makeStyles` to detect whether `ownerState` actually changed
 * between renders (via `shallowEqual`) and avoid creating a new object reference
 * when nothing meaningful changed.
 *
 * @example
 * function Counter() {
 *   const [count, setCount] = useState(0);
 *   const prevCount = usePrevious(count);
 *   // On first render: prevCount === undefined
 *   // After first increment: prevCount === 0, count === 1
 *   return <div>{prevCount} → {count}</div>;
 * }
 */
export default function usePrevious<T>(val: T) {
  const valRef = useRef<T | undefined>(undefined);

  useLayoutEffect(() => {
    valRef.current = val;
  }, [val]);

  // eslint-disable-next-line react-hooks/refs -- intentional: usePrevious reads the ref in render by design
  return valRef.current;
}
