type Letter = { [key: string]: number };
type ChangeTrackerFn = (key: string, value: number) => void;

export function createTrackedLetter(letter: Letter, changeTracker: ChangeTrackerFn): Letter {
  return new Proxy(letter, {
    set(target: Letter, property: string, newValue: number): boolean {
        changeTracker(property, newValue);
        target[property] = newValue;
        return true;
    }
  });
}
