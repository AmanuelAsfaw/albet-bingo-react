import { ShareInspectionStateTypes, ShareInspectionActionTypes } from "./ShareInspection.type";
import { resetApiCallState } from "../Utils";

const INITIAL_STATE: ShareInspectionStateTypes = {
  fetchAll: resetApiCallState([]),
  fetchOne: resetApiCallState({}),
};

const ShareInspectionReducer = (
  state: ShareInspectionStateTypes = INITIAL_STATE,
  action: any
): ShareInspectionStateTypes => {
  switch (action.type) {
    case ShareInspectionActionTypes.FETCH_ALL_SHARE_INSPECTION:
      return {
        ...state,
        fetchAll: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case ShareInspectionActionTypes.FETCH_ALL_SHARE_INSPECTION_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case ShareInspectionActionTypes.FETCH_ALL_SHARE_INSPECTION_FAILURE:
      return {
        ...state,
        fetchAll: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case ShareInspectionActionTypes.FETCH_ALL_SHARE_INSPECTION_SUCCESS:
      return {
        ...state,
        fetchAll: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case ShareInspectionActionTypes.FETCH_ONE_SHARE_INSPECTION:
      return {
        ...state,
        fetchOne: {
          error: null,
          payload: {},
          isPending: true,
          isSuccessful: false,
        },
      };
    case ShareInspectionActionTypes.FETCH_ONE_SHARE_INSPECTION_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case ShareInspectionActionTypes.FETCH_ONE_SHARE_INSPECTION_FAILURE:
      return {
        ...state,
        fetchOne: {
          payload: {},
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case ShareInspectionActionTypes.FETCH_ONE_SHARE_INSPECTION_SUCCESS:
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

export default ShareInspectionReducer;
