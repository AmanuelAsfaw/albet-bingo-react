import { KlingMaterialApprovalStateTypes, KlingMaterialApprovalActionTypes } from "./KlingMaterialApproval.type";
import { resetApiCallState } from "../Utils";

const INITIAL_STATE: KlingMaterialApprovalStateTypes = {
  fetchAll: resetApiCallState([]),
  fetchOne: resetApiCallState({}),
};

const KlingMaterialApprovalReducer = (
  state: KlingMaterialApprovalStateTypes = INITIAL_STATE,
  action: any
): KlingMaterialApprovalStateTypes => {
  switch (action.type) {
    case KlingMaterialApprovalActionTypes.FETCH_ALL_KLING_MATERIAL_APPROVAL:
      return {
        ...state,
        fetchAll: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case KlingMaterialApprovalActionTypes.FETCH_ALL_KLING_MATERIAL_APPROVAL_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case KlingMaterialApprovalActionTypes.FETCH_ALL_KLING_MATERIAL_APPROVAL_FAILURE:
      return {
        ...state,
        fetchAll: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case KlingMaterialApprovalActionTypes.FETCH_ALL_KLING_MATERIAL_APPROVAL_SUCCESS:
      return {
        ...state,
        fetchAll: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case KlingMaterialApprovalActionTypes.FETCH_ONE_KLING_MATERIAL_APPROVAL:
      return {
        ...state,
        fetchOne: {
          error: null,
          payload: {},
          isPending: true,
          isSuccessful: false,
        },
      };
    case KlingMaterialApprovalActionTypes.FETCH_ONE_KLING_MATERIAL_APPROVAL_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case KlingMaterialApprovalActionTypes.FETCH_ONE_KLING_MATERIAL_APPROVAL_FAILURE:
      return {
        ...state,
        fetchOne: {
          payload: {},
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case KlingMaterialApprovalActionTypes.FETCH_ONE_KLING_MATERIAL_APPROVAL_SUCCESS:
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

export default KlingMaterialApprovalReducer;
