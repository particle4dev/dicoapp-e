import { remote } from 'electron';

const symbol = remote.require('./config/symbol');

// eslint-disable-next-line import/prefer-default-export
export function covertSymbolToName(syl) {
  const s = symbol.symbolToName[syl];
  if (s) return s;
  return '';
}
