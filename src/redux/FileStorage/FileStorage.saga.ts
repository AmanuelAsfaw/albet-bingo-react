import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";
import { DesignTabs } from "../../constants/Constants";
import { API_BASE_URI } from "../ApiCall";
import { FileStorageActionTypes } from "./FileStorage.type";

export function* fetchAllStructuralFileStorages(action: any): any {
  try {
    let payload: any = { module: DesignTabs.STRUCTURAL };

    if (Object.keys(action.payload).length > 0) {
      payload = { ...payload, ...action.payload };
    }

    let keys: any[] = Object.keys(payload);
    let query = keys.map((key: any) => `${key}=${payload[key]}`).join("&&");

    const response = yield axios.get(`${API_BASE_URI}/file-storage?${query}`);
    yield put({
      type: FileStorageActionTypes.FETCH_ALL_STRUCTURAL_FILE_STORAGE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: FileStorageActionTypes.FETCH_ALL_STRUCTURAL_FILE_STORAGE_FAILURE,
      payload: error,
    });
  }
}

export function* fetchAllArchitectureFileStorages(action: any): any {
  try {
    let payload: any = { module: DesignTabs.ARCHITECTURE };

    if (action.payload) {
      payload = { ...payload, ...action.payload };
    }

    let keys: any[] = Object.keys(payload);
    let query = keys.map((key: any) => `${key}=${payload[key]}`).join("&&");

    const response = yield axios.get(`${API_BASE_URI}/file-storage?${query}`);
    yield put({
      type: FileStorageActionTypes.FETCH_ALL_ARCHITECTURE_FILE_STORAGE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: FileStorageActionTypes.FETCH_ALL_ARCHITECTURE_FILE_STORAGE_FAILURE,
      payload: error,
    });
  }
}

export function* fetchAllPlumbingFileStorages(action: any): any {
  try {
    let payload: any = { module: DesignTabs.PLUMBING };

    if (action.payload) {
      payload = { ...payload, ...action.payload };
    }

    let keys: any[] = Object.keys(payload);
    let query = keys.map((key: any) => `${key}=${payload[key]}`).join("&&");

    const response = yield axios.get(`${API_BASE_URI}/file-storage?${query}`);
    yield put({
      type: FileStorageActionTypes.FETCH_ALL_PLUMBING_FILE_STORAGE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: FileStorageActionTypes.FETCH_ALL_PLUMBING_FILE_STORAGE_FAILURE,
      payload: error,
    });
  }
}

export function* fetchAllMechanicalFileStorages(action: any): any {
  try {
    let payload: any = { module: DesignTabs.MECHANICAL };

    if (action.payload) {
      payload = { ...payload, ...action.payload };
    }

    let keys: any[] = Object.keys(payload);
    let query = keys.map((key: any) => `${key}=${payload[key]}`).join("&&");

    const response = yield axios.get(`${API_BASE_URI}/file-storage?${query}`);
    yield put({
      type: FileStorageActionTypes.FETCH_ALL_MECHANICAL_FILE_STORAGE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: FileStorageActionTypes.FETCH_ALL_MECHANICAL_FILE_STORAGE_FAILURE,
      payload: error,
    });
  }
}

export function* fetchAllElectricalFileStorages(action: any): any {
  try {
    let payload: any = { module: DesignTabs.ELECTRICAL };

    if (action.payload) {
      payload = { ...payload, ...action.payload };
    }

    let keys: any[] = Object.keys(payload);
    let query = keys.map((key: any) => `${key}=${payload[key]}`).join("&&");

    const response = yield axios.get(`${API_BASE_URI}/file-storage?${query}`);
    yield put({
      type: FileStorageActionTypes.FETCH_ALL_ELECTRICAL_FILE_STORAGE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: FileStorageActionTypes.FETCH_ALL_ELECTRICAL_FILE_STORAGE_FAILURE,
      payload: error,
    });
  }
}

export function* fetchAllFireFightingFileStorages(action: any): any {
  try {
    let payload: any = { module: DesignTabs.FIRE_FIGHTING };

    if (action.payload) {
      payload = { ...payload, ...action.payload };
    }

    let keys: any[] = Object.keys(payload);
    let query = keys.map((key: any) => `${key}=${payload[key]}`).join("&&");

    const response = yield axios.get(`${API_BASE_URI}/file-storage?${query}`);
    yield put({
      type: FileStorageActionTypes.FETCH_ALL_FIRE_FIGHTING_FILE_STORAGE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: FileStorageActionTypes.FETCH_ALL_FIRE_FIGHTING_FILE_STORAGE_FAILURE,
      payload: error,
    });
  }
}

export function* fetchAllSpecialSystemFileStorages(action: any): any {
  try {
    let payload: any = { module: DesignTabs.SPECIAL_SYSTEM };

    if (action.payload) {
      payload = { ...payload, ...action.payload };
    }

    let keys: any[] = Object.keys(payload);
    let query = keys.map((key: any) => `${key}=${payload[key]}`).join("&&");

    const response = yield axios.get(`${API_BASE_URI}/file-storage?${query}`);
    yield put({
      type: FileStorageActionTypes.FETCH_ALL_SPECIAL_SYSTEM_FILE_STORAGE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: FileStorageActionTypes.FETCH_ALL_SPECIAL_SYSTEM_FILE_STORAGE_FAILURE,
      payload: error,
    });
  }
}

export function* fetchAllSanitaryFileStorages(action: any): any {
  try {
    let payload: any = { module: DesignTabs.SANITARY };

    if (action.payload) {
      payload = { ...payload, ...action.payload };
    }

    let keys: any[] = Object.keys(payload);
    let query = keys.map((key: any) => `${key}=${payload[key]}`).join("&&");

    const response = yield axios.get(`${API_BASE_URI}/file-storage?${query}`);
    yield put({
      type: FileStorageActionTypes.FETCH_ALL_SANITARY_FILE_STORAGE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: FileStorageActionTypes.FETCH_ALL_SANITARY_FILE_STORAGE_FAILURE,
      payload: error,
    });
  }
}

export function* fetchOneFileStorages(action: any): any {
  try {
    const response = yield axios.get(
      `${API_BASE_URI}/file-storage/${action.payload}`
    );
    yield put({
      type: FileStorageActionTypes.FETCH_ONE_FILE_STORAGE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: FileStorageActionTypes.FETCH_ONE_FILE_STORAGE_FAILURE,
      payload: error,
    });
  }
}

export function* watcherFetchAllStructuralFileStorages() {
  yield takeLatest(
    FileStorageActionTypes.FETCH_ALL_STRUCTURAL_FILE_STORAGE,
    fetchAllStructuralFileStorages
  );
}

export function* watcherFetchAllArchitectureFileStorages() {
  yield takeLatest(
    FileStorageActionTypes.FETCH_ALL_ARCHITECTURE_FILE_STORAGE,
    fetchAllArchitectureFileStorages
  );
}

export function* watcherFetchAllPlumbingFileStorages() {
  yield takeLatest(
    FileStorageActionTypes.FETCH_ALL_PLUMBING_FILE_STORAGE,
    fetchAllPlumbingFileStorages
  );
}

export function* watcherFetchAllMechanicalFileStorages() {
  yield takeLatest(
    FileStorageActionTypes.FETCH_ALL_MECHANICAL_FILE_STORAGE,
    fetchAllMechanicalFileStorages
  );
}

export function* watcherFetchAllElectricalFileStorages() {
  yield takeLatest(
    FileStorageActionTypes.FETCH_ALL_ELECTRICAL_FILE_STORAGE,
    fetchAllElectricalFileStorages
  );
}

export function* watcherFetchAllFireFightingFileStorages() {
  yield takeLatest(
    FileStorageActionTypes.FETCH_ALL_FIRE_FIGHTING_FILE_STORAGE,
    fetchAllFireFightingFileStorages
  );
}

export function* watcherFetchAllSpecialSystemFileStorages() {
  yield takeLatest(
    FileStorageActionTypes.FETCH_ALL_SPECIAL_SYSTEM_FILE_STORAGE,
    fetchAllSpecialSystemFileStorages
  );
}

export function* watcherFetchAllSanitaryFileStorages() {
  yield takeLatest(
    FileStorageActionTypes.FETCH_ALL_SANITARY_FILE_STORAGE,
    fetchAllSanitaryFileStorages
  );
}

export function* watcherFetchOneFileStorages() {
  yield takeLatest(
    FileStorageActionTypes.FETCH_ONE_FILE_STORAGE,
    fetchOneFileStorages
  );
}
