import { GiftRegistry } from './index';

describe('GiftRegistry', () => {
  it('should retrieve all gifts for a given child ID', () => {
    const registry = new GiftRegistry();
    registry.addGift(1, 'teddy bear');
    registry.addGift(1, 'bicycle');
    registry.addGift(2, 'car model');
    expect(registry.getGiftsForChild(1)).toEqual(['teddy bear', 'bicycle']);
  });

  it('should handle removal of gifts correctly', () => {
    const registry = new GiftRegistry();
    registry.addGift(1, 'teddy bear');
    registry.addGift(1, 'bicycle');
    registry.removeGift(1, 'teddy bear');
    expect(registry.getGiftsForChild(1)).toEqual(['bicycle']);
    expect(registry.getGiftsForChild(1)).not.toContain('teddy bear');
  });

  it('should throw an error if trying to remove a gift that does not exist', () => {
    const registry = new GiftRegistry();
    registry.addGift(1, 'teddy bear');
    expect(() => registry.removeGift(1, 'puzzle')).toThrow('Gift not found');
  });
});