import { MediaActionTypes } from "./Media.type";

/**
 * Fetch All Media
 *
 * @param payload
 */
export const fetchAllMedias = (payload?: any) => ({
  type: MediaActionTypes.FETCH_ALL_MEDIA,
  payload: payload,
});

/**
 * Reset Fetch Medias State
 *
 * @param payload
 */
export const fetchAllMediasReset = (payload?: any) => ({
  type: MediaActionTypes.FETCH_ALL_MEDIA_RESET,
  payload: payload,
});
