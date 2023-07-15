import { KenoA_GameReportSummaryStateTypes, KenoA_GameReportSummaryActionTypes } from "./A-GameReport.type";
import { resetApiCallState } from "../../Utils";

const INITIAL_STATE: KenoA_GameReportSummaryStateTypes = {
  fetchAll: resetApiCallState([]),
  fetchOne: resetApiCallState({}),
};

const DataReducer = (
  state: KenoA_GameReportSummaryStateTypes = INITIAL_STATE,
  action: any
): KenoA_GameReportSummaryStateTypes => {
  switch (action.type) {
    case KenoA_GameReportSummaryActionTypes.FETCH_ALL_KENO_A_GAME_REPORT_SUMMARY:
      return {
        ...state,
        fetchAll: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case KenoA_GameReportSummaryActionTypes.FETCH_ALL_KENO_A_GAME_REPORT_SUMMARY_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case KenoA_GameReportSummaryActionTypes.FETCH_ALL_KENO_A_GAME_REPORT_SUMMARY_FAILURE:
      return {
        ...state,
        fetchAll: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case KenoA_GameReportSummaryActionTypes.FETCH_ALL_KENO_A_GAME_REPORT_SUMMARY_SUCCESS:
      return {
        ...state,
        fetchAll: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case KenoA_GameReportSummaryActionTypes.FETCH_ONE_KENO_A_GAME_REPORT_SUMMARY:
      return {
        ...state,
        fetchOne: {
          error: null,
          payload: {},
          isPending: true,
          isSuccessful: false,
        },
      };
    case KenoA_GameReportSummaryActionTypes.FETCH_ONE_KENO_A_GAME_REPORT_SUMMARY_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case KenoA_GameReportSummaryActionTypes.FETCH_ONE_KENO_A_GAME_REPORT_SUMMARY_FAILURE:
      return {
        ...state,
        fetchOne: {
          payload: {},
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case KenoA_GameReportSummaryActionTypes.FETCH_ONE_KENO_A_GAME_REPORT_SUMMARY_SUCCESS:
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
