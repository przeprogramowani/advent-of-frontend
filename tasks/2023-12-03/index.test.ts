import { Lokalizacja, MapaCzasoprzestrzenna, znajdzWorek } from './index';

describe('znajdzWorek', () => {
  test('powinien zwrócić lokalizację z najwyższą wartością mapy', () => {
    const lokalizacje: Lokalizacja[] = [
      { x: 1, y: 2, z: 3, czas: 4 },
      { x: 5, y: 6, z: 7, czas: 8 },
      { x: 9, y: 10, z: 11, czas: 12 },
    ];
    const mapa: MapaCzasoprzestrzenna = (x, y, z, czas) => x + y + z + czas;
    const wynik = znajdzWorek(lokalizacje, mapa);
    expect(wynik).toEqual({ x: 9, y: 10, z: 11, czas: 12 });
  });

  test('powinien zwrócić null, gdy lista lokalizacji jest pusta', () => {
    const lokalizacje: Lokalizacja[] = [];
    const mapa: MapaCzasoprzestrzenna = jest.fn();
    const wynik = znajdzWorek(lokalizacje, mapa);
    expect(wynik).toBeNull();
  });

  test('powinien obsłużyć wartości niepoprawne matematycznie', () => {
    const lokalizacje: Lokalizacja[] = [
      { x: -1, y: -2, z: -3, czas: -4 },
      { x: 0, y: 0, z: 0, czas: 0 },
    ];
    const mapa: MapaCzasoprzestrzenna = () => NaN;
    const wynik = znajdzWorek(lokalizacje, mapa);
    expect(wynik).toBeNull();
  });
});