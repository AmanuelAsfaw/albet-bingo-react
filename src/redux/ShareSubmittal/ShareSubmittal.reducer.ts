import { ShareSubmittalStateTypes, ShareSubmittalActionTypes } from "./ShareSubmittal.type";
import { resetApiCallState } from "../Utils";

const INITIAL_STATE: ShareSubmittalStateTypes = {
  fetchAll: resetApiCallState([]),
  fetchOne: resetApiCallState({}),
};

const ShareSubmittalReducer = (
  state: ShareSubmittalStateTypes = INITIAL_STATE,
  action: any
): ShareSubmittalStateTypes => {
  switch (action.type) {
    case ShareSubmittalActionTypes.FETCH_ALL_SHARE_SUBMITTAL:
      return {
        ...state,
        fetchAll: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case ShareSubmittalActionTypes.FETCH_ALL_SHARE_SUBMITTAL_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case ShareSubmittalActionTypes.FETCH_ALL_SHARE_SUBMITTAL_FAILURE:
      return {
        ...state,
        fetchAll: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case ShareSubmittalActionTypes.FETCH_ALL_SHARE_SUBMITTAL_SUCCESS:
      return {
        ...state,
        fetchAll: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case ShareSubmittalActionTypes.FETCH_ONE_SHARE_SUBMITTAL:
      return {
        ...state,
        fetchOne: {
          error: null,
          payload: {},
          isPending: true,
          isSuccessful: false,
        },
      };
    case ShareSubmittalActionTypes.FETCH_ONE_SHARE_SUBMITTAL_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case ShareSubmittalActionTypes.FETCH_ONE_SHARE_SUBMITTAL_FAILURE:
      return {
        ...state,
        fetchOne: {
          payload: {},
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case ShareSubmittalActionTypes.FETCH_ONE_SHARE_SUBMITTAL_SUCCESS:
      return {
        ...state,
        fetchOne: {
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

export default ShareSubmittalReducer;
