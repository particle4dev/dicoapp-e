module.exports = [
  { coin: 'EQL', asset: 'EQL', rpcport: 10306 },
  {
    coin: 'LTC',
    name: 'litecoin',
    rpcport: 9332,
    pubtype: 48,
    p2shtype: 5,
    wiftype: 176,
    txfee: 100000
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
  }
];
