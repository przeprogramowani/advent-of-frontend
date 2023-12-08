// Tutaj skopiuj testy dla zadania. Uruchom je poleceniem `npm test`
import { Letter, LetterSorter, PriorityStrategy, LengthStrategy, CountryStrategy } from './index';

describe('LetterSorter', () => {

  let letters: Letter[] = [];

  beforeEach(() => {
    letters = [
      { content: 'Hi', country: 'us', priority: 'medium' },
      { content: 'Halo', country: 'de', priority: 'low' },
      { content: 'Cześć', country: 'pl', priority: 'high' }
    ];
  });

  test('should sort letters by priority', () => {
    const sorter = new LetterSorter(new PriorityStrategy());

    const sortedLetters = sorter.sortLetters(letters);
    expect(sortedLetters).toEqual([
      { content: 'Cześć', country: 'pl', priority: 'high' },
      { content: 'Hi', country: 'us', priority: 'medium' },
      { content: 'Halo', country: 'de', priority: 'low' }
    ]);
  });

  test('should sort letters by country', () => {
    const sorter = new LetterSorter(new CountryStrategy());

    const sortedLetters = sorter.sortLetters(letters);
    expect(sortedLetters).toEqual([
      { content: 'Cześć', country: 'pl', priority: 'high' },
      { content: 'Halo', country: 'de', priority: 'low' },
      { content: 'Hi', country: 'us', priority: 'medium' }
    ]);
  });

  test('should sort letters by length', () => {
    const sorter = new LetterSorter(new LengthStrategy());

    const sortedLetters = sorter.sortLetters(letters);
    expect(sortedLetters).toEqual([
      { content: 'Hi', country: 'us', priority: 'medium' },
      { content: 'Halo', country: 'de', priority: 'low' },
      { content: 'Cześć', country: 'pl', priority: 'high' },
    ]);
  });
  
});