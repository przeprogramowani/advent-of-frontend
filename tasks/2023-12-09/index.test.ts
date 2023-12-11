import { Equipment } from './index';

describe('Equipment Tests', () => {
  test('Equipment initializes, updates, and disposes tools correctly', () => {
    const eq = new Equipment();
    const mockTool = { init: jest.fn(), update: jest.fn(), dispose: jest.fn() };
    eq.registerTools(mockTool);
    eq.initializeTools();
    eq.updateTools();
    eq.disposeTools();

    expect(mockTool.init).toHaveBeenCalledTimes(1);
    expect(mockTool.update).toHaveBeenCalledTimes(1);
    expect(mockTool.dispose).toHaveBeenCalledTimes(1);
  });

  test('Equipment handles multiple tools independently', () => {
    const eq = new Equipment();
    const mockToolA = { init: jest.fn(), update: jest.fn(), dispose: jest.fn() };
    const mockToolB = { init: jest.fn(), update: jest.fn(), dispose: jest.fn() };
    eq.registerTools(mockToolA);
    eq.registerTools(mockToolB);
    eq.initializeTools();
    eq.disposeTools();

    expect(mockToolA.init).toHaveBeenCalledTimes(1);
    expect(mockToolB.init).toHaveBeenCalledTimes(1);
    expect(mockToolA.dispose).toHaveBeenCalledTimes(1);
    expect(mockToolB.dispose).toHaveBeenCalledTimes(1);
    expect(mockToolA.update).not.toHaveBeenCalled();
    expect(mockToolB.update).not.toHaveBeenCalled();
  });

  test('Equipment throws an error when trying to update before initialization', () => {
    const eq = new Equipment();
    const mockTool = { init: jest.fn(), update: jest.fn(), dispose: jest.fn() };
    eq.registerTools(mockTool);

    expect(() => eq.updateTools()).toThrow('Cannot update any tools before initialization.');
  });
});
