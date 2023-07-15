import { InitPagedData } from "./../Utils";
import {
  SubCategoryStateTypes,
  SubCategoryActionTypes,
} from "./SubCategory.type";
import { resetApiCallState } from "../Utils";

const INITIAL_STATE: SubCategoryStateTypes = {
  fetchAll: resetApiCallState([]),
  fetchOne: resetApiCallState({}),
  fetchPaged: resetApiCallState(InitPagedData),
};

const SubCategoryReducer = (
  state: SubCategoryStateTypes = INITIAL_STATE,
  action: any
): SubCategoryStateTypes => {
  switch (action.type) {
    case SubCategoryActionTypes.FETCH_ALL_SUB_CATEGORY:
      return {
        ...state,
        fetchAll: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case SubCategoryActionTypes.FETCH_ALL_SUB_CATEGORY_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case SubCategoryActionTypes.FETCH_ALL_SUB_CATEGORY_FAILURE:
      return {
        ...state,
        fetchAll: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case SubCategoryActionTypes.FETCH_ALL_SUB_CATEGORY_SUCCESS:
      return {
        ...state,
        fetchAll: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };
    case SubCategoryActionTypes.FETCH_PAGED_SUB_CATEGORY:
      return {
        ...state,
        fetchPaged: {
          error: null,
          payload: InitPagedData,
          isPending: true,
          isSuccessful: false,
        },
      };
    case SubCategoryActionTypes.FETCH_PAGED_SUB_CATEGORY_RESET:
      return {
        ...state,
        fetchPaged: resetApiCallState(InitPagedData),
      };
    case SubCategoryActionTypes.FETCH_PAGED_SUB_CATEGORY_FAILURE:
      return {
        ...state,
        fetchPaged: {
          payload: InitPagedData,
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case SubCategoryActionTypes.FETCH_PAGED_SUB_CATEGORY_SUCCESS:
      return {
        ...state,
        fetchPaged: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case SubCategoryActionTypes.FETCH_ONE_SUB_CATEGORY:
      return {
        ...state,
        fetchOne: {
          error: null,
          payload: {},
          isPending: true,
          isSuccessful: false,
        },
      };
    case SubCategoryActionTypes.FETCH_ONE_SUB_CATEGORY_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case SubCategoryActionTypes.FETCH_ONE_SUB_CATEGORY_FAILURE:
      return {
        ...state,
        fetchOne: {
          payload: {},
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case SubCategoryActionTypes.FETCH_ONE_SUB_CATEGORY_SUCCESS:
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

export default SubCategoryReducer;
