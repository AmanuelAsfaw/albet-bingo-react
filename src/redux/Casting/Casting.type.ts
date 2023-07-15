import { ApiCallState } from "../Utils";

export type Casting = {
  id: any;
  block: string;
  concrete_grade: string;
  structure_type: string;
  source_of_concrete: string;
  axis: string;
  concrete_slump: string;
  cement_type: string;

  date: string;

  casting_dates: CastingDate[];

  readonly createdAt: string;
};

export type CastingDate = {
  id: number;
  casting_id: number;
  period: number;

  status: string;
  date: string;
};

export type CastingStateTypes = {
  fetchAll: ApiCallState<Casting[]>;
};

export const CastingActionTypes = {
  FETCH_ALL_CASTING: "FETCH_ALL_CASTING",
  FETCH_ALL_CASTING_RESET: "FETCH_ALL_CASTING_RESET",
  FETCH_ALL_CASTING_FAILURE: "FETCH_ALL_CASTING_FAILURE",
  FETCH_ALL_CASTING_SUCCESS: "FETCH_ALL_CASTING_SUCCESS",
};
