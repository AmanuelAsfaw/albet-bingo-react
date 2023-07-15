import { MaterialRequestApprovalActionTypes } from "./MaterialRequestApproval.type";

/**
 * Fetch All MaterialRequestApproval
 *
 * @param payload
 */
export const fetchAllMaterialRequestApproval = (payload?: any) => ({
  type: MaterialRequestApprovalActionTypes.FETCH_ALL_MATERIAL_REQUEST_APPROVAL,
  payload: payload,
});

/**
 * Fetch All MaterialRequestApproval
 *
 * @param payload
 */
export const fetchOneMaterialRequestApproval = (payload?: any) => ({
  type: MaterialRequestApprovalActionTypes.FETCH_ONE_MATERIAL_REQUEST_APPROVAL,
  payload: payload,
});

/**
 * Reset Fetch MaterialRequestApproval State
 *
 * @param payload
 */
export const fetchAllMaterialRequestApprovalReset = (payload?: any) => ({
  type: MaterialRequestApprovalActionTypes.FETCH_ALL_MATERIAL_REQUEST_APPROVAL_RESET,
  payload: payload,
});
