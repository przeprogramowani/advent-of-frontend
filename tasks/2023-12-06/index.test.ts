import { OrderController, Machine } from './index';

describe('OrderController', () => {
  it('should notify all machines when orders change', () => {
    const controller = new OrderController();
    const machineA = new Machine();
    const machineB = new Machine();

    controller.registerMachine(machineA);
    controller.registerMachine(machineB);
    controller.setState('snowboards');

    expect(machineA.state).toBe('snowboards');
    expect(machineB.state).toBe('snowboards');

    controller.setState('game consoles');
    expect(machineA.state).toBe('game consoles');
    expect(machineB.state).toBe('game consoles');
  });

  it('should not notify machines after they have been unregistered', () => {
    const controller = new OrderController();
    const machineA = new Machine();
    const machineB = new Machine();

    controller.registerMachine(machineA);
    controller.registerMachine(machineB);
    controller.unregisterMachine(machineB);
    controller.setState('game consoles');

    expect(machineA.state).toBe('game consoles');
    expect(machineB.state).toBe(null);
  });

  it('should support machine auditing', () => {
    const controller = new OrderController();
    const machineA = new Machine();

    controller.registerMachine(machineA);
    controller.setState('snowboards');
    controller.setState('game consoles');
    controller.setState('streaming gear');

    const audit = machineA.performAudit();
    expect(audit).toStrictEqual<string[]>([
      'Order #1 - snowboards',
      'Order #2 - game consoles',
      'Order #3 - streaming gear'
    ]);
  });

  it('should throw an error if an invalid state is provided', () => {
    const controller = new OrderController();

    expect(() => {
      controller.setState('unknown');
    }).toThrow('Invalid state provided');
  });
});
