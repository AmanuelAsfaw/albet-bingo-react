import { InitPagedData } from "./../Utils";
import {
  WeeklyPlanReportStateTypes,
  WeeklyPlanReportActionTypes,
} from "./WeeklyPlanReport.type";
import { resetApiCallState } from "../Utils";

const INITIAL_STATE: WeeklyPlanReportStateTypes = {
  fetchAll: resetApiCallState([]),
  fetchOne: resetApiCallState({}),
  fetchPaged: resetApiCallState(InitPagedData),
};

const WeeklyPlanReportReducer = (
  state: WeeklyPlanReportStateTypes = INITIAL_STATE,
  action: any
): WeeklyPlanReportStateTypes => {
  switch (action.type) {
    case WeeklyPlanReportActionTypes.FETCH_ALL_WEEKLY_PLAN_REPORT:
      return {
        ...state,
        fetchAll: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case WeeklyPlanReportActionTypes.FETCH_ALL_WEEKLY_PLAN_REPORT_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case WeeklyPlanReportActionTypes.FETCH_ALL_WEEKLY_PLAN_REPORT_FAILURE:
      return {
        ...state,
        fetchAll: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case WeeklyPlanReportActionTypes.FETCH_ALL_WEEKLY_PLAN_REPORT_SUCCESS:
      return {
        ...state,
        fetchAll: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };
    case WeeklyPlanReportActionTypes.FETCH_PAGED_WEEKLY_PLAN_REPORT:
      return {
        ...state,
        fetchPaged: {
          error: null,
          payload: InitPagedData,
          isPending: true,
          isSuccessful: false,
        },
      };
    case WeeklyPlanReportActionTypes.FETCH_PAGED_WEEKLY_PLAN_REPORT_RESET:
      return {
        ...state,
        fetchPaged: resetApiCallState(InitPagedData),
      };
    case WeeklyPlanReportActionTypes.FETCH_PAGED_WEEKLY_PLAN_REPORT_FAILURE:
      return {
        ...state,
        fetchPaged: {
          payload: InitPagedData,
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case WeeklyPlanReportActionTypes.FETCH_PAGED_WEEKLY_PLAN_REPORT_SUCCESS:
      return {
        ...state,
        fetchPaged: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case WeeklyPlanReportActionTypes.FETCH_ONE_WEEKLY_PLAN_REPORT:
      return {
        ...state,
        fetchOne: {
          error: null,
          payload: {},
          isPending: true,
          isSuccessful: false,
        },
      };
    case WeeklyPlanReportActionTypes.FETCH_ONE_WEEKLY_PLAN_REPORT_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case WeeklyPlanReportActionTypes.FETCH_ONE_WEEKLY_PLAN_REPORT_FAILURE:
      return {
        ...state,
        fetchOne: {
          payload: {},
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case WeeklyPlanReportActionTypes.FETCH_ONE_WEEKLY_PLAN_REPORT_SUCCESS:
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

export default WeeklyPlanReportReducer;
