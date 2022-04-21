import { CFG } from './typings';

const EMPTY = '';

export default function cfg(g: CFG) {
  return function (n: number) {
    return new Array(n)
      .fill(EMPTY)
      .reduce((acc) => acc.replace(/(S|A)/, g.productionsRules), 'S')
      .replace('A', EMPTY);
  };
}
