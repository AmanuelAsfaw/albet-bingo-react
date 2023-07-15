import { KenoAnyWeekReportSummaryStateTypes, KenoAnyWeekReportSummaryActionTypes } from "./AnyWeekReport.type";
import { resetApiCallState } from "../../Utils";

const INITIAL_STATE: KenoAnyWeekReportSummaryStateTypes = {
  fetchAll: resetApiCallState([]),
  fetchOne: resetApiCallState({}),
};

const DataReducer = (
  state: KenoAnyWeekReportSummaryStateTypes = INITIAL_STATE,
  action: any
): KenoAnyWeekReportSummaryStateTypes => {
  switch (action.type) {
    case KenoAnyWeekReportSummaryActionTypes.FETCH_ALL_KENO_ANY_WEEK_REPORT_SUMMARY:
      return {
        ...state,
        fetchAll: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case KenoAnyWeekReportSummaryActionTypes.FETCH_ALL_KENO_ANY_WEEK_REPORT_SUMMARY_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case KenoAnyWeekReportSummaryActionTypes.FETCH_ALL_KENO_ANY_WEEK_REPORT_SUMMARY_FAILURE:
      return {
        ...state,
        fetchAll: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case KenoAnyWeekReportSummaryActionTypes.FETCH_ALL_KENO_ANY_WEEK_REPORT_SUMMARY_SUCCESS:
      return {
        ...state,
        fetchAll: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case KenoAnyWeekReportSummaryActionTypes.FETCH_ONE_KENO_ANY_WEEK_REPORT_SUMMARY:
      return {
        ...state,
        fetchOne: {
          error: null,
          payload: {},
          isPending: true,
          isSuccessful: false,
        },
      };
    case KenoAnyWeekReportSummaryActionTypes.FETCH_ONE_KENO_ANY_WEEK_REPORT_SUMMARY_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case KenoAnyWeekReportSummaryActionTypes.FETCH_ONE_KENO_ANY_WEEK_REPORT_SUMMARY_FAILURE:
      return {
        ...state,
        fetchOne: {
          payload: {},
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case KenoAnyWeekReportSummaryActionTypes.FETCH_ONE_KENO_ANY_WEEK_REPORT_SUMMARY_SUCCESS:
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
