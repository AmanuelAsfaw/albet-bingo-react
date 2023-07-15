import { ConsultantActionTypes } from "./Consultant.type";

/**
 * Fetch All Consultants
 *
 * @param payload
 */
export const fetchAllConsultants = (payload?: any) => ({
  type: ConsultantActionTypes.FETCH_ALL_CONSULTANT,
  payload: payload,
});

/**
 * Reset Fetch Consultants State
 *
 * @param payload
 */
export const fetchAllConsultantsReset = (payload?: any) => ({
  type: ConsultantActionTypes.FETCH_ALL_CONSULTANT_RESET,
  payload: payload,
});
