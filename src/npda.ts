import { isValidInput } from './helpers';
import { NPDA, NPDAState, State, Reject, Accept } from './typings';

export class Stack {
  #stack: string[] = [];

  public op(cmd: string, payload: string) {
    switch (cmd) {
      case 'PUSH':
        this.#push(payload);
        break;
      case 'POP':
        this.#pop();
        break;
      default:
        throw new Error(`Unknown command: ${cmd}`);
    }
  }

  #push(input: string) {
    this.#stack.push(input);
  }

  #pop() {
    this.#stack.pop();
  }

  public introspect() {
    console.log(JSON.stringify(this.#stack, null, 2));
  }

  public isAccept() {
    return !this.#stack.length;
  }
}

function isAccept(...acceptingStates: State[]) {
  return function (s: State, stack: Stack): Reject | Accept {
    return acceptingStates.includes(s) || stack.isAccept();
  };
}

function buildPossibilities(states: NPDAState, stack: Stack) {
  return function (currentState: string, x: string): string {
    if (states.has(currentState)) {
      const possibilities = states.get(currentState);
      if (!possibilities || !(x in possibilities)) {
        throw new Error('Error parsing possibilities.');
      }
      const { nextState, cmd } =
        'E' in possibilities ? possibilities.E : possibilities[x];
      stack.op(...cmd);
      return nextState;
    }
    return currentState;
  };
}

export function initNPda({
  alphabet,
  states,
  startState,
  acceptStates,
  stack,
}: NPDA) {
  return function (input: string): Accept | Reject {
    if (!isValidInput(input, alphabet)) {
      throw new Error('Invalid character(s). Not part of language alphabet.');
    }
    if (!states) {
      throw new Error('Invalid language.');
    }

    const initialPosibilities = states.get(startState);
    const empty = initialPosibilities!.E;
    stack.op(...empty.cmd);
    const state = Array.from(input).reduce(
      buildPossibilities(states, stack),
      empty.nextState
    );
    return isAccept(...acceptStates)(state, stack);
  };
}
