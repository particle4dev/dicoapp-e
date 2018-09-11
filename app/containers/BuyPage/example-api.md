// PARAMS
{
base: "CHIPS",
price: "0.06642351",
rel: "KMD",
relvolume: 1000000,
userpass: "xxx"
}

// RESULT
{
error: "cant find a deposit that is close enough in size. make another deposit that is just a bit larger than what you want to trade"
}

===============================================================

// PARAMS
{
base: "CHIPS",
price: "0.06714875",
rel: "KMD",
relvolume: 0.01
userpass: "xxx"
}

// RESULT
{
result: "success",
swaps: [],
netamounts: [],
pending: {
alice: "KMD",
aliceid: "1834861514773102593",
base: "CHIPS",
basevalue: 0.15061252,
bob: "CHIPS",
desthash: "c88a033b587244cd501e90709620c3ec58d9c3886e33c2e1db909d0451aa5833",
expiration: 1536589296,
quoteid: 0,
rel: "KMD",
relvalue: 0.0101,
requestid: 0,
timeleft: 59,
tradeid: 3480712030,
uuid: "c44eddd651e21616cabc9220afa74717706b92472b639aaf9479b81dd3bf8f3e"
},
uuid: "c44eddd651e21616cabc9220afa74717706b92472b639aaf9479b81dd3bf8f3e"
}

===============================================================

8.484 CHIPS
3.645 KMD

// PARAMS
{
"userpass": "xxx",
"base": "CHIPS",
"rel": "KMD",
"relvolume": 0.01,
"price": "0.06647729"
}

// RESULT
{
"result": "success",
"swaps": [
[449262273, 178595249]
],
"netamounts": [],
"pending": {
"uuid": "d4c15c04cdbec32ec21021b4c00fb7e64b6b95b6bd090847712a70130fbe091a",
"expiration": 1536590290,
"timeleft": 59,
"tradeid": 2026211067,
"requestid": 0,
"quoteid": 0,
"bob": "CHIPS",
"base": "CHIPS",
"basevalue": 0.15213177,
"alice": "KMD",
"rel": "KMD",
"relvalue": 0.0101,
"desthash": "c88a033b587244cd501e90709620c3ec58d9c3886e33c2e1db909d0451aa5833",
"aliceid": "1834858063202287617"
},
"uuid": "d4c15c04cdbec32ec21021b4c00fb7e64b6b95b6bd090847712a70130fbe091a"
}

// 01
// recentswapsResult
{
"result": "success",
"swaps": [
[449262273, 178595249]
],
"netamounts": [],
"pending": {
"expiration": 1536590290,
"timeleft": 59,
"tradeid": 2026211067,
"requestid": 0,
"quoteid": 0,
"bob": "CHIPS",
"base": "CHIPS",
"basevalue": 0.15213177,
"alice": "KMD",
"rel": "KMD",
"relvalue": 0.0101,
"desthash": "c88a033b587244cd501e90709620c3ec58d9c3886e33c2e1db909d0451aa5833",
"aliceid": "1834858063202287617"
}
}

// swapstatusResult
{
"uuid": "c44eddd651e21616cabc9220afa74717706b92472b639aaf9479b81dd3bf8f3e",
"expiration": 1536604836,
"tradeid": 3480712030,
"requestid": 449262273,
"quoteid": 178595249,
"iambob": 0,
"Bgui": "",
"Agui": "dICOapp-cm",
"gui": "dICOapp-cm",
"bob": "CHIPS",
"srcamount": 0.15426411,
"bobtxfee": 0.0001,
"alice": "KMD",
"destamount": 0.01009,
"alicetxfee": 0.00001,
"aliceid": "1834861514773102593",
"sentflags": ["bobdeposit", "myfee"],
"values": [0, 0, 0, 0, 0.17374712, 0, 0.00001298, 0, 0, 0, 0],
"result": "success",
"status": "pending",
"bobdeposit": "f31a580bd446538986e13477723116a762a2d0aea1eb6287f9cc90e58b45311a",
"alicepayment": "0000000000000000000000000000000000000000000000000000000000000000",
"bobpayment": "0000000000000000000000000000000000000000000000000000000000000000",
"paymentspent": "0000000000000000000000000000000000000000000000000000000000000000",
"Apaymentspent": "0000000000000000000000000000000000000000000000000000000000000000",
"depositspent": "0000000000000000000000000000000000000000000000000000000000000000",
"alicedexfee": "5f4cd2b1aef137dbd409e431f401ec7fc7c25020f76f38d87d83db53a1b3b1bf"
}

# ===============================================================

# ===============================================================

// PARAMS
{
"userpass": "xxx",
"base": "COQUI",
"rel": "BEER",
"relvolume": "0.92592593",
"price": "0.01080000"
}

// RESULT
{
"result": "success",
"swaps": [
[449262273, 178595249]
],
"netamounts": [],
"pending": {
"uuid": "bc5e1509b2aea898b8dff71ecc3fa7d5bc7c361fb14187fe9bc06916fae63811",
"expiration": 1536603425,
"timeleft": 59,
"tradeid": 3624682363,
"requestid": 0,
"quoteid": 0,
"bob": "COQUI",
"base": "COQUI",
"basevalue": 85.74334186,
"alice": "BEER",
"rel": "BEER",
"relvalue": 0.92602593,
"desthash": "c88a033b587244cd501e90709620c3ec58d9c3886e33c2e1db909d0451aa5833",
"aliceid": "7904046646222061569"
},
"uuid": "bc5e1509b2aea898b8dff71ecc3fa7d5bc7c361fb14187fe9bc06916fae63811"
}

===============================================================

// recentswapsResult
{
"result": "success",
"swaps": [
[449262273, 178595249]
],
"netamounts": [],
"pending": {
"expiration": 1536603425,
"timeleft": 59,
"tradeid": 3624682363,
"requestid": 0,
"quoteid": 0,
"bob": "COQUI",
"base": "COQUI",
"basevalue": 85.74334186,
"alice": "BEER",
"rel": "BEER",
"relvalue": 0.92602593,
"desthash": "c88a033b587244cd501e90709620c3ec58d9c3886e33c2e1db909d0451aa5833",
"aliceid": "7904046646222061569"
}
}

// swapstatusResult
{
"error": "swap never started",
"uuid": "c44eddd651e21616cabc9220afa74717706b92472b639aaf9479b81dd3bf8f3e",
"status": "finished",
"bob": "CHIPS",
"src": "CHIPS",
"alice": "KMD",
"dest": "KMD",
"requestid": 449262273,
"quoteid": 178595249
}

===============================================================

// recentswapsResult
{
"result": "success",
"swaps": [
[449262273, 178595249]
],
"netamounts": []
}

// swapstatusResult
{
"error": "swap never started",
"uuid": "c44eddd651e21616cabc9220afa74717706b92472b639aaf9479b81dd3bf8f3e",
"status": "finished",
"bob": "CHIPS",
"src": "CHIPS",
"alice": "KMD",
"dest": "KMD",
"requestid": 449262273,
"quoteid": 178595249
}

===============================================================

// recentswapsResult
{
"result": "success",
"swaps": [
[1914742321, 2455665257],
[449262273, 178595249]
],
"netamounts": []
}

// swapstatusResult
{
"error": "swap never started",
"uuid": "c44eddd651e21616cabc9220afa74717706b92472b639aaf9479b81dd3bf8f3e",
"status": "finished",
"bob": "CHIPS",
"src": "CHIPS",
"alice": "KMD",
"dest": "KMD",
"requestid": 449262273,
"quoteid": 178595249
}

// swapstatusResult
{
"uuid": "bc5e1509b2aea898b8dff71ecc3fa7d5bc7c361fb14187fe9bc06916fae63811",
"expiration": 1536618965,
"tradeid": 3624682363,
"requestid": 1914742321,
"quoteid": 2455665257,
"iambob": 0,
"Bgui": "",
"Agui": "dICOapp-cm",
"gui": "dICOapp-cm",
"bob": "COQUI",
"srcamount": 91.64950708,
"bobtxfee": 0.00001,
"alice": "BEER",
"destamount": 0.92601593,
"alicetxfee": 0.00001,
"aliceid": "7904046646222061569",
"sentflags": ["myfee"],
"values": [0, 0, 0, 0, 0, 0, 0.00119178, 0, 0, 0, 0],
"result": "success",
"status": "pending",
"bobdeposit": "0000000000000000000000000000000000000000000000000000000000000000",
"alicepayment": "0000000000000000000000000000000000000000000000000000000000000000",
"bobpayment": "0000000000000000000000000000000000000000000000000000000000000000",
"paymentspent": "0000000000000000000000000000000000000000000000000000000000000000",
"Apaymentspent": "0000000000000000000000000000000000000000000000000000000000000000",
"depositspent": "0000000000000000000000000000000000000000000000000000000000000000",
"alicedexfee": "e5342f9a8834d86978d1ee609a6c2a998e0eaaeb7d0ea389b2306230a6463d51"
}

// swapstatusResult
{
"warning": "swaps in critical section, dont exit now",
"critical": 1536603405,
"endcritical": 0,
"uuid": "bc5e1509b2aea898b8dff71ecc3fa7d5bc7c361fb14187fe9bc06916fae63811",
"expiration": 1536618965,
"tradeid": 3624682363,
"requestid": 1914742321,
"quoteid": 2455665257,
"iambob": 0,
"Bgui": "",
"Agui": "dICOapp-cm",
"gui": "dICOapp-cm",
"bob": "COQUI",
"srcamount": 91.64950708,
"bobtxfee": 0.00001,
"alice": "BEER",
"destamount": 0.92601593,
"alicetxfee": 0.00001,
"aliceid": "7904046646222061569",
"sentflags": ["bobdeposit", "myfee"],
"values": [0, 0, 0, 0, 103.10571546, 0, 0.00119178, 0, 0, 0, 0],
"result": "success",
"status": "pending",
"bobdeposit": "303bb79bd314e1936bcdc911e525e7c7e7ca4a7b61e986c91dd845214d6f1d39",
"alicepayment": "0000000000000000000000000000000000000000000000000000000000000000",
"bobpayment": "0000000000000000000000000000000000000000000000000000000000000000",
"paymentspent": "0000000000000000000000000000000000000000000000000000000000000000",
"Apaymentspent": "0000000000000000000000000000000000000000000000000000000000000000",
"depositspent": "0000000000000000000000000000000000000000000000000000000000000000",
"alicedexfee": "e5342f9a8834d86978d1ee609a6c2a998e0eaaeb7d0ea389b2306230a6463d51"
}

// swapstatusResult
{
"warning": "swaps in critical section, dont exit now",
"critical": 1536603532,
"endcritical": 0,
"uuid": "bc5e1509b2aea898b8dff71ecc3fa7d5bc7c361fb14187fe9bc06916fae63811",
"expiration": 1536618965,
"tradeid": 3624682363,
"requestid": 1914742321,
"quoteid": 2455665257,
"iambob": 0,
"Bgui": "",
"Agui": "dICOapp-cm",
"gui": "dICOapp-cm",
"bob": "COQUI",
"srcamount": 91.64950708,
"bobtxfee": 0.00001,
"alice": "BEER",
"destamount": 0.92601593,
"alicetxfee": 0.00001,
"aliceid": "7904046646222061569",
"sentflags": ["alicepayment", "bobdeposit", "myfee"],
"values": [0, 0, 0, 0.92603593, 103.10571546, 0, 0.00119178, 0, 0, 0, 0],
"result": "success",
"status": "pending",
"bobdeposit": "303bb79bd314e1936bcdc911e525e7c7e7ca4a7b61e986c91dd845214d6f1d39",
"alicepayment": "8df013895076b592db4d0bc8d16f559af42f48a6c22fafb3d1f6e861ba2ce467",
"bobpayment": "0000000000000000000000000000000000000000000000000000000000000000",
"paymentspent": "0000000000000000000000000000000000000000000000000000000000000000",
"Apaymentspent": "0000000000000000000000000000000000000000000000000000000000000000",
"depositspent": "0000000000000000000000000000000000000000000000000000000000000000",
"alicedexfee": "e5342f9a8834d86978d1ee609a6c2a998e0eaaeb7d0ea389b2306230a6463d51"
}

// swapstatusResult
{
"uuid": "bc5e1509b2aea898b8dff71ecc3fa7d5bc7c361fb14187fe9bc06916fae63811",
"expiration": 1536618965,
"tradeid": 3624682363,
"requestid": 1914742321,
"quoteid": 2455665257,
"iambob": 0,
"Bgui": "",
"Agui": "dICOapp-cm",
"gui": "dICOapp-cm",
"bob": "COQUI",
"srcamount": 91.64950708,
"bobtxfee": 0.00001,
"alice": "BEER",
"destamount": 0.92601593,
"alicetxfee": 0.00001,
"aliceid": "7904046646222061569",
"sentflags": ["alicespend", "bobpayment", "alicepayment", "bobdeposit", "myfee"],
"values": [91.64951708, 0, 91.64952708, 0.92603593, 103.10571546, 0, 0.00119178, 0, 0, 0, 0],
"result": "success",
"status": "finished",
"finishtime": 1536603559,
"bobdeposit": "303bb79bd314e1936bcdc911e525e7c7e7ca4a7b61e986c91dd845214d6f1d39",
"alicepayment": "8df013895076b592db4d0bc8d16f559af42f48a6c22fafb3d1f6e861ba2ce467",
"bobpayment": "492b77c796073f8a3086d832eb438e74e0b2476455f185405366b54149e50cc9",
"paymentspent": "3fd50560f73696c0dad19da02690575dabe135d495e4b1922ed55c85919f784a",
"Apaymentspent": "0000000000000000000000000000000000000000000000000000000000000000",
"depositspent": "0000000000000000000000000000000000000000000000000000000000000000",
"alicedexfee": "e5342f9a8834d86978d1ee609a6c2a998e0eaaeb7d0ea389b2306230a6463d51",
"method": "tradestatus"
} ===
=== === === === === === === === === === === === === === === === === === === ===

// recentswapsResult
{
"result": "success",
"swaps": [
[1914742321, 2455665257, {
"COQUI": 91.64950708,
"BEER": -0.92601593,
"price": 0.01010388
}],
[449262273, 178595249]
],
"netamounts": [{
"BEER": -0.92601593
}, {
"COQUI": 91.64950708
}]
}

// swapstatusResult
{
"uuid": "bc5e1509b2aea898b8dff71ecc3fa7d5bc7c361fb14187fe9bc06916fae63811",
"expiration": 1536618965,
"tradeid": 3624682363,
"requestid": 1914742321,
"quoteid": 2455665257,
"iambob": 0,
"Bgui": "",
"Agui": "dICOapp-cm",
"gui": "dICOapp-cm",
"bob": "COQUI",
"srcamount": 91.64950708,
"bobtxfee": 0.00001,
"alice": "BEER",
"destamount": 0.92601593,
"alicetxfee": 0.00001,
"aliceid": "7904046646222061569",
"sentflags": ["alicespend", "bobpayment", "alicepayment", "bobdeposit", "myfee"],
"values": [91.64951708, 0, 91.64952708, 0.92603593, 103.10571546, 0, 0.00119178, 0, 0, 0, 0],
"result": "success",
"status": "finished",
"finishtime": 1536603559,
"bobdeposit": "303bb79bd314e1936bcdc911e525e7c7e7ca4a7b61e986c91dd845214d6f1d39",
"alicepayment": "8df013895076b592db4d0bc8d16f559af42f48a6c22fafb3d1f6e861ba2ce467",
"bobpayment": "492b77c796073f8a3086d832eb438e74e0b2476455f185405366b54149e50cc9",
"paymentspent": "3fd50560f73696c0dad19da02690575dabe135d495e4b1922ed55c85919f784a",
"Apaymentspent": "0000000000000000000000000000000000000000000000000000000000000000",
"depositspent": "0000000000000000000000000000000000000000000000000000000000000000",
"alicedexfee": "e5342f9a8834d86978d1ee609a6c2a998e0eaaeb7d0ea389b2306230a6463d51",
"method": "tradestatus"
}

// swapstatusResult
{
"error": "swap never started",
"uuid": "c44eddd651e21616cabc9220afa74717706b92472b639aaf9479b81dd3bf8f3e",
"status": "finished",
"bob": "CHIPS",
"src": "CHIPS",
"alice": "KMD",
"dest": "KMD",
"requestid": 449262273,
"quoteid": 178595249
}
