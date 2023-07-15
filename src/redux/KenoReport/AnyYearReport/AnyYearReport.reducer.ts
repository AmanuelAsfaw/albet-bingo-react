import { KenoAnyYearReportSummaryStateTypes, KenoAnyYearReportSummaryActionTypes } from "./AnyYearReport.type";
import { resetApiCallState } from "../../Utils";

const INITIAL_STATE: KenoAnyYearReportSummaryStateTypes = {
  fetchAll: resetApiCallState([]),
  fetchOne: resetApiCallState({}),
};

const DataReducer = (
  state: KenoAnyYearReportSummaryStateTypes = INITIAL_STATE,
  action: any
): KenoAnyYearReportSummaryStateTypes => {
  switch (action.type) {
    case KenoAnyYearReportSummaryActionTypes.FETCH_ALL_KENO_ANY_YEAR_REPORT_SUMMARY:
      return {
        ...state,
        fetchAll: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case KenoAnyYearReportSummaryActionTypes.FETCH_ALL_KENO_ANY_YEAR_REPORT_SUMMARY_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case KenoAnyYearReportSummaryActionTypes.FETCH_ALL_KENO_ANY_YEAR_REPORT_SUMMARY_FAILURE:
      return {
        ...state,
        fetchAll: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case KenoAnyYearReportSummaryActionTypes.FETCH_ALL_KENO_ANY_YEAR_REPORT_SUMMARY_SUCCESS:
      return {
        ...state,
        fetchAll: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case KenoAnyYearReportSummaryActionTypes.FETCH_ONE_KENO_ANY_YEAR_REPORT_SUMMARY:
      return {
        ...state,
        fetchOne: {
          error: null,
          payload: {},
          isPending: true,
          isSuccessful: false,
        },
      };
    case KenoAnyYearReportSummaryActionTypes.FETCH_ONE_KENO_ANY_YEAR_REPORT_SUMMARY_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case KenoAnyYearReportSummaryActionTypes.FETCH_ONE_KENO_ANY_YEAR_REPORT_SUMMARY_FAILURE:
      return {
        ...state,
        fetchOne: {
          payload: {},
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case KenoAnyYearReportSummaryActionTypes.FETCH_ONE_KENO_ANY_YEAR_REPORT_SUMMARY_SUCCESS:
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
