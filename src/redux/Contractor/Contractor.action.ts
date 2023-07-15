import { ContractorActionTypes } from "./Contractor.type";

/**
 * Fetch All Contractors
 *
 * @param payload
 */
export const fetchAllContractors = (payload?: any) => ({
  type: ContractorActionTypes.FETCH_ALL_CONTRACTOR,
  payload: payload,
});

/**
 * Reset Fetch Contractors State
 *
 * @param payload
 */
export const fetchAllContractorsReset = (payload?: any) => ({
  type: ContractorActionTypes.FETCH_ALL_CONTRACTOR_RESET,
  payload: payload,
});
