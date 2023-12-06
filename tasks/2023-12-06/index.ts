export type MachineOrder = string | null;
export type MachineAuditLog = string[];

export class Machine {
    private _state: MachineOrder = null;
    private _auditLog: MachineAuditLog = [];

    constructor() {
        this._auditLog = [];
    }

    get state(): MachineOrder {
        return this._state;
    }

    set state(order: MachineOrder) {
        this._state = order;
        this._auditLog.push(`Order #${this._auditLog.length + 1} - ${order}`);
    }

    public performAudit() {
        return this._auditLog;
    }
}

export class OrderController {
    private _machines = new Set<Machine>();

    public registerMachine(machine: Machine): void {
        this._machines.add(machine);
    }

    public unregisterMachine(machine: Machine): void {
        this._machines.delete(machine);
    }

    public setState(order: MachineOrder): void {
        if (this._machines.size === 0) {
            throw new Error('Invalid state provided');
        }

        this._machines.forEach(machine => machine.state = order);
    }
}
