import { PriorityEnum } from "./PriorityEnum";
import { IQueueItem } from "./QueueItem.interface";

export class QueueHandler<T> {
  #queue: IQueueItem<T>[];

  constructor(queue: IQueueItem<T>[]) {
    this.#queue = queue;
  }

  isQueueEmpty(): boolean {
    return this.#queue.length < 1;
  }

  getFirstItemFromQueue(): T {
    if (this.#queue.length) {
      const item = this.#queue[0].item;
      this.#queue.shift();
      return item;
    } else {
      throw new Error("There are no letters in the queue!");
    }
  }

  addItemToQueue(item: T, priority: PriorityEnum): void {
    const highPriorityItems = this.#queue.filter(
      ({ priority }) => priority === PriorityEnum.HIGH
    );
    const medPriorityItems = this.#queue.filter(
      ({ priority }) => priority === PriorityEnum.MED
    );
    const lowPriorityItems = this.#queue.filter(
      ({ priority }) => priority === PriorityEnum.LOW
    );

    switch (priority) {
      case PriorityEnum.HIGH:
        highPriorityItems.push({ item, priority });
        break;
      case PriorityEnum.MED:
        medPriorityItems.push({ item, priority });
        break;
      case PriorityEnum.LOW:
        lowPriorityItems.push({ item, priority });
        break;
      default:
        throw new Error("Wrong priority value");
    }
    this.#queue = [
      ...highPriorityItems,
      ...medPriorityItems,
      ...lowPriorityItems,
    ];
  }
}
