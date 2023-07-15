import { ContractAdminstrationActionTypes } from "./ContractAdminstration.type";

/**
 * Fetch All ContractAdminstration
 *
 * @param payload
 */
export const fetchAllContractAdminstration = (payload?: any) => ({
  type: ContractAdminstrationActionTypes.FETCH_ALL_CONTRACT_ADMINSTRATION,
  payload: payload,
});

/**
 * Fetch All ContractAdminstration
 *
 * @param payload
 */
export const fetchOneContractAdminstration = (payload?: any) => ({
  type: ContractAdminstrationActionTypes.FETCH_ONE_CONTRACT_ADMINSTRATION,
  payload: payload,
});

/**
 * Reset Fetch ContractAdminstration State
 *
 * @param payload
 */
export const fetchAllContractAdminstrationReset = (payload?: any) => ({
  type: ContractAdminstrationActionTypes.FETCH_ALL_CONTRACT_ADMINSTRATION_RESET,
  payload: payload,
});
