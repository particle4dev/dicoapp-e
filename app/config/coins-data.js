module.exports = [
  {
    coin: 'KMD',
    name: 'Komodo',
    electrumServers: [
      {
        host: 'electrum1.cipig.net',
        port: 10001
      },
      {
        host: 'electrum2.cipig.net',
        port: 10001
      }
    ],
    active: 1
  },
  {
    coin: 'BTC',
    name: 'Bitcoin',
    electrumServers: [
      {
        host: 'electrum1.cipig.net',
        port: 10000
      },
      {
        host: 'electrum2.cipig.net',
        port: 10000
      }
    ],
    active: 1
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
    ],
    active: 1
  },
  {
    coin: 'LTC',
    name: 'Litecoin',
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
    ],
    active: 1
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
    ],
    active: 1
  },
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
    ],
    active: 1
  }
];
