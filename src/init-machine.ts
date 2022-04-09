import { isAccept, isValidInput } from './helpers';
import { Machine, Input, Reject, Accept } from './typings';

export default function initMachine({
  states,
  alphabet,
  transitionFunction,
  startState,
  acceptStates,
}: Machine) {
  return function (input: Input): Reject | Accept {
    if (!isValidInput(input, alphabet)) {
      throw new Error('Invalid character(s). Not part of language alphabet.');
    }

    return isAccept(...acceptStates)(
      Array.from(input).reduce(transitionFunction(states), [startState])
    );
  };
}
