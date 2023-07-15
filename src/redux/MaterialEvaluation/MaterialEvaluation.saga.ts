import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";

import { API_BASE_URI } from "../ApiCall";
import { MaterialEvaluationActionTypes } from "./MaterialEvaluation.type";

export function* fetchAllMaterialEvaluations(action: any): any {
  try {
    const response = yield axios.get(
      `${API_BASE_URI}/material-evaluation?project_id=${action.payload?.project_id}`
    );
    yield put({
      type: MaterialEvaluationActionTypes.FETCH_ALL_MATERIAL_EVALUATION_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: MaterialEvaluationActionTypes.FETCH_ALL_MATERIAL_EVALUATION_FAILURE,
      payload: error,
    });
  }
}

export function* fetchOneMaterialEvaluations(action: any): any {
  try {
    const response = yield axios.get(
      `${API_BASE_URI}/material-evaluation/${action.payload}`
    );
    yield put({
      type: MaterialEvaluationActionTypes.FETCH_ONE_MATERIAL_EVALUATION_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: MaterialEvaluationActionTypes.FETCH_ONE_MATERIAL_EVALUATION_FAILURE,
      payload: error,
    });
  }
}

export function* watcherFetchAllMaterialEvaluations() {
  yield takeLatest(
    MaterialEvaluationActionTypes.FETCH_ALL_MATERIAL_EVALUATION,
    fetchAllMaterialEvaluations
  );
}

export function* watcherFetchOneMaterialEvaluations() {
  yield takeLatest(
    MaterialEvaluationActionTypes.FETCH_ONE_MATERIAL_EVALUATION,
    fetchOneMaterialEvaluations
  );
}
