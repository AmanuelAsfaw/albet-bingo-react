import { RFIActionTypes } from "./RFI.type";

/**
 * Fetch All RFIs
 *
 * @param payload
 */
export const fetchAllRFIs = (payload?: any) => ({
  type: RFIActionTypes.FETCH_ALL_RFI,
  payload: payload,
});

/**
 * Reset Fetch RFIs State
 *
 * @param payload
 */
export const fetchAllRFIsReset = (payload?: any) => ({
  type: RFIActionTypes.FETCH_ALL_RFI_RESET,
  payload: payload,
});
