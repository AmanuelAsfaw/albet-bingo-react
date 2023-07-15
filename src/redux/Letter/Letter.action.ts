import { LetterActionTypes } from "./Letter.type";

/**
 * Fetch All Letter
 *
 * @param payload
 */
export const fetchAllLetter = (payload?: any) => ({
  type: LetterActionTypes.FETCH_ALL_LETTER,
  payload: payload,
});

/**
 * Fetch All Letter
 *
 * @param payload
 */
export const fetchOneLetter = (payload?: any) => ({
  type: LetterActionTypes.FETCH_ONE_LETTER,
  payload: payload,
});

/**
 * Reset Fetch Letter State
 *
 * @param payload
 */
export const fetchAllLetterReset = (payload?: any) => ({
  type: LetterActionTypes.FETCH_ALL_LETTER_RESET,
  payload: payload,
});
