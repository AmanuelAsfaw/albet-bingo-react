import { ApiCallState } from "../Utils";

export type Schedule = {
  id: any;
  project_id: number;
  item_no: string;
  parent_id: number | null;
  name: string;
  start_date: Date;
  end_date: Date;
  duration: number;
  dependency: number;
  progress: number;
  finished_date: number;
  resources: string;
};

export type ScheduleStateTypes = {
  fetchAll: ApiCallState<Schedule[]>;
};

export const ScheduleActionTypes = {
  FETCH_ALL_SCHEDULE: "FETCH_ALL_SCHEDULE",
  FETCH_ALL_SCHEDULE_RESET: "FETCH_ALL_SCHEDULE_RESET",
  FETCH_ALL_SCHEDULE_FAILURE: "FETCH_ALL_SCHEDULE_FAILURE",
  FETCH_ALL_SCHEDULE_SUCCESS: "FETCH_ALL_SCHEDULE_SUCCESS",
};
