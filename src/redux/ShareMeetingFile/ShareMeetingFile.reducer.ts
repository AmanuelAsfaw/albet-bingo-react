import { ShareMeetingFileStateTypes, ShareMeetingFileActionTypes } from "./ShareMeetingFile.type";
import { resetApiCallState } from "../Utils";

const INITIAL_STATE: ShareMeetingFileStateTypes = {
  fetchAll: resetApiCallState([]),
  fetchOne: resetApiCallState({}),
};

const ShareMeetingFileReducer = (
  state: ShareMeetingFileStateTypes = INITIAL_STATE,
  action: any
): ShareMeetingFileStateTypes => {
  switch (action.type) {
    case ShareMeetingFileActionTypes.FETCH_ALL_SHARE_MEETING_FILE:
      return {
        ...state,
        fetchAll: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case ShareMeetingFileActionTypes.FETCH_ALL_SHARE_MEETING_FILE_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case ShareMeetingFileActionTypes.FETCH_ALL_SHARE_MEETING_FILE_FAILURE:
      return {
        ...state,
        fetchAll: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case ShareMeetingFileActionTypes.FETCH_ALL_SHARE_MEETING_FILE_SUCCESS:
      return {
        ...state,
        fetchAll: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case ShareMeetingFileActionTypes.FETCH_ONE_SHARE_MEETING_FILE:
      return {
        ...state,
        fetchOne: {
          error: null,
          payload: {},
          isPending: true,
          isSuccessful: false,
        },
      };
    case ShareMeetingFileActionTypes.FETCH_ONE_SHARE_MEETING_FILE_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case ShareMeetingFileActionTypes.FETCH_ONE_SHARE_MEETING_FILE_FAILURE:
      return {
        ...state,
        fetchOne: {
          payload: {},
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case ShareMeetingFileActionTypes.FETCH_ONE_SHARE_MEETING_FILE_SUCCESS:
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

export default ShareMeetingFileReducer;
