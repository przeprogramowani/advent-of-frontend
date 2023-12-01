interface IGiftRegistry {
    addGift: (childId: number, giftName: string) => void;
    removeGift: (childId: number, giftName: string) => void;
    getGiftsForChild: (childId: number) => string[];
    registryGifts: IChildGift[];
}


export class GiftRegistry implements IGiftRegistry{
    registryGifts: IChildGift[];
  constructor(){
    this.registryGifts = [];
  }

  addGift (childId: number, giftName: string): void {
    if(this.registryGifts.some(childGift => childGift.childId === childId)){
        this.registryGifts = this.registryGifts.map(childGifts => {
            if(childGifts.childId === childId){
                childGifts.gifts.push(giftName);
            }
            return childGifts;
        });
    }else {
        const childGifts = new ChildGift(childId);
        childGifts.gifts.push(giftName);
        this.registryGifts.push(childGifts);
    }
  };
  removeGift(childId: number, giftName: string): void {
    this.registryGifts = this.registryGifts.map((gifts)=> {
        if(gifts.childId === childId){
            const giftNameToRemove = gifts.gifts.findIndex( name => name === giftName);
            if(giftNameToRemove === -1 ) {
                throw new Error('Gift not found');
            }
            gifts.gifts = gifts.gifts.filter((nameGift) => nameGift !== giftName);
        }
        return gifts;
    })
  }
  getGiftsForChild(childId: number): string[] {
    const childGiftRegistry: ChildGift | undefined = this.registryGifts.find(({childId: childRegistryId}) => childRegistryId === childId);
    if(childGiftRegistry !== undefined){
        return childGiftRegistry.gifts
    }
    return [];
  }
}

interface IChildGift {
    childId: number;
    gifts: string[];
}

class ChildGift implements IChildGift {
    childId: number;
    gifts: string[];

    constructor(_childId: number){
        this.childId = _childId;
        this.gifts = [];
    }
}