import {
  MaterialRequestStateTypes,
  MaterialRequestActionTypes,
} from "./MaterialRequest.type";
import { resetApiCallState } from "../Utils";

const INITIAL_STATE: MaterialRequestStateTypes = {
  fetchAll: resetApiCallState([]),
  fetchOne: resetApiCallState({}),
};

const MaterialRequestReducer = (
  state: MaterialRequestStateTypes = INITIAL_STATE,
  action: any
): MaterialRequestStateTypes => {
  switch (action.type) {
    case MaterialRequestActionTypes.FETCH_ALL_MATERIAL_REQUEST:
      return {
        ...state,
        fetchAll: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case MaterialRequestActionTypes.FETCH_ALL_MATERIAL_REQUEST_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case MaterialRequestActionTypes.FETCH_ALL_MATERIAL_REQUEST_FAILURE:
      return {
        ...state,
        fetchAll: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case MaterialRequestActionTypes.FETCH_ALL_MATERIAL_REQUEST_SUCCESS:
      return {
        ...state,
        fetchAll: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case MaterialRequestActionTypes.FETCH_ONE_MATERIAL_REQUEST:
      return {
        ...state,
        fetchOne: {
          error: null,
          payload: {},
          isPending: true,
          isSuccessful: false,
        },
      };
    case MaterialRequestActionTypes.FETCH_ONE_MATERIAL_REQUEST_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case MaterialRequestActionTypes.FETCH_ONE_MATERIAL_REQUEST_FAILURE:
      return {
        ...state,
        fetchOne: {
          payload: {},
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case MaterialRequestActionTypes.FETCH_ONE_MATERIAL_REQUEST_SUCCESS:
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

export default MaterialRequestReducer;
