// Tutaj skopiuj kod zadania
export class OrderController {
  private machines: Machine[] = [];
  private orders: string[] = [];

  registerMachine(machine: Machine) {
    this.machines.push(machine)
  }

  unregisterMachine(machine: Machine) {
    this.machines = this.machines.filter(m => m !== machine)
  }

  setState(order: string) {
    if (!this.isValidState(order)) {
        throw new Error('Invalid state provided!');
    }
    this.orders.push(order);
    this.notifyMachines();
  }

  private notifyMachines() {
    for (const machine of this.machines) {
        machine.updateState(this.orders.slice());
    }

  }
  
  private isValidState(order: string) {
    const validStates = ['snowboards', 'game consoles', 'streaming gear'];
    return validStates.includes(order);
  }
}

export class Machine {
  state: string | null = null;

  productionHistory: string[] = [];

  updateState(orders: string[]) {
    if (orders.length > 0) {
        this.state = orders[orders.length - 1];
        this.productionHistory.push(`Order #${orders.length} - ${this.state}`);

    } else {
        this.state = null;
    }
  }
  performAudit() {
    return this.productionHistory.slice();
  }
}