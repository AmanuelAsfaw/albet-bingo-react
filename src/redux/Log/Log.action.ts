import { LogActionTypes } from "./Log.type";

export const fetchAllLog = (payload?: any) => ({
  type: LogActionTypes.FETCH_ALL_LOG,
  payload: payload,
});

export const fetchOneLog = (payload?: any) => ({
  type: LogActionTypes.FETCH_ONE_LOG,
  payload: payload,
});

export const fetchAllLogReset = (payload?: any) => ({
  type: LogActionTypes.FETCH_ALL_LOG_RESET,
  payload: payload,
});
