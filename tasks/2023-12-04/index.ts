export function memoize<DataType>(fn: (arg: DataType) => DataType) {
    if (typeof fn !== 'function') {
        throw new Error('Function to be memoized must be a function.');
    }
    
    const cache = new Map<DataType, DataType>([]);

    return (arg: DataType) => {
        const cachedResult = cache.get(arg);
        if (cachedResult !== undefined) {
            return cachedResult;
        }

        const result = fn(arg);
        cache.set(arg, result);
        return result;
    }
}