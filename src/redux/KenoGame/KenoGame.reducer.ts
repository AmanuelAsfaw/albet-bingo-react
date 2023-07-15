import { KenoGameStateTypes, KenoGameActionTypes } from "./KenoGame.type";
import { resetApiCallState } from "../Utils";

const INITIAL_STATE: KenoGameStateTypes = {
  fetchAll: resetApiCallState([]),
  fetchOne: resetApiCallState({}),
};

const DataReducer = (
  state: KenoGameStateTypes = INITIAL_STATE,
  action: any
): KenoGameStateTypes => {
  switch (action.type) {
    case KenoGameActionTypes.FETCH_ALL_KENO_GAME:
      return {
        ...state,
        fetchAll: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case KenoGameActionTypes.FETCH_ALL_KENO_GAME_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case KenoGameActionTypes.FETCH_ALL_KENO_GAME_FAILURE:
      return {
        ...state,
        fetchAll: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case KenoGameActionTypes.FETCH_ALL_KENO_GAME_SUCCESS:
      return {
        ...state,
        fetchAll: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case KenoGameActionTypes.FETCH_ONE_KENO_GAME:
      return {
        ...state,
        fetchOne: {
          error: null,
          payload: {},
          isPending: true,
          isSuccessful: false,
        },
      };
    case KenoGameActionTypes.FETCH_ONE_KENO_GAME_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case KenoGameActionTypes.FETCH_ONE_KENO_GAME_FAILURE:
      return {
        ...state,
        fetchOne: {
          payload: {},
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case KenoGameActionTypes.FETCH_ONE_KENO_GAME_SUCCESS:
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

export default DataReducer;
