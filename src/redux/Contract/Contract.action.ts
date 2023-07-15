import { ContractActionTypes } from "./Contract.type";

/**
 * Fetch All Contract
 *
 * @param payload
 */
export const fetchAllContracts = (payload?: any) => ({
  type: ContractActionTypes.FETCH_ALL_CONTRACT,
  payload: payload,
});

/**
 * Fetch All Contract
 *
 * @param payload
 */
export const fetchOneContract = (payload?: any) => ({
  type: ContractActionTypes.FETCH_ONE_CONTRACT,
  payload: payload,
});

/**
 * Reset Fetch Contract State
 *
 * @param payload
 */
export const fetchAllContractsReset = (payload?: any) => ({
  type: ContractActionTypes.FETCH_ALL_CONTRACT_RESET,
  payload: payload,
});
