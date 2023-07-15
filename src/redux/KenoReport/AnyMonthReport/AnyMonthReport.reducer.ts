import { KenoAnyMonthReportSummaryStateTypes, KenoAnyMonthReportSummaryActionTypes } from "./AnyMonthReport.type";
import { resetApiCallState } from "../../Utils";

const INITIAL_STATE: KenoAnyMonthReportSummaryStateTypes = {
  fetchAll: resetApiCallState([]),
  fetchOne: resetApiCallState({}),
};

const DataReducer = (
  state: KenoAnyMonthReportSummaryStateTypes = INITIAL_STATE,
  action: any
): KenoAnyMonthReportSummaryStateTypes => {
  switch (action.type) {
    case KenoAnyMonthReportSummaryActionTypes.FETCH_ALL_KENO_ANY_MONTH_REPORT_SUMMARY:
      return {
        ...state,
        fetchAll: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case KenoAnyMonthReportSummaryActionTypes.FETCH_ALL_KENO_ANY_MONTH_REPORT_SUMMARY_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case KenoAnyMonthReportSummaryActionTypes.FETCH_ALL_KENO_ANY_MONTH_REPORT_SUMMARY_FAILURE:
      return {
        ...state,
        fetchAll: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case KenoAnyMonthReportSummaryActionTypes.FETCH_ALL_KENO_ANY_MONTH_REPORT_SUMMARY_SUCCESS:
      return {
        ...state,
        fetchAll: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case KenoAnyMonthReportSummaryActionTypes.FETCH_ONE_KENO_ANY_MONTH_REPORT_SUMMARY:
      return {
        ...state,
        fetchOne: {
          error: null,
          payload: {},
          isPending: true,
          isSuccessful: false,
        },
      };
    case KenoAnyMonthReportSummaryActionTypes.FETCH_ONE_KENO_ANY_MONTH_REPORT_SUMMARY_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case KenoAnyMonthReportSummaryActionTypes.FETCH_ONE_KENO_ANY_MONTH_REPORT_SUMMARY_FAILURE:
      return {
        ...state,
        fetchOne: {
          payload: {},
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case KenoAnyMonthReportSummaryActionTypes.FETCH_ONE_KENO_ANY_MONTH_REPORT_SUMMARY_SUCCESS:
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
