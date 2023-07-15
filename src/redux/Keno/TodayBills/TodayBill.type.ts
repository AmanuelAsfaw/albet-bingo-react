import { ApiCallState } from "../../Utils";
import { KenoCasher } from "../../KenoCasher/KenoCasher.type";
import { KenoGame } from "../../KenoGame/KenoGame.type";

export type KenoTodayBill= {
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

export type KenoTodayBillStateTypes = {
  fetchAll: ApiCallState<KenoTodayBill[]>;
  fetchOne: ApiCallState<KenoTodayBill | {}>;
};

export const KenoTodayBillActionTypes = {
  FETCH_ALL_KENO_TODAY_BILL: "FETCH_ALL_KENO_TODAY_BILL",
  FETCH_ALL_KENO_TODAY_BILL_RESET: "FETCH_ALL_KENO_TODAY_BILL_RESET",
  FETCH_ALL_KENO_TODAY_BILL_FAILURE: "FETCH_ALL_KENO_TODAY_BILL_FAILURE",
  FETCH_ALL_KENO_TODAY_BILL_SUCCESS: "FETCH_ALL_KENO_TODAY_BILL_SUCCESS",

  FETCH_ONE_KENO_TODAY_BILL: "FETCH_ONE_KENO_TODAY_BILL",
  FETCH_ONE_KENO_TODAY_BILL_RESET: "FETCH_ONE_KENO_TODAY_BILL_RESET",
  FETCH_ONE_KENO_TODAY_BILL_FAILURE: "FETCH_ONE_KENO_TODAY_BILL_FAILURE",
  FETCH_ONE_KENO_TODAY_BILL_SUCCESS: "FETCH_ONE_KENO_TODAY_BILL_SUCCESS",
};
