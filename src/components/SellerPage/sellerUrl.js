// export const transactionsUrl = (refId) => {
//   return `localhost:3000/#/seller/${refId}/cash`;
// };

// export const orderUrl = (refId) => {
//   return `localhost:3000/#/seller/${refId}`;
// };

// FOR TEST ENVIRONMENT USE ~~~~~~~~~~~~~~~~ //
// export const transactionsUrl = (refId) => {
//   return `testpsg.fly.dev/#/fargo/seller/${refId}/cash`;
// };

// export const orderUrl = (refId) => {
//   return `testpsg.fly.dev/#/fargo/seller/${refId}`;
// };

// FOR LIVE PROD USE ~~~~~~~~~~~~~~~~~~~~~~~ //
export const transactionsUrl = (refId) => {
  return `digitalcoupon.app/#/seller/${refId}/cash`;
};

export const orderUrl = (refId) => {
  return `digitalcoupon.app/#/seller/${refId}`;
};