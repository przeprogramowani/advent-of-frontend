function generateRandomId() {
  const randomId = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0");
  return randomId;
}

type StateType = string | null;

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
    const machineToStop = this.#machines.find((m) => m.id === machine.id);
    if (machineToStop) {
      machineToStop.state = null;
      const filteredMachines = this.#machines.filter(
        (m) => m.id !== machineToStop.id
      );
      this.#machines = filteredMachines;
    }
  }
}

export class Machine {
  id = generateRandomId();
  #state: string | null = null;
  #ordersHistory: string[] = [];

  get state(): string | null {
    return this.#state;
  }

  set state(state: string | null) {
    if (state) {
      this.#ordersHistory.push(state);
      this.#state = state;
    } else {
      this.#state = null;
    }
  }

  performAudit(): string[] {
    return this.#ordersHistory.map(
      (order, index) => `Order #${index + 1} - ${order}`
    );
  }
}
