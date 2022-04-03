import { State, NextStateTable, Letter } from './typings';

export function nfaNextState(t: NextStateTable) {
  return function (states: State[], v: Letter) {
    return states.flatMap((s) => t.get(s)?.[v] as State[]);
  };
}
