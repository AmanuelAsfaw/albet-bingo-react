import { MediaStateTypes, MediaActionTypes } from "./Media.type";
import { resetApiCallState } from "../Utils";

const INITIAL_STATE: MediaStateTypes = {
  fetchAll: resetApiCallState([]),
};

const MediaReducer = (
  state: MediaStateTypes = INITIAL_STATE,
  action: any
): MediaStateTypes => {
  switch (action.type) {
    case MediaActionTypes.FETCH_ALL_MEDIA:
      return {
        ...state,
        fetchAll: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case MediaActionTypes.FETCH_ALL_MEDIA_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case MediaActionTypes.FETCH_ALL_MEDIA_FAILURE:
      return {
        ...state,
        fetchAll: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case MediaActionTypes.FETCH_ALL_MEDIA_SUCCESS:
      return {
        ...state,
        fetchAll: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };
    default:
      return state;
  }
};

export default MediaReducer;
