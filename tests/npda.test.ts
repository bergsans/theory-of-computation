import { describe, expect } from '@jest/globals';
import { InputOutput } from '../src/test-utils';
import { initNPda, Stack } from '../src/npda';

describe('Parses reject/accept', () => {
  const m1NextStateTable = new Map()
    .set('q1', {
      E: {
        nextState: 'q2',
        cmd: ['PUSH', '$'],
      },
    })
    .set('q2', {
      '0': {
        nextState: 'q2',
        cmd: ['PUSH', '0'],
      },
      '1': {
        nextState: 'q3',
        cmd: ['POP', '0'],
      },
    })
    .set('q3', {
      '1': {
        nextState: 'q3',
        cmd: ['POP', '0'],
      },
      E: {
        nextState: 'q4',
        cmd: ['POP', '$'],
      },
    });

  const m1 = {
    startState: 'q1',
    states: m1NextStateTable,
    stack: new Stack(),
    acceptStates: ['q4'],
    alphabet: new Set('01'),
  };
  const sequences: InputOutput[] = [['000111', true]];
  for (const [input, output] of sequences) {
    const runMachine = initNPda(m1);
    test(`${input} is ${output ? 'accepted' : 'rejected'}`, () =>
      expect(runMachine(input)).toEqual(output));
  }
});
