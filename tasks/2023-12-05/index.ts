type Callback = () => void;

export class ChristmasEmitter {
    private events: Record<string, Callback[]> = {}


    on(event: string, callback: Callback) {
        this.events[event] = this.events[event] || [];
        this.events[event].push(callback);
    }

    off(event: string, callback: Callback) {
        if (this.events[event]) {
            this.events[event] = this.events[event].filter(cb => cb !== callback);
        }
    }

    emit(event: string) {
        if (this.events[event]) {
            this.events[event].forEach(callback => callback());
        }
    }
}