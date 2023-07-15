import { ShareDataStateTypes, ShareDataActionTypes } from "./ShareData.type";
import { resetApiCallState } from "../Utils";

const INITIAL_STATE: ShareDataStateTypes = {
  fetchAll: resetApiCallState([]),
  fetchOne: resetApiCallState({}),
};

const ShareDataReducer = (
  state: ShareDataStateTypes = INITIAL_STATE,
  action: any
): ShareDataStateTypes => {
  switch (action.type) {
    case ShareDataActionTypes.FETCH_ALL_SHARE_DATA:
      return {
        ...state,
        fetchAll: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case ShareDataActionTypes.FETCH_ALL_SHARE_DATA_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case ShareDataActionTypes.FETCH_ALL_SHARE_DATA_FAILURE:
      return {
        ...state,
        fetchAll: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case ShareDataActionTypes.FETCH_ALL_SHARE_DATA_SUCCESS:
      return {
        ...state,
        fetchAll: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case ShareDataActionTypes.FETCH_ONE_SHARE_DATA:
      return {
        ...state,
        fetchOne: {
          error: null,
          payload: {},
          isPending: true,
          isSuccessful: false,
        },
      };
    case ShareDataActionTypes.FETCH_ONE_SHARE_DATA_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case ShareDataActionTypes.FETCH_ONE_SHARE_DATA_FAILURE:
      return {
        ...state,
        fetchOne: {
          payload: {},
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case ShareDataActionTypes.FETCH_ONE_SHARE_DATA_SUCCESS:
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

export default ShareDataReducer;
