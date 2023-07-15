import { RoleStateTypes, RoleActionTypes } from "./Role.type";
import { resetApiCallState } from "../Utils";

const INITIAL_STATE: RoleStateTypes = {
  fetchAll: resetApiCallState([]),
  fetchOne: resetApiCallState({}),
};

const RoleReducer = (
  state: RoleStateTypes = INITIAL_STATE,
  action: any
): RoleStateTypes => {
  switch (action.type) {
    case RoleActionTypes.FETCH_ALL_ROLE:
      return {
        ...state,
        fetchAll: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case RoleActionTypes.FETCH_ALL_ROLE_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case RoleActionTypes.FETCH_ALL_ROLE_FAILURE:
      return {
        ...state,
        fetchAll: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case RoleActionTypes.FETCH_ALL_ROLE_SUCCESS:
      return {
        ...state,
        fetchAll: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case RoleActionTypes.FETCH_ONE_ROLE:
      return {
        ...state,
        fetchOne: {
          error: null,
          payload: {},
          isPending: true,
          isSuccessful: false,
        },
      };
    case RoleActionTypes.FETCH_ONE_ROLE_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case RoleActionTypes.FETCH_ONE_ROLE_FAILURE:
      return {
        ...state,
        fetchOne: {
          payload: {},
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case RoleActionTypes.FETCH_ONE_ROLE_SUCCESS:
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

export default RoleReducer;
