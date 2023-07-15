import { ApiCallState, PagedData } from "../Utils";

export type DesignChangeLog = {
  id?: number;
  date: string;
  requested_by: string;
  change_request_description: string;
  reason_for_change: string;
  status: string;
  progress_of_pending_and_approved_changes: string;
  action_related_to_changes: string;
  notes: string;
};

export type DesignChangeLogStateTypes = {
  fetchAll: ApiCallState<DesignChangeLog[]>;
  fetchOne: ApiCallState<DesignChangeLog | {}>;
  fetchPaged: ApiCallState<PagedData<DesignChangeLog[]>>;
};

export const DesignChangeLogActionTypes = {
  FETCH_ALL_DESIGN_CHANGE_LOG: "FETCH_ALL_DESIGN_CHANGE_LOG",
  FETCH_ALL_DESIGN_CHANGE_LOG_RESET: "FETCH_ALL_DESIGN_CHANGE_LOG_RESET",
  FETCH_ALL_DESIGN_CHANGE_LOG_FAILURE: "FETCH_ALL_DESIGN_CHANGE_LOG_FAILURE",
  FETCH_ALL_DESIGN_CHANGE_LOG_SUCCESS: "FETCH_ALL_DESIGN_CHANGE_LOG_SUCCESS",

  FETCH_PAGED_DESIGN_CHANGE_LOG: "FETCH_PAGED_DESIGN_CHANGE_LOG",
  FETCH_PAGED_DESIGN_CHANGE_LOG_RESET: "FETCH_PAGED_DESIGN_CHANGE_LOG_RESET",
  FETCH_PAGED_DESIGN_CHANGE_LOG_FAILURE:
    "FETCH_PAGED_DESIGN_CHANGE_LOG_FAILURE",
  FETCH_PAGED_DESIGN_CHANGE_LOG_SUCCESS:
    "FETCH_PAGED_DESIGN_CHANGE_LOG_SUCCESS",

  FETCH_ONE_DESIGN_CHANGE_LOG: "FETCH_ONE_DESIGN_CHANGE_LOG",
  FETCH_ONE_DESIGN_CHANGE_LOG_RESET: "FETCH_ONE_DESIGN_CHANGE_LOG_RESET",
  FETCH_ONE_DESIGN_CHANGE_LOG_FAILURE: "FETCH_ONE_DESIGN_CHANGE_LOG_FAILURE",
  FETCH_ONE_DESIGN_CHANGE_LOG_SUCCESS: "FETCH_ONE_DESIGN_CHANGE_LOG_SUCCESS",
};
