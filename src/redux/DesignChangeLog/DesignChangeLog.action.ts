import { DesignChangeLogActionTypes } from "./DesignChangeLog.type";

/**
 * Fetch All DesignChangeLog
 *
 * @param payload
 */
export const fetchAllDesignChangeLog = (payload?: any) => ({
  type: DesignChangeLogActionTypes.FETCH_ALL_DESIGN_CHANGE_LOG,
  payload: payload,
});

/**
 * Fetch Paged DesignChangeLog
 *
 * @param payload
 */
export const fetchPagedDesignChangeLog = (payload?: any) => ({
  type: DesignChangeLogActionTypes.FETCH_PAGED_DESIGN_CHANGE_LOG,
  payload: payload,
});

/**
 * Fetch All DesignChangeLog
 *
 * @param payload
 */
export const fetchOneDesignChangeLog = (payload?: any) => ({
  type: DesignChangeLogActionTypes.FETCH_ONE_DESIGN_CHANGE_LOG,
  payload: payload,
});

/**
 * Reset Fetch DesignChangeLog State
 *
 * @param payload
 */
export const fetchAllDesignChangeLogReset = (payload?: any) => ({
  type: DesignChangeLogActionTypes.FETCH_ALL_DESIGN_CHANGE_LOG_RESET,
  payload: payload,
});
