import { describe, expect } from '@jest/globals';
import { InputOutput } from '../src/test-utils';
import runMachine from '../src/run-machine';
import { nfaNextState } from '../src/nfa';
import { Machine } from '../src/typings';

const nextStateTable = new Map()
  .set('q1', { '0': ['q1', 'q2'] })
  .set('q2', { '1': ['q1', 'q3'] })
  .set('q3', { '0': ['q4'] });

const m1: Machine = {
  acceptStates: ['q3', 'q4'],
  alphabet: ['0', '1'],
  startState: 'q1',
  states: nextStateTable,
  transitionFunction: nfaNextState,
};

describe('Parses reject/accept', () => {
  const sequences: InputOutput[] = [
    ['01', true],
    ['010', true],
    ['001', true],
    ['00', false],
    ['011', false],
  ];
  for (const [input, output] of sequences) {
    test(`${input} is ${output ? 'accepted' : 'rejected'}`, () =>
      expect(runMachine(input, m1)).toEqual(output));
  }
});
