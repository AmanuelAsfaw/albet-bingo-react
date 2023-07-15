import { ReviewFormActionTypes } from "./ReviewForm.type";

/**
 * Fetch All Review Forms
 *
 * @param payload
 */
export const fetchAllReviewForms = (payload?: any) => ({
  type: ReviewFormActionTypes.FETCH_ALL_REVIEW_FORM,
  payload: payload,
});

/**
 * Reset Fetch Review Forms State
 *
 * @param payload
 */
export const fetchAllReviewFormReset = (payload?: any) => ({
  type: ReviewFormActionTypes.FETCH_ALL_REVIEW_FORM_RESET,
  payload: payload,
});
