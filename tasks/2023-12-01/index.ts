export class GiftRegistry {
  private registry: Record<number, string[]> = {};

  addGift(childId: number, gift: string) {
    if (!this.registry[childId]) {
        this.registry[childId] = [];
    }
    this.registry[childId].push(gift);
  }

  getGiftsForChild(childId: number): string[] {
    return this.registry[childId] || [];
  }

  removeGift(childId: number, gift: string) {
    const gifts = this.registry[childId];
    if (!gifts || !gifts.includes(gift)) {
        throw new Error('Gift not found!');
    }
    this.registry[childId] = gifts.filter(item => item !== gift);
  }
}