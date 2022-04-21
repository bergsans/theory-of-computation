import { Stack } from '../src/pda';

export type Input = string;

export type Letter = string;

export type Alphabet = Set<Letter>;

export type A = Set<string>;

export type State = string;

export type NextState = Record<Letter, State[]>;

export type NextStateTable = Map<State, NextState>;

export type TransitionFunction = (
  t: NextStateTable
) => (s: State[], v: Letter) => State[];

export type Machine = {
  states: NextStateTable;
  alphabet: Alphabet;
  transitionFunction?: TransitionFunction;
  startState: State;
  acceptStates: State[];
};

export type Reject = false;

export type Accept = true;

export type GNFATempState = { t: RegExp; r: State };

export type GNFAState = {
  s: State;
  i: Input;
};

export type FSTTransition = Record<string, [string, string]>;

export type FST = Map<string, FSTTransition>;

export type FSTMachine = {
  m: FST;
  startState: Letter;
};

export type NPDAState = Map<
  string,
  Record<string, { nextState: string; cmd: [string, string] }>
>;

export type NPDA = {
  states: NPDAState;
  alphabet: Alphabet;
  stack: Stack;
  transitionFunction?: undefined;
  startState: State;
  acceptStates: State[];
};
