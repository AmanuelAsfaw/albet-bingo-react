import { KenoThisWeekReportSummaryStateTypes, KenoThisWeekReportSummaryActionTypes } from "./ThisWeekReport.type";
import { resetApiCallState } from "../../Utils";

const INITIAL_STATE: KenoThisWeekReportSummaryStateTypes = {
  fetchAll: resetApiCallState([]),
  fetchOne: resetApiCallState({}),
};

const DataReducer = (
  state: KenoThisWeekReportSummaryStateTypes = INITIAL_STATE,
  action: any
): KenoThisWeekReportSummaryStateTypes => {
  switch (action.type) {
    case KenoThisWeekReportSummaryActionTypes.FETCH_ALL_KENO_THIS_WEEK_REPORT_SUMMARY:
      return {
        ...state,
        fetchAll: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case KenoThisWeekReportSummaryActionTypes.FETCH_ALL_KENO_THIS_WEEK_REPORT_SUMMARY_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case KenoThisWeekReportSummaryActionTypes.FETCH_ALL_KENO_THIS_WEEK_REPORT_SUMMARY_FAILURE:
      return {
        ...state,
        fetchAll: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case KenoThisWeekReportSummaryActionTypes.FETCH_ALL_KENO_THIS_WEEK_REPORT_SUMMARY_SUCCESS:
      return {
        ...state,
        fetchAll: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case KenoThisWeekReportSummaryActionTypes.FETCH_ONE_KENO_THIS_WEEK_REPORT_SUMMARY:
      return {
        ...state,
        fetchOne: {
          error: null,
          payload: {},
          isPending: true,
          isSuccessful: false,
        },
      };
    case KenoThisWeekReportSummaryActionTypes.FETCH_ONE_KENO_THIS_WEEK_REPORT_SUMMARY_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case KenoThisWeekReportSummaryActionTypes.FETCH_ONE_KENO_THIS_WEEK_REPORT_SUMMARY_FAILURE:
      return {
        ...state,
        fetchOne: {
          payload: {},
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case KenoThisWeekReportSummaryActionTypes.FETCH_ONE_KENO_THIS_WEEK_REPORT_SUMMARY_SUCCESS:
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
