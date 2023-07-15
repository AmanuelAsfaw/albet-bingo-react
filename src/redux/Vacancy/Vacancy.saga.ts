import axios from "axios";
import { API_BASE_URI } from "../ApiCall";
import { authHeader } from "../../utilities/utilities";
import { put, takeLatest } from "redux-saga/effects";
import { VacancyActionTypes } from "./Vacancy.type";

export function* fetchAllVacancies(action: any): any {
  try {
    const response = yield axios.get(`${API_BASE_URI}/vacancy`, authHeader());
    yield put({
      type: VacancyActionTypes.FETCH_ALL_VACANCY_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: VacancyActionTypes.FETCH_ALL_VACANCY_FAILURE,
      payload: error,
    });
  }
}

export function* fetchOneVacancy(action: any): any {
  try {
    const response = yield axios.get(
      `${API_BASE_URI}/vacancy/${action.payload}`,
      authHeader()
    );
    yield put({
      type: VacancyActionTypes.FETCH_ONE_VACANCY_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: VacancyActionTypes.FETCH_ONE_VACANCY_FAILURE,
      payload: error,
    });
  }
}

export function* fetchVacanciesByAttributes(action?: any): any {
  try {
    const response = yield axios.get(
      `${API_BASE_URI}/vacancy/attributes/${action.payload}`,
      authHeader()
    );
    yield put({
      type: VacancyActionTypes.FETCH_ALL_BY_ATTRIBUTES_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: VacancyActionTypes.FETCH_ALL_BY_ATTRIBUTES_FAILURE,
      payload: error,
    });
  }
}

export function* fetchVacancyByVacancyRef(action?: any): any {
  try {
    const response = yield axios.get(
      `${API_BASE_URI}/vacancy/reference/${action.payload}`,
      authHeader()
    );
    yield put({
      type: VacancyActionTypes.FETCH_ALL_BY_JOB_ID_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: VacancyActionTypes.FETCH_ALL_BY_JOB_ID_FAILURE,
      payload: error,
    });
  }
}

export function* watcherFetchAllVacancies() {
  yield takeLatest(VacancyActionTypes.FETCH_ALL_VACANCY, fetchAllVacancies);
}

export function* watcherFetchOneVacancy() {
  yield takeLatest(VacancyActionTypes.FETCH_ONE_VACANCY, fetchOneVacancy);
}

export function* watcherFetchVacanciesByAttributes() {
  yield takeLatest(
    VacancyActionTypes.FETCH_ALL_BY_ATTRIBUTES,
    fetchVacanciesByAttributes
  );
}

export function* watcherFetchVacanciesByJobId() {
  yield takeLatest(
    VacancyActionTypes.FETCH_ALL_BY_JOB_ID,
    fetchVacancyByVacancyRef
  );
}
