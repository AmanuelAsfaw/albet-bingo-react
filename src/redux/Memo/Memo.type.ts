import { User } from "../User/User.type";
import { ApiCallState } from "../Utils";

export type Memo = {
  id: number;
  date: string;
  subject: string;
  reference_number: string;
  reference_id: number;
  memo_prepared: User;
  memo_from: User;
  message: string;
  memo_to: User;
  memo_users: {
    id: number;
    full_name: string;
    role: string;
    memo_users: { type: "to" | "cc" };
  }[];
};

export type MemoStateTypes = {
  fetchAll: ApiCallState<Memo[]>;
  fetchOne: ApiCallState<Memo | {}>;
  fetchCount: ApiCallState<{ count: number }>;
};

export const MemoActionTypes = {
  FETCH_ALL_MEMO: "FETCH_ALL_MEMO",
  FETCH_ALL_MEMO_RESET: "FETCH_ALL_MEMO_RESET",
  FETCH_ALL_MEMO_FAILURE: "FETCH_ALL_MEMO_FAILURE",
  FETCH_ALL_MEMO_SUCCESS: "FETCH_ALL_MEMO_SUCCESS",

  FETCH_ONE_MEMO: "FETCH_ONE_MEMO",
  FETCH_ONE_MEMO_RESET: "FETCH_ONE_MEMO_RESET",
  FETCH_ONE_MEMO_FAILURE: "FETCH_ONE_MEMO_FAILURE",
  FETCH_ONE_MEMO_SUCCESS: "FETCH_ONE_MEMO_SUCCESS",

  FETCH_COUNT_MEMO: "FETCH_COUNT_MEMO",
  FETCH_COUNT_MEMO_RESET: "FETCH_COUNT_MEMO_RESET",
  FETCH_COUNT_MEMO_FAILURE: "FETCH_COUNT_MEMO_FAILURE",
  FETCH_COUNT_MEMO_SUCCESS: "FETCH_COUNT_MEMO_SUCCESS",
};
