import { ShareSiteHandoverStateTypes, ShareSiteHandoverActionTypes } from "./ShareSiteHandover.type";
import { resetApiCallState } from "../Utils";

const INITIAL_STATE: ShareSiteHandoverStateTypes = {
  fetchAll: resetApiCallState([]),
  fetchOne: resetApiCallState({}),
};

const ShareSiteHandoverReducer = (
  state: ShareSiteHandoverStateTypes = INITIAL_STATE,
  action: any
): ShareSiteHandoverStateTypes => {
  switch (action.type) {
    case ShareSiteHandoverActionTypes.FETCH_ALL_SHARE_SITE_HANDOVER:
      return {
        ...state,
        fetchAll: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case ShareSiteHandoverActionTypes.FETCH_ALL_SHARE_SITE_HANDOVER_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case ShareSiteHandoverActionTypes.FETCH_ALL_SHARE_SITE_HANDOVER_FAILURE:
      return {
        ...state,
        fetchAll: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case ShareSiteHandoverActionTypes.FETCH_ALL_SHARE_SITE_HANDOVER_SUCCESS:
      return {
        ...state,
        fetchAll: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case ShareSiteHandoverActionTypes.FETCH_ONE_SHARE_SITE_HANDOVER:
      return {
        ...state,
        fetchOne: {
          error: null,
          payload: {},
          isPending: true,
          isSuccessful: false,
        },
      };
    case ShareSiteHandoverActionTypes.FETCH_ONE_SHARE_SITE_HANDOVER_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case ShareSiteHandoverActionTypes.FETCH_ONE_SHARE_SITE_HANDOVER_FAILURE:
      return {
        ...state,
        fetchOne: {
          payload: {},
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case ShareSiteHandoverActionTypes.FETCH_ONE_SHARE_SITE_HANDOVER_SUCCESS:
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

export default ShareSiteHandoverReducer;
