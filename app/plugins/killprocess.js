import { execFileSync } from 'child_process';

export default function killProcess(name) {
  try {
    if (process.platform === 'win32') {
      execFileSync('taskkill', ['/f', '/im', name]);
    } else {
      execFileSync('killall', ['-9', name]);
    }
    // eslint-disable-next-line no-empty
  } catch (_) {}
}
