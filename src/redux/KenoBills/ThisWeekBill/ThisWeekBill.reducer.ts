import { ThisWeekKenoBillStateTypes, ThisWeekKenoBillActionTypes } from "./ThisWeekBill.type";
import { resetApiCallState } from "../../Utils";

const INITIAL_STATE: ThisWeekKenoBillStateTypes = {
  fetchAll: resetApiCallState([]),
  fetchOne: resetApiCallState({}),
};

const DataReducer = (
  state: ThisWeekKenoBillStateTypes = INITIAL_STATE,
  action: any
): ThisWeekKenoBillStateTypes => {
  switch (action.type) {
    case ThisWeekKenoBillActionTypes.FETCH_ALL_THIS_WEEK_KENO_BILL:
      return {
        ...state,
        fetchAll: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case ThisWeekKenoBillActionTypes.FETCH_ALL_THIS_WEEK_KENO_BILL_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case ThisWeekKenoBillActionTypes.FETCH_ALL_THIS_WEEK_KENO_BILL_FAILURE:
      return {
        ...state,
        fetchAll: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case ThisWeekKenoBillActionTypes.FETCH_ALL_THIS_WEEK_KENO_BILL_SUCCESS:
      return {
        ...state,
        fetchAll: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case ThisWeekKenoBillActionTypes.FETCH_ONE_THIS_WEEK_KENO_BILL:
      return {
        ...state,
        fetchOne: {
          error: null,
          payload: {},
          isPending: true,
          isSuccessful: false,
        },
      };
    case ThisWeekKenoBillActionTypes.FETCH_ONE_THIS_WEEK_KENO_BILL_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case ThisWeekKenoBillActionTypes.FETCH_ONE_THIS_WEEK_KENO_BILL_FAILURE:
      return {
        ...state,
        fetchOne: {
          payload: {},
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case ThisWeekKenoBillActionTypes.FETCH_ONE_THIS_WEEK_KENO_BILL_SUCCESS:
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
