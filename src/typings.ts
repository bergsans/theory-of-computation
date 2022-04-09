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
  transitionFunction: TransitionFunction;
  startState: State;
  acceptStates: State[];
};

export type Reject = false;

export type Accept = true;
