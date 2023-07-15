import { MaterialRequestApprovalStateTypes, MaterialRequestApprovalActionTypes } from "./MaterialRequestApproval.type";
import { resetApiCallState } from "../Utils";

const INITIAL_STATE: MaterialRequestApprovalStateTypes = {
  fetchAll: resetApiCallState([]),
  fetchOne: resetApiCallState({}),
};

const MaterialRequestApprovalReducer = (
  state: MaterialRequestApprovalStateTypes = INITIAL_STATE,
  action: any
): MaterialRequestApprovalStateTypes => {
  switch (action.type) {
    case MaterialRequestApprovalActionTypes.FETCH_ALL_MATERIAL_REQUEST_APPROVAL:
      return {
        ...state,
        fetchAll: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case MaterialRequestApprovalActionTypes.FETCH_ALL_MATERIAL_REQUEST_APPROVAL_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case MaterialRequestApprovalActionTypes.FETCH_ALL_MATERIAL_REQUEST_APPROVAL_FAILURE:
      return {
        ...state,
        fetchAll: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case MaterialRequestApprovalActionTypes.FETCH_ALL_MATERIAL_REQUEST_APPROVAL_SUCCESS:
      return {
        ...state,
        fetchAll: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case MaterialRequestApprovalActionTypes.FETCH_ONE_MATERIAL_REQUEST_APPROVAL:
      return {
        ...state,
        fetchOne: {
          error: null,
          payload: {},
          isPending: true,
          isSuccessful: false,
        },
      };
    case MaterialRequestApprovalActionTypes.FETCH_ONE_MATERIAL_REQUEST_APPROVAL_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case MaterialRequestApprovalActionTypes.FETCH_ONE_MATERIAL_REQUEST_APPROVAL_FAILURE:
      return {
        ...state,
        fetchOne: {
          payload: {},
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case MaterialRequestApprovalActionTypes.FETCH_ONE_MATERIAL_REQUEST_APPROVAL_SUCCESS:
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

export default MaterialRequestApprovalReducer;
