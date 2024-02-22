// export const generateSellerUrl = (refId) => {
//   return `/seller/${refId}`;
// };

export const transactionsUrl = (refId) => {
  return `localhost:3000/#/seller/${refId}/cash`;
};

export const orderUrl = (refId) => {
  return `localhost:3000/#/seller/${refId}`;
};
