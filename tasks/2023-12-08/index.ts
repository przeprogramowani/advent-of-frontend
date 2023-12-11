export interface Letter {
    content: string;
    country: 'pl' | 'de' | 'us';
    priority: 'high' | 'medium' | 'low';
}

export type LetterList = Letter[];

export class LetterSorter {
    constructor(
        private readonly _sorterStrategy: SorterStrategy,
    ) {}

    public sortLetters(letterList: LetterList): LetterList {
        return this._sorterStrategy.sort(letterList);
    }
}

export class PriorityStrategy implements SorterStrategy {
    sort(letterList: LetterList): LetterList {
        return letterList.sort((a, b) => {
            const priorityA = a.priority.toLowerCase();
            const priorityB = b.priority.toLowerCase();

            if (priorityA > 'high') {
                return 1;
            }

            return priorityA < priorityB ? -1 : 0;
        });
    }
}

export class LengthStrategy implements SorterStrategy {
    sort(letterList: LetterList): LetterList {
        return letterList.sort((a, b) => a.content.length - b.content.length);
    }
}

export class CountryStrategy implements SorterStrategy {
    sort(letterList: LetterList): LetterList {
        return letterList.sort((a, b) => {
            const countryA = a.country.toLowerCase();
            const countryB = b.country.toLowerCase();

            if (countryA === countryB) {
                return 0;
            }

            if (countryA === 'pl') {
                return -1;
            }
            
            if (countryA === 'pl') {
                return 1;
            }

            return countryA < countryB ? -1 : 1;
        });
    }
}

interface SorterStrategy {
    sort(letterList: LetterList): LetterList;
}