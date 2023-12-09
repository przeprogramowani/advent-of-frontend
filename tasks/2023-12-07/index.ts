// Tutaj skopiuj kod zadania
// This implementation will be based on Proxy pattern

type Letter = { [key: string]: number };
type Tracker = (gift: string, amount: number) => void;
export function createTrackedLetter(letter: Letter, tracker: Tracker): Letter {
  const letterProxy = new Proxy(letter, {
    set: (obj: Letter, prop: string, value: number) => {
      tracker(prop, value);
      obj[prop] = value;
      return true;
    }
  });
  return letterProxy as Letter;
}
