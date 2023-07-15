import { RFIStateTypes, RFIActionTypes } from "./RFI.type";
import { resetApiCallState } from "../Utils";

const INITIAL_STATE: RFIStateTypes = {
  fetchAll: resetApiCallState([]),
};

const RFIReducer = (
  state: RFIStateTypes = INITIAL_STATE,
  action: any
): RFIStateTypes => {
  switch (action.type) {
    case RFIActionTypes.FETCH_ALL_RFI:
      return {
        ...state,
        fetchAll: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case RFIActionTypes.FETCH_ALL_RFI_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case RFIActionTypes.FETCH_ALL_RFI_FAILURE:
      return {
        ...state,
        fetchAll: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case RFIActionTypes.FETCH_ALL_RFI_SUCCESS:
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

export default RFIReducer;
