import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";

import { API_BASE_URI } from "../ApiCall";
import { KlingMaterialApprovalActionTypes } from "./KlingMaterialApproval.type";

export function* fetchAllKlingMaterialApprovals(action: any): any {
  try {
    const response = yield axios.get(`${API_BASE_URI}/kling-material-approval?project_id=${action.payload?.project_id}`);
    yield put({
      type: KlingMaterialApprovalActionTypes.FETCH_ALL_KLING_MATERIAL_APPROVAL_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: KlingMaterialApprovalActionTypes.FETCH_ALL_KLING_MATERIAL_APPROVAL_FAILURE,
      payload: error,
    });
  }
}

export function* fetchOneKlingMaterialApprovals(action: any): any {
  try {
    const response = yield axios.get(
      `${API_BASE_URI}/kling-material-approval/${action.payload}`
    );
    yield put({
      type: KlingMaterialApprovalActionTypes.FETCH_ONE_KLING_MATERIAL_APPROVAL_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: KlingMaterialApprovalActionTypes.FETCH_ONE_KLING_MATERIAL_APPROVAL_FAILURE,
      payload: error,
    });
  }
}

export function* watcherFetchAllKlingMaterialApprovals() {
  yield takeLatest(KlingMaterialApprovalActionTypes.FETCH_ALL_KLING_MATERIAL_APPROVAL, fetchAllKlingMaterialApprovals);
}

export function* watcherFetchOneKlingMaterialApprovals() {
  yield takeLatest(KlingMaterialApprovalActionTypes.FETCH_ONE_KLING_MATERIAL_APPROVAL, fetchOneKlingMaterialApprovals);
}
