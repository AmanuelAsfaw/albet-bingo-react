import { KenoTodayBillStateTypes, KenoTodayBillActionTypes } from "./TodayBill.type";
import { resetApiCallState } from "../../Utils";

const INITIAL_STATE: KenoTodayBillStateTypes = {
  fetchAll: resetApiCallState([]),
  fetchOne: resetApiCallState({}),
};

const DataReducer = (
  state: KenoTodayBillStateTypes = INITIAL_STATE,
  action: any
): KenoTodayBillStateTypes => {
  switch (action.type) {
    case KenoTodayBillActionTypes.FETCH_ALL_KENO_TODAY_BILL:
      return {
        ...state,
        fetchAll: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case KenoTodayBillActionTypes.FETCH_ALL_KENO_TODAY_BILL_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case KenoTodayBillActionTypes.FETCH_ALL_KENO_TODAY_BILL_FAILURE:
      return {
        ...state,
        fetchAll: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case KenoTodayBillActionTypes.FETCH_ALL_KENO_TODAY_BILL_SUCCESS:
      return {
        ...state,
        fetchAll: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case KenoTodayBillActionTypes.FETCH_ONE_KENO_TODAY_BILL:
      return {
        ...state,
        fetchOne: {
          error: null,
          payload: {},
          isPending: true,
          isSuccessful: false,
        },
      };
    case KenoTodayBillActionTypes.FETCH_ONE_KENO_TODAY_BILL_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case KenoTodayBillActionTypes.FETCH_ONE_KENO_TODAY_BILL_FAILURE:
      return {
        ...state,
        fetchOne: {
          payload: {},
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case KenoTodayBillActionTypes.FETCH_ONE_KENO_TODAY_BILL_SUCCESS:
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
