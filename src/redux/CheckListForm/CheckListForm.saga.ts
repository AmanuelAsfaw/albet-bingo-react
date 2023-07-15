import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";
import { DesignTabs } from "../../constants/Constants";
import { API_BASE_URI } from "../ApiCall";
import { CheckListFormActionTypes } from "./CheckListForm.type";

export function* fetchAllStructuralCheckListForms(action: any): any {
  try {
    let payload: any = { module: DesignTabs.STRUCTURAL };

    let keys: any[] = Object.keys(payload);
    let query = keys.map((key: any) => `${key}=${payload[key]}`).join("&&");

    const response = yield axios.get(`${API_BASE_URI}/checklist-form?${query}`);
    yield put({
      type: CheckListFormActionTypes.FETCH_ALL_STRUCTURAL_CHECK_LIST_FORM_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: CheckListFormActionTypes.FETCH_ALL_STRUCTURAL_CHECK_LIST_FORM_FAILURE,
      payload: error,
    });
  }
}

export function* fetchAllArchitectureCheckListForms(action: any): any {
  try {
    let payload: any = { module: DesignTabs.ARCHITECTURE };

    let keys: any[] = Object.keys(payload);
    let query = keys.map((key: any) => `${key}=${payload[key]}`).join("&&");

    const response = yield axios.get(`${API_BASE_URI}/checklist-form?${query}`);
    yield put({
      type: CheckListFormActionTypes.FETCH_ALL_ARCHITECTURE_CHECK_LIST_FORM_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: CheckListFormActionTypes.FETCH_ALL_ARCHITECTURE_CHECK_LIST_FORM_FAILURE,
      payload: error,
    });
  }
}

export function* fetchAllPlumbingCheckListForms(action: any): any {
  try {
    let payload: any = { module: DesignTabs.PLUMBING };

    let keys: any[] = Object.keys(payload);
    let query = keys.map((key: any) => `${key}=${payload[key]}`).join("&&");

    const response = yield axios.get(`${API_BASE_URI}/checklist-form?${query}`);
    yield put({
      type: CheckListFormActionTypes.FETCH_ALL_PLUMBING_CHECK_LIST_FORM_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: CheckListFormActionTypes.FETCH_ALL_PLUMBING_CHECK_LIST_FORM_FAILURE,
      payload: error,
    });
  }
}

export function* fetchAllMechanicalCheckListForms(action: any): any {
  try {
    let payload: any = { module: DesignTabs.MECHANICAL };

    let keys: any[] = Object.keys(payload);
    let query = keys.map((key: any) => `${key}=${payload[key]}`).join("&&");

    const response = yield axios.get(`${API_BASE_URI}/checklist-form?${query}`);
    yield put({
      type: CheckListFormActionTypes.FETCH_ALL_MECHANICAL_CHECK_LIST_FORM_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: CheckListFormActionTypes.FETCH_ALL_MECHANICAL_CHECK_LIST_FORM_FAILURE,
      payload: error,
    });
  }
}

export function* fetchAllElectricalCheckListForms(action: any): any {
  try {
    let payload: any = { module: DesignTabs.ELECTRICAL };

    let keys: any[] = Object.keys(payload);
    let query = keys.map((key: any) => `${key}=${payload[key]}`).join("&&");

    const response = yield axios.get(`${API_BASE_URI}/checklist-form?${query}`);
    yield put({
      type: CheckListFormActionTypes.FETCH_ALL_ELECTRICAL_CHECK_LIST_FORM_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: CheckListFormActionTypes.FETCH_ALL_ELECTRICAL_CHECK_LIST_FORM_FAILURE,
      payload: error,
    });
  }
}

export function* fetchAllFireFightingCheckListForms(action: any): any {
  try {
    let payload: any = { module: DesignTabs.FIRE_FIGHTING };

    let keys: any[] = Object.keys(payload);
    let query = keys.map((key: any) => `${key}=${payload[key]}`).join("&&");

    const response = yield axios.get(`${API_BASE_URI}/checklist-form?${query}`);
    yield put({
      type: CheckListFormActionTypes.FETCH_ALL_FIRE_FIGHTING_CHECK_LIST_FORM_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: CheckListFormActionTypes.FETCH_ALL_FIRE_FIGHTING_CHECK_LIST_FORM_FAILURE,
      payload: error,
    });
  }
}

export function* fetchAllSpecialSystemCheckListForms(action: any): any {
  try {
    let payload: any = { module: DesignTabs.SPECIAL_SYSTEM };

    let keys: any[] = Object.keys(payload);
    let query = keys.map((key: any) => `${key}=${payload[key]}`).join("&&");

    const response = yield axios.get(`${API_BASE_URI}/checklist-form?${query}`);
    yield put({
      type: CheckListFormActionTypes.FETCH_ALL_SPECIAL_SYSTEM_CHECK_LIST_FORM_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: CheckListFormActionTypes.FETCH_ALL_SPECIAL_SYSTEM_CHECK_LIST_FORM_FAILURE,
      payload: error,
    });
  }
}

export function* fetchAllSanitaryCheckListForms(action: any): any {
  try {
    let payload: any = { module: DesignTabs.SANITARY };

    let keys: any[] = Object.keys(payload);
    let query = keys.map((key: any) => `${key}=${payload[key]}`).join("&&");

    const response = yield axios.get(`${API_BASE_URI}/checklist-form?${query}`);
    yield put({
      type: CheckListFormActionTypes.FETCH_ALL_SANITARY_CHECK_LIST_FORM_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: CheckListFormActionTypes.FETCH_ALL_SANITARY_CHECK_LIST_FORM_FAILURE,
      payload: error,
    });
  }
}

export function* fetchOneCheckListForms(action: any): any {
  try {
    const response = yield axios.get(
      `${API_BASE_URI}/checklist-form/${action.payload}`
    );
    yield put({
      type: CheckListFormActionTypes.FETCH_ONE_CHECK_LIST_FORM_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: CheckListFormActionTypes.FETCH_ONE_CHECK_LIST_FORM_FAILURE,
      payload: error,
    });
  }
}

export function* watcherFetchAllStructuralCheckListForms() {
  yield takeLatest(
    CheckListFormActionTypes.FETCH_ALL_STRUCTURAL_CHECK_LIST_FORM,
    fetchAllStructuralCheckListForms
  );
}

export function* watcherFetchAllArchitectureCheckListForms() {
  yield takeLatest(
    CheckListFormActionTypes.FETCH_ALL_ARCHITECTURE_CHECK_LIST_FORM,
    fetchAllArchitectureCheckListForms
  );
}

export function* watcherFetchAllPlumbingCheckListForms() {
  yield takeLatest(
    CheckListFormActionTypes.FETCH_ALL_PLUMBING_CHECK_LIST_FORM,
    fetchAllPlumbingCheckListForms
  );
}

export function* watcherFetchAllMechanicalCheckListForms() {
  yield takeLatest(
    CheckListFormActionTypes.FETCH_ALL_MECHANICAL_CHECK_LIST_FORM,
    fetchAllMechanicalCheckListForms
  );
}

export function* watcherFetchAllElectricalCheckListForms() {
  yield takeLatest(
    CheckListFormActionTypes.FETCH_ALL_ELECTRICAL_CHECK_LIST_FORM,
    fetchAllElectricalCheckListForms
  );
}

export function* watcherFetchAllFireFightingCheckListForms() {
  yield takeLatest(
    CheckListFormActionTypes.FETCH_ALL_FIRE_FIGHTING_CHECK_LIST_FORM,
    fetchAllFireFightingCheckListForms
  );
}

export function* watcherFetchAllSpecialSystemCheckListForms() {
  yield takeLatest(
    CheckListFormActionTypes.FETCH_ALL_SPECIAL_SYSTEM_CHECK_LIST_FORM,
    fetchAllSpecialSystemCheckListForms
  );
}

export function* watcherFetchAllSanitaryCheckListForms() {
  yield takeLatest(
    CheckListFormActionTypes.FETCH_ALL_SANITARY_CHECK_LIST_FORM,
    fetchAllSanitaryCheckListForms
  );
}

export function* watcherFetchOneCheckListForms() {
  yield takeLatest(
    CheckListFormActionTypes.FETCH_ONE_CHECK_LIST_FORM,
    fetchOneCheckListForms
  );
}
