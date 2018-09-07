const coinsdata = require('./coins-data');
const { tokenconfig } = require('../config/tokenconfig');

const coins = coinsdata.concat([tokenconfig]);
const symbolToName = coins.reduce((acc, cur) => {
  acc[cur.coin] = cur.name;
  return acc;
}, {});

module.exports = {
  symbolToName
};
