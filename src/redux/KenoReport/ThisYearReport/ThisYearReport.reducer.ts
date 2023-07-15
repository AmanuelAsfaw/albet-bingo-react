import { KenoThisYearReportSummaryStateTypes, KenoThisYearReportSummaryActionTypes } from "./ThisYearReport.type";
import { resetApiCallState } from "../../Utils";

const INITIAL_STATE: KenoThisYearReportSummaryStateTypes = {
  fetchAll: resetApiCallState([]),
  fetchOne: resetApiCallState({}),
};

const DataReducer = (
  state: KenoThisYearReportSummaryStateTypes = INITIAL_STATE,
  action: any
): KenoThisYearReportSummaryStateTypes => {
  switch (action.type) {
    case KenoThisYearReportSummaryActionTypes.FETCH_ALL_KENO_THIS_YEAR_REPORT_SUMMARY:
      return {
        ...state,
        fetchAll: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case KenoThisYearReportSummaryActionTypes.FETCH_ALL_KENO_THIS_YEAR_REPORT_SUMMARY_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case KenoThisYearReportSummaryActionTypes.FETCH_ALL_KENO_THIS_YEAR_REPORT_SUMMARY_FAILURE:
      return {
        ...state,
        fetchAll: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case KenoThisYearReportSummaryActionTypes.FETCH_ALL_KENO_THIS_YEAR_REPORT_SUMMARY_SUCCESS:
      return {
        ...state,
        fetchAll: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case KenoThisYearReportSummaryActionTypes.FETCH_ONE_KENO_THIS_YEAR_REPORT_SUMMARY:
      return {
        ...state,
        fetchOne: {
          error: null,
          payload: {},
          isPending: true,
          isSuccessful: false,
        },
      };
    case KenoThisYearReportSummaryActionTypes.FETCH_ONE_KENO_THIS_YEAR_REPORT_SUMMARY_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case KenoThisYearReportSummaryActionTypes.FETCH_ONE_KENO_THIS_YEAR_REPORT_SUMMARY_FAILURE:
      return {
        ...state,
        fetchOne: {
          payload: {},
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case KenoThisYearReportSummaryActionTypes.FETCH_ONE_KENO_THIS_YEAR_REPORT_SUMMARY_SUCCESS:
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
