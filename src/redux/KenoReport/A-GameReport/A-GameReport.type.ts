import { KenoGame } from "../../KenoGame/KenoGame.type";
import { ApiCallState } from "../../Utils";

export type KenoA_GameReportSummary = {
    count_canceled:number;
    count_paid:number;
    count_redeemed:number;
    count_total_bills:number;
    expected_net_profit:number;
    last_game:number;
    net_profit:number;
    next_game: KenoGame;
    paid_for_winner:number;
    revenue:number;
    total_stake:number;
    total_winner_value:number;
    total_loss:  number;
    total_games:  number;
};

export type KenoA_GameReportSummaryStateTypes = {
  fetchAll: ApiCallState<KenoA_GameReportSummary[]>;
  fetchOne: ApiCallState<KenoA_GameReportSummary | {}>;
};

export const KenoA_GameReportSummaryActionTypes = {
  FETCH_ALL_KENO_A_GAME_REPORT_SUMMARY: "FETCH_ALL_KENO_A_GAME_REPORT_SUMMARY",
  FETCH_ALL_KENO_A_GAME_REPORT_SUMMARY_RESET: "FETCH_ALL_KENO_A_GAME_REPORT_SUMMARY_RESET",
  FETCH_ALL_KENO_A_GAME_REPORT_SUMMARY_FAILURE: "FETCH_ALL_KENO_A_GAME_REPORT_SUMMARY_FAILURE",
  FETCH_ALL_KENO_A_GAME_REPORT_SUMMARY_SUCCESS: "FETCH_ALL_KENO_A_GAME_REPORT_SUMMARY_SUCCESS",

  FETCH_ONE_KENO_A_GAME_REPORT_SUMMARY: "FETCH_ONE_KENO_A_GAME_REPORT_SUMMARY",
  FETCH_ONE_KENO_A_GAME_REPORT_SUMMARY_RESET: "FETCH_ONE_KENO_A_GAME_REPORT_SUMMARY_RESET",
  FETCH_ONE_KENO_A_GAME_REPORT_SUMMARY_FAILURE: "FETCH_ONE_KENO_A_GAME_REPORT_SUMMARY_FAILURE",
  FETCH_ONE_KENO_A_GAME_REPORT_SUMMARY_SUCCESS: "FETCH_ONE_KENO_A_GAME_REPORT_SUMMARY_SUCCESS",
};
