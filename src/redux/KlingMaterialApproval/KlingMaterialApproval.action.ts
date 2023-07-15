import { KlingMaterialApprovalActionTypes } from "./KlingMaterialApproval.type";

/**
 * Fetch All KlingMaterialApproval
 *
 * @param payload
 */
export const fetchAllKlingMaterialApproval = (payload?: any) => ({
  type: KlingMaterialApprovalActionTypes.FETCH_ALL_KLING_MATERIAL_APPROVAL,
  payload: payload,
});

/**
 * Fetch All KlingMaterialApproval
 *
 * @param payload
 */
export const fetchOneKlingMaterialApproval = (payload?: any) => ({
  type: KlingMaterialApprovalActionTypes.FETCH_ONE_KLING_MATERIAL_APPROVAL,
  payload: payload,
});

/**
 * Reset Fetch KlingMaterialApproval State
 *
 * @param payload
 */
export const fetchAllKlingMaterialApprovalReset = (payload?: any) => ({
  type: KlingMaterialApprovalActionTypes.FETCH_ALL_KLING_MATERIAL_APPROVAL_RESET,
  payload: payload,
});
