import { ChristmasEmitter } from './index';

describe('ChristmasEmitter', () => {
    it('should allow to subscribe and emit events', () => {
        const emitter = new ChristmasEmitter();
        const letterCallback = jest.fn();
        const giftCallback = jest.fn();

        emitter.on('letter', letterCallback);
        emitter.on('gift', giftCallback);
        emitter.emit('letter');

        expect(letterCallback).toHaveBeenCalled();
        expect(giftCallback).not.toHaveBeenCalled();
    });

    it('should handle multiple subscribers for the same event', () => {
        const emitter = new ChristmasEmitter();
        const firstMockCallback = jest.fn();
        const secondMockCallback = jest.fn();

        emitter.on('gift', firstMockCallback);
        emitter.on('gift', secondMockCallback);
        emitter.emit('gift');

        expect(firstMockCallback).toHaveBeenCalled();
        expect(secondMockCallback).toHaveBeenCalled();
    });

    it('should not call callbacks after they have been removed', () => {
        const emitter = new ChristmasEmitter();
        const mockCallback = jest.fn();

        emitter.on('letter', mockCallback);
        emitter.off('letter', mockCallback);
        emitter.emit('letter');

        expect(mockCallback).not.toHaveBeenCalled();
    });
});
