import { User } from "../User/User.type";
import { ApiCallState } from "../Utils";

export type WeekReport = {
  id: number;
  reporting_date: string;
  scheduling_date: string;
  reporting_week: string;
  contractor_name: string;
  resident_engineer: string;
  site_inspector: string;
  block_no: string;
  shared_users: number[];
  description: string;
  man_power: string;
  equipment: string;
  material: string;
  problem: string;
  user_id: number;
  prepared_by_id: number;
  checked_by_id: number;
  reported_by_id: number;
  accepted_by_id: number;
  inspected_by_id: number;
  confirmed_by_id: number;
  approved_by_id: number;

  prepared_by: string;
  approved_by: string;
  wr_prepared_by: User;
  wr_checked_by: User;
  wr_reported_by: User;
  wr_accepted_by: User;
  wr_inspected_by: User;
  wr_confirmed_by: User;
  wr_approved_by: User;
  on_revision: boolean;
  is_approved: boolean;
  is_checked: boolean;
};

export type WeekReportStateTypes = {
  fetchAll: ApiCallState<WeekReport[]>;
};

export const WeekReportActionTypes = {
  FETCH_ALL_WEEK_REPORT: "FETCH_ALL_WEEK_REPORT",
  FETCH_ALL_WEEK_REPORT_RESET: "FETCH_ALL_WEEK_REPORT_RESET",
  FETCH_ALL_WEEK_REPORT_FAILURE: "FETCH_ALL_WEEK_REPORT_FAILURE",
  FETCH_ALL_WEEK_REPORT_SUCCESS: "FETCH_ALL_WEEK_REPORT_SUCCESS",

  SET_WEEK_REPORT: "SET_WEEK_REPORT",
};
