export default async function buySubscribe(message, dispatch, getState) {
  if (message && message.result && message.result.method !== 'postprice') {
    console.log(message, dispatch, getState, 'buySubscribe');
  }
}
