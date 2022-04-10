import { describe, expect } from '@jest/globals';
import { InputOutput } from '../src/test-utils';
import { dfaNextState } from '../src/dfa';
import { NextStateTable, Machine } from '../src/typings';
import initMachine from '../src/init-machine';

describe('Parses reject/accept', () => {
  describe(`m1: even number of inputted 1's is an accepted state`, () => {
    const m1NextStateTable: NextStateTable = new Map()
      .set('q1', { '1': ['q2'] })
      .set('q2', { '1': ['q1'] });
    const m1: Machine = {
      acceptStates: ['q1'],
      alphabet: new Set('1'),
      startState: 'q1',
      states: m1NextStateTable,
      transitionFunction: dfaNextState,
    };
    const sequences: InputOutput[] = [
      ['', true],
      ['1', false],
      ['11', true],
      ['111', false],
      ['1111', true],
      ['11111', false],
    ];
    for (const [input, output] of sequences) {
      const runMachine = initMachine(m1);
      test(`${input} is ${output ? 'accepted' : 'rejected'}`, () =>
        expect(runMachine(input)).toEqual(output));
    }
  });

  describe(`m2: even number of 1's is an accepted state`, () => {
    const m2NextStateTable: NextStateTable = new Map()
      .set('q1', { '0': ['q1'], '1': ['q2'] })
      .set('q2', { '0': ['q2'], '1': ['q3'] })
      .set('q3', { '0': ['q3'], '1': ['q2'] });
    const m2: Machine = {
      acceptStates: ['q3'],
      alphabet: new Set('01'),
      startState: 'q1',
      states: m2NextStateTable,
      transitionFunction: dfaNextState,
    };
    const sequences: InputOutput[] = [
      ['', false],
      ['100', false],
      ['11', true],
      ['010011', false],
      ['010111', true],
      ['1111', true],
      ['11111', false],
    ];
    for (const [input, output] of sequences) {
      const runMachine = initMachine(m2);
      test(`${input} is ${output ? 'accepted' : 'rejected'}`, () =>
        expect(runMachine(input)).toEqual(output));
    }
  });

  describe(`m3: (n) is even is an accepted state`, () => {
    const m3NextStateTable: NextStateTable = new Map()
      .set('q1', {
        '0': ['q2'],
        '1': ['q1'],
        '2': ['q2'],
        '3': ['q1'],
        '4': ['q2'],
        '5': ['q1'],
        '6': ['q2'],
        '7': ['q1'],
        '8': ['q2'],
        '9': ['q1'],
      })
      .set('q2', {
        '0': ['q2'],
        '1': ['q1'],
        '2': ['q2'],
        '3': ['q1'],
        '4': ['q2'],
        '5': ['q1'],
        '6': ['q2'],
        '7': ['q1'],
        '8': ['q2'],
        '9': ['q1'],
      });
    const m3: Machine = {
      acceptStates: ['q2'],
      alphabet: new Set('0123456789'),
      startState: 'q1',
      states: m3NextStateTable,
      transitionFunction: dfaNextState,
    };
    const sequences: InputOutput[] = [
      ['', false],
      ['100', true],
      ['11', false],
      ['123', false],
      ['1234', true],
      ['45', false],
      ['46', true],
      ['7777', false],
      ['7878', true],
      ['99909', false],
    ];
    for (const [input, output] of sequences) {
      const runMachine = initMachine(m3);
      test(`${input} is ${output ? 'accepted' : 'rejected'}`, () =>
        expect(runMachine(input)).toEqual(output));
    }
  });
});
