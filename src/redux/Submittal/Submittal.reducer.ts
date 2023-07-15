import { SubmittalStateTypes, SubmittalActionTypes } from "./Submittal.type";
import { resetApiCallState } from "../Utils";

const INITIAL_STATE: SubmittalStateTypes = {
  fetchAll: resetApiCallState([]),
  fetchOne: resetApiCallState({}),
};

const SubmittalReducer = (
  state: SubmittalStateTypes = INITIAL_STATE,
  action: any
): SubmittalStateTypes => {
  switch (action.type) {
    case SubmittalActionTypes.FETCH_ALL_SUBMITTAL:
      return {
        ...state,
        fetchAll: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case SubmittalActionTypes.FETCH_ALL_SUBMITTAL_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case SubmittalActionTypes.FETCH_ALL_SUBMITTAL_FAILURE:
      return {
        ...state,
        fetchAll: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case SubmittalActionTypes.FETCH_ALL_SUBMITTAL_SUCCESS:
      return {
        ...state,
        fetchAll: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case SubmittalActionTypes.FETCH_ONE_SUBMITTAL:
      return {
        ...state,
        fetchOne: {
          error: null,
          payload: {},
          isPending: true,
          isSuccessful: false,
        },
      };
    case SubmittalActionTypes.FETCH_ONE_SUBMITTAL_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case SubmittalActionTypes.FETCH_ONE_SUBMITTAL_FAILURE:
      return {
        ...state,
        fetchOne: {
          payload: {},
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case SubmittalActionTypes.FETCH_ONE_SUBMITTAL_SUCCESS:
      return {
        ...state,
        fetchOne: {
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

export default SubmittalReducer;
