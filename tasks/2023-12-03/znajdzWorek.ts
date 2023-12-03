import { areAllNumbersPositive } from "./helpers";
import { Lokalizacja, MapaCzasoprzestrzenna } from "./types";

export function znajdzWorek(
  lokalizacje: Lokalizacja[],
  mapa: MapaCzasoprzestrzenna
): Lokalizacja | null {
  if (!lokalizacje.length || !mapa) return null;
  let res: Lokalizacja | null = null;

  lokalizacje.forEach((loc) => {
    if (!areAllNumbersPositive(Object.values(loc))) {
      return null;
    }

    const { x, y, z, czas } = loc;
    if (!res) res = loc;
    else {
      const locResult = mapa(x, y, z, czas);
      const currentHighestLoc = mapa(res.x, res.y, res.z, res.czas);
      if (locResult > currentHighestLoc) res = loc;
    }
  });

  return res;
}
