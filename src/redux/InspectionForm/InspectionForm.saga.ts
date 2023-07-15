import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";

import { API_BASE_URI } from "../ApiCall";
import { InspectionFormActionTypes } from "./InspectionForm.type";

export function* fetchAllInspectionForm(action: any): any {
  try {
    const response = yield axios.get(`${API_BASE_URI}/inspection_form`);
    yield put({
      type: InspectionFormActionTypes.FETCH_ALL_INSPECTION_FORM_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: InspectionFormActionTypes.FETCH_ALL_INSPECTION_FORM_FAILURE,
      payload: error,
    });
  }
}

export function* fetchOneInspectionForm(action: any): any {
  try {
    const response = yield axios.get(`${API_BASE_URI}/inspection_form/${action.payload.id}`);
    yield put({
      type: InspectionFormActionTypes.FETCH_ONE_INSPECTION_FORM_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: InspectionFormActionTypes.FETCH_ONE_INSPECTION_FORM_FAILURE,
      payload: error,
    });
  }
}

export function* watcherFetchAllInspectionForm() {
  yield takeLatest(InspectionFormActionTypes.FETCH_ALL_INSPECTION_FORM, fetchAllInspectionForm);
}

export function* watcherFetchOneInspectionForm() {
  yield takeLatest(InspectionFormActionTypes.FETCH_ONE_INSPECTION_FORM, fetchOneInspectionForm);
}
