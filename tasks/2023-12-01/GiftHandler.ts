import { IGift } from "./IGift.interface";

export class GiftHandler {
  #giftsList: IGift[] = [];

  getGiftsForChild(childId: number) {
    const gifts = this.#giftsList
      .filter((gift) => gift.childId === childId)
      .map((el) => el.name);
    if (!gifts.length) throw new Error("No gifts for this child");
    else return gifts;
  }

  addGift(childId: number, name: string): void {
    this.#giftsList.push({
      childId,
      name,
    });
  }

  removeGift(childId: number, name: string): void {
    const giftIndex = this.#giftsList.findIndex(
      (el) => el.childId === childId && el.name === name
    );
    if (giftIndex > -1) {
      this.#giftsList.splice(giftIndex, 1);
    } else throw new Error("Gift not found");
  }
}
