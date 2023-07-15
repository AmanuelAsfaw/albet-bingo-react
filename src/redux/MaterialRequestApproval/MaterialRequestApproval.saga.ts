import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";

import { API_BASE_URI } from "../ApiCall";
import { MaterialRequestApprovalActionTypes } from "./MaterialRequestApproval.type";

export function* fetchAllMaterialRequestApprovals(action: any): any {
  try {
    const response = yield axios.get(`${API_BASE_URI}/material_request_approval?project_id=${action.payload.project_id}`);
    yield put({
      type: MaterialRequestApprovalActionTypes.FETCH_ALL_MATERIAL_REQUEST_APPROVAL_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: MaterialRequestApprovalActionTypes.FETCH_ALL_MATERIAL_REQUEST_APPROVAL_FAILURE,
      payload: error,
    });
  }
}

export function* fetchOneMaterialRequestApprovals(action: any): any {
  try {
    const response = yield axios.get(
      `${API_BASE_URI}/material_request_approval/${action.payload}`
    );
    yield put({
      type: MaterialRequestApprovalActionTypes.FETCH_ONE_MATERIAL_REQUEST_APPROVAL_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: MaterialRequestApprovalActionTypes.FETCH_ONE_MATERIAL_REQUEST_APPROVAL_FAILURE,
      payload: error,
    });
  }
}

export function* watcherFetchAllMaterialRequestApprovals() {
  yield takeLatest(MaterialRequestApprovalActionTypes.FETCH_ALL_MATERIAL_REQUEST_APPROVAL, fetchAllMaterialRequestApprovals);
}

export function* watcherFetchOneMaterialRequestApprovals() {
  yield takeLatest(MaterialRequestApprovalActionTypes.FETCH_ONE_MATERIAL_REQUEST_APPROVAL, fetchOneMaterialRequestApprovals);
}
