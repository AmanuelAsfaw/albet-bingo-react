import { DrawingStateTypes, DrawingActionTypes } from "./Drawing.type";
import { resetApiCallState } from "../Utils";

const INITIAL_STATE: DrawingStateTypes = {
  fetchAll: resetApiCallState([]),
  fetchOne: resetApiCallState({}),
};

const DrawingReducer = (
  state: DrawingStateTypes = INITIAL_STATE,
  action: any
): DrawingStateTypes => {
  switch (action.type) {
    case DrawingActionTypes.FETCH_ALL_DRAWING:
      return {
        ...state,
        fetchAll: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case DrawingActionTypes.FETCH_ALL_DRAWING_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case DrawingActionTypes.FETCH_ALL_DRAWING_FAILURE:
      return {
        ...state,
        fetchAll: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case DrawingActionTypes.FETCH_ALL_DRAWING_SUCCESS:
      return {
        ...state,
        fetchAll: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case DrawingActionTypes.FETCH_ONE_DRAWING:
      return {
        ...state,
        fetchOne: {
          error: null,
          payload: {},
          isPending: true,
          isSuccessful: false,
        },
      };
    case DrawingActionTypes.FETCH_ONE_DRAWING_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case DrawingActionTypes.FETCH_ONE_DRAWING_FAILURE:
      return {
        ...state,
        fetchOne: {
          payload: {},
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case DrawingActionTypes.FETCH_ONE_DRAWING_SUCCESS:
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

export default DrawingReducer;
