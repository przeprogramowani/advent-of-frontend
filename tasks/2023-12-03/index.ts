export type MapaCzasoprzestrzenna = (x: number, y: number, z: number, czas: number) => number;

export interface Lokalizacja {
    x: number;
    y: number;
    z: number;
    czas: number;
}

export function znajdzWorek(lokalizacje: Lokalizacja[], mapa: MapaCzasoprzestrzenna): Lokalizacja | null {
    return lokalizacje.reduce<Lokalizacja | null>((obecnaLokalizacja, lokalizacja) => {
        if (obecnaLokalizacja === null) {
            return lokalizacja;
        }
        
        const mapaCzasoprzestrzennaLokalizacja = mapa(lokalizacja.x, lokalizacja.y, lokalizacja.z, lokalizacja.czas);
        const mapaCzasoprzestrzennaWynik =
            mapa(obecnaLokalizacja.x, obecnaLokalizacja.y, obecnaLokalizacja.z, obecnaLokalizacja.czas);

        if (isNaN(mapaCzasoprzestrzennaLokalizacja) || isNaN(mapaCzasoprzestrzennaWynik)) {
            return null;
        }
        
        return mapaCzasoprzestrzennaLokalizacja > mapaCzasoprzestrzennaWynik
            ? lokalizacja
            : obecnaLokalizacja;
    }, null);
}