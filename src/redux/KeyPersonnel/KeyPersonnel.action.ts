import { KeyPersonnelActions } from "./KeyPersonnel.type";

/**
 * Fetch
 *
 * @param payload
 */
export const fetchKeyPersonnel = (payload?: any) => ({
  type: KeyPersonnelActions.FETCH_KEY_PERSONNEL,
  payload: payload,
});

/**
 * Fetch success
 * @param  payload
 */
export const fetchKeyPersonnelSuccess = (payload?: any) => ({
  type: KeyPersonnelActions.FETCH_KEY_PERSONNEL_SUCCESS,
  payload: payload,
});

/**Fetch error
 *
 * @param payload
 */
export const fetchKeyPersonnelFailure = (payload?: any) => ({
  type: KeyPersonnelActions.FETCH_KEY_PERSONNEL_ERROR,
  payload: payload,
});
