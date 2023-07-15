import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";

import { API_BASE_URI } from "../ApiCall";
import { MaterialApprovalStatusActionTypes } from "./MaterialApprovalStatus.type";

export function* fetchAllMaterialApprovalStatus(action: any): any {
  try {
    let query = "";
    if (action.payload) {
      const keys = Object.keys(action.payload);
      query = keys.map((key) => `${key}=${action.payload[key]}`).join("&");
    }
    const response = yield axios.get(
      `${API_BASE_URI}/material_approval_status?${query}`
    );
    yield put({
      type: MaterialApprovalStatusActionTypes.FETCH_ALL_MATERIAL_APPROVAL_STATUS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: MaterialApprovalStatusActionTypes.FETCH_ALL_MATERIAL_APPROVAL_STATUS_FAILURE,
      payload: error,
    });
  }
}

export function* fetchPagedMaterialApprovalStatus(action: any): any {
  try {
    let query = "";
    if (action.payload) {
      const keys = Object.keys(action.payload);
      query = keys.map((key) => `key=${action.payload[key]}`).join("&");
    }
    const response = yield axios.get(
      `${API_BASE_URI}/material_approval_status?${query}`
    );
    yield put({
      type: MaterialApprovalStatusActionTypes.FETCH_PAGED_MATERIAL_APPROVAL_STATUS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: MaterialApprovalStatusActionTypes.FETCH_PAGED_MATERIAL_APPROVAL_STATUS_FAILURE,
      payload: error,
    });
  }
}

export function* fetchOneMaterialApprovalStatus(action: any): any {
  try {
    const response = yield axios.get(
      `${API_BASE_URI}/material_approval_status/${action.payload}`
    );
    yield put({
      type: MaterialApprovalStatusActionTypes.FETCH_ONE_MATERIAL_APPROVAL_STATUS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: MaterialApprovalStatusActionTypes.FETCH_ONE_MATERIAL_APPROVAL_STATUS_FAILURE,
      payload: error,
    });
  }
}

export function* watcherFetchAllMaterialApprovalStatus() {
  yield takeLatest(
    MaterialApprovalStatusActionTypes.FETCH_ALL_MATERIAL_APPROVAL_STATUS,
    fetchAllMaterialApprovalStatus
  );
}

export function* watcherFetchPagedMaterialApprovalStatus() {
  yield takeLatest(
    MaterialApprovalStatusActionTypes.FETCH_PAGED_MATERIAL_APPROVAL_STATUS,
    fetchPagedMaterialApprovalStatus
  );
}

export function* watcherFetchOneMaterialApprovalStatus() {
  yield takeLatest(
    MaterialApprovalStatusActionTypes.FETCH_ONE_MATERIAL_APPROVAL_STATUS,
    fetchOneMaterialApprovalStatus
  );
}
