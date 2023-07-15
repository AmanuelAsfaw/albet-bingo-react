import { ApiCallState } from "../Utils";
import { KenoCasher } from "../KenoCasher/KenoCasher.type";
import { KenoGame } from "../KenoGame/KenoGame.type";

export type KenoBill= {
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

export type KenoBillStateTypes = {
  fetchAll: ApiCallState<KenoBill[]>;
  fetchOne: ApiCallState<KenoBill | {}>;
};

export const KenoBillActionTypes = {
  FETCH_ALL_KENO_BILL: "FETCH_ALL_KENO_BILL",
  FETCH_ALL_KENO_BILL_RESET: "FETCH_ALL_KENO_BILL_RESET",
  FETCH_ALL_KENO_BILL_FAILURE: "FETCH_ALL_KENO_BILL_FAILURE",
  FETCH_ALL_KENO_BILL_SUCCESS: "FETCH_ALL_KENO_BILL_SUCCESS",

  FETCH_ONE_KENO_BILL: "FETCH_ONE_KENO_BILL",
  FETCH_ONE_KENO_BILL_RESET: "FETCH_ONE_KENO_BILL_RESET",
  FETCH_ONE_KENO_BILL_FAILURE: "FETCH_ONE_KENO_BILL_FAILURE",
  FETCH_ONE_KENO_BILL_SUCCESS: "FETCH_ONE_KENO_BILL_SUCCESS",
};
