import { MemoStateTypes, MemoActionTypes } from "./Memo.type";
import { resetApiCallState } from "../Utils";

const INITIAL_STATE: MemoStateTypes = {
  fetchAll: resetApiCallState([]),
  fetchOne: resetApiCallState({}),
  fetchCount: resetApiCallState({}),
};

const MemoReducer = (
  state: MemoStateTypes = INITIAL_STATE,
  action: any
): MemoStateTypes => {
  switch (action.type) {
    case MemoActionTypes.FETCH_ALL_MEMO:
      return {
        ...state,
        fetchAll: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case MemoActionTypes.FETCH_ALL_MEMO_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case MemoActionTypes.FETCH_ALL_MEMO_FAILURE:
      return {
        ...state,
        fetchAll: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case MemoActionTypes.FETCH_ALL_MEMO_SUCCESS:
      return {
        ...state,
        fetchAll: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case MemoActionTypes.FETCH_ONE_MEMO:
      return {
        ...state,
        fetchOne: {
          error: null,
          payload: {},
          isPending: true,
          isSuccessful: false,
        },
      };
    case MemoActionTypes.FETCH_ONE_MEMO_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case MemoActionTypes.FETCH_ONE_MEMO_FAILURE:
      return {
        ...state,
        fetchOne: {
          payload: {},
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case MemoActionTypes.FETCH_ONE_MEMO_SUCCESS:
      return {
        ...state,
        fetchOne: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case MemoActionTypes.FETCH_COUNT_MEMO:
      return {
        ...state,
        fetchCount: {
          error: null,
          payload: { count: 0 },
          isPending: true,
          isSuccessful: false,
        },
      };
    case MemoActionTypes.FETCH_COUNT_MEMO_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case MemoActionTypes.FETCH_COUNT_MEMO_FAILURE:
      return {
        ...state,
        fetchCount: {
          payload: { count: 0 },
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case MemoActionTypes.FETCH_COUNT_MEMO_SUCCESS:
      return {
        ...state,
        fetchCount: {
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

export default MemoReducer;
