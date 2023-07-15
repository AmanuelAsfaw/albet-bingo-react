import { InitPagedData } from "./../Utils";
import { CategoryStateTypes, CategoryActionTypes } from "./Category.type";
import { resetApiCallState } from "../Utils";

const INITIAL_STATE: CategoryStateTypes = {
  fetchAll: resetApiCallState([]),
  fetchOne: resetApiCallState({}),
  fetchPaged: resetApiCallState(InitPagedData),
};

const CategoryReducer = (
  state: CategoryStateTypes = INITIAL_STATE,
  action: any
): CategoryStateTypes => {
  switch (action.type) {
    case CategoryActionTypes.FETCH_ALL_CATEGORY:
      return {
        ...state,
        fetchAll: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case CategoryActionTypes.FETCH_ALL_CATEGORY_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case CategoryActionTypes.FETCH_ALL_CATEGORY_FAILURE:
      return {
        ...state,
        fetchAll: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case CategoryActionTypes.FETCH_ALL_CATEGORY_SUCCESS:
      return {
        ...state,
        fetchAll: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };
    case CategoryActionTypes.FETCH_PAGED_CATEGORY:
      return {
        ...state,
        fetchPaged: {
          error: null,
          payload: InitPagedData,
          isPending: true,
          isSuccessful: false,
        },
      };
    case CategoryActionTypes.FETCH_PAGED_CATEGORY_RESET:
      return {
        ...state,
        fetchPaged: resetApiCallState(InitPagedData),
      };
    case CategoryActionTypes.FETCH_PAGED_CATEGORY_FAILURE:
      return {
        ...state,
        fetchPaged: {
          payload: InitPagedData,
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case CategoryActionTypes.FETCH_PAGED_CATEGORY_SUCCESS:
      return {
        ...state,
        fetchPaged: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case CategoryActionTypes.FETCH_ONE_CATEGORY:
      return {
        ...state,
        fetchOne: {
          error: null,
          payload: {},
          isPending: true,
          isSuccessful: false,
        },
      };
    case CategoryActionTypes.FETCH_ONE_CATEGORY_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case CategoryActionTypes.FETCH_ONE_CATEGORY_FAILURE:
      return {
        ...state,
        fetchOne: {
          payload: {},
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case CategoryActionTypes.FETCH_ONE_CATEGORY_SUCCESS:
      return {
        ...state,
        fetchOne: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    default:
      return state;
  }
};

export default CategoryReducer;
