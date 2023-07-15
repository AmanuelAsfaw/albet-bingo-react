import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";
import { DesignTabs } from "../../constants/Constants";
import { API_BASE_URI } from "../ApiCall";
import { CheckListActionTypes } from "./CheckList.type";

export function* fetchAllStructuralCheckLists(action: any): any {
  try {
    let payload: any = { module: DesignTabs.STRUCTURAL };

    if (Object.keys(action.payload).length > 0) {
      payload = { ...payload, ...action.payload };
    }

    let keys: any[] = Object.keys(payload);
    let query = keys.map((key: any) => `${key}=${payload[key]}`).join("&&");

    const response = yield axios.get(`${API_BASE_URI}/checklist?${query}`);
    yield put({
      type: CheckListActionTypes.FETCH_ALL_STRUCTURAL_CHECK_LIST_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: CheckListActionTypes.FETCH_ALL_STRUCTURAL_CHECK_LIST_FAILURE,
      payload: error,
    });
  }
}

export function* fetchAllArchitectureCheckLists(action: any): any {
  try {
    let payload: any = { module: DesignTabs.ARCHITECTURE };

    if (action.payload) {
      payload = { ...payload, ...action.payload };
    }

    let keys: any[] = Object.keys(payload);
    let query = keys.map((key: any) => `${key}=${payload[key]}`).join("&&");

    const response = yield axios.get(`${API_BASE_URI}/checklist?${query}`);
    yield put({
      type: CheckListActionTypes.FETCH_ALL_ARCHITECTURE_CHECK_LIST_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: CheckListActionTypes.FETCH_ALL_ARCHITECTURE_CHECK_LIST_FAILURE,
      payload: error,
    });
  }
}

export function* fetchAllPlumbingCheckLists(action: any): any {
  try {
    let payload: any = { module: DesignTabs.PLUMBING };

    if (action.payload) {
      payload = { ...payload, ...action.payload };
    }

    let keys: any[] = Object.keys(payload);
    let query = keys.map((key: any) => `${key}=${payload[key]}`).join("&&");

    const response = yield axios.get(`${API_BASE_URI}/checklist?${query}`);
    yield put({
      type: CheckListActionTypes.FETCH_ALL_PLUMBING_CHECK_LIST_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: CheckListActionTypes.FETCH_ALL_PLUMBING_CHECK_LIST_FAILURE,
      payload: error,
    });
  }
}

export function* fetchAllMechanicalCheckLists(action: any): any {
  try {
    let payload: any = { module: DesignTabs.MECHANICAL };

    if (action.payload) {
      payload = { ...payload, ...action.payload };
    }

    let keys: any[] = Object.keys(payload);
    let query = keys.map((key: any) => `${key}=${payload[key]}`).join("&&");

    const response = yield axios.get(`${API_BASE_URI}/checklist?${query}`);
    yield put({
      type: CheckListActionTypes.FETCH_ALL_MECHANICAL_CHECK_LIST_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: CheckListActionTypes.FETCH_ALL_MECHANICAL_CHECK_LIST_FAILURE,
      payload: error,
    });
  }
}

export function* fetchAllElectricalCheckLists(action: any): any {
  try {
    let payload: any = { module: DesignTabs.ELECTRICAL };

    if (action.payload) {
      payload = { ...payload, ...action.payload };
    }

    let keys: any[] = Object.keys(payload);
    let query = keys.map((key: any) => `${key}=${payload[key]}`).join("&&");

    const response = yield axios.get(`${API_BASE_URI}/checklist?${query}`);
    yield put({
      type: CheckListActionTypes.FETCH_ALL_ELECTRICAL_CHECK_LIST_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: CheckListActionTypes.FETCH_ALL_ELECTRICAL_CHECK_LIST_FAILURE,
      payload: error,
    });
  }
}

export function* fetchAllFireFightingCheckLists(action: any): any {
  try {
    let payload: any = { module: DesignTabs.FIRE_FIGHTING };

    if (action.payload) {
      payload = { ...payload, ...action.payload };
    }

    let keys: any[] = Object.keys(payload);
    let query = keys.map((key: any) => `${key}=${payload[key]}`).join("&&");

    const response = yield axios.get(`${API_BASE_URI}/checklist?${query}`);
    yield put({
      type: CheckListActionTypes.FETCH_ALL_FIRE_FIGHTING_CHECK_LIST_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: CheckListActionTypes.FETCH_ALL_FIRE_FIGHTING_CHECK_LIST_FAILURE,
      payload: error,
    });
  }
}

export function* fetchAllSpecialSystemCheckLists(action: any): any {
  try {
    let payload: any = { module: DesignTabs.SPECIAL_SYSTEM };

    if (action.payload) {
      payload = { ...payload, ...action.payload };
    }

    let keys: any[] = Object.keys(payload);
    let query = keys.map((key: any) => `${key}=${payload[key]}`).join("&&");

    const response = yield axios.get(`${API_BASE_URI}/checklist?${query}`);
    yield put({
      type: CheckListActionTypes.FETCH_ALL_SPECIAL_SYSTEM_CHECK_LIST_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: CheckListActionTypes.FETCH_ALL_SPECIAL_SYSTEM_CHECK_LIST_FAILURE,
      payload: error,
    });
  }
}

export function* fetchAllSanitaryCheckLists(action: any): any {
  try {
    let payload: any = { module: DesignTabs.SANITARY };

    if (action.payload) {
      payload = { ...payload, ...action.payload };
    }

    let keys: any[] = Object.keys(payload);
    let query = keys.map((key: any) => `${key}=${payload[key]}`).join("&&");

    const response = yield axios.get(`${API_BASE_URI}/checklist?${query}`);
    yield put({
      type: CheckListActionTypes.FETCH_ALL_SANITARY_CHECK_LIST_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: CheckListActionTypes.FETCH_ALL_SANITARY_CHECK_LIST_FAILURE,
      payload: error,
    });
  }
}

export function* fetchOneCheckLists(action: any): any {
  try {
    const response = yield axios.get(
      `${API_BASE_URI}/checklist/${action.payload}`
    );
    yield put({
      type: CheckListActionTypes.FETCH_ONE_CHECK_LIST_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: CheckListActionTypes.FETCH_ONE_CHECK_LIST_FAILURE,
      payload: error,
    });
  }
}

export function* watcherFetchAllStructuralCheckLists() {
  yield takeLatest(
    CheckListActionTypes.FETCH_ALL_STRUCTURAL_CHECK_LIST,
    fetchAllStructuralCheckLists
  );
}

export function* watcherFetchAllArchitectureCheckLists() {
  yield takeLatest(
    CheckListActionTypes.FETCH_ALL_ARCHITECTURE_CHECK_LIST,
    fetchAllArchitectureCheckLists
  );
}

export function* watcherFetchAllPlumbingCheckLists() {
  yield takeLatest(
    CheckListActionTypes.FETCH_ALL_PLUMBING_CHECK_LIST,
    fetchAllPlumbingCheckLists
  );
}

export function* watcherFetchAllMechanicalCheckLists() {
  yield takeLatest(
    CheckListActionTypes.FETCH_ALL_MECHANICAL_CHECK_LIST,
    fetchAllMechanicalCheckLists
  );
}

export function* watcherFetchAllElectricalCheckLists() {
  yield takeLatest(
    CheckListActionTypes.FETCH_ALL_ELECTRICAL_CHECK_LIST,
    fetchAllElectricalCheckLists
  );
}

export function* watcherFetchAllFireFightingCheckLists() {
  yield takeLatest(
    CheckListActionTypes.FETCH_ALL_FIRE_FIGHTING_CHECK_LIST,
    fetchAllFireFightingCheckLists
  );
}

export function* watcherFetchAllSpecialSystemCheckLists() {
  yield takeLatest(
    CheckListActionTypes.FETCH_ALL_SPECIAL_SYSTEM_CHECK_LIST,
    fetchAllSpecialSystemCheckLists
  );
}

export function* watcherFetchAllSanitaryCheckLists() {
  yield takeLatest(
    CheckListActionTypes.FETCH_ALL_SANITARY_CHECK_LIST,
    fetchAllSanitaryCheckLists
  );
}

export function* watcherFetchOneCheckLists() {
  yield takeLatest(
    CheckListActionTypes.FETCH_ONE_CHECK_LIST,
    fetchOneCheckLists
  );
}
