import { memoize } from './index';

describe('memoize', () => {
    it('should memoize function results', () => {
        const complexCalculation = jest.fn().mockImplementation((x: number) => x * x);
        const memoizedCalculation = memoize(complexCalculation);

        expect(memoizedCalculation(2)).toBe(4);
        expect(memoizedCalculation(2)).toBe(4);
        expect(memoizedCalculation(3)).toBe(9);
        expect(complexCalculation).toHaveBeenCalledTimes(2);
    });

    it('should handle different arguments correctly', () => {
        const greeting = jest.fn().mockImplementation((p: string) => `${p}!`);
        const memoizedGreeting = memoize(greeting);

        expect(memoizedGreeting('John')).toBe('John!');
        expect(memoizedGreeting('Paul')).toBe('Paul!');
        expect(greeting).toHaveBeenCalledTimes(2);
    });

    it('should throw an error when non-function is memoized', () => {
        expect(() => memoize(42 as never)).toThrow('Function to be memoized must be a function.');
    });
});
