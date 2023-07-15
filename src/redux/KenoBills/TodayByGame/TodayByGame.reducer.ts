import { TodayByGameKenoBillStateTypes, TodayByGameKenoBillActionTypes } from "./TodayByGame.type";
import { resetApiCallState } from "../../Utils";

const INITIAL_STATE: TodayByGameKenoBillStateTypes = {
  fetchAll: resetApiCallState([]),
  fetchOne: resetApiCallState({}),
};

const DataReducer = (
  state: TodayByGameKenoBillStateTypes = INITIAL_STATE,
  action: any
): TodayByGameKenoBillStateTypes => {
  switch (action.type) {
    case TodayByGameKenoBillActionTypes.FETCH_ALL_TODAY_KENO_BILL_BY_GAME:
      return {
        ...state,
        fetchAll: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case TodayByGameKenoBillActionTypes.FETCH_ALL_TODAY_KENO_BILL_BY_GAME_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case TodayByGameKenoBillActionTypes.FETCH_ALL_TODAY_KENO_BILL_BY_GAME_FAILURE:
      return {
        ...state,
        fetchAll: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case TodayByGameKenoBillActionTypes.FETCH_ALL_TODAY_KENO_BILL_BY_GAME_SUCCESS:
      return {
        ...state,
        fetchAll: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case TodayByGameKenoBillActionTypes.FETCH_ONE_TODAY_KENO_BILL_BY_GAME:
      return {
        ...state,
        fetchOne: {
          error: null,
          payload: {},
          isPending: true,
          isSuccessful: false,
        },
      };
    case TodayByGameKenoBillActionTypes.FETCH_ONE_TODAY_KENO_BILL_BY_GAME_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case TodayByGameKenoBillActionTypes.FETCH_ONE_TODAY_KENO_BILL_BY_GAME_FAILURE:
      return {
        ...state,
        fetchOne: {
          payload: {},
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case TodayByGameKenoBillActionTypes.FETCH_ONE_TODAY_KENO_BILL_BY_GAME_SUCCESS:
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
