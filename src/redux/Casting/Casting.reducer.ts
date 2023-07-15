import { CastingStateTypes, CastingActionTypes } from "./Casting.type";
import { resetApiCallState } from "../Utils";

const INITIAL_STATE: CastingStateTypes = {
  fetchAll: resetApiCallState([]),
};

const CastingReducer = (
  state: CastingStateTypes = INITIAL_STATE,
  action: any
): CastingStateTypes => {
  switch (action.type) {
    case CastingActionTypes.FETCH_ALL_CASTING:
      return {
        ...state,
        fetchAll: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case CastingActionTypes.FETCH_ALL_CASTING_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case CastingActionTypes.FETCH_ALL_CASTING_FAILURE:
      return {
        ...state,
        fetchAll: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case CastingActionTypes.FETCH_ALL_CASTING_SUCCESS:
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

export default CastingReducer;
