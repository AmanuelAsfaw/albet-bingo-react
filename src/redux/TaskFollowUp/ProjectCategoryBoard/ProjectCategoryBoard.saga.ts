import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";
import { API_BASE_URI } from "../../ApiCall";
import { formatQuery } from "../../Utils";
import { ProjectCategoryBoardActionTypes } from "./ProjectCategoryBoard.type";

export function* fetchAllProjectCategoryBoard(action: any): any {
  try {
    let query = "";
    if (action.payload) {
      const keys = Object.keys(action.payload);
      query = keys.map((key) => `${key}=${action.payload[key]}`).join("&");
    }
    const response = yield axios.get(`${API_BASE_URI}/project-category-board?${query}`);

    yield put({
      type: ProjectCategoryBoardActionTypes.FETCH_ALL_PROJECT_CATEGORY_BOARD_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: ProjectCategoryBoardActionTypes.FETCH_ALL_PROJECT_CATEGORY_BOARD_FAILURE,
      payload: error,
    });
  }
}

export function* fetchOneProjectCategoryBoard(action: any): any {
  try {
    const response = yield axios.get(`${API_BASE_URI}/project-category-board/${action.payload}`);
    yield put({
      type: ProjectCategoryBoardActionTypes.FETCH_ONE_PROJECT_CATEGORY_BOARD_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: ProjectCategoryBoardActionTypes.FETCH_ONE_PROJECT_CATEGORY_BOARD_FAILURE,
      payload: error,
    });
  }
}


export function* watcherFetchAllProjectCategoryBoard() {
  yield takeLatest(ProjectCategoryBoardActionTypes.FETCH_ALL_PROJECT_CATEGORY_BOARD, fetchAllProjectCategoryBoard);
}

export function* watcherFetchOneProjectCategoryBoard() {
  yield takeLatest(ProjectCategoryBoardActionTypes.FETCH_ONE_PROJECT_CATEGORY_BOARD, fetchOneProjectCategoryBoard);
}
