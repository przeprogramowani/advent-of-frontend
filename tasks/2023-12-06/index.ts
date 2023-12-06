import { Machine } from "./Machine";
import { StateType } from "./types";

export class OrderController {
  #machines: Machine[] = [];

  setState(state: StateType): void {
    if (state === "unknown") {
      throw Error("Invalid state provided");
    } else {
      this.#machines.forEach((machine) => {
        machine.state = state;
      });
    }
  }

  registerMachine(machine: Machine): void {
    this.#machines.push(machine);
  }

  unregisterMachine(machine: Machine): void {
    machine.state = null;
    this.#machines = this.#machines.filter((x) => x.id !== machine.id);
  }
}
