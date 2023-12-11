import { findCyclesBetweenLocations } from './index';

test('finds cycles in location graph', () => {
  const graph = {
    'North Pole': ['London', 'New York'],
    London: ['Paris'],
    Paris: ['Berlin', 'Madrid'],
    Berlin: ['North Pole'],
    Madrid: [],
    'New York': ['North Pole'],
  };
  expect(findCyclesBetweenLocations(graph)).toEqual([
    ['North Pole', 'London', 'Paris', 'Berlin', 'North Pole'],
    ['North Pole', 'New York', 'North Pole'],
  ]);
});

test('handles a graph with no cycles between locations', () => {
  const graph = {
    'North Pole': ['London', 'New York'],
    London: ['Paris'],
    Paris: ['Berlin'],
    Berlin: [],
    Madrid: [],
    'New York': ['Madrid'],
  };
  expect(findCyclesBetweenLocations(graph)).toEqual([]);
});

test('throws an error for invalid input', () => {
  const invalidGraph = {
    'North Pole': ['London', 'New York'],
    London: ['Paris'],
    Paris: ['Berlin', 'Madrid'],
    'New York': ['North Pole'],
  };
  expect(() => findCyclesBetweenLocations(invalidGraph)).toThrow('Invalid graph: missing nodes');
});
