import { ApiCallState } from "../Utils";
import { User } from "../User/User.type";

export type SiteDiary = {
  id: number;
  date: string;
  date_type: string;
  weather_condition: string;
  bad_weather_description: string;
  personnel_equipment: string;
  work_description: string;
  non_working_hrs: string;
  services: string;
  // material: string;
  meeting: string;
  comment: string;
  remark: string;
  construction_change: string;
  given_instruction: string;
  request_to_contractors: string;
  site_engineer: string;
  contractor: string;
  prepared_by_id: number;
  approved_by_id: number;
  checked_by_id: number;
  sd_prepared_by: User;
  sd_approved_by: User;
  sd_checked_by: User;
  sd_site_engineer: User;
  sd_project_manager: User;
  sd_resident_engineer: User;
  is_checked: boolean;
  is_approved: boolean;
  on_revision: boolean;
};

export type SiteDiaryStateTypes = {
  fetchAll: ApiCallState<SiteDiary[]>;
};

export const SiteDiaryActionTypes = {
  FETCH_ALL_SITE_DIARY: "FETCH_ALL_SITE_DIARY",
  FETCH_ALL_SITE_DIARY_RESET: "FETCH_ALL_SITE_DIARY_RESET",
  FETCH_ALL_SITE_DIARY_FAILURE: "FETCH_ALL_SITE_DIARY_FAILURE",
  FETCH_ALL_SITE_DIARY_SUCCESS: "FETCH_ALL_SITE_DIARY_SUCCESS",
};
