type Letter = { [key: string]: number };
type ChangeTracker = (key: string, value: number) => void;

export function createTrackedLetter(letter: Letter, cb: ChangeTracker): Letter {
  const trackedLetter = new Proxy(letter, {
    set: (target, key: string, value: number) => {
      if (target[key] !== value) {
        cb(key, value);
      }
      target[key] = value;
      return true;
    },
  });
  return trackedLetter;
}
