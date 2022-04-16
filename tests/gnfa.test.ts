import { describe, expect } from '@jest/globals';
import { InputOutput } from '../src/test-utils';
import initGnfa from '../src/gnfa';
import { Machine } from '../src/typings';

const ts = new Map()
  .set('q1', [
    { t: /^a/, r: 'q1' },
    { t: /^a+b+/, r: 'q2' },
    { t: /^ab/, r: 'q3' },
  ])
  .set('q2', [
    { t: /^ab/, r: 'q2' },
    { t: /^aab/, r: 'q3' },
    { t: /^b/, r: 'q1' },
  ])
  .set('q3', []);

const m1: Machine = {
  startState: 'q1',
  acceptStates: ['q2', 'q3'],
  alphabet: new Set('ab'),
  states: ts,
};

describe('Parses reject/accept', () => {
  const sequences: InputOutput[] = [
    ['aaaabb', false],
    ['ab', false],
    ['abaab', true],
    ['aaaaaaa', false],
    ['a', false],
  ];
  const runM1 = initGnfa(m1);
  for (const [input, output] of sequences) {
    test(`${input} is ${output ? 'accepted' : 'rejected'}`, () =>
      expect(runM1(input)).toEqual(output));
  }
});
