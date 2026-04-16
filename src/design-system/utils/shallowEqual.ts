/**
 * Compares two values for **shallow equality**.
 *
 * Rules applied in order:
 * 1. **Reference / primitive equality** — `left === right` → `true` immediately.
 * 2. **Arrays** — same length, and each element is recursively `shallowEqual`.
 *    This means nested arrays are compared element-wise, but nested *objects*
 *    inside those arrays are still compared by reference.
 * 3. **null** — if either side is `null` (and they are not the same reference)
 *    → `false`. This guard must come before the object check because
 *    `typeof null === 'object'`.
 * 4. **Plain objects** — same number of keys, and every value is `===` equal
 *    (one level only — nested objects are NOT recursively compared).
 * 5. **Everything else** — `false`.
 *
 * Used internally by `makeStyles` to decide whether the `ownerState` object
 * passed to tss-react actually changed, preventing unnecessary style
 * recalculations when only the reference identity changed.
 *
 * @example
 * shallowEqual({ a: 1 }, { a: 1 })          // true
 * shallowEqual({ a: { b: 1 } }, { a: { b: 1 } }) // false — nested object, reference differs
 * shallowEqual([1, 2], [1, 2])               // true
 * shallowEqual(null, null)                   // true  (caught by === check)
 * shallowEqual(null, {})                     // false
 */
function shallowEqual<T>(left: T, right: T): boolean {
  if (left === right) {
    return true;
  }

  if (Array.isArray(left) && Array.isArray(right)) {
    return (
      left.length === right.length &&
      left.every((obj, i) => shallowEqual(obj, right[i]))
    );
  }

  // typeof null === 'object', so we need to check it first
  if (left === null || right === null) {
    return false;
  }

  if (typeof left === "object" && typeof right === "object") {
    const leftEntries = Object.entries(left);

    return (
      leftEntries.length === Object.keys(right).length &&
      leftEntries.every(
        ([key, value]) => value === right[key as keyof typeof right],
      )
    );
  }

  return false;
}

export default shallowEqual;
