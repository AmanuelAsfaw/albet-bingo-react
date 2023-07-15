import { ApiCallState } from "../../Utils";
import { KenoCasher } from "../../KenoCasher/KenoCasher.type";
import { KenoGame } from "../../KenoGame/KenoGame.type";

export type AnyMonthKenoBill= {
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

export type AnyMonthKenoBillStateTypes = {
  fetchAll: ApiCallState<AnyMonthKenoBill[]>;
  fetchOne: ApiCallState<AnyMonthKenoBill | {}>;
};

export const AnyMonthKenoBillActionTypes = {
  FETCH_ALL_ANY_MONTH_KENO_BILL: "FETCH_ALL_ANY_MONTH_KENO_BILL",
  FETCH_ALL_ANY_MONTH_KENO_BILL_RESET: "FETCH_ALL_ANY_MONTH_KENO_BILL_RESET",
  FETCH_ALL_ANY_MONTH_KENO_BILL_FAILURE: "FETCH_ALL_ANY_MONTH_KENO_BILL_FAILURE",
  FETCH_ALL_ANY_MONTH_KENO_BILL_SUCCESS: "FETCH_ALL_ANY_MONTH_KENO_BILL_SUCCESS",

  FETCH_ONE_ANY_MONTH_KENO_BILL: "FETCH_ONE_ANY_MONTH_KENO_BILL",
  FETCH_ONE_ANY_MONTH_KENO_BILL_RESET: "FETCH_ONE_ANY_MONTH_KENO_BILL_RESET",
  FETCH_ONE_ANY_MONTH_KENO_BILL_FAILURE: "FETCH_ONE_ANY_MONTH_KENO_BILL_FAILURE",
  FETCH_ONE_ANY_MONTH_KENO_BILL_SUCCESS: "FETCH_ONE_ANY_MONTH_KENO_BILL_SUCCESS",
};
