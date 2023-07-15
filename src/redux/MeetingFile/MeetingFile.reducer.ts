import { MeetingFileStateTypes, MeetingFileActionTypes } from "./MeetingFile.type";
import { resetApiCallState } from "../Utils";

const INITIAL_STATE: MeetingFileStateTypes = {
  fetchAll: resetApiCallState([]),
  fetchOne: resetApiCallState({}),
};

const MeetingFileReducer = (
  state: MeetingFileStateTypes = INITIAL_STATE,
  action: any
): MeetingFileStateTypes => {
  switch (action.type) {
    case MeetingFileActionTypes.FETCH_ALL_MEETING_FILE:
      return {
        ...state,
        fetchAll: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case MeetingFileActionTypes.FETCH_ALL_MEETING_FILE_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case MeetingFileActionTypes.FETCH_ALL_MEETING_FILE_FAILURE:
      return {
        ...state,
        fetchAll: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case MeetingFileActionTypes.FETCH_ALL_MEETING_FILE_SUCCESS:
      return {
        ...state,
        fetchAll: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case MeetingFileActionTypes.FETCH_ONE_MEETING_FILE:
      return {
        ...state,
        fetchOne: {
          error: null,
          payload: {},
          isPending: true,
          isSuccessful: false,
        },
      };
    case MeetingFileActionTypes.FETCH_ONE_MEETING_FILE_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case MeetingFileActionTypes.FETCH_ONE_MEETING_FILE_FAILURE:
      return {
        ...state,
        fetchOne: {
          payload: {},
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case MeetingFileActionTypes.FETCH_ONE_MEETING_FILE_SUCCESS:
      return {
        ...state,
        fetchOne: {
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

export default MeetingFileReducer;
