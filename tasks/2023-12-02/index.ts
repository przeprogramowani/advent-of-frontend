export class ChristmasQueue<T> {
    private queue: { item: T; priority: number }[] = [];
  
    enqueue(item: T, priority: number): void {
      let added = false;
      for (let i = 0; i < this.queue.length; i++) {
        if (priority > this.queue[i].priority) {
          this.queue.splice(i, 0, { item, priority });
          added = true;
          break;
        }
      }
      if (!added) {
        this.queue.push({ item, priority });
      }
    }
  
    dequeue(): T {
      if (this.isEmpty()) {
        throw new Error('There are no letters in the queue!');
      }
      return this.queue.shift()!.item;
    }
  
    isEmpty(): boolean {
      return this.queue.length === 0;
    }
  }