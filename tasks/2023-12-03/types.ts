export type Lokalizacja = {
  x: number;
  y: number;
  z: number;
  czas: number;
};

export type MapaCzasoprzestrzenna = (
  x: number,
  y: number,
  z: number,
  czas: number
) => number;
