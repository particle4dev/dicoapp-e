// const tokenconfig = {
//   coin: 'CHIPS',
//   name: 'Chips',
//   rpcport: 57776,
//   pubtype: 60,
//   p2shtype: 85,
//   wiftype: 188,
//   txfee: 10000,
//   electrumServers: [
//     {
//       host: 'electrum1.cipig.net',
//       port: 10053
//     },
//     {
//       host: 'electrum2.cipig.net',
//       port: 10053
//     }
//   ],
//   active: 1
// };

// const electrum = [
//   {
//     method: 'electrum',
//     coin: 'CHIPS',
//     ipaddr: 'electrum2.cipig.net',
//     port: 10053
//   },
//   {
//     method: 'electrum',
//     coin: 'CHIPS',
//     ipaddr: 'electrum2.cipig.net',
//     port: 10053
//   }
// ];

// const tokenconfig = {
//   coin: 'BEER',
//   name: 'Beer',
//   asset: 'BEER',
//   rpcport: 8923,
//   electrumServers: [
//     {
//       host: 'electrum1.cipig.net',
//       port: 10022
//     },
//     {
//       host: 'electrum2.cipig.net',
//       port: 10022
//     }
//   ],
//   active: 1
// };

// const electrum = [
//   {
//     method: 'electrum',
//     coin: 'BEER',
//     ipaddr: 'electrum1.cipig.net',
//     port: 10022
//   },
//   {
//     method: 'electrum',
//     coin: 'BEER',
//     ipaddr: 'electrum2.cipig.net',
//     port: 10022
//   }
// ];

const tokenconfig = {
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
};

const electrum = [
  {
    method: 'electrum',
    coin: 'COQUI',
    ipaddr: 'electrum1.cipig.net',
    port: 10011
  },
  {
    method: 'electrum',
    coin: 'COQUI',
    ipaddr: 'electrum2.cipig.net',
    port: 10011
  }
];

module.exports = {
  tokenconfig,
  electrum
};
