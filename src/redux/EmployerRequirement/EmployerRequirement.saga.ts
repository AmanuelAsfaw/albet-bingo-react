import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";

import { API_BASE_URI } from "../ApiCall";
import { EmployerRequirementActionTypes } from "./EmployerRequirement.type";

export function* fetchAllEmployerRequirements(action: any): any {
  try {
    const response = yield axios.get(`${API_BASE_URI}/employer-requirement`);
    yield put({
      type: EmployerRequirementActionTypes.FETCH_ALL_EMPLOYER_REQUIREMENT_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: EmployerRequirementActionTypes.FETCH_ALL_EMPLOYER_REQUIREMENT_FAILURE,
      payload: error,
    });
  }
}

export function* fetchOneEmployerRequirement(action: any): any {
  try {
    const response = yield axios.get(
      `${API_BASE_URI}/employer-requirement/${action.payload}`
    );
    yield put({
      type: EmployerRequirementActionTypes.FETCH_ONE_EMPLOYER_REQUIREMENT_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: EmployerRequirementActionTypes.FETCH_ONE_EMPLOYER_REQUIREMENT_FAILURE,
      payload: error,
    });
  }
}

export function* watcherFetchAllEmployerRequirements() {
  yield takeLatest(EmployerRequirementActionTypes.FETCH_ALL_EMPLOYER_REQUIREMENT, fetchAllEmployerRequirements);
}

export function* watcherFetchOneEmployerRequirement() {
  yield takeLatest(EmployerRequirementActionTypes.FETCH_ONE_EMPLOYER_REQUIREMENT, fetchOneEmployerRequirement);
}
