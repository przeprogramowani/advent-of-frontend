// Tutaj skopiuj kod zadania
import {v4 as uuidv4} from 'uuid';

const AVAILABLE_TOYS = ['snowboards', 'game consoles', 'streaming gear'] as const;

type ToyType = typeof AVAILABLE_TOYS[number] | BadToyName | null;

type BadToyName = 'unknown' | 'wrong';

interface IOrderController {
    machineFactory: IMachine[];
    setState: (toy: ToyType) => void;
    registerMachine: (machine: IMachine) => void;
    unregisterMachine: (machine: IMachine) => void;
}

interface IMachine {
    toyLineFactory: ToyType[];
    state: ToyType;
    id: string;
    performAudit: () => string[];
}
export class OrderController implements IOrderController {
  machineFactory: IMachine[];
  constructor(){
    this.machineFactory = [];
  }
  setState(toy: ToyType): void {
    if(toy === 'unknown') throw new Error('Invalid state provided');
    this.machineFactory.forEach((machine) => {
        machine.toyLineFactory.push(toy);
        machine.state = toy;
    });
  };
  registerMachine(machine: IMachine): void{
    this.machineFactory.push(machine);
  };

  unregisterMachine({id: machineIdToUnRegister}: IMachine):void{
    this.machineFactory = this.machineFactory.filter(({id}:IMachine) => id !== machineIdToUnRegister);
  };
}

export class Machine implements IMachine {
  toyLineFactory: ToyType[];
  state: ToyType;
  id: string;

  constructor (){
    this.toyLineFactory = [];
    this.state = null;
    this.id = uuidv4();
  }

  performAudit(): string[]{
    return this.toyLineFactory.map((toy, index) => `Order #${index+1} - ${toy}`);
  }
}