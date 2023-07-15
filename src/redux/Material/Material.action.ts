import { MaterialActions } from "./Material.type";

/**
 * Fetch
 *
 * @param payload
 */
export const fetchMaterial = (payload?: any) => ({
  type: MaterialActions.FETCH_MATERIAL,
  payload: payload,
});

/**
 * Fetch success
 * @param  payload
 */
export const fetchMaterialSuccess = (payload?: any) => ({
  type: MaterialActions.FETCH_MATERIAL_SUCCESS,
  payload: payload,
});

/**Fetch error
 *
 * @param payload
 */
export const fetchMaterialFailure = (payload?: any) => ({
  type: MaterialActions.FETCH_MATERIAL_ERROR,
  payload: payload,
});
