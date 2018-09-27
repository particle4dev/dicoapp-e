const uuid = '89a2cc8d5c071b2b5e28c949573cc2ecd02dc912842e46c9f3e0326ecb739ca3';
const requestid = 3769478507;
const quoteid = 1873669175;
const bob = 'COQUI';
const alice = 'BEER';

export const WEBSOCKET_STATE_ZERO = {
  id: 3624682363,
  uuid,
  requestid,
  quoteid,
  expiration: 1536603425,
  bob,
  alice,
  bobamount: 1.99009001,
  aliceamount: 0.96320716,
  sentflags: [],
  status: 'pending'
};

export const WEBSOCKET_STATE_ONE = {
  queueid: 0,
  result: {
    name: 'myfee',
    coin: 'BEER',
    tx:
      '01000000019eb64873b7ea5c4e979933f9f77b12f9bcadcd7bc21237295fc77c5eae5b912d010000006b483045022100fd5711b3a2a856f0305f64d72381b65aa1b3c9a9f094b3b10d8592dab3a87d4b0220153bbfdb45761d29ee709f4e5b5b37b597a9bfff3692f4071c9f305d9c6f002c012102471f64357636038d6db76677369f3995bbaf4531bf39a919286ca36f1a680002ffffffff027be80300000000001976a914ca1e04745e8ca0c60d8c5881531d51bec470743f88ac81b58e00000000001976a914b1cc1a6fe678e98fda7572a76679363dcfad6a8f88acc6789f5b',
    txid: '7961c99b79d6660985cf135eb1994d17a4098f0fd9ceeade3f5e6c50d02d6c19',
    expiration: 1537193397,
    uuid,
    iambob: 0,
    bobcoin: 'COQUI',
    alicecoin: 'BEER',
    lock: 0,
    amount: 0.00256124,
    Apayment: 'bbPKza8nSAPSz467cwmqX2sDkPShK7yhyf',
    method: 'update',
    update: 'myfee',
    requestid,
    quoteid
  }
};

export const WEBSOCKET_STATE_TWO = {
  queueid: 0,
  result: {
    name: 'myfee',
    coin: 'BEER',
    tx:
      '01000000019eb64873b7ea5c4e979933f9f77b12f9bcadcd7bc21237295fc77c5eae5b912d010000006b483045022100fd5711b3a2a856f0305f64d72381b65aa1b3c9a9f094b3b10d8592dab3a87d4b0220153bbfdb45761d29ee709f4e5b5b37b597a9bfff3692f4071c9f305d9c6f002c012102471f64357636038d6db76677369f3995bbaf4531bf39a919286ca36f1a680002ffffffff027be80300000000001976a914ca1e04745e8ca0c60d8c5881531d51bec470743f88ac81b58e00000000001976a914b1cc1a6fe678e98fda7572a76679363dcfad6a8f88acc6789f5b',
    txid: '7961c99b79d6660985cf135eb1994d17a4098f0fd9ceeade3f5e6c50d02d6c19',
    expiration: 1537193397,
    uuid: '89a2cc8d5c071b2b5e28c949573cc2ecd02dc912842e46c9f3e0326ecb739ca3',
    iambob: 0,
    bobcoin: 'COQUI',
    alicecoin: 'BEER',
    lock: 0,
    amount: 0.00256124,
    Apayment: 'bbPKza8nSAPSz467cwmqX2sDkPShK7yhyf',
    method: 'update',
    update: 'myfee',
    requestid: 3769478507,
    quoteid: 1873669175
  }
};

export const WEBSOCKET_STATE_THREE = {
  queueid: 0,
  result: {
    name: 'bobdeposit',
    coin: 'COQUI',
    tx:
      '0100000001c9bd6728da46d1c78555a8d7513088c04fed64e032b86f1a35e8b61ae9800508000000006b483045022100b1f365511628366e7d74f0f1b879207336e281c32ed7c625c2d69ed089177959022033f49542f39f47a0b52ce7c4fde8deb344b32b9bf8181c09131a1c4292531152012103851587da4e07502926555ddaa7c95adaa6b29a31b8093b4b0432b88c545f46fdffffffff02357c75060000000017a91465b2361bbcd0ec2fe1b7d50be89fe0b8d6bf5f418747010100000000001976a9143a648d95e1306217485e6e8de001d19d085a69c688acb5b59f5b',
    txid: '9c17695c0f7fca51da620ee73c1ef78ca79c92b86109212d490e0234922efec9',
    Bdeposit: 'bMzzRwwTyFXjF9Hg43pBvJmott25RER8fw',
    expiration: 1537193397,
    uuid: '89a2cc8d5c071b2b5e28c949573cc2ecd02dc912842e46c9f3e0326ecb739ca3',
    iambob: 0,
    bobcoin: 'COQUI',
    alicecoin: 'BEER',
    lock: 0,
    amount: 1.08362805,
    Apayment: 'bbPKza8nSAPSz467cwmqX2sDkPShK7yhyf',
    redeem:
      '6304b5b59f5bb17582012088a9142e835d4f32d985832c6905d1244f1c6ef61d387c88210283f562da3fc43a9b74e88f8a9ea52c1491b11ed6a7991d34ff9129caf963a21eac6782012088a914d70930cc3c64c01f9097ee63c27713cb23f9d588882103e14eaaa282c2b38bd7889ee342d3bba5e2f5c25ba8aaf14d5708112ce88711ecac68',
    method: 'update',
    update: 'bobdeposit',
    requestid: 3769478507,
    quoteid: 1873669175
  }
};

export const WEBSOCKET_STATE_FOUR = {
  queueid: 0,
  result: {
    name: 'alicepayment',
    coin: 'BEER',
    tx:
      '01000000012f3d0d3bd7e1162e2b8be4590e18b34ee31f4031ee7d4218086cf083cd73ef58010000006b483045022100dfd061768ab7ec1e383f67949d33f399fd47a0801367482d0ef941807450c4e202205e765d07b279090aa0066dfef7526173b7f53d9e4ffad7677687c22678a55ea4012102471f64357636038d6db76677369f3995bbaf4531bf39a919286ca36f1a680002ffffffff02b9aadc0b0000000017a914f88553e0c127c1a07b8b076464218dbbc970289587d2fc2bfb000000001976a914b1cc1a6fe678e98fda7572a76679363dcfad6a8f88ac00000000',
    txid: '235b0ad76573c15872c579ab338fa3dccfb6bf57f4b1057bface92e905b896e7',
    Bdeposit: 'bMzzRwwTyFXjF9Hg43pBvJmott25RER8fw',
    expiration: 1537193397,
    uuid: '89a2cc8d5c071b2b5e28c949573cc2ecd02dc912842e46c9f3e0326ecb739ca3',
    iambob: 0,
    bobcoin: 'COQUI',
    alicecoin: 'BEER',
    lock: 0,
    amount: 1.99011001,
    trigger: '9c17695c0f7fca51da620ee73c1ef78ca79c92b86109212d490e0234922efec9',
    Apayment: 'bbPKza8nSAPSz467cwmqX2sDkPShK7yhyf',
    redeem:
      '522102303a6d9cebfc435f2615bf38127654ee4d0ddfa71e6ebf6f6fde6a301e42979821033f169d0bcc81a52044cbc48173e3dac94e3ce57f1e8a6bd757c9caaab057f9c052ae',
    method: 'update',
    update: 'alicepayment',
    requestid: 3769478507,
    quoteid: 1873669175
  }
};

export const WEBSOCKET_STATE_FIVE = {
  queueid: 0,
  result: {
    name: 'alicepayment',
    coin: 'BEER',
    tx:
      '01000000012f3d0d3bd7e1162e2b8be4590e18b34ee31f4031ee7d4218086cf083cd73ef58010000006b483045022100dfd061768ab7ec1e383f67949d33f399fd47a0801367482d0ef941807450c4e202205e765d07b279090aa0066dfef7526173b7f53d9e4ffad7677687c22678a55ea4012102471f64357636038d6db76677369f3995bbaf4531bf39a919286ca36f1a680002ffffffff02b9aadc0b0000000017a914f88553e0c127c1a07b8b076464218dbbc970289587d2fc2bfb000000001976a914b1cc1a6fe678e98fda7572a76679363dcfad6a8f88ac00000000',
    txid: '235b0ad76573c15872c579ab338fa3dccfb6bf57f4b1057bface92e905b896e7',
    Bdeposit: 'bMzzRwwTyFXjF9Hg43pBvJmott25RER8fw',
    expiration: 1537193397,
    uuid: '89a2cc8d5c071b2b5e28c949573cc2ecd02dc912842e46c9f3e0326ecb739ca3',
    iambob: 0,
    bobcoin: 'COQUI',
    alicecoin: 'BEER',
    lock: 0,
    amount: 1.99011001,
    trigger: '9c17695c0f7fca51da620ee73c1ef78ca79c92b86109212d490e0234922efec9',
    Apayment: 'bbPKza8nSAPSz467cwmqX2sDkPShK7yhyf',
    redeem:
      '522102303a6d9cebfc435f2615bf38127654ee4d0ddfa71e6ebf6f6fde6a301e42979821033f169d0bcc81a52044cbc48173e3dac94e3ce57f1e8a6bd757c9caaab057f9c052ae',
    method: 'update',
    update: 'alicepayment',
    requestid: 3769478507,
    quoteid: 1873669175
  }
};

export const WEBSOCKET_STATE_SIX = {
  queueid: 0,
  result: {
    name: 'bobpayment',
    coin: 'COQUI',
    tx:
      '0100000002c9fe2e9234020e492d210961b8929ca78cf71e3ce70e62da51ca7f0f5c69179c010000006a4730440220222d342cb51984a82aaf331b1715aa71b62baafd0c7969a8a537aee058480dc802206772e76a30882c8bfed3d59c2c5855c686944d8c562139f67cac7ba6e5d64a4f012103851587da4e07502926555ddaa7c95adaa6b29a31b8093b4b0432b88c545f46fdffffffff2017bd72c37f723b8e9f961186206b248db4a135623293cb218da55cd600f071000000006b483045022100cf0d3ae7daca953a97f359a060d5ae64945c5b6887987398b9831402e9ab9cfb0220656a5e3d41ed15effe9b3edaa7023ebe9ca40410bc0dbae8fb6a1d272d44476b012103851587da4e07502926555ddaa7c95adaa6b29a31b8093b4b0432b88c545f46fdffffffff029cc4bd050000000017a914b2d79f76157736886a9a3bcd88f24ed1b16a464887a3cb3800000000001976a9143a648d95e1306217485e6e8de001d19d085a69c688ac3d979f5b',
    txid: '7f347917f72d7fdbb6f9051baf6c2929579db54407ec4695e5edd5f1a46629af',
    Bdeposit: 'bMzzRwwTyFXjF9Hg43pBvJmott25RER8fw',
    Bpayment: 'bV2uH7oBjkYSv58ic71oiwraUXGLtiJfva',
    expiration: 1537193397,
    uuid: '89a2cc8d5c071b2b5e28c949573cc2ecd02dc912842e46c9f3e0326ecb739ca3',
    iambob: 0,
    bobcoin: 'COQUI',
    alicecoin: 'BEER',
    lock: 0,
    amount: 0.96322716,
    Apayment: 'bbPKza8nSAPSz467cwmqX2sDkPShK7yhyf',
    redeem:
      '63043d979f5bb1752103404eba35d5c55b252e527a542c4b1dbcc16d308db13bb7df2ea9877382c8e571ac6782012088a9142e835d4f32d985832c6905d1244f1c6ef61d387c88210283f562da3fc43a9b74e88f8a9ea52c1491b11ed6a7991d34ff9129caf963a21eac68',
    method: 'update',
    update: 'bobpayment',
    requestid: 3769478507,
    quoteid: 1873669175
  }
};

export const WEBSOCKET_STATE_SEVEN = {
  queueid: 0,
  result: {
    uuid: '89a2cc8d5c071b2b5e28c949573cc2ecd02dc912842e46c9f3e0326ecb739ca3',
    expiration: 1537193397,
    tradeid: 1210934211,
    requestid: 3769478507,
    quoteid: 1873669175,
    iambob: 0,
    Bgui: '',
    Agui: 'dICOapp-cm',
    gui: 'dICOapp-cm',
    bob: 'COQUI',
    srcamount: 0.96320716,
    bobtxfee: 0.00001,
    alice: 'BEER',
    destamount: 1.99009001,
    alicetxfee: 0.00001,
    aliceid: '17246726481316216833',
    sentflags: [
      'alicespend',
      'bobpayment',
      'alicepayment',
      'bobdeposit',
      'myfee'
    ],
    values: [
      0.96321716,
      0,
      0.96322716,
      1.99011001,
      1.08362805,
      0,
      0.00256124,
      0,
      0,
      0,
      0
    ],
    result: 'success',
    status: 'finished',
    finishtime: 1537178865,
    bobdeposit:
      '9c17695c0f7fca51da620ee73c1ef78ca79c92b86109212d490e0234922efec9',
    alicepayment:
      '235b0ad76573c15872c579ab338fa3dccfb6bf57f4b1057bface92e905b896e7',
    bobpayment:
      '7f347917f72d7fdbb6f9051baf6c2929579db54407ec4695e5edd5f1a46629af',
    paymentspent:
      'c8bd7ed6cd9a7e61cd18ae8e8c592985ba640229621ffcd1fa4e8ae3633019f6',
    Apaymentspent:
      '0000000000000000000000000000000000000000000000000000000000000000',
    depositspent:
      '0000000000000000000000000000000000000000000000000000000000000000',
    alicedexfee:
      '7961c99b79d6660985cf135eb1994d17a4098f0fd9ceeade3f5e6c50d02d6c19',
    method: 'tradestatus'
  }
};

export const SWAP_STATE_ZERO = {
  uuid: 'bc5e1509b2aea898b8dff71ecc3fa7d5bc7c361fb14187fe9bc06916fae63811',
  expiration: 1536603425,
  timeleft: 59,
  tradeid: 3624682363,
  requestid: 0,
  quoteid: 0,
  bob: 'COQUI',
  base: 'COQUI',
  basevalue: 85.74334186,
  alice: 'BEER',
  rel: 'BEER',
  relvalue: 0.92602593,
  desthash: 'c88a033b587244cd501e90709620c3ec58d9c3886e33c2e1db909d0451aa5833',
  aliceid: '7904046646222061569'
};

export const SWAP_STATE_ONE = {
  uuid: 'bc5e1509b2aea898b8dff71ecc3fa7d5bc7c361fb14187fe9bc06916fae63811',
  expiration: 1536618965,
  tradeid: 3624682363,
  requestid: 1914742321,
  quoteid: 2455665257,
  iambob: 0,
  Bgui: '',
  Agui: 'dICOapp-cm',
  gui: 'dICOapp-cm',
  bob: 'COQUI',
  srcamount: 91.64950708,
  bobtxfee: 0.00001,
  alice: 'BEER',
  destamount: 0.92601593,
  alicetxfee: 0.00001,
  aliceid: '7904046646222061569',
  sentflags: ['myfee'],
  values: [0, 0, 0, 0, 0, 0, 0.00119178, 0, 0, 0, 0],
  result: 'success',
  status: 'pending',
  bobdeposit:
    '0000000000000000000000000000000000000000000000000000000000000000',
  alicepayment:
    '0000000000000000000000000000000000000000000000000000000000000000',
  bobpayment:
    '0000000000000000000000000000000000000000000000000000000000000000',
  paymentspent:
    '0000000000000000000000000000000000000000000000000000000000000000',
  Apaymentspent:
    '0000000000000000000000000000000000000000000000000000000000000000',
  depositspent:
    '0000000000000000000000000000000000000000000000000000000000000000',
  alicedexfee:
    'e5342f9a8834d86978d1ee609a6c2a998e0eaaeb7d0ea389b2306230a6463d51'
};

export const SWAP_STATE_TWO = {
  warning: 'swaps in critical section, dont exit now',
  critical: 1536603405,
  endcritical: 0,
  uuid: 'bc5e1509b2aea898b8dff71ecc3fa7d5bc7c361fb14187fe9bc06916fae63811',
  expiration: 1536618965,
  tradeid: 3624682363,
  requestid: 1914742321,
  quoteid: 2455665257,
  iambob: 0,
  Bgui: '',
  Agui: 'dICOapp-cm',
  gui: 'dICOapp-cm',
  bob: 'COQUI',
  srcamount: 91.64950708,
  bobtxfee: 0.00001,
  alice: 'BEER',
  destamount: 0.92601593,
  alicetxfee: 0.00001,
  aliceid: '7904046646222061569',
  sentflags: ['bobdeposit', 'myfee'],
  values: [0, 0, 0, 0, 103.10571546, 0, 0.00119178, 0, 0, 0, 0],
  result: 'success',
  status: 'pending',
  bobdeposit:
    '303bb79bd314e1936bcdc911e525e7c7e7ca4a7b61e986c91dd845214d6f1d39',
  alicepayment:
    '0000000000000000000000000000000000000000000000000000000000000000',
  bobpayment:
    '0000000000000000000000000000000000000000000000000000000000000000',
  paymentspent:
    '0000000000000000000000000000000000000000000000000000000000000000',
  Apaymentspent:
    '0000000000000000000000000000000000000000000000000000000000000000',
  depositspent:
    '0000000000000000000000000000000000000000000000000000000000000000',
  alicedexfee:
    'e5342f9a8834d86978d1ee609a6c2a998e0eaaeb7d0ea389b2306230a6463d51'
};

export const SWAP_STATE_THREE = {
  warning: 'swaps in critical section, dont exit now',
  critical: 1536603532,
  endcritical: 0,
  uuid: 'bc5e1509b2aea898b8dff71ecc3fa7d5bc7c361fb14187fe9bc06916fae63811',
  expiration: 1536618965,
  tradeid: 3624682363,
  requestid: 1914742321,
  quoteid: 2455665257,
  iambob: 0,
  Bgui: '',
  Agui: 'dICOapp-cm',
  gui: 'dICOapp-cm',
  bob: 'COQUI',
  srcamount: 91.64950708,
  bobtxfee: 0.00001,
  alice: 'BEER',
  destamount: 0.92601593,
  alicetxfee: 0.00001,
  aliceid: '7904046646222061569',
  sentflags: ['alicepayment', 'bobdeposit', 'myfee'],
  values: [0, 0, 0, 0.92603593, 103.10571546, 0, 0.00119178, 0, 0, 0, 0],
  result: 'success',
  status: 'pending',
  bobdeposit:
    '303bb79bd314e1936bcdc911e525e7c7e7ca4a7b61e986c91dd845214d6f1d39',
  alicepayment:
    '8df013895076b592db4d0bc8d16f559af42f48a6c22fafb3d1f6e861ba2ce467',
  bobpayment:
    '0000000000000000000000000000000000000000000000000000000000000000',
  paymentspent:
    '0000000000000000000000000000000000000000000000000000000000000000',
  Apaymentspent:
    '0000000000000000000000000000000000000000000000000000000000000000',
  depositspent:
    '0000000000000000000000000000000000000000000000000000000000000000',
  alicedexfee:
    'e5342f9a8834d86978d1ee609a6c2a998e0eaaeb7d0ea389b2306230a6463d51'
};

export const SWAP_STATE_FOUR = {
  uuid: 'bc5e1509b2aea898b8dff71ecc3fa7d5bc7c361fb14187fe9bc06916fae63811',
  expiration: 1536618965,
  tradeid: 3624682363,
  requestid: 1914742321,
  quoteid: 2455665257,
  iambob: 0,
  Bgui: '',
  Agui: 'dICOapp-cm',
  gui: 'dICOapp-cm',
  bob: 'COQUI',
  srcamount: 91.64950708,
  bobtxfee: 0.00001,
  alice: 'BEER',
  destamount: 0.92601593,
  alicetxfee: 0.00001,
  aliceid: '7904046646222061569',
  sentflags: ['bobpayment', 'alicepayment', 'bobdeposit', 'myfee'],
  values: [
    91.64951708,
    0,
    91.64952708,
    0.92603593,
    103.10571546,
    0,
    0.00119178,
    0,
    0,
    0,
    0
  ],
  result: 'success',
  status: 'pending',
  finishtime: 1536603559,
  bobdeposit:
    '303bb79bd314e1936bcdc911e525e7c7e7ca4a7b61e986c91dd845214d6f1d39',
  alicepayment:
    '8df013895076b592db4d0bc8d16f559af42f48a6c22fafb3d1f6e861ba2ce467',
  bobpayment:
    '492b77c796073f8a3086d832eb438e74e0b2476455f185405366b54149e50cc9',
  paymentspent:
    '0000000000000000000000000000000000000000000000000000000000000000',
  Apaymentspent:
    '0000000000000000000000000000000000000000000000000000000000000000',
  depositspent:
    '0000000000000000000000000000000000000000000000000000000000000000',
  alicedexfee:
    'e5342f9a8834d86978d1ee609a6c2a998e0eaaeb7d0ea389b2306230a6463d51',
  method: 'tradestatus'
};

export const SWAP_STATE_FIVE = {
  uuid: 'bc5e1509b2aea898b8dff71ecc3fa7d5bc7c361fb14187fe9bc06916fae63811',
  expiration: 1536618965,
  tradeid: 3624682363,
  requestid: 1914742321,
  quoteid: 2455665257,
  iambob: 0,
  Bgui: '',
  Agui: 'dICOapp-cm',
  gui: 'dICOapp-cm',
  bob: 'COQUI',
  srcamount: 91.64950708,
  bobtxfee: 0.00001,
  alice: 'BEER',
  destamount: 0.92601593,
  alicetxfee: 0.00001,
  aliceid: '7904046646222061569',
  sentflags: [
    'alicespend',
    'bobpayment',
    'alicepayment',
    'bobdeposit',
    'myfee'
  ],
  values: [
    91.64951708,
    0,
    91.64952708,
    0.92603593,
    103.10571546,
    0,
    0.00119178,
    0,
    0,
    0,
    0
  ],
  result: 'success',
  status: 'finished',
  finishtime: 1536603559,
  bobdeposit:
    '303bb79bd314e1936bcdc911e525e7c7e7ca4a7b61e986c91dd845214d6f1d39',
  alicepayment:
    '8df013895076b592db4d0bc8d16f559af42f48a6c22fafb3d1f6e861ba2ce467',
  bobpayment:
    '492b77c796073f8a3086d832eb438e74e0b2476455f185405366b54149e50cc9',
  paymentspent:
    '3fd50560f73696c0dad19da02690575dabe135d495e4b1922ed55c85919f784a',
  Apaymentspent:
    '0000000000000000000000000000000000000000000000000000000000000000',
  depositspent:
    '0000000000000000000000000000000000000000000000000000000000000000',
  alicedexfee:
    'e5342f9a8834d86978d1ee609a6c2a998e0eaaeb7d0ea389b2306230a6463d51',
  method: 'tradestatus'
};

export const LOAD_SWAP_SUCCESS = [
  {
    coin: 'BEER',
    value: -0.92601593
  },
  {
    coin: 'COQUI',
    value: 91.64950708
  }
];

it('containers/BuyPage/reducers/fake-data', () => {
  expect(1).toEqual(1);
});
