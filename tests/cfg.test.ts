import { describe, expect } from '@jest/globals';
import initCfg from '../src/cfg';

describe('Parses reject/accept', () => {
  const g = {
    //V: new Set('SA'),
    //E: new Set('ab'),
    //S: 'S',
    productionsRules: 'aAb',
  };
  const sequences: [number, string][] = [[4, 'aaaabbbb']];
  for (const [generations, output] of sequences) {
    const runMachine = initCfg(g);
    test(`Generations: ${generations} is ${output}`, () => {
      const result = runMachine(generations);
      expect(result).toEqual(output);
    });
  }
});
