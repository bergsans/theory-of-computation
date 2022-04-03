import { isAccept, isValidInput } from './helpers';
import { Machine, Input, Reject, Accept } from './typings';

export default function runMachine(
  input: Input,
  { states, alphabet, transitionFunction, startState, acceptStates }: Machine
): Reject | Accept {
  if (!isValidInput(input, alphabet)) {
    throw new Error('Invalid characters. Not part of language alphabet.');
  }

  return isAccept(...acceptStates)(
    Array.from(input).reduce(transitionFunction(states), [startState])
  );
}
