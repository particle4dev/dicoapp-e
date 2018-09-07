const tokenconfig = {
  coin: 'CHIPS',
  name: 'Chips',
  rpcport: 57776,
  pubtype: 60,
  p2shtype: 85,
  wiftype: 188,
  txfee: 10000,
  electrumServers: [
    {
      host: 'electrum1.cipig.net',
      port: 10053
    },
    {
      host: 'electrum2.cipig.net',
      port: 10053
    }
  ],
  active: 1
};

const electrum = [
  {
    method: 'electrum',
    coin: 'CHIPS',
    ipaddr: 'electrum2.cipig.net',
    port: 10053
  },
  {
    method: 'electrum',
    coin: 'CHIPS',
    ipaddr: 'electrum2.cipig.net',
    port: 10053
  }
];

module.exports = {
  tokenconfig,
  electrum
};
