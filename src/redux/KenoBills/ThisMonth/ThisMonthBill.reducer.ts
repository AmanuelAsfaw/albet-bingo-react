import { ThisMonthKenoBillStateTypes, ThisMonthKenoBillActionTypes } from "./ThisMonthBill.type";
import { resetApiCallState } from "../../Utils";

const INITIAL_STATE: ThisMonthKenoBillStateTypes = {
  fetchAll: resetApiCallState([]),
  fetchOne: resetApiCallState({}),
};

const DataReducer = (
  state: ThisMonthKenoBillStateTypes = INITIAL_STATE,
  action: any
): ThisMonthKenoBillStateTypes => {
  switch (action.type) {
    case ThisMonthKenoBillActionTypes.FETCH_ALL_THIS_MONTH_KENO_BILL:
      return {
        ...state,
        fetchAll: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case ThisMonthKenoBillActionTypes.FETCH_ALL_THIS_MONTH_KENO_BILL_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case ThisMonthKenoBillActionTypes.FETCH_ALL_THIS_MONTH_KENO_BILL_FAILURE:
      return {
        ...state,
        fetchAll: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case ThisMonthKenoBillActionTypes.FETCH_ALL_THIS_MONTH_KENO_BILL_SUCCESS:
      return {
        ...state,
        fetchAll: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case ThisMonthKenoBillActionTypes.FETCH_ONE_THIS_MONTH_KENO_BILL:
      return {
        ...state,
        fetchOne: {
          error: null,
          payload: {},
          isPending: true,
          isSuccessful: false,
        },
      };
    case ThisMonthKenoBillActionTypes.FETCH_ONE_THIS_MONTH_KENO_BILL_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case ThisMonthKenoBillActionTypes.FETCH_ONE_THIS_MONTH_KENO_BILL_FAILURE:
      return {
        ...state,
        fetchOne: {
          payload: {},
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case ThisMonthKenoBillActionTypes.FETCH_ONE_THIS_MONTH_KENO_BILL_SUCCESS:
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
