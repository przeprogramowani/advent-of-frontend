// Tutaj skopiuj kod zadania

type MemoFunction = (arg: Key) => Key;
type Key = string | number;

export type Func = (memo: MemoFunction) => Key;

export function memoize(memoFunction: MemoFunction) {
    if (typeof memoFunction !== 'function') {
        throw new Error('Function to be memoized must be a function.');
    }
    const cache: Record<Key, Key> = {};
    
    return (arg: Key) => {
        if(arg in cache){
            return cache[arg];
        }else{
            const result = memoFunction(arg);
            cache[arg] = result;
            return result;
        }
    }
}