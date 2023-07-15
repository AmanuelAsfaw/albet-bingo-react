import { Uploads } from "../Media/Media.type";
import { Project } from "../Project/Project.type";
import { User } from "../User/User.type";
import { ApiCallState } from "../Utils";

export type MonthlyReport = {
  id: any;
  date: any;
  project?: Project;
  introduction: string;
  name: string;
  is_approved: boolean;
  monthly_report_approved_by?: User;
  monthly_report_prepared_by?: User;
  monthly_contract: MonthlyContract;
  monthly_difficulty: MonthlyDifficulty;
  monthly_evaluations: MonthlyEvaluation[];
  monthly_claims: MonthlyClaim[];
  monthly_construction_status: MonthlyConstructionStatus;
  monthly_instruction: MonthlyInstruction;
  monthly_qc: MonthlyQc;
  monthly_variations: MonthlyVariation[];
  Uploads: Uploads[];
  monthly_manpowers: MonthlyManpower[];
  shared_users: number[];
  createdAt: string;
  evaluation_remark: any;
  user_id: number;
};

export type MonthlyVariation = {
  description: string;
  amount: any;
};

export type MonthlyManpower = {
  date: string;
  project_manager: boolean;
  site_manager: boolean;
  general_manager: boolean;
  office_manager: boolean;
};

export type MonthlyClaim = {
  description: string;
  reason: string;
  duration: number;
};

export type MonthlyConstructionStatus = {
  no_started: string[];
  under_progress: string[];
  completed: string[];
};

export type MonthlyContract = {
  date_of_signing: string;
  supplementary: number;
  variation: number;
  mobilization_time: number;
  additional_time: number;
  extension_time: number;
  revised_completion_date: string;
};

export type MonthlyDifficulty = {
  material: boolean;
  equipment: boolean;
  manpower: boolean;
  weather: boolean;
  other_interference: boolean;
  other: boolean;
  remark: string;
};
export type MonthlyEvaluation = {
  description: string;
  status: string;
};

export type MonthlyInstruction = {
  remark: string;
};

export type MonthlyQc = {
  remark: string;
};

export type MonthlyReportStateTypes = {
  fetchAll: ApiCallState<MonthlyReport[]>;
  fetchOne: ApiCallState<MonthlyReport | {}>;
};

export const MonthlyReportActionTypes = {
  FETCH_ALL_MONTHLY_REPORT: "FETCH_ALL_MONTHLY_REPORT",
  FETCH_ALL_MONTHLY_REPORT_RESET: "FETCH_ALL_MONTHLY_REPORT_RESET",
  FETCH_ALL_MONTHLY_REPORT_FAILURE: "FETCH_ALL_MONTHLY_REPORT_FAILURE",
  FETCH_ALL_MONTHLY_REPORT_SUCCESS: "FETCH_ALL_MONTHLY_REPORT_SUCCESS",

  FETCH_ONE_MONTHLY_REPORT: "FETCH_ONE_MONTHLY_REPORT",
  FETCH_ONE_MONTHLY_REPORT_RESET: "FETCH_ONE_MONTHLY_REPORT_RESET",
  FETCH_ONE_MONTHLY_REPORT_FAILURE: "FETCH_ONE_MONTHLY_REPORT_FAILURE",
  FETCH_ONE_MONTHLY_REPORT_SUCCESS: "FETCH_ONE_MONTHLY_REPORT_SUCCESS",

  SET_MONTHLY_REPORT: "SET_MONTHLY_REPORT",
};
