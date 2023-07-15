import { InspectionFormActionTypes } from "./InspectionForm.type";

/**
 * Fetch One InspectionForm
 *
 * @param payload
 */
export const fetchOneInspectionForm = (payload?: any) => ({
  type: InspectionFormActionTypes.FETCH_ONE_INSPECTION_FORM,
  payload: payload,
});

/**
 * Reset Fetch One InspectionForm State
 *
 * @param payload
 */
export const fetchOneInspectionFormReset = (payload?: any) => ({
  type: InspectionFormActionTypes.FETCH_ONE_INSPECTION_FORM_RESET,
  payload: payload,
});


/**
 * Fetch All InspectionForm
 *
 * @param payload
 */
export const fetchAllInspectionForm = (payload?: any) => ({
  type: InspectionFormActionTypes.FETCH_ALL_INSPECTION_FORM,
  payload: payload,
});

/**
 * Reset Fetch InspectionForm State
 *
 * @param payload
 */
export const fetchAllInspectionFormReset = (payload?: any) => ({
  type: InspectionFormActionTypes.FETCH_ALL_INSPECTION_FORM_RESET,
  payload: payload,
});
