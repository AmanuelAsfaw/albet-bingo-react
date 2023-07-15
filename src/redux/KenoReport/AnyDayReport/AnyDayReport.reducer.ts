import { KenoAnyDayReportSummaryStateTypes, KenoAnyDayReportSummaryActionTypes } from "./AnyDayReport.type";
import { resetApiCallState } from "../../Utils";

const INITIAL_STATE: KenoAnyDayReportSummaryStateTypes = {
  fetchAll: resetApiCallState([]),
  fetchOne: resetApiCallState({}),
};

const DataReducer = (
  state: KenoAnyDayReportSummaryStateTypes = INITIAL_STATE,
  action: any
): KenoAnyDayReportSummaryStateTypes => {
  switch (action.type) {
    case KenoAnyDayReportSummaryActionTypes.FETCH_ALL_KENO_ANY_DAY_REPORT_SUMMARY:
      return {
        ...state,
        fetchAll: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case KenoAnyDayReportSummaryActionTypes.FETCH_ALL_KENO_ANY_DAY_REPORT_SUMMARY_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case KenoAnyDayReportSummaryActionTypes.FETCH_ALL_KENO_ANY_DAY_REPORT_SUMMARY_FAILURE:
      return {
        ...state,
        fetchAll: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case KenoAnyDayReportSummaryActionTypes.FETCH_ALL_KENO_ANY_DAY_REPORT_SUMMARY_SUCCESS:
      return {
        ...state,
        fetchAll: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case KenoAnyDayReportSummaryActionTypes.FETCH_ONE_KENO_ANY_DAY_REPORT_SUMMARY:
      return {
        ...state,
        fetchOne: {
          error: null,
          payload: {},
          isPending: true,
          isSuccessful: false,
        },
      };
    case KenoAnyDayReportSummaryActionTypes.FETCH_ONE_KENO_ANY_DAY_REPORT_SUMMARY_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case KenoAnyDayReportSummaryActionTypes.FETCH_ONE_KENO_ANY_DAY_REPORT_SUMMARY_FAILURE:
      return {
        ...state,
        fetchOne: {
          payload: {},
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case KenoAnyDayReportSummaryActionTypes.FETCH_ONE_KENO_ANY_DAY_REPORT_SUMMARY_SUCCESS:
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
