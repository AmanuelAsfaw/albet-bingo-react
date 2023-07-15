import { ScheduleStateTypes, ScheduleActionTypes } from "./Schedule.type";
import { resetApiCallState } from "../Utils";

const INITIAL_STATE: ScheduleStateTypes = {
  fetchAll: resetApiCallState([]),
};

const ScheduleReducer = (
  state: ScheduleStateTypes = INITIAL_STATE,
  action: any
): ScheduleStateTypes => {
  switch (action.type) {
    case ScheduleActionTypes.FETCH_ALL_SCHEDULE:
      return {
        ...state,
        fetchAll: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case ScheduleActionTypes.FETCH_ALL_SCHEDULE_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case ScheduleActionTypes.FETCH_ALL_SCHEDULE_FAILURE:
      return {
        ...state,
        fetchAll: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case ScheduleActionTypes.FETCH_ALL_SCHEDULE_SUCCESS:
      return {
        ...state,
        fetchAll: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    default:
      return state;
  }
};

export default ScheduleReducer;
