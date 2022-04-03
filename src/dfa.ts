import { head } from './helpers';
import { Letter, NextStateTable, State } from './typings';

export function dfaNextState(t: NextStateTable) {
  return function (s: State[], currentInput: Letter) {
    return t.get(head(s))?.[currentInput] as State[];
  };
}
