// @flow
import getConfig from '../config';
import type { StateType } from './schema';

const config = getConfig();

export default function loginFactory(
  state: StateType,
  paths: Object = config.get('paths')
) {
  return {
    login(passphrase: string) {
      const serverparams = {
        userpass:
          '1d8b27b21efabcd96571cd56f91a40fb9aa4cc623d273c63bf9223dc6f8cd81f',
        userhome: paths.homeDir,
        method: 'passphrase',
        passphrase,
        gui: 'dICOapp-cm'
        // netid:
        // seednode:
      };
      return this.publicCall(serverparams).then(data => {
        // save userpass
        this.setUserpass(data.userpass);
        return data;
      });
    }
  };
}
