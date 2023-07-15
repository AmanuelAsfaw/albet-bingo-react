import { ApiCallState } from "../../Utils";
import { KenoCasher } from "../../KenoCasher/KenoCasher.type";
import { KenoGame } from "../../KenoGame/KenoGame.type";

export type TodayByGameKenoBill= {
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

export type TodayByGameKenoBillStateTypes = {
  fetchAll: ApiCallState<TodayByGameKenoBill[]>;
  fetchOne: ApiCallState<TodayByGameKenoBill | {}>;
};

export const TodayByGameKenoBillActionTypes = {
  FETCH_ALL_TODAY_KENO_BILL_BY_GAME: "FETCH_ALL_TODAY_KENO_BILL_BY_GAME",
  FETCH_ALL_TODAY_KENO_BILL_BY_GAME_RESET: "FETCH_ALL_TODAY_KENO_BILL_BY_GAME_RESET",
  FETCH_ALL_TODAY_KENO_BILL_BY_GAME_FAILURE: "FETCH_ALL_TODAY_KENO_BILL_BY_GAME_FAILURE",
  FETCH_ALL_TODAY_KENO_BILL_BY_GAME_SUCCESS: "FETCH_ALL_TODAY_KENO_BILL_BY_GAME_SUCCESS",

  FETCH_ONE_TODAY_KENO_BILL_BY_GAME: "FETCH_ONE_TODAY_KENO_BILL_BY_GAME",
  FETCH_ONE_TODAY_KENO_BILL_BY_GAME_RESET: "FETCH_ONE_TODAY_KENO_BILL_BY_GAME_RESET",
  FETCH_ONE_TODAY_KENO_BILL_BY_GAME_FAILURE: "FETCH_ONE_TODAY_KENO_BILL_BY_GAME_FAILURE",
  FETCH_ONE_TODAY_KENO_BILL_BY_GAME_SUCCESS: "FETCH_ONE_TODAY_KENO_BILL_BY_GAME_SUCCESS",
};
