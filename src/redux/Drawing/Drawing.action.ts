import { DrawingActionTypes } from "./Drawing.type";

/**
 * Fetch All Drawing
 *
 * @param payload
 */
export const fetchAllDrawings = (payload?: any) => ({
  type: DrawingActionTypes.FETCH_ALL_DRAWING,
  payload: payload,
});

/**
 * Fetch All Drawing
 *
 * @param payload
 */
export const fetchOneDrawing = (payload?: any) => ({
  type: DrawingActionTypes.FETCH_ONE_DRAWING,
  payload: payload,
});

/**
 * Reset Fetch Drawing State
 *
 * @param payload
 */
export const fetchAllDrawingsReset = (payload?: any) => ({
  type: DrawingActionTypes.FETCH_ALL_DRAWING_RESET,
  payload: payload,
});
