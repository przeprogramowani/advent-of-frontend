// Tutaj skopiuj kod zadania

type EventType = 'gift' | 'letter';

type ChristmasHandler = () => void;

type ChristmasEventList = Map<EventType, ChristmasHandler[]>


interface IChristmasEmitter {
    christmasEvents: ChristmasEventList;
    on: (eventName: EventType, callbackToAdd: ChristmasHandler) => void;
    off: (eventName: EventType, callbackToDelete: ChristmasHandler) => void;
    emit: (eventName: EventType) => void;
}

export class ChristmasEmitter implements IChristmasEmitter {
    christmasEvents: ChristmasEventList;
    constructor(){
        this.christmasEvents = new Map<EventType, ChristmasHandler[]>();
    }
    on(eventName: EventType, callbackToAdd: ChristmasHandler){
        if(this.christmasEvents.has(eventName)){
            const currentCallbackList = this.christmasEvents.get(eventName) || [];
            this.christmasEvents.set(eventName, [...currentCallbackList, callbackToAdd]);
        }else{
            this.christmasEvents.set(eventName, [callbackToAdd]);
        }
    }
    off(eventName: EventType, callbackToDelete: ChristmasHandler){
        if(this.christmasEvents.has(eventName)){
            const currentCallbackList = this.christmasEvents.get(eventName) || [];
            const updatedListOfCallbacks = currentCallbackList.filter(eventCallback => eventCallback != callbackToDelete);
            this.christmasEvents.set(eventName, updatedListOfCallbacks);
        }else{
            throw new Error("Cannot delete callback. Key does not exist");
        }
    }
    emit(eventName: EventType){
        if(this.christmasEvents.has(eventName)){
           const christmasCallbacks = this.christmasEvents.get(eventName) || [];
           christmasCallbacks.forEach(christmasCallback => christmasCallback());

        }else{
            throw new Error("Cannot run callback. Key does not exist");
        }
    }
}