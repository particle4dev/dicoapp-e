import { remote } from 'electron';

const symbol = remote.require('./config/symbol');

// eslint-disable-next-line import/prefer-default-export
export function covertSymbolToName(syl) {
  const s = symbol.symbolToName[syl];
  if (s) return s;
  return '';
}

export function floor(number, after = 1) {
  // eslint-disable-next-line no-restricted-properties
  const p = Math.pow(10, after);
  return Math.floor(number * p) / p;
}
