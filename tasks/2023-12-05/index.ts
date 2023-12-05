export class ChristmasEmitter {
    private events: Record<string, Function[]> = {}

    on(event: string, callback: Function) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(callback);
    }

    off(event: string, callback: Function) {
        if(this.events[event]) {
            this.events[event] = this.events[event].filter(cb => cb !== callback);
        }
    }

    emit(event: string) {
        if(this.events[event]) {
            this.events[event].forEach(callback => callback());
        }
    }
}