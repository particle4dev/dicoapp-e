const electrumServers = {
  KMD: {
    port: 10001,
    proto: 'tcp',
    txfee: 0,
    coin: 'KMD',
    serverList: ['electrum1.cipig.net', 'electrum2.cipig.net']
  },
  BTC: {
    port: 10000,
    proto: 'tcp',
    txfee: 10000,
    coin: 'BTC',
    serverList: ['electrum1.cipig.net', 'electrum2.cipig.net']
  },
  LTC: {
    coin: 'LTC',
    serverList: [
      'electrum1.cipig.net',
      'electrum2.cipig.net',
      'electrum3.cipig.net'
    ],
    port: 10065,
    proto: 'tcp',
    txfee: 0
  },
  dICOtoken: {
    coin: 'GLXT',
    serverList: ['electrum1.glx.co', 'electrum2.glx.co'],
    port: 60012,
    proto: 'tcp',
    txfee: 10000
  }
};

module.exports = electrumServers;
