- **URL**

  /buy

- **Data Params**

```js
{
"userpass": "xxx",
"base": "COQUI",
"rel": "BEER",
"relvolume": "0.92592593",
"price": "0.01080000"
}
```

- **Success Response:**

```js
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
```

---

- **URL**

  /recentswapsResult

- **Success Response:**

```js
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
```

- **URL**

  /swapstatusResult

- **Success Response:**

```js
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
```
