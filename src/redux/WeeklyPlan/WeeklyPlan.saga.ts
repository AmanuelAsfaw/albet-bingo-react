import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";

import { API_BASE_URI } from "../ApiCall";
import { WeeklyPlanActionTypes } from "./WeeklyPlan.type";

export function* fetchAllWeeklyPlans(action: any): any {
  try {
    let keys: any[] = Object.keys(action.payload);
    let query = keys
      .map((key: any) => `${key}=${action.payload[key]}`)
      .join("&&");

    const response = yield axios.get(`${API_BASE_URI}/weekly-plan?${query}`);
    yield put({
      type: WeeklyPlanActionTypes.FETCH_ALL_WEEKLY_PLAN_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: WeeklyPlanActionTypes.FETCH_ALL_WEEKLY_PLAN_FAILURE,
      payload: error,
    });
  }
}

export function* fetchOneWeeklyPlans(action: any): any {
  try {
    let keys: any[] = Object.keys(action.payload);
    let query = keys
      .map((key: any) => `${key}=${action.payload[key]}`)
      .join("&&");
    const response = yield axios.get(
      `${API_BASE_URI}/weekly-plan/find-one?${query}`
    );
    yield put({
      type: WeeklyPlanActionTypes.FETCH_ONE_WEEKLY_PLAN_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: WeeklyPlanActionTypes.FETCH_ONE_WEEKLY_PLAN_FAILURE,
      payload: error,
    });
  }
}

export function* watcherFetchAllWeeklyPlans() {
  yield takeLatest(
    WeeklyPlanActionTypes.FETCH_ALL_WEEKLY_PLAN,
    fetchAllWeeklyPlans
  );
}

export function* watcherFetchOneWeeklyPlans() {
  yield takeLatest(
    WeeklyPlanActionTypes.FETCH_ONE_WEEKLY_PLAN,
    fetchOneWeeklyPlans
  );
}
