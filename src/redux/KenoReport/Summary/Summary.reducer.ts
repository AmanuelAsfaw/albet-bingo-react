import { KenoReportSummaryStateTypes, KenoReportSummaryActionTypes } from "./Summary.type";
import { resetApiCallState } from "../../Utils";

const INITIAL_STATE: KenoReportSummaryStateTypes = {
  fetchAll: resetApiCallState([]),
  fetchOne: resetApiCallState({}),
};

const DataReducer = (
  state: KenoReportSummaryStateTypes = INITIAL_STATE,
  action: any
): KenoReportSummaryStateTypes => {
  switch (action.type) {
    case KenoReportSummaryActionTypes.FETCH_ALL_KENO_REPORT_SUMMARY:
      return {
        ...state,
        fetchAll: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case KenoReportSummaryActionTypes.FETCH_ALL_KENO_REPORT_SUMMARY_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case KenoReportSummaryActionTypes.FETCH_ALL_KENO_REPORT_SUMMARY_FAILURE:
      return {
        ...state,
        fetchAll: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case KenoReportSummaryActionTypes.FETCH_ALL_KENO_REPORT_SUMMARY_SUCCESS:
      return {
        ...state,
        fetchAll: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case KenoReportSummaryActionTypes.FETCH_ONE_KENO_REPORT_SUMMARY:
      return {
        ...state,
        fetchOne: {
          error: null,
          payload: {},
          isPending: true,
          isSuccessful: false,
        },
      };
    case KenoReportSummaryActionTypes.FETCH_ONE_KENO_REPORT_SUMMARY_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case KenoReportSummaryActionTypes.FETCH_ONE_KENO_REPORT_SUMMARY_FAILURE:
      return {
        ...state,
        fetchOne: {
          payload: {},
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case KenoReportSummaryActionTypes.FETCH_ONE_KENO_REPORT_SUMMARY_SUCCESS:
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
