import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";

import { API_BASE_URI } from "../ApiCall";
import { WeeklyPlanReportActionTypes } from "./WeeklyPlanReport.type";

export function* fetchAllWeeklyPlanReports(action: any): any {
  try {
    let query = "";
    if (action.payload) {
      const keys = Object.keys(action.payload);
      query = keys.map((key) => `${key}=${action.payload[key]}`).join("&");
    }
    const response = yield axios.get(
      `${API_BASE_URI}/weekly_plan_report?${query}`
    );
    yield put({
      type: WeeklyPlanReportActionTypes.FETCH_ALL_WEEKLY_PLAN_REPORT_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: WeeklyPlanReportActionTypes.FETCH_ALL_WEEKLY_PLAN_REPORT_FAILURE,
      payload: error,
    });
  }
}

export function* fetchPagedWeeklyPlanReports(action: any): any {
  try {
    let query = "";
    if (action.payload) {
      const keys = Object.keys(action.payload);
      query = keys.map((key) => `${key}=${action.payload[key]}`).join("&");
    }
    const response = yield axios.get(
      `${API_BASE_URI}/weekly_plan_report?${query}`
    );
    yield put({
      type: WeeklyPlanReportActionTypes.FETCH_PAGED_WEEKLY_PLAN_REPORT_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: WeeklyPlanReportActionTypes.FETCH_PAGED_WEEKLY_PLAN_REPORT_FAILURE,
      payload: error,
    });
  }
}

export function* fetchOneWeeklyPlanReports(action: any): any {
  try {
    const response = yield axios.get(
      `${API_BASE_URI}/weekly_plan_report/${action.payload}`
    );
    yield put({
      type: WeeklyPlanReportActionTypes.FETCH_ONE_WEEKLY_PLAN_REPORT_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: WeeklyPlanReportActionTypes.FETCH_ONE_WEEKLY_PLAN_REPORT_FAILURE,
      payload: error,
    });
  }
}

export function* watcherFetchAllWeeklyPlanReports() {
  yield takeLatest(
    WeeklyPlanReportActionTypes.FETCH_ALL_WEEKLY_PLAN_REPORT,
    fetchAllWeeklyPlanReports
  );
}

export function* watcherFetchPagedWeeklyPlanReports() {
  yield takeLatest(
    WeeklyPlanReportActionTypes.FETCH_PAGED_WEEKLY_PLAN_REPORT,
    fetchPagedWeeklyPlanReports
  );
}

export function* watcherFetchOneWeeklyPlanReports() {
  yield takeLatest(
    WeeklyPlanReportActionTypes.FETCH_ONE_WEEKLY_PLAN_REPORT,
    fetchOneWeeklyPlanReports
  );
}
