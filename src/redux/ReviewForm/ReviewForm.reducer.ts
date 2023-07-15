import { ReviewFormStateTypes, ReviewFormActionTypes } from "./ReviewForm.type";
import { resetApiCallState } from "../Utils";

const INITIAL_STATE: ReviewFormStateTypes = {
  fetchAll: resetApiCallState([]),
};

const ReviewFormReducer = (
  state: ReviewFormStateTypes = INITIAL_STATE,
  action: any
): ReviewFormStateTypes => {
  switch (action.type) {
    case ReviewFormActionTypes.FETCH_ALL_REVIEW_FORM:
      return {
        ...state,
        fetchAll: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case ReviewFormActionTypes.FETCH_ALL_REVIEW_FORM_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case ReviewFormActionTypes.FETCH_ALL_REVIEW_FORM_FAILURE:
      return {
        ...state,
        fetchAll: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case ReviewFormActionTypes.FETCH_ALL_REVIEW_FORM_SUCCESS:
      return {
        ...state,
        fetchAll: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    default:
      return state;
  }
};

export default ReviewFormReducer;
