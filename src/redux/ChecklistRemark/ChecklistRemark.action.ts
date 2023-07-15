import { ChecklistRemarkActionTypes } from "./ChecklistRemark.type";

/**
 * Fetch All ChecklistRemark
 *
 * @param payload
 */
export const fetchAllChecklistRemark = (payload?: any) => ({
  type: ChecklistRemarkActionTypes.FETCH_ALL_CHECKLIST_REMARK,
  payload: payload,
});

/**
 * Fetch All ChecklistRemark
 *
 * @param payload
 */
export const fetchOneChecklistRemark = (payload?: any) => ({
  type: ChecklistRemarkActionTypes.FETCH_ONE_CHECKLIST_REMARK,
  payload: payload,
});

/**
 * Reset Fetch ChecklistRemark State
 *
 * @param payload
 */
export const fetchAllChecklistRemarkReset = (payload?: any) => ({
  type: ChecklistRemarkActionTypes.FETCH_ALL_CHECKLIST_REMARK_RESET,
  payload: payload,
});
