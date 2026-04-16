/**
 * Merges multiple refs into a single callback ref
 */
import type { Ref } from "react";
import { useCallback, useRef } from "react";

type PossibleRef<T> = Ref<T> | null | undefined | false;

export function assignRef<T>(ref: PossibleRef<T>, element: T | null) {
  if (typeof ref === "function") {
    ref(element);
  } else if (ref && typeof ref === "object") {
    ref.current = element;
  }
}

/**
 * Merges multiple refs into a single callback ref.
 * Uses a stable callback that doesn't cause re-renders when refs change.
 */
export function useMergedRef<T>(...refs: Array<PossibleRef<T>>) {
  const refsRef = useRef(refs);

  // Update the stored refs on each render
  refsRef.current = refs;

  return useCallback(
    (element: T | null) => {
      refsRef.current.forEach((ref) => assignRef(ref, element));
    },
    [] // Empty dependency array - callback never changes
  );
}
