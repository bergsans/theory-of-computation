import { Reject, Accept, Alphabet, State, Input } from './typings';

export function isValidInput(s: Input, alphabet: Alphabet) {
  return !s.length || new RegExp(`^[${alphabet.join('')}]+$`, 'g').test(s);
}

function isValidEndState(acceptingStates: State[]) {
  return function (x: Input) {
    return acceptingStates.includes(x);
  };
}

export function isAccept(...acceptingStates: State[]) {
  return function (s: State[]): Reject | Accept {
    return s.some(isValidEndState(acceptingStates));
  };
}

export function head<T>(list: T[]) {
  return list[0];
}
