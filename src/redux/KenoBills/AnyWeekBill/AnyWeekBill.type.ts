import { ApiCallState } from "../../Utils";
import { KenoCasher } from "../../KenoCasher/KenoCasher.type";
import { KenoGame } from "../../KenoGame/KenoGame.type";

export type AnyWeekKenoBill= {
    id: number | null;
    casher: KenoCasher;
    game: KenoGame;
    unique_key:string;
    date: string;
    is_winner: boolean;
    is_paid: boolean;
    is_canceled: boolean;
    is_redeemed: boolean;
    stake: number;
    selected_numbers:number[];
};

export type AnyWeekKenoBillStateTypes = {
  fetchAll: ApiCallState<AnyWeekKenoBill[]>;
  fetchOne: ApiCallState<AnyWeekKenoBill | {}>;
};

export const AnyWeekKenoBillActionTypes = {
  FETCH_ALL_ANY_WEEK_KENO_BILL: "FETCH_ALL_ANY_WEEK_KENO_BILL",
  FETCH_ALL_ANY_WEEK_KENO_BILL_RESET: "FETCH_ALL_ANY_WEEK_KENO_BILL_RESET",
  FETCH_ALL_ANY_WEEK_KENO_BILL_FAILURE: "FETCH_ALL_ANY_WEEK_KENO_BILL_FAILURE",
  FETCH_ALL_ANY_WEEK_KENO_BILL_SUCCESS: "FETCH_ALL_ANY_WEEK_KENO_BILL_SUCCESS",

  FETCH_ONE_ANY_WEEK_KENO_BILL: "FETCH_ONE_ANY_WEEK_KENO_BILL",
  FETCH_ONE_ANY_WEEK_KENO_BILL_RESET: "FETCH_ONE_ANY_WEEK_KENO_BILL_RESET",
  FETCH_ONE_ANY_WEEK_KENO_BILL_FAILURE: "FETCH_ONE_ANY_WEEK_KENO_BILL_FAILURE",
  FETCH_ONE_ANY_WEEK_KENO_BILL_SUCCESS: "FETCH_ONE_ANY_WEEK_KENO_BILL_SUCCESS",
};
