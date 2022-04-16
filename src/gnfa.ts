import {
  Machine,
  GNFAState,
  GNFATempState,
  Input,
  Reject,
  Accept,
} from './typings';
import { head } from './helpers';

function isAcceptState(m: Machine) {
  return function ({ s }: GNFAState) {
    return m.acceptStates.includes(s);
  };
}

function isInputCompliantWithRegExp(i: string) {
  return function ({ t }: GNFATempState) {
    return t.test(i);
  };
}

function buildState(i: Input) {
  return function ({ t, r }: GNFATempState) {
    return { s: r, i: i.slice(head(i.match(t) ?? ['']).length) };
  };
}

function transitionToNewState(m: Machine, s: string, i: Input) {
  return m.states.has(s)
    ? (m.states.get(s) as unknown as GNFATempState[])
        .filter(isInputCompliantWithRegExp(i))
        .map(buildState(i))
    : [];
}

function nextState(m: Machine) {
  return function (acc: GNFAState[], { s, i }: GNFAState) {
    return i.length && m.states.has(s)
      ? acc.concat(transitionToNewState(m, s, i))
      : acc;
  };
}

function isEmptyInput({ i }: GNFAState) {
  return !i.length;
}

export default function (m: Machine) {
  return function (input: string) {
    function gnfa(states: GNFAState[]): Accept | Reject {
      return states.every(isEmptyInput)
        ? states.some(isAcceptState(m))
        : gnfa(states.reduce(nextState(m), []));
    }
    return gnfa([{ s: m.startState, i: input }]);
  };
}
