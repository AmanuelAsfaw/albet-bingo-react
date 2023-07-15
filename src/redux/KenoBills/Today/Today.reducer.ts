import { TodayKenoBillStateTypes, TodayKenoBillActionTypes } from "./Today.type";
import { resetApiCallState } from "../../Utils";

const INITIAL_STATE: TodayKenoBillStateTypes = {
  fetchAll: resetApiCallState([]),
  fetchOne: resetApiCallState({}),
};

const DataReducer = (
  state: TodayKenoBillStateTypes = INITIAL_STATE,
  action: any
): TodayKenoBillStateTypes => {
  switch (action.type) {
    case TodayKenoBillActionTypes.FETCH_ALL_TODAY_KENO_BILL:
      return {
        ...state,
        fetchAll: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case TodayKenoBillActionTypes.FETCH_ALL_TODAY_KENO_BILL_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case TodayKenoBillActionTypes.FETCH_ALL_TODAY_KENO_BILL_FAILURE:
      return {
        ...state,
        fetchAll: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case TodayKenoBillActionTypes.FETCH_ALL_TODAY_KENO_BILL_SUCCESS:
      return {
        ...state,
        fetchAll: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case TodayKenoBillActionTypes.FETCH_ONE_TODAY_KENO_BILL:
      return {
        ...state,
        fetchOne: {
          error: null,
          payload: {},
          isPending: true,
          isSuccessful: false,
        },
      };
    case TodayKenoBillActionTypes.FETCH_ONE_TODAY_KENO_BILL_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case TodayKenoBillActionTypes.FETCH_ONE_TODAY_KENO_BILL_FAILURE:
      return {
        ...state,
        fetchOne: {
          payload: {},
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case TodayKenoBillActionTypes.FETCH_ONE_TODAY_KENO_BILL_SUCCESS:
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

export default DataReducer;
