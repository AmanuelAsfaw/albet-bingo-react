import { AnyDayByGameKenoBillStateTypes, AnyDayByGameKenoBillActionTypes } from "./AnyDayByGame.type";
import { resetApiCallState } from "../../Utils";

const INITIAL_STATE: AnyDayByGameKenoBillStateTypes = {
  fetchAll: resetApiCallState([]),
  fetchOne: resetApiCallState({}),
};

const DataReducer = (
  state: AnyDayByGameKenoBillStateTypes = INITIAL_STATE,
  action: any
): AnyDayByGameKenoBillStateTypes => {
  switch (action.type) {
    case AnyDayByGameKenoBillActionTypes.FETCH_ALL_ANYDAY_KENO_BILL_BY_GAME:
      return {
        ...state,
        fetchAll: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case AnyDayByGameKenoBillActionTypes.FETCH_ALL_ANYDAY_KENO_BILL_BY_GAME_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case AnyDayByGameKenoBillActionTypes.FETCH_ALL_ANYDAY_KENO_BILL_BY_GAME_FAILURE:
      return {
        ...state,
        fetchAll: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case AnyDayByGameKenoBillActionTypes.FETCH_ALL_ANYDAY_KENO_BILL_BY_GAME_SUCCESS:
      return {
        ...state,
        fetchAll: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case AnyDayByGameKenoBillActionTypes.FETCH_ONE_ANYDAY_KENO_BILL_BY_GAME:
      return {
        ...state,
        fetchOne: {
          error: null,
          payload: {},
          isPending: true,
          isSuccessful: false,
        },
      };
    case AnyDayByGameKenoBillActionTypes.FETCH_ONE_ANYDAY_KENO_BILL_BY_GAME_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case AnyDayByGameKenoBillActionTypes.FETCH_ONE_ANYDAY_KENO_BILL_BY_GAME_FAILURE:
      return {
        ...state,
        fetchOne: {
          payload: {},
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case AnyDayByGameKenoBillActionTypes.FETCH_ONE_ANYDAY_KENO_BILL_BY_GAME_SUCCESS:
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
