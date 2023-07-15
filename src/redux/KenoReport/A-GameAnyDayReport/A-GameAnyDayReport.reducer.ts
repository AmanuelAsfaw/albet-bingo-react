import { KenoAnyDayByGameReportSummaryStateTypes, KenoAnyDayByGameReportSummaryActionTypes } from "./A-GameAnyDayReport.type";
import { resetApiCallState } from "../../Utils";

const INITIAL_STATE: KenoAnyDayByGameReportSummaryStateTypes = {
  fetchAll: resetApiCallState([]),
  fetchOne: resetApiCallState({}),
};

const DataReducer = (
  state: KenoAnyDayByGameReportSummaryStateTypes = INITIAL_STATE,
  action: any
): KenoAnyDayByGameReportSummaryStateTypes => {
  switch (action.type) {
    case KenoAnyDayByGameReportSummaryActionTypes.FETCH_ALL_KENO_ANY_DAY_BY_GAME_REPORT_SUMMARY:
      return {
        ...state,
        fetchAll: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case KenoAnyDayByGameReportSummaryActionTypes.FETCH_ALL_KENO_ANY_DAY_BY_GAME_REPORT_SUMMARY_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case KenoAnyDayByGameReportSummaryActionTypes.FETCH_ALL_KENO_ANY_DAY_BY_GAME_REPORT_SUMMARY_FAILURE:
      return {
        ...state,
        fetchAll: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case KenoAnyDayByGameReportSummaryActionTypes.FETCH_ALL_KENO_ANY_DAY_BY_GAME_REPORT_SUMMARY_SUCCESS:
      return {
        ...state,
        fetchAll: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case KenoAnyDayByGameReportSummaryActionTypes.FETCH_ONE_KENO_ANY_DAY_BY_GAME_REPORT_SUMMARY:
      return {
        ...state,
        fetchOne: {
          error: null,
          payload: {},
          isPending: true,
          isSuccessful: false,
        },
      };
    case KenoAnyDayByGameReportSummaryActionTypes.FETCH_ONE_KENO_ANY_DAY_BY_GAME_REPORT_SUMMARY_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case KenoAnyDayByGameReportSummaryActionTypes.FETCH_ONE_KENO_ANY_DAY_BY_GAME_REPORT_SUMMARY_FAILURE:
      return {
        ...state,
        fetchOne: {
          payload: {},
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case KenoAnyDayByGameReportSummaryActionTypes.FETCH_ONE_KENO_ANY_DAY_BY_GAME_REPORT_SUMMARY_SUCCESS:
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
