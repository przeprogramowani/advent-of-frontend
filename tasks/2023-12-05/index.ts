// Tutaj skopiuj kod zadania

type EventType = 'gift' | 'letter';

type ChristmasHandler = () => void;

type ChristmasEventList =   Map<EventType, ChristmasHandler[]>


interface IChristmasEmitter {
    christmasEvents: ChristmasEventList;
    on: (eventName: EventType, callback: ChristmasHandler) => void;
    off: (eventName: EventType, callback: ChristmasHandler) => void;
    emit: (eventName: EventType) => void;
}

export class ChristmasEmitter implements IChristmasEmitter {
    christmasEvents: ChristmasEventList;
    constructor(){
        this.christmasEvents = new Map<EventType, ChristmasHandler[]>();
    }
    on(eventName: EventType, callback: ChristmasHandler){

    }
    off(eventName: EventType, callback: ChristmasHandler){

    }
    emit(eventName: EventType){

    }
}