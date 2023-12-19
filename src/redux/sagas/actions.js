export const setMerchantFiles = (files) => ({
  type: "SET_MERCHANT_FILES",
  payload: files,
});

export const fetchMerchantFilesFailure = (error) => ({
  type: "FETCH_MERCHANT_FILES_FAILURE",
  payload: error,
});
