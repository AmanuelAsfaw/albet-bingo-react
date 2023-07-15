import { MaterialApprovalStatusActionTypes } from "./MaterialApprovalStatus.type";

/**
 * Fetch All ProjectMonthlyReport
 *
 * @param payload
 */
export const fetchAllMaterialApprovalStatus = (payload?: any) => ({
  type: MaterialApprovalStatusActionTypes.FETCH_ALL_MATERIAL_APPROVAL_STATUS,
  payload: payload,
});

/**
 * Fetch Paged ProjectMonthlyReport
 *
 * @param payload
 */
export const fetchPagedMaterialApprovalStatus = (payload?: any) => ({
  type: MaterialApprovalStatusActionTypes.FETCH_PAGED_MATERIAL_APPROVAL_STATUS,
  payload: payload,
});

/**
 * Fetch All ProjectMonthlyReport
 *
 * @param payload
 */
export const fetchOneMaterialApprovalStatus = (payload?: any) => ({
  type: MaterialApprovalStatusActionTypes.FETCH_ONE_MATERIAL_APPROVAL_STATUS,
  payload: payload,
});

/**
 * Reset Fetch ProjectMonthlyReport State
 *
 * @param payload
 */
export const fetchAllMaterialApprovalStatusReset = (payload?: any) => ({
  type: MaterialApprovalStatusActionTypes.FETCH_ALL_MATERIAL_APPROVAL_STATUS_RESET,
  payload: payload,
});
