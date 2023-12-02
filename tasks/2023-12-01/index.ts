export class GiftRegistry {
    private _registry = new Map<number, Set<string>>([]);
    
    public addGift(childId: number, gift: string) {
        const childGiftList = this._registry.get(childId) ?? new Set<string>([]);
        childGiftList.add(gift);
        
        this._registry.set(childId, childGiftList);
    }
    
    public getGiftsForChild(childId: number) {
        return [...(this._registry.get(childId) ?? [])];
    }
    
    public removeGift(childId: number, gift: string) {
        const childGiftList = this._registry.get(childId);
        if (!childGiftList || !childGiftList.has(gift)) {
            throw new Error('Gift not found');
        }
        
        childGiftList.delete(gift);
    }
}