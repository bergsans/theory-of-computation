import { FSTMachine } from './typings';

export default function ({ m, startState }: FSTMachine) {
  return function (inputStream: string) {
    const [output] = Array.from(inputStream).reduce(
      (
        [accOutput, state]: [string, string],
        input: string
      ): [string, string] => {
        const [stateOutputs, nextState] = m.get(state)![input];
        return [accOutput + stateOutputs, nextState];
      },
      ['', startState]
    );
    return output;
  };
}
