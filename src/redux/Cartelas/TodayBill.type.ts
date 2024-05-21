import { ApiCallState } from "../Utils";

export type Cartela= {
    id: number | null;
    // casher: KenoCasher;
    // game: KenoGame;
    cartela_number:string;
    b_row: string;
    i_row: string;
    n_row: string;
    g_row: string;
    o_row: string;
};

export type CartelaStateTypes = {
  fetchAll: ApiCallState<Cartela[]>;
  fetchOne: ApiCallState<Cartela | {}>;
};

export const CartelaActionTypes = {
  FETCH_ALL_CARTELA: "FETCH_ALL_CARTELA",
  FETCH_ALL_CARTELA_RESET: "FETCH_ALL_CARTELA_RESET",
  FETCH_ALL_CARTELA_FAILURE: "FETCH_ALL_CARTELA_FAILURE",
  FETCH_ALL_CARTELA_SUCCESS: "FETCH_ALL_CARTELA_SUCCESS",

  FETCH_ONE_CARTELA: "FETCH_ONE_CARTELA",
  FETCH_ONE_CARTELA_RESET: "FETCH_ONE_CARTELA_RESET",
  FETCH_ONE_CARTELA_FAILURE: "FETCH_ONE_CARTELA_FAILURE",
  FETCH_ONE_CARTELA_SUCCESS: "FETCH_ONE_CARTELA_SUCCESS",
};
