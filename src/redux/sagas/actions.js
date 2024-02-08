export const setCouponFiles = (files) => ({
  type: "SET_COUPON_FILES",
  payload: files,
});

export const fetchCouponFilesFailure = (error) => ({
  type: "FETCH_COUPON_FILES_FAILURE",
  payload: error,
});
