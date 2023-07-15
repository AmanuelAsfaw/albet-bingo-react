import { ApiCallState } from "../Utils";

export type ReviewForm = {
  id: number;
  name: string;
  time: string;
  description: string;
  meteric: string;
};

export type ReviewFormStateTypes = {
  fetchAll: ApiCallState<ReviewForm[]>;
};

export const ReviewFormActionTypes = {
  FETCH_ALL_REVIEW_FORM: "FETCH_ALL_REVIEW_FORM",
  FETCH_ALL_REVIEW_FORM_RESET: "FETCH_ALL_REVIEW_FORM_RESET",
  FETCH_ALL_REVIEW_FORM_FAILURE: "FETCH_ALL_REVIEW_FORM_FAILURE",
  FETCH_ALL_REVIEW_FORM_SUCCESS: "FETCH_ALL_REVIEW_FORM_SUCCESS",
};
