type EmitterCallbackFn = () => void;
type EmitterEventName = 'letter' | 'gift';

export class ChristmasEmitter {
    private _events = new Map<EmitterEventName, EmitterCallbackFn[]>([]);

    public on(event: EmitterEventName, callback: EmitterCallbackFn) {
        this._events.set(event, [...(this._events.get(event) ?? []), callback]);
    }
    
    public off(event: EmitterEventName, callback: EmitterCallbackFn) {
        const eventCallbackList = this._events.get(event);
        
        if (eventCallbackList === undefined) return;
    
        this._events.set(event, eventCallbackList.filter(cb => cb !== callback));
    }
    
    public emit(event: EmitterEventName) {
        const eventCallbackList = this._events.get(event);
        
        if (eventCallbackList === undefined) return;
        
        eventCallbackList.forEach(cb => cb());
    }
}