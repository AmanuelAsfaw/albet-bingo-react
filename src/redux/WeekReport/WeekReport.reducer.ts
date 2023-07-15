import { WeekReportStateTypes, WeekReportActionTypes } from "./WeekReport.type";
import { resetApiCallState } from "../Utils";

const INITIAL_STATE: WeekReportStateTypes = {
  fetchAll: resetApiCallState([]),
};

const WeekReportReducer = (
  state: WeekReportStateTypes = INITIAL_STATE,
  action: any
): WeekReportStateTypes => {
  switch (action.type) {
    case WeekReportActionTypes.FETCH_ALL_WEEK_REPORT:
      return {
        ...state,
        fetchAll: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case WeekReportActionTypes.FETCH_ALL_WEEK_REPORT_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case WeekReportActionTypes.FETCH_ALL_WEEK_REPORT_FAILURE:
      return {
        ...state,
        fetchAll: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case WeekReportActionTypes.FETCH_ALL_WEEK_REPORT_SUCCESS:
      return {
        ...state,
        fetchAll: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case WeekReportActionTypes.SET_WEEK_REPORT:
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

export default WeekReportReducer;
