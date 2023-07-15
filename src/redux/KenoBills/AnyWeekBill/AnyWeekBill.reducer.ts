import { AnyWeekKenoBillStateTypes, AnyWeekKenoBillActionTypes } from "./AnyWeekBill.type";
import { resetApiCallState } from "../../Utils";

const INITIAL_STATE: AnyWeekKenoBillStateTypes = {
  fetchAll: resetApiCallState([]),
  fetchOne: resetApiCallState({}),
};

const DataReducer = (
  state: AnyWeekKenoBillStateTypes = INITIAL_STATE,
  action: any
): AnyWeekKenoBillStateTypes => {
  switch (action.type) {
    case AnyWeekKenoBillActionTypes.FETCH_ALL_ANY_WEEK_KENO_BILL:
      return {
        ...state,
        fetchAll: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case AnyWeekKenoBillActionTypes.FETCH_ALL_ANY_WEEK_KENO_BILL_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case AnyWeekKenoBillActionTypes.FETCH_ALL_ANY_WEEK_KENO_BILL_FAILURE:
      return {
        ...state,
        fetchAll: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case AnyWeekKenoBillActionTypes.FETCH_ALL_ANY_WEEK_KENO_BILL_SUCCESS:
      return {
        ...state,
        fetchAll: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case AnyWeekKenoBillActionTypes.FETCH_ONE_ANY_WEEK_KENO_BILL:
      return {
        ...state,
        fetchOne: {
          error: null,
          payload: {},
          isPending: true,
          isSuccessful: false,
        },
      };
    case AnyWeekKenoBillActionTypes.FETCH_ONE_ANY_WEEK_KENO_BILL_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case AnyWeekKenoBillActionTypes.FETCH_ONE_ANY_WEEK_KENO_BILL_FAILURE:
      return {
        ...state,
        fetchOne: {
          payload: {},
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case AnyWeekKenoBillActionTypes.FETCH_ONE_ANY_WEEK_KENO_BILL_SUCCESS:
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
