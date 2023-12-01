import { GiftHandler } from "./GiftHandler";
import { IGift } from "./IGift.interface";
export class GiftRegistry {
  #giftHandler: GiftHandler;

  constructor() {
    this.#giftHandler = new GiftHandler();
  }

  getGiftsForChild(childId: number): string[] {
    return this.#giftHandler.getGiftsForChild(childId);
  }

  addGift(childId: number, name: string): void {
    this.#giftHandler.addGift(childId, name);
  }

  removeGift(childId: number, name: string): void {
    this.#giftHandler.removeGift(childId, name);
  }
}
