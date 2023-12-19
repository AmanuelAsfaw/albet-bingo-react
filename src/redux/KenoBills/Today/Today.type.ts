import { ApiCallState } from "../../Utils";
import { KenoCasher } from "../../KenoCasher/KenoCasher.type";
import { KenoGame } from "../../KenoGame/KenoGame.type";

export type TodayKenoBill= {
    id: number | null;
    casher: KenoCasher;
    game: KenoGame;
    unique_key:string;
    date: string;
    is_winner: boolean;
    is_paid: boolean;
    is_canceled: boolean;
    is_redeemed: boolean;
    has_multiple: boolean;
    stake: number;
    sub_bills:SubBill[];
    selected_numbers:number[];
};

export type SubBill = {
  selected_numbers:number[];
  stake: number;
}
export type TodayKenoBillStateTypes = {
  fetchAll: ApiCallState<TodayKenoBill[]>;
  fetchOne: ApiCallState<TodayKenoBill | {}>;
};

export const TodayKenoBillActionTypes = {
  FETCH_ALL_TODAY_KENO_BILL: "FETCH_ALL_TODAY_KENO_BILL",
  FETCH_ALL_TODAY_KENO_BILL_RESET: "FETCH_ALL_TODAY_KENO_BILL_RESET",
  FETCH_ALL_TODAY_KENO_BILL_FAILURE: "FETCH_ALL_TODAY_KENO_BILL_FAILURE",
  FETCH_ALL_TODAY_KENO_BILL_SUCCESS: "FETCH_ALL_TODAY_KENO_BILL_SUCCESS",

  FETCH_ONE_TODAY_KENO_BILL: "FETCH_ONE_TODAY_KENO_BILL",
  FETCH_ONE_TODAY_KENO_BILL_RESET: "FETCH_ONE_TODAY_KENO_BILL_RESET",
  FETCH_ONE_TODAY_KENO_BILL_FAILURE: "FETCH_ONE_TODAY_KENO_BILL_FAILURE",
  FETCH_ONE_TODAY_KENO_BILL_SUCCESS: "FETCH_ONE_TODAY_KENO_BILL_SUCCESS",
};
