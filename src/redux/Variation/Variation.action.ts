import { VariationActionTypes } from "./Variation.type";

/**
 * Fetch All Variation
 *
 * @param payload
 */
export const fetchAllVariations = (payload?: any) => ({
  type: VariationActionTypes.FETCH_ALL_VARIATION,
  payload: payload,
});

/**
 * Fetch All Variation
 *
 * @param payload
 */
export const fetchOneVariation = (payload?: any) => ({
  type: VariationActionTypes.FETCH_ONE_VARIATION,
  payload: payload,
});

/**
 * Reset Fetch Variation State
 *
 * @param payload
 */
export const fetchAllVariationsReset = (payload?: any) => ({
  type: VariationActionTypes.FETCH_ALL_VARIATION_RESET,
  payload: payload,
});
