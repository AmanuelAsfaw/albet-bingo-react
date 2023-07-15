import { KenoGame } from "../../KenoGame/KenoGame.type";
import { ApiCallState } from "../../Utils";

export type KenoAnyDayByGameReportSummary = {
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

export type KenoAnyDayByGameReportSummaryStateTypes = {
  fetchAll: ApiCallState<KenoAnyDayByGameReportSummary[]>;
  fetchOne: ApiCallState<KenoAnyDayByGameReportSummary | {}>;
};

export const KenoAnyDayByGameReportSummaryActionTypes = {
  FETCH_ALL_KENO_ANY_DAY_BY_GAME_REPORT_SUMMARY: "FETCH_ALL_KENO_ANY_DAY_BY_GAME_REPORT_SUMMARY",
  FETCH_ALL_KENO_ANY_DAY_BY_GAME_REPORT_SUMMARY_RESET: "FETCH_ALL_KENO_ANY_DAY_BY_GAME_REPORT_SUMMARY_RESET",
  FETCH_ALL_KENO_ANY_DAY_BY_GAME_REPORT_SUMMARY_FAILURE: "FETCH_ALL_KENO_ANY_DAY_BY_GAME_REPORT_SUMMARY_FAILURE",
  FETCH_ALL_KENO_ANY_DAY_BY_GAME_REPORT_SUMMARY_SUCCESS: "FETCH_ALL_KENO_ANY_DAY_BY_GAME_REPORT_SUMMARY_SUCCESS",

  FETCH_ONE_KENO_ANY_DAY_BY_GAME_REPORT_SUMMARY: "FETCH_ONE_KENO_ANY_DAY_BY_GAME_REPORT_SUMMARY",
  FETCH_ONE_KENO_ANY_DAY_BY_GAME_REPORT_SUMMARY_RESET: "FETCH_ONE_KENO_ANY_DAY_BY_GAME_REPORT_SUMMARY_RESET",
  FETCH_ONE_KENO_ANY_DAY_BY_GAME_REPORT_SUMMARY_FAILURE: "FETCH_ONE_KENO_ANY_DAY_BY_GAME_REPORT_SUMMARY_FAILURE",
  FETCH_ONE_KENO_ANY_DAY_BY_GAME_REPORT_SUMMARY_SUCCESS: "FETCH_ONE_KENO_ANY_DAY_BY_GAME_REPORT_SUMMARY_SUCCESS",
};
