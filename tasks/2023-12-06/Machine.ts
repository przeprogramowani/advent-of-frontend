import { getRandomId } from "./getRandomId";

export class Machine {
  id = getRandomId();
  #state: string | null = null;
  #ordersHistory: string[] = [];

  get state(): string | null {
    return this.#state;
  }

  set state(state: string | null) {
    if (state) {
      this.#ordersHistory.push(state);
      this.#state = state;
    } else {
      this.#state = null;
    }
  }

  performAudit(): string[] {
    return this.#ordersHistory.map(
      (order, index) => `Order #${index + 1} - ${order}`
    );
  }
}
