// export default async function buySubscribe(message, dispatch, getState) {
export default async function buySubscribe(message) {
  if (message && message.result && message.result.method !== 'postprice') {
    // console.log(message, dispatch, getState, 'buySubscribe');
    console.log(JSON.stringify(message));
  }
}
