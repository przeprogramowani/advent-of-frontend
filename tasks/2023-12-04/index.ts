export function memoize<T extends (...args: unknown[]) => unknown>(
  handler: T
): T {
  if (typeof handler !== "function") {
    throw Error("Function to be memoized must be a function.");
  }

  const memo = new Map<string | number, unknown>();

  const memoFc = function (...args: unknown[]): unknown {
    const memoKey = JSON.stringify(args[0]);

    const res = memo.get(memoKey);
    if (res) return res;

    const handlerResult = handler(...args);
    memo.set(memoKey, handlerResult);
    return handlerResult;
  };

  return memoFc as T;
}
