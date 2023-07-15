import { InitPagedData } from "../Utils";
import {
  MaterialApprovalStatusStateTypes,
  MaterialApprovalStatusActionTypes,
} from "./MaterialApprovalStatus.type";
import { resetApiCallState } from "../Utils";

const INITIAL_STATE: MaterialApprovalStatusStateTypes = {
  fetchAll: resetApiCallState([]),
  fetchOne: resetApiCallState({}),
  fetchPaged: resetApiCallState(InitPagedData),
};

const MaterialApprovalStatusReducer = (
  state: MaterialApprovalStatusStateTypes = INITIAL_STATE,
  action: any
): MaterialApprovalStatusStateTypes => {
  switch (action.type) {
    case MaterialApprovalStatusActionTypes.FETCH_ALL_MATERIAL_APPROVAL_STATUS:
      return {
        ...state,
        fetchAll: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case MaterialApprovalStatusActionTypes.FETCH_ALL_MATERIAL_APPROVAL_STATUS_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case MaterialApprovalStatusActionTypes.FETCH_ALL_MATERIAL_APPROVAL_STATUS_FAILURE:
      return {
        ...state,
        fetchAll: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case MaterialApprovalStatusActionTypes.FETCH_ALL_MATERIAL_APPROVAL_STATUS_SUCCESS:
      return {
        ...state,
        fetchAll: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };
    case MaterialApprovalStatusActionTypes.FETCH_PAGED_MATERIAL_APPROVAL_STATUS:
      return {
        ...state,
        fetchPaged: {
          error: null,
          payload: InitPagedData,
          isPending: true,
          isSuccessful: false,
        },
      };
    case MaterialApprovalStatusActionTypes.FETCH_PAGED_MATERIAL_APPROVAL_STATUS_RESET:
      return {
        ...state,
        fetchPaged: resetApiCallState(InitPagedData),
      };
    case MaterialApprovalStatusActionTypes.FETCH_PAGED_MATERIAL_APPROVAL_STATUS_FAILURE:
      return {
        ...state,
        fetchPaged: {
          payload: InitPagedData,
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case MaterialApprovalStatusActionTypes.FETCH_PAGED_MATERIAL_APPROVAL_STATUS_SUCCESS:
      return {
        ...state,
        fetchPaged: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case MaterialApprovalStatusActionTypes.FETCH_ONE_MATERIAL_APPROVAL_STATUS:
      return {
        ...state,
        fetchOne: {
          error: null,
          payload: {},
          isPending: true,
          isSuccessful: false,
        },
      };
    case MaterialApprovalStatusActionTypes.FETCH_ONE_MATERIAL_APPROVAL_STATUS_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case MaterialApprovalStatusActionTypes.FETCH_ONE_MATERIAL_APPROVAL_STATUS_FAILURE:
      return {
        ...state,
        fetchOne: {
          payload: {},
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case MaterialApprovalStatusActionTypes.FETCH_ONE_MATERIAL_APPROVAL_STATUS_SUCCESS:
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

export default MaterialApprovalStatusReducer;
