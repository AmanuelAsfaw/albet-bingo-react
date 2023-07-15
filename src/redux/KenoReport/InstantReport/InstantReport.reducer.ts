import { KenoInstantReportSummaryStateTypes, KenoInstantReportSummaryActionTypes } from "./InstantReport.type";
import { resetApiCallState } from "../../Utils";

const INITIAL_STATE: KenoInstantReportSummaryStateTypes = {
  fetchAll: resetApiCallState([]),
  fetchOne: resetApiCallState({}),
};

const DataReducer = (
  state: KenoInstantReportSummaryStateTypes = INITIAL_STATE,
  action: any
): KenoInstantReportSummaryStateTypes => {
  switch (action.type) {
    case KenoInstantReportSummaryActionTypes.FETCH_ALL_KENO_INSTANT_REPORT_SUMMARY:
      return {
        ...state,
        fetchAll: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case KenoInstantReportSummaryActionTypes.FETCH_ALL_KENO_INSTANT_REPORT_SUMMARY_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case KenoInstantReportSummaryActionTypes.FETCH_ALL_KENO_INSTANT_REPORT_SUMMARY_FAILURE:
      return {
        ...state,
        fetchAll: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case KenoInstantReportSummaryActionTypes.FETCH_ALL_KENO_INSTANT_REPORT_SUMMARY_SUCCESS:
      return {
        ...state,
        fetchAll: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case KenoInstantReportSummaryActionTypes.FETCH_ONE_KENO_INSTANT_REPORT_SUMMARY:
      return {
        ...state,
        fetchOne: {
          error: null,
          payload: {},
          isPending: true,
          isSuccessful: false,
        },
      };
    case KenoInstantReportSummaryActionTypes.FETCH_ONE_KENO_INSTANT_REPORT_SUMMARY_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case KenoInstantReportSummaryActionTypes.FETCH_ONE_KENO_INSTANT_REPORT_SUMMARY_FAILURE:
      return {
        ...state,
        fetchOne: {
          payload: {},
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case KenoInstantReportSummaryActionTypes.FETCH_ONE_KENO_INSTANT_REPORT_SUMMARY_SUCCESS:
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
