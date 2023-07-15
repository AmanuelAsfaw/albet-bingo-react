import { GameStateTypes, GameActionTypes } from "./Game.type";
import { resetApiCallState } from "../Utils";
import { GameList, KenoGameObj } from "./Game.util";

const INITIAL_STATE: GameStateTypes = {
  // fetchAll: resetApiCallState([]),
  fetchAll: resetApiCallState(GameList()),
  // fetchOne: resetApiCallState({}),
  fetchOne: resetApiCallState(KenoGameObj()),
  // fetchList: resetApiCallState([]),
  fetchList: resetApiCallState(GameList()),
};

const GameReducer = (
  state: GameStateTypes = INITIAL_STATE,
  action: any
): GameStateTypes => {
  switch (action.type) {
    case GameActionTypes.FETCH_ALL_GAME:
      return {
        ...state,
        fetchAll: {
          error: null,
          // payload: [],
          payload: GameList(),
          isPending: true,
          isSuccessful: false,
        },
      };
    case GameActionTypes.FETCH_ALL_GAME_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case GameActionTypes.FETCH_ALL_GAME_FAILURE:
      return {
        ...state,
        fetchAll: {
          // payload: [],
          payload: GameList(),
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case GameActionTypes.FETCH_ALL_GAME_SUCCESS:
      return {
        ...state,
        fetchAll: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case GameActionTypes.FETCH_ALL_GAME_LIST:
      return {
        ...state,
        fetchList: {
          error: null,
          // payload: [],
          payload: GameList(),
          isPending: true,
          isSuccessful: false,
        },
      };
    case GameActionTypes.FETCH_ALL_GAME_LIST_RESET:
      return {
        ...state,
        fetchList: resetApiCallState([]),
      };
    case GameActionTypes.FETCH_ALL_GAME_LIST_FAILURE:
      return {
        ...state,
        fetchList: {
          // payload: [],
          payload: GameList(),
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case GameActionTypes.FETCH_ALL_GAME_LIST_SUCCESS:
      return {
        ...state,
        fetchList: {
          error: null,
          isPending: false,
          isSuccessful: true,
          // payload: action.payload,
          payload: GameList(),
        },
      };

    case GameActionTypes.FETCH_ONE_GAME:
      return {
        ...state,
        fetchOne: {
          error: null,
          // payload: null,
          payload: KenoGameObj(),
          isPending: true,
          isSuccessful: false,
        },
      };
    case GameActionTypes.FETCH_ONE_GAME_RESET:
      return {
        ...state,
        fetchOne: resetApiCallState({}),
      };
    case GameActionTypes.FETCH_ONE_GAME_FAILURE:
      return {
        ...state,
        fetchOne: {
          // payload: null,
          payload: KenoGameObj(),
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case GameActionTypes.FETCH_ONE_GAME_SUCCESS:
      return {
        ...state,
        fetchOne: {
          error: null,
          isPending: false,
          isSuccessful: true,
          // payload: action.payload,
          payload: KenoGameObj(),
        },
      };

    case GameActionTypes.FETCH_ALL_PRE_GAME_FAILURE:
      return {
        ...state,
        fetchAll: {
          // payload: [],
          payload: GameList(),
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    
    default:
      return state;
  }
};

export default GameReducer;
