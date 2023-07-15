import { MemoActionTypes } from "./Memo.type";

/**
 * Fetch All Memo
 *
 * @param payload
 */
export const fetchAllMemo = (payload?: any) => ({
  type: MemoActionTypes.FETCH_ALL_MEMO,
  payload: payload,
});

/**
 * Fetch All Memo
 *
 * @param payload
 */
export const fetchOneMemo = (payload?: any) => ({
  type: MemoActionTypes.FETCH_ONE_MEMO,
  payload: payload,
});

/**
 * Fetch All Memo
 *
 * @param payload
 */
export const fetchCountMemo = (payload?: any) => ({
  type: MemoActionTypes.FETCH_COUNT_MEMO,
  payload: payload,
});

/**
 * Reset Fetch Memo State
 *
 * @param payload
 */
export const fetchAllMemoReset = (payload?: any) => ({
  type: MemoActionTypes.FETCH_ALL_MEMO_RESET,
  payload: payload,
});
