export class ChristmasEmitter {
  #events: Map<string, Function[]> = new Map();

  on(eventName: string, eventFunction: Function): void {
    const isEventOnList = this.#events.has(eventName);
    if (isEventOnList) {
      const currentEvents = this.#events.get(eventName) as Function[];
      currentEvents.push(eventFunction);
    } else {
      this.#events.set(eventName, [eventFunction]);
    }
  }

  off(eventName: string, eventFunction: Function): void {
    const events = this.#events.get(eventName) as Function[];
    const newEvents = events.filter((e) => e.name !== eventFunction.name);
    this.#events.set(eventName, newEvents);
  }

  emit(eventName: string): void {
    const events = this.#events.get(eventName) as Function[];
    events.forEach((fc) => fc());
  }
}
