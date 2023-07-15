import { PriceEscalationFileActionTypes } from "./PriceEscalationFile.type";

/**
 * Fetch All PriceEscalationFile
 *
 * @param payload
 */
export const fetchAllPriceEscalationFile = (payload?: any) => ({
  type: PriceEscalationFileActionTypes.FETCH_ALL_PRICE_ESCALATION_FILE,
  payload: payload,
});

/**
 * Fetch All PriceEscalationFile
 *
 * @param payload
 */
export const fetchOnePriceEscalationFile = (payload?: any) => ({
  type: PriceEscalationFileActionTypes.FETCH_ONE_PRICE_ESCALATION_FILE,
  payload: payload,
});

/**
 * Reset Fetch PriceEscalationFile State
 *
 * @param payload
 */
export const fetchAllPriceEscalationFileReset = (payload?: any) => ({
  type: PriceEscalationFileActionTypes.FETCH_ALL_PRICE_ESCALATION_FILE_RESET,
  payload: payload,
});
