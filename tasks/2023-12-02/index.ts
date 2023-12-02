type ChristmasQueueItem<DataType> = { priority: number, items: DataType[] };

export class ChristmasQueue<DataType> {
  private _queue: ChristmasQueueItem<DataType>[] = [];
  
  public enqueue(item: DataType, priority: number) {
    const queueItem = this._queue.find(record => record.priority === priority);
    
    if (queueItem) {
      queueItem.items.push(item);
    } else {
      this._queue.push({
        priority,
        items: [item],
      });
      this._queue.sort((a, b) => b.priority - a.priority);
    }
  }
  
  public dequeue() {
    if (this.isEmpty()) {
      throw new Error('There are no letters in the queue!');
    }
    
    const highestPriority = this._queue[0];
    const item = highestPriority.items.shift();
    
    if (highestPriority.items.length === 0) {
      this._queue.shift();
    }
    
    return item;
  }
  
  public isEmpty() {
    return this._queue.length === 0;
  }
}