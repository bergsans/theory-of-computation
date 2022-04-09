import { describe, expect } from '@jest/globals';
import { InputOutput } from '../src/test-utils';
import { dfaNextState } from '../src/dfa';
import { NextStateTable, Machine } from '../src/typings';
import initMachine from '../src/init-machine';

const nextStateTable: NextStateTable = new Map()
  .set('q1', { '0': ['q1'], '1': ['q2'] })
  .set('q2', { '0': ['q1'], '1': ['q3'] })
  .set('q3', { '0': ['q3'], '1': ['q3'] });

const m1: Machine = {
  acceptStates: ['q3'],
  alphabet: new Set('01'),
  startState: 'q1',
  states: nextStateTable,
  transitionFunction: dfaNextState,
};

describe('Parses reject/accept', () => {
  const sequences: InputOutput[] = [
    ['1001100', true],
    ['10110110', true],
    ['101101110', true],
    ['', false],
    ['100100', false],
    ['1001010', false],
  ];
  for (const [input, output] of sequences) {
    const runMachine = initMachine(m1);
    test(`${input} is ${output ? 'accepted' : 'rejected'}`, () =>
      expect(runMachine(input)).toEqual(output));
  }
});
