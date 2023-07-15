import { InspectionActionTypes } from "./Inspection.type";

/**
 * Fetch One Inspection
 *
 * @param payload
 */
export const fetchOneInspection = (payload?: any) => ({
  type: InspectionActionTypes.FETCH_ONE_INSPECTION,
  payload: payload,
});

/**
 * Reset Fetch One Inspection State
 *
 * @param payload
 */
export const fetchOneInspectionReset = (payload?: any) => ({
  type: InspectionActionTypes.FETCH_ONE_INSPECTION_RESET,
  payload: payload,
});


/**
 * Fetch All Inspection
 *
 * @param payload
 */
export const fetchAllInspection = (payload?: any) => ({
  type: InspectionActionTypes.FETCH_ALL_INSPECTION,
  payload: payload,
});

/**
 * Reset Fetch Inspection State
 *
 * @param payload
 */
export const fetchAllInspectionReset = (payload?: any) => ({
  type: InspectionActionTypes.FETCH_ALL_INSPECTION_RESET,
  payload: payload,
});
