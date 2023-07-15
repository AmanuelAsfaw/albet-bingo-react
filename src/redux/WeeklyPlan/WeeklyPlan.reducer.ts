import { WeeklyPlanStateTypes, WeeklyPlanActionTypes } from "./WeeklyPlan.type";
import { resetApiCallState } from "../Utils";

const INITIAL_STATE: WeeklyPlanStateTypes = {
  fetchAll: resetApiCallState([]),
  fetchOne: resetApiCallState({}),
};

const WeeklyPlanReducer = (
  state: WeeklyPlanStateTypes = INITIAL_STATE,
  action: any
): WeeklyPlanStateTypes => {
  switch (action.type) {
    case WeeklyPlanActionTypes.FETCH_ALL_WEEKLY_PLAN:
      return {
        ...state,
        fetchAll: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case WeeklyPlanActionTypes.FETCH_ALL_WEEKLY_PLAN_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case WeeklyPlanActionTypes.FETCH_ALL_WEEKLY_PLAN_FAILURE:
      return {
        ...state,
        fetchAll: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case WeeklyPlanActionTypes.FETCH_ALL_WEEKLY_PLAN_SUCCESS:
      return {
        ...state,
        fetchAll: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case WeeklyPlanActionTypes.FETCH_ONE_WEEKLY_PLAN:
      return {
        ...state,
        fetchOne: {
          error: null,
          payload: {},
          isPending: true,
          isSuccessful: false,
        },
      };
    case WeeklyPlanActionTypes.FETCH_ONE_WEEKLY_PLAN_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case WeeklyPlanActionTypes.FETCH_ONE_WEEKLY_PLAN_FAILURE:
      return {
        ...state,
        fetchOne: {
          payload: {},
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case WeeklyPlanActionTypes.FETCH_ONE_WEEKLY_PLAN_SUCCESS:
      return {
        ...state,
        fetchOne: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case WeeklyPlanActionTypes.SET_WEEKLY_PLAN:
      return {
        ...state,
        fetchAll: {
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

export default WeeklyPlanReducer;
