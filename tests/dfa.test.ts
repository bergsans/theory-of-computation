import { describe, expect } from '@jest/globals';
import { InputOutput, propGeneration } from '../src/test-utils';
import { dfaNextState } from '../src/dfa';
import { NaDFAState, Machine } from '../src/typings';
import runMachine from '../src/run-machine';

const m1transitions = new Map()
  .set('q1', { '0': ['q1'], '1': ['q2'] })
  .set('q2', { '0': ['q1'], '1': ['q3'] })
  .set('q3', { '0': ['q3'], '1': ['q3'] });

const m1: Machine<NaDFAState> = {
  acceptingStates: ['q3'],
  alphabet: ['0', '1'],
  initialState: 'q1',
  transitions: m1transitions,
  nextState: dfaNextState,
};

describe('Parses reject/accept', () => {
  const sequences: InputOutput[] = [
    ['1001100', true],
    ['10110110', true],
    ['101101110', true],
    ['', false],
    ['100100', false],
    ['1001010', false],
    ...propGeneration(5),
  ];
  for (const [input, output] of sequences) {
    test(`${input} is ${output ? 'accepted' : 'rejected'}`, () =>
      expect(runMachine(input, m1)).toEqual(output));
  }
});
