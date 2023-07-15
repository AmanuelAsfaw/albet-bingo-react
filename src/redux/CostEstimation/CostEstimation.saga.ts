import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";

import { API_BASE_URI } from "../ApiCall";
import { CostEstimationActionTypes } from "./CostEstimation.type";

export function* fetchAllCostEstimations(action: any): any {
  try {
    const response = yield axios.get(`${API_BASE_URI}/cost-estimation`);
    yield put({
      type: CostEstimationActionTypes.FETCH_ALL_COST_ESTIMATION_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: CostEstimationActionTypes.FETCH_ALL_COST_ESTIMATION_FAILURE,
      payload: error,
    });
  }
}

export function* fetchOneCostEstimation(action: any): any {
  try {
    const response = yield axios.get(
      `${API_BASE_URI}/cost-estimation/${action.payload}`
    );
    yield put({
      type: CostEstimationActionTypes.FETCH_ONE_COST_ESTIMATION_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: CostEstimationActionTypes.FETCH_ONE_COST_ESTIMATION_FAILURE,
      payload: error,
    });
  }
}

export function* watcherFetchAllCostEstimations() {
  yield takeLatest(CostEstimationActionTypes.FETCH_ALL_COST_ESTIMATION, fetchAllCostEstimations);
}

export function* watcherFetchOneCostEstimation() {
  yield takeLatest(CostEstimationActionTypes.FETCH_ONE_COST_ESTIMATION, fetchOneCostEstimation);
}
