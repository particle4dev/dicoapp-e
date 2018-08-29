module.exports = {
  config: {
    barterdex: 'http://127.0.0.1:7783'
  },
  APPNAME: 'dicoapp',
  minWindowSize: {
    width: 1060,
    height: process.platform === 'darwin' ? 600 : 650
  },
  loginWindowSize: {
    width: 680,
    height: process.platform === 'darwin' ? 500 : 550
  }
};
