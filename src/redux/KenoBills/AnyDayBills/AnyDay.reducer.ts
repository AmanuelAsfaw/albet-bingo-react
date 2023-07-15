import { AnyDayKenoBillStateTypes, AnyDayKenoBillActionTypes } from "./AnyDay.type";
import { resetApiCallState } from "../../Utils";

const INITIAL_STATE: AnyDayKenoBillStateTypes = {
  fetchAll: resetApiCallState([]),
  fetchOne: resetApiCallState({}),
};

const DataReducer = (
  state: AnyDayKenoBillStateTypes = INITIAL_STATE,
  action: any
): AnyDayKenoBillStateTypes => {
  switch (action.type) {
    case AnyDayKenoBillActionTypes.FETCH_ALL_ANYDAY_KENO_BILL:
      return {
        ...state,
        fetchAll: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case AnyDayKenoBillActionTypes.FETCH_ALL_ANYDAY_KENO_BILL_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case AnyDayKenoBillActionTypes.FETCH_ALL_ANYDAY_KENO_BILL_FAILURE:
      return {
        ...state,
        fetchAll: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case AnyDayKenoBillActionTypes.FETCH_ALL_ANYDAY_KENO_BILL_SUCCESS:
      return {
        ...state,
        fetchAll: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case AnyDayKenoBillActionTypes.FETCH_ONE_ANYDAY_KENO_BILL:
      return {
        ...state,
        fetchOne: {
          error: null,
          payload: {},
          isPending: true,
          isSuccessful: false,
        },
      };
    case AnyDayKenoBillActionTypes.FETCH_ONE_ANYDAY_KENO_BILL_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case AnyDayKenoBillActionTypes.FETCH_ONE_ANYDAY_KENO_BILL_FAILURE:
      return {
        ...state,
        fetchOne: {
          payload: {},
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case AnyDayKenoBillActionTypes.FETCH_ONE_ANYDAY_KENO_BILL_SUCCESS:
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
