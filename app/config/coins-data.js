module.exports = [
  {
    coin: 'KMD',
    electrumServers: [
      {
        host: 'electrum1.cipig.net',
        port: 10001
      },
      {
        host: 'electrum2.cipig.net',
        port: 10001
      }
    ]
  },
  {
    coin: 'BTC',
    electrumServers: [
      {
        host: 'electrum1.cipig.net',
        port: 10000
      },
      {
        host: 'electrum2.cipig.net',
        port: 10000
      }
    ]
  },
  {
    coin: 'EQL',
    name: 'Equaliser',
    asset: 'EQL',
    rpcport: 10306,
    electrumServers: [
      {
        host: '159.65.91.235',
        port: 10801
      },
      {
        host: '167.99.204.42',
        port: 10801
      }
    ]
  },
  {
    coin: 'LTC',
    rpcport: 9332,
    pubtype: 48,
    p2shtype: 5,
    wiftype: 176,
    txfee: 100000,
    electrumServers: [
      {
        host: 'electrum1.cipig.net',
        port: 10065
      },
      {
        host: 'electrum2.cipig.net',
        port: 10065
      }
    ]
  },
  {
    coin: 'BEER',
    name: 'Beer',
    asset: 'BEER',
    rpcport: 8923,
    electrumServers: [
      {
        host: 'electrum1.cipig.net',
        port: 10022
      },
      {
        host: 'electrum2.cipig.net',
        port: 10022
      }
    ]
  },
  {
    coin: 'PIZZA',
    name: 'Pizza',
    asset: 'PIZZA',
    rpcport: 11116,
    electrumServers: [
      {
        host: 'electrum1.cipig.net',
        port: 10024
      },
      {
        host: 'electrum2.cipig.net',
        port: 10024
      }
    ]
  },
  // {
  //   coin: 'GLXT',
  //   name: 'GLX Token',
  //   asset: 'GLXT',
  //   rpcport: 13109,
  //   electrumServers: [
  //     {
  //       host: 'electrum1.glx.co',
  //       port: 60012
  //     },
  //     {
  //       host: 'electrum2.glx.co',
  //       port: 60012
  //     }
  //   ]
  // },
  {
    coin: 'COQUI',
    name: 'Coqui Cash',
    asset: 'COQUI',
    rpcport: 14276,
    electrumServers: [
      {
        host: 'electrum1.cipig.net',
        port: 10011
      },
      {
        host: 'electrum2.cipig.net',
        port: 10011
      }
    ]
  }
];
