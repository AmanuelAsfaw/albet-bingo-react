import { AnyMonthKenoBillStateTypes, AnyMonthKenoBillActionTypes } from "./AnyMonthBill.type";
import { resetApiCallState } from "../../Utils";

const INITIAL_STATE: AnyMonthKenoBillStateTypes = {
  fetchAll: resetApiCallState([]),
  fetchOne: resetApiCallState({}),
};

const DataReducer = (
  state: AnyMonthKenoBillStateTypes = INITIAL_STATE,
  action: any
): AnyMonthKenoBillStateTypes => {
  switch (action.type) {
    case AnyMonthKenoBillActionTypes.FETCH_ALL_ANY_MONTH_KENO_BILL:
      return {
        ...state,
        fetchAll: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case AnyMonthKenoBillActionTypes.FETCH_ALL_ANY_MONTH_KENO_BILL_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case AnyMonthKenoBillActionTypes.FETCH_ALL_ANY_MONTH_KENO_BILL_FAILURE:
      return {
        ...state,
        fetchAll: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case AnyMonthKenoBillActionTypes.FETCH_ALL_ANY_MONTH_KENO_BILL_SUCCESS:
      return {
        ...state,
        fetchAll: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case AnyMonthKenoBillActionTypes.FETCH_ONE_ANY_MONTH_KENO_BILL:
      return {
        ...state,
        fetchOne: {
          error: null,
          payload: {},
          isPending: true,
          isSuccessful: false,
        },
      };
    case AnyMonthKenoBillActionTypes.FETCH_ONE_ANY_MONTH_KENO_BILL_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case AnyMonthKenoBillActionTypes.FETCH_ONE_ANY_MONTH_KENO_BILL_FAILURE:
      return {
        ...state,
        fetchOne: {
          payload: {},
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case AnyMonthKenoBillActionTypes.FETCH_ONE_ANY_MONTH_KENO_BILL_SUCCESS:
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
