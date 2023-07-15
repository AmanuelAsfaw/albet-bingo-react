import { resetApiCallState } from "../Utils";
import { KeyPersonnelActions, KeyPersonnelStateTypes } from "./KeyPersonnel.type";

const INITIAL_STATE: KeyPersonnelStateTypes = {
  fetchAll: resetApiCallState([]),
  fetchOne: resetApiCallState({}),
};

const KeyPersonnelReducer = (
  state: KeyPersonnelStateTypes = INITIAL_STATE,
  action: any
) => {
  switch (action.type) {
    case KeyPersonnelActions.FETCH_KEY_PERSONNEL:
      return {
        ...state,
        fetchAll: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case KeyPersonnelActions.FETCH_KEY_PERSONNEL_SUCCESS:
      return {
        ...state,
        fetchAll: {
          error: null,
          payload: action.payload,
          isPending: false,
          isSuccessful: true,
        },
      };
    case KeyPersonnelActions.FETCH_KEY_PERSONNEL_ERROR:
      return {
        ...state,
        fetchAll: {
          error: action.payload,
          payload: [],
          isPending: false,
          isSuccessful: false,
        },
      };

    case KeyPersonnelActions.FETCH_ONE_KEY_PERSONNEL:
      return {
        ...state,
        fetchOne: {
          error: null,
          payload: {},
          isPending: true,
          isSuccessful: false,
        },
      };
    case KeyPersonnelActions.FETCH_ONE_KEY_PERSONNEL_SUCCESS:
      return {
        ...state,
        fetchOne: {
          error: null,
          payload: action.payload,
          isPending: false,
          isSuccessful: true,
        },
      };
    case KeyPersonnelActions.FETCH_ONE_KEY_PERSONNEL_ERROR:
      return {
        ...state,
        fetchOne: {
          error: action.payload,
          payload: {},
          isPending: false,
          isSuccessful: false,
        },
      };
    default:
      return state;
  }
};

export default KeyPersonnelReducer;
