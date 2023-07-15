import { SHEStateTypes, SHEActionTypes } from "./SHE.type";
import { resetApiCallState } from "../Utils";

const INITIAL_STATE: SHEStateTypes = {
  fetchAll: resetApiCallState([]),
};

const SHEReducer = (
  state: SHEStateTypes = INITIAL_STATE,
  action: any
): SHEStateTypes => {
  switch (action.type) {
    case SHEActionTypes.FETCH_ALL_SHE:
      return {
        ...state,
        fetchAll: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case SHEActionTypes.FETCH_ALL_SHE_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case SHEActionTypes.FETCH_ALL_SHE_FAILURE:
      return {
        ...state,
        fetchAll: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case SHEActionTypes.FETCH_ALL_SHE_SUCCESS:
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

export default SHEReducer;
