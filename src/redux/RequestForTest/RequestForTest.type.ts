import { ApiCallState } from "../Utils";
import { Document } from "../Document/Document.type";

export type RequestForTest= {
  id: number | null;
  project_id:number | null;
  date:string;
  format_no:string;
  block:string;
  test_no:string;
  axis:string;
  trade:string;
  spec_ref:string;
  drawing_ref:string;
  test_required:string;
  is_test_received:boolean;
  test_required_by:number;
  test_received_by:number;
  request_for_test_remarks: RequestForTestRemark[];
  users: {
    id: number;
    user_request_for_test: {
      id: number;
      user_id: number;
      letter_id: number;
      last_seen: string;
    };
  }[];
};

export type RequestForTestRemark = {
  id: number | null;
  request_for_test_id: number | null;
  date: string;
  remarked_by: number;
  remark: string;
  createdAt: string;
  document: Document;
};

export type RequestForTestStateTypes = {
  fetchAll: ApiCallState<RequestForTest[]>;
  fetchOne: ApiCallState<RequestForTest | {}>;
};

export const RequestForTestActionTypes = {
  FETCH_ALL_REQUEST_FOR_TEST: "FETCH_ALL_REQUEST_FOR_TEST",
  FETCH_ALL_REQUEST_FOR_TEST_RESET: "FETCH_ALL_REQUEST_FOR_TEST_RESET",
  FETCH_ALL_REQUEST_FOR_TEST_FAILURE: "FETCH_ALL_REQUEST_FOR_TEST_FAILURE",
  FETCH_ALL_REQUEST_FOR_TEST_SUCCESS: "FETCH_ALL_REQUEST_FOR_TEST_SUCCESS",

  FETCH_ONE_REQUEST_FOR_TEST: "FETCH_ONE_REQUEST_FOR_TEST",
  FETCH_ONE_REQUEST_FOR_TEST_RESET: "FETCH_ONE_REQUEST_FOR_TEST_RESET",
  FETCH_ONE_REQUEST_FOR_TEST_FAILURE: "FETCH_ONE_REQUEST_FOR_TEST_FAILURE",
  FETCH_ONE_REQUEST_FOR_TEST_SUCCESS: "FETCH_ONE_REQUEST_FOR_TEST_SUCCESS",
};
