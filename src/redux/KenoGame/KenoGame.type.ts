import { ApiCallState } from "../Utils";

export type KenoGame = {
    id: number | null;
    local_date:string;
    game_number:number;
    state:string;
    status: string;
    started_at: string;
    local_started_at:string;
    is_finished:boolean;
    draw_numbers:number[];
    bonus:string;
    heads:number;
    tails:number;
    result:string;
};

export type KenoGameStateTypes = {
  fetchAll: ApiCallState<KenoGame[]>;
  fetchOne: ApiCallState<KenoGame | {}>;
};

export const KenoGameActionTypes = {
  FETCH_ALL_KENO_GAME: "FETCH_ALL_KENO_GAME",
  FETCH_ALL_KENO_GAME_RESET: "FETCH_ALL_KENO_GAME_RESET",
  FETCH_ALL_KENO_GAME_FAILURE: "FETCH_ALL_KENO_GAME_FAILURE",
  FETCH_ALL_KENO_GAME_SUCCESS: "FETCH_ALL_KENO_GAME_SUCCESS",

  FETCH_ONE_KENO_GAME: "FETCH_ONE_KENO_GAME",
  FETCH_ONE_KENO_GAME_RESET: "FETCH_ONE_KENO_GAME_RESET",
  FETCH_ONE_KENO_GAME_FAILURE: "FETCH_ONE_KENO_GAME_FAILURE",
  FETCH_ONE_KENO_GAME_SUCCESS: "FETCH_ONE_KENO_GAME_SUCCESS",
};
