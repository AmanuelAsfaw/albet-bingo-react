import { ApiCallState } from "../Utils";
import { User } from "../User/User.type";
import { Project } from "../Project/Project.type";

export type TestRequest = {
  id: number | null;
  project_id: number;

  required_test: string;
  test_requested_by: number;
  is_approved: boolean;
  approved_by: number;
  authorize_date: Date;

  test_request_items: any[];
  er_test_requested_by: User;
  er_approved_by: User;
  project: Project;
  date: Date;

  readonly createdAt: Date;
};

export type TestRequestStateTypes = {
  fetchAll: ApiCallState<TestRequest[]>;
  fetchOne: ApiCallState<TestRequest> | ApiCallState<null>;
};

export const TestRequestActionTypes = {
  FETCH_ALL_TEST_REQUEST: "FETCH_ALL_TEST_REQUEST",
  FETCH_ALL_TEST_REQUEST_RESET: "FETCH_ALL_TEST_REQUEST_RESET",
  FETCH_ALL_TEST_REQUEST_FAILURE: "FETCH_ALL_TEST_REQUEST_FAILURE",
  FETCH_ALL_TEST_REQUEST_SUCCESS: "FETCH_ALL_TEST_REQUEST_SUCCESS",

  FETCH_ONE_TEST_REQUEST: "FETCH_ONE_TEST_REQUEST",
  FETCH_ONE_TEST_REQUEST_RESET: "FETCH_ONE_TEST_REQUEST_RESET",
  FETCH_ONE_TEST_REQUEST_FAILURE: "FETCH_ONE_TEST_REQUEST_FAILURE",
  FETCH_ONE_TEST_REQUEST_SUCCESS: "FETCH_ONE_TEST_REQUEST_SUCCESS",
};
