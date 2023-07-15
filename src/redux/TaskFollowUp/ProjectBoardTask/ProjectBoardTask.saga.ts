import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";
import { API_BASE_URI } from "../../ApiCall";
import { formatQuery } from "../../Utils";
import { ProjectBoardTaskActionTypes } from "./ProjectBoardTask.type";

export function* fetchAllProjectBoardTask(action: any): any {
  try {
    let query = "";
    if (action.payload) {
      const keys = Object.keys(action.payload);
      query = keys.map((key) => `${key}=${action.payload[key]}`).join("&");
    }
    const response = yield axios.get(`${API_BASE_URI}/board-project?${query}`);

    yield put({
      type: ProjectBoardTaskActionTypes.FETCH_ALL_PROJECT_BOARD_TASK_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: ProjectBoardTaskActionTypes.FETCH_ALL_PROJECT_BOARD_TASK_FAILURE,
      payload: error,
    });
  }
}

export function* fetchOneProjectBoardTask(action: any): any {
  try {
    const response = yield axios.get(`${API_BASE_URI}/board-project/${action.payload}`);
    yield put({
      type: ProjectBoardTaskActionTypes.FETCH_ONE_PROJECT_BOARD_TASK_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: ProjectBoardTaskActionTypes.FETCH_ONE_PROJECT_BOARD_TASK_FAILURE,
      payload: error,
    });
  }
}

export function* watcherFetchAllProjectBoardTask() {
  yield takeLatest(ProjectBoardTaskActionTypes.FETCH_ALL_PROJECT_BOARD_TASK, fetchAllProjectBoardTask);
}

export function* watcherFetchOneProjectBoardTask() {
  yield takeLatest(ProjectBoardTaskActionTypes.FETCH_ONE_PROJECT_BOARD_TASK, fetchOneProjectBoardTask);
}
