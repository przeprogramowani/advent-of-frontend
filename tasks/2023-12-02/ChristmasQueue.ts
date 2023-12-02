import { PriorityEnum } from "./PriorityEnum";
import { QueueHandler } from "./QueueHandler";
import { IQueueItem } from "./QueueItem.interface";

export class ChristmasQueue<T> {
  #queue: IQueueItem<T>[] = [];
  #queueHandler = new QueueHandler<T>(this.#queue);

  enqueue(item: T, priority: PriorityEnum): void {
    this.#queueHandler.addItemToQueue(item, priority);
  }

  dequeue(): T {
    const item = this.#queueHandler.getFirstItemFromQueue();
    return item;
  }

  isEmpty(): boolean {
    return this.#queueHandler.isQueueEmpty();
  }
}
