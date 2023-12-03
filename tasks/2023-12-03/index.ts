// Tutaj skopiuj kod zadania
export type Lokalizacja = {
    x: number,
    y: number,
    z: number,
    czas: number
}

export type MapaCzasoprzestrzenna = (x: number, y: number, z: number, czas: number) => number;

export function znajdzWorek(lokalizacje: Lokalizacja[], mapa: MapaCzasoprzestrzenna): Lokalizacja | null {
    if(!lokalizacje.length || !validtyOfCoordinates(lokalizacje)) return null;
    return lokalizacje.reduce((poprzedniaLokalizacja: Lokalizacja, obecnaLokalizacja: Lokalizacja) => {
        const prev = mapa(poprzedniaLokalizacja.x,poprzedniaLokalizacja.y, poprzedniaLokalizacja.z, poprzedniaLokalizacja.czas);
        const curr = mapa(obecnaLokalizacja.x, obecnaLokalizacja.y, obecnaLokalizacja.z, obecnaLokalizacja.czas);
        return prev > curr ? poprzedniaLokalizacja : obecnaLokalizacja
    }, lokalizacje[0]);
}

const validtyOfCoordinates = (locations: Lokalizacja[]): boolean => {
    return locations.some(({x, y, z, czas}) => {
        return x > 0 && y > 0 && z > 0 && czas > 0;
    })
}