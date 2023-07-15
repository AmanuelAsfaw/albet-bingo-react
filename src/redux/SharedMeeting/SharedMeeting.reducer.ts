import {
  SharedMeetingStateTypes,
  SharedMeetingActionTypes,
} from "./SharedMeeting.type";
import { resetApiCallState } from "../Utils";

const INITIAL_STATE: SharedMeetingStateTypes = {
  fetchAll: resetApiCallState([]),
};

const SharedMeetingReducer = (
  state: SharedMeetingStateTypes = INITIAL_STATE,
  action: any
): SharedMeetingStateTypes => {
  switch (action.type) {
    case SharedMeetingActionTypes.FETCH_ALL_SHARED_MEETING:
      return {
        ...state,
        fetchAll: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case SharedMeetingActionTypes.FETCH_ALL_SHARED_MEETING_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case SharedMeetingActionTypes.FETCH_ALL_SHARED_MEETING_FAILURE:
      return {
        ...state,
        fetchAll: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case SharedMeetingActionTypes.FETCH_ALL_SHARED_MEETING_SUCCESS:
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

export default SharedMeetingReducer;
