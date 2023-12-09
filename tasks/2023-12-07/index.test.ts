// Tutaj skopiuj testy dla zadania. Uruchom je poleceniem `npm test`
import { createTrackedLetter } from './index';

describe('Letter Tracker', () => {
  test('should create tracked letter correctly', () => {
    const letter: { [key:string]: number } = {};
    const changeTracker = jest.fn();
    const trackedLetter = createTrackedLetter(letter, changeTracker);
    
    trackedLetter.snowboards = 2;
    expect(changeTracker).toHaveBeenCalledWith('snowboards', 2);

    trackedLetter.snowboards = 0;
    expect(changeTracker).toHaveBeenCalledWith('snowboards', 0);
  });

  test('should avoid tracking stable items', () => {
    const letter = { snowboards: 5, consoles: 7 };
    const changeTracker = jest.fn();
    const trackedLetter = createTrackedLetter(letter, changeTracker);
    trackedLetter.snowboards = 10;

    expect(changeTracker).toHaveBeenCalledTimes(1);
    expect(changeTracker).not.toHaveBeenCalledWith('consoles', 7);
  });
});
