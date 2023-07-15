import {
  SiteHandoverStateTypes,
  SiteHandoverActionTypes,
} from "./SiteHandover.type";
import { resetApiCallState } from "../Utils";

const INITIAL_STATE: SiteHandoverStateTypes = {
  fetchAll: resetApiCallState([]),
  fetchOne: resetApiCallState({}),
};

const SiteHandoverReducer = (
  state: SiteHandoverStateTypes = INITIAL_STATE,
  action: any
): SiteHandoverStateTypes => {
  switch (action.type) {
    case SiteHandoverActionTypes.FETCH_ALL_SITE_HANDOVER:
      return {
        ...state,
        fetchAll: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case SiteHandoverActionTypes.FETCH_ALL_SITE_HANDOVER_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case SiteHandoverActionTypes.FETCH_ALL_SITE_HANDOVER_FAILURE:
      return {
        ...state,
        fetchAll: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case SiteHandoverActionTypes.FETCH_ALL_SITE_HANDOVER_SUCCESS:
      return {
        ...state,
        fetchAll: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case SiteHandoverActionTypes.FETCH_ONE_SITE_HANDOVER:
      return {
        ...state,
        fetchOne: {
          error: null,
          payload: {},
          isPending: true,
          isSuccessful: false,
        },
      };
    case SiteHandoverActionTypes.FETCH_ONE_SITE_HANDOVER_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case SiteHandoverActionTypes.FETCH_ONE_SITE_HANDOVER_FAILURE:
      return {
        ...state,
        fetchOne: {
          payload: {},
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case SiteHandoverActionTypes.FETCH_ONE_SITE_HANDOVER_SUCCESS:
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

export default SiteHandoverReducer;
