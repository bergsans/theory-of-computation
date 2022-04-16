import { describe, expect } from '@jest/globals';
import { InputOutputFst } from '../src/test-utils';
import initFst from '../src/fst';
import { FST } from '../src/typings';

describe('Parses reject/accept', () => {
  const m1: FST = new Map()
    .set('q1', {
      '0': ['0', 'q1'],
      '1': ['0', 'q1'],
      '2': ['1', 'q2'],
    })
    .set('q2', {
      '0': ['0', 'q1'],
      '1': ['1', 'q1'],
      '2': ['1', 'q2'],
    });
  const sequences: InputOutputFst[] = [['2212011', '1111000']];
  for (const [input, output] of sequences) {
    const runMachine = initFst(m1);
    test(`${input} is ${output ? 'accepted' : 'rejected'}`, () =>
      expect(runMachine(input)).toEqual(output));
  }
});
