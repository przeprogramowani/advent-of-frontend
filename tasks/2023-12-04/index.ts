type MemoizedFunction<T> = (...args: any[]) => T;

export function memoize<T>(func: (...args: any[]) => T): MemoizedFunction<T> {
  if (typeof func !== 'function') {
    throw new Error('Function to be memoized must be a function.');
  }

  const cache = new Map<string, T>();

  return (...args: any[]): T => {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key)!;
    }

    const result = func(...args);
    cache.set(key, result);

    return result;
  };
}