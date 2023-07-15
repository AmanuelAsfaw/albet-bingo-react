import { SiteDiaryStateTypes, SiteDiaryActionTypes } from "./SiteDiary.type";
import { resetApiCallState } from "../Utils";

const INITIAL_STATE: SiteDiaryStateTypes = {
  fetchAll: resetApiCallState([]),
};

const SiteDiaryReducer = (
  state: SiteDiaryStateTypes = INITIAL_STATE,
  action: any
): SiteDiaryStateTypes => {
  switch (action.type) {
    case SiteDiaryActionTypes.FETCH_ALL_SITE_DIARY:
      return {
        ...state,
        fetchAll: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case SiteDiaryActionTypes.FETCH_ALL_SITE_DIARY_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case SiteDiaryActionTypes.FETCH_ALL_SITE_DIARY_FAILURE:
      return {
        ...state,
        fetchAll: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case SiteDiaryActionTypes.FETCH_ALL_SITE_DIARY_SUCCESS:
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

export default SiteDiaryReducer;
