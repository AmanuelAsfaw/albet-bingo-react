import { LetterStateTypes, LetterActionTypes } from "./Letter.type";
import { resetApiCallState } from "../Utils";

const INITIAL_STATE: LetterStateTypes = {
  fetchAll: resetApiCallState([]),
  fetchOne: resetApiCallState({}),
};

const LetterReducer = (
  state: LetterStateTypes = INITIAL_STATE,
  action: any
): LetterStateTypes => {
  switch (action.type) {
    case LetterActionTypes.FETCH_ALL_LETTER:
      return {
        ...state,
        fetchAll: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case LetterActionTypes.FETCH_ALL_LETTER_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case LetterActionTypes.FETCH_ALL_LETTER_FAILURE:
      return {
        ...state,
        fetchAll: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case LetterActionTypes.FETCH_ALL_LETTER_SUCCESS:
      return {
        ...state,
        fetchAll: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case LetterActionTypes.FETCH_ONE_LETTER:
      return {
        ...state,
        fetchOne: {
          error: null,
          payload: {},
          isPending: true,
          isSuccessful: false,
        },
      };
    case LetterActionTypes.FETCH_ONE_LETTER_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case LetterActionTypes.FETCH_ONE_LETTER_FAILURE:
      return {
        ...state,
        fetchOne: {
          payload: {},
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case LetterActionTypes.FETCH_ONE_LETTER_SUCCESS:
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

export default LetterReducer;
