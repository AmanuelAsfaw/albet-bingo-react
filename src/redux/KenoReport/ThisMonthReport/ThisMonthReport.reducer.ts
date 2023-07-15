import { KenoThisMonthReportSummaryStateTypes, KenoThisMonthReportSummaryActionTypes } from "./ThisMonthReport.type";
import { resetApiCallState } from "../../Utils";

const INITIAL_STATE: KenoThisMonthReportSummaryStateTypes = {
  fetchAll: resetApiCallState([]),
  fetchOne: resetApiCallState({}),
};

const DataReducer = (
  state: KenoThisMonthReportSummaryStateTypes = INITIAL_STATE,
  action: any
): KenoThisMonthReportSummaryStateTypes => {
  switch (action.type) {
    case KenoThisMonthReportSummaryActionTypes.FETCH_ALL_KENO_THIS_MONTH_REPORT_SUMMARY:
      return {
        ...state,
        fetchAll: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case KenoThisMonthReportSummaryActionTypes.FETCH_ALL_KENO_THIS_MONTH_REPORT_SUMMARY_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case KenoThisMonthReportSummaryActionTypes.FETCH_ALL_KENO_THIS_MONTH_REPORT_SUMMARY_FAILURE:
      return {
        ...state,
        fetchAll: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case KenoThisMonthReportSummaryActionTypes.FETCH_ALL_KENO_THIS_MONTH_REPORT_SUMMARY_SUCCESS:
      return {
        ...state,
        fetchAll: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case KenoThisMonthReportSummaryActionTypes.FETCH_ONE_KENO_THIS_MONTH_REPORT_SUMMARY:
      return {
        ...state,
        fetchOne: {
          error: null,
          payload: {},
          isPending: true,
          isSuccessful: false,
        },
      };
    case KenoThisMonthReportSummaryActionTypes.FETCH_ONE_KENO_THIS_MONTH_REPORT_SUMMARY_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case KenoThisMonthReportSummaryActionTypes.FETCH_ONE_KENO_THIS_MONTH_REPORT_SUMMARY_FAILURE:
      return {
        ...state,
        fetchOne: {
          payload: {},
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case KenoThisMonthReportSummaryActionTypes.FETCH_ONE_KENO_THIS_MONTH_REPORT_SUMMARY_SUCCESS:
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
