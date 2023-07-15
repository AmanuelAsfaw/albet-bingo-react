import { WeeklyReportsStateTypes, WeeklyReportsActionTypes } from "./WeeklyReport.type";
import { resetApiCallState } from "../../Utils";

const INITIAL_STATE: WeeklyReportsStateTypes = {
  fetchAll: resetApiCallState([]),
  fetchOne: resetApiCallState({}),
};

const WeeklyReportsReducer = (
  state: WeeklyReportsStateTypes = INITIAL_STATE,
  action: any
): WeeklyReportsStateTypes => {
  switch (action.type) {
    case WeeklyReportsActionTypes.FETCH_ALL_WEEKLY_REPORTS:{
      console.log('WeeklyReportsActionTypes.FETCH_ALL_WEEKLY_REPORTS');
      
      return {
        ...state,
        fetchAll: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };}
    case WeeklyReportsActionTypes.FETCH_ALL_WEEKLY_REPORTS_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case WeeklyReportsActionTypes.FETCH_ALL_WEEKLY_REPORTS_FAILURE:
      return {
        ...state,
        fetchAll: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case WeeklyReportsActionTypes.FETCH_ALL_WEEKLY_REPORTS_SUCCESS:
      return {
        ...state,
        fetchAll: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case WeeklyReportsActionTypes.FETCH_ONE_WEEKLY_REPORTS:
      return {
        ...state,
        fetchOne: {
          error: null,
          payload: {},
          isPending: true,
          isSuccessful: false,
        },
      };
    case WeeklyReportsActionTypes.FETCH_ONE_WEEKLY_REPORTS_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case WeeklyReportsActionTypes.FETCH_ONE_WEEKLY_REPORTS_FAILURE:
      return {
        ...state,
        fetchOne: {
          payload: {},
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case WeeklyReportsActionTypes.FETCH_ONE_WEEKLY_REPORTS_SUCCESS:
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

export default WeeklyReportsReducer;
