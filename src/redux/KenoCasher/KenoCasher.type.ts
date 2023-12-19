import { ApiCallState } from "../Utils";

export type KenoCasher = {
    id: number | null;
    branch:any;
    user:any;
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

export type KenoCasherStateTypes = {
  fetchAll: ApiCallState<KenoCasher[]>;
  fetchOne: ApiCallState<KenoCasher | {}>;
};

export const KenoCasherActionTypes = {
  FETCH_ALL_KENO_CASHER: "FETCH_ALL_KENO_CASHER",
  FETCH_ALL_KENO_CASHER_RESET: "FETCH_ALL_KENO_CASHER_RESET",
  FETCH_ALL_KENO_CASHER_FAILURE: "FETCH_ALL_KENO_CASHER_FAILURE",
  FETCH_ALL_KENO_CASHER_SUCCESS: "FETCH_ALL_KENO_CASHER_SUCCESS",

  FETCH_ONE_KENO_CASHER: "FETCH_ONE_KENO_CASHER",
  FETCH_ONE_KENO_CASHER_RESET: "FETCH_ONE_KENO_CASHER_RESET",
  FETCH_ONE_KENO_CASHER_FAILURE: "FETCH_ONE_KENO_CASHER_FAILURE",
  FETCH_ONE_KENO_CASHER_SUCCESS: "FETCH_ONE_KENO_CASHER_SUCCESS",
};
