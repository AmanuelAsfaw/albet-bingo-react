import {
  MonthlyReportStateTypes,
  MonthlyReportActionTypes,
} from "./MonthlyReport.type";
import { resetApiCallState } from "../Utils";

const INITIAL_STATE: MonthlyReportStateTypes = {
  fetchAll: resetApiCallState([]),
  fetchOne: resetApiCallState({}),
};

const MonthlyReportReducer = (
  state: MonthlyReportStateTypes = INITIAL_STATE,
  action: any
): MonthlyReportStateTypes => {
  switch (action.type) {
    case MonthlyReportActionTypes.FETCH_ALL_MONTHLY_REPORT:
      return {
        ...state,
        fetchAll: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case MonthlyReportActionTypes.FETCH_ALL_MONTHLY_REPORT_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case MonthlyReportActionTypes.FETCH_ALL_MONTHLY_REPORT_FAILURE:
      return {
        ...state,
        fetchAll: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case MonthlyReportActionTypes.FETCH_ALL_MONTHLY_REPORT_SUCCESS:
      return {
        ...state,
        fetchAll: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case MonthlyReportActionTypes.FETCH_ONE_MONTHLY_REPORT:
      return {
        ...state,
        fetchOne: {
          error: null,
          payload: {},
          isPending: true,
          isSuccessful: false,
        },
      };
    case MonthlyReportActionTypes.FETCH_ONE_MONTHLY_REPORT_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case MonthlyReportActionTypes.FETCH_ONE_MONTHLY_REPORT_FAILURE:
      return {
        ...state,
        fetchOne: {
          payload: {},
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case MonthlyReportActionTypes.FETCH_ONE_MONTHLY_REPORT_SUCCESS:
      return {
        ...state,
        fetchOne: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case MonthlyReportActionTypes.SET_MONTHLY_REPORT:
      return {
        ...state,
        fetchAll: {
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

export default MonthlyReportReducer;
