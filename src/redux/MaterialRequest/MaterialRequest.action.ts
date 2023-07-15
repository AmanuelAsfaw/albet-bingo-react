import { MaterialRequestActionTypes } from "./MaterialRequest.type";

/**
 * Fetch All MaterialRequest
 *
 * @param payload
 */
export const fetchAllMaterialRequest = (payload?: any) => ({
  type: MaterialRequestActionTypes.FETCH_ALL_MATERIAL_REQUEST,
  payload: payload,
});

/**
 * Fetch All MaterialRequest
 *
 * @param payload
 */
export const fetchOneMaterialRequest = (payload?: any) => ({
  type: MaterialRequestActionTypes.FETCH_ONE_MATERIAL_REQUEST,
  payload: payload,
});

/**
 * Reset Fetch MaterialRequest State
 *
 * @param payload
 */
export const fetchAllMaterialRequestReset = (payload?: any) => ({
  type: MaterialRequestActionTypes.FETCH_ALL_MATERIAL_REQUEST_RESET,
  payload: payload,
});
