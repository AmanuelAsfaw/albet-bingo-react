import axios from "axios";
import moment from "moment";
import { API_BASE_URI } from "../../../../../../redux/ApiCall";
import { Project } from "../../../../../../redux/Project/Project.type";
import { RequestForTest } from "../../../../../../redux/RequestForTest/RequestForTest.type";
import { User } from "../../../../../../redux/User/User.type";
import { ApiCallState } from "../../../../../../redux/Utils";

export type RequestForTestPropType = {
  project: ApiCallState<Project>;
  request_for_test: ApiCallState<RequestForTest[]>;
  fetchAllRequestForTest: Function;
};

export type AddRFTPropType = {
  project: ApiCallState<Project>;
  fetchUsers: Function;
  users: ApiCallState<User[]>;
  request_for_test: ApiCallState<RequestForTest[]>;
  fetchAllRequestForTest: Function;
};

export type EditRFTPropType = {
  id: number;
  project: ApiCallState<Project>;
  fetchUsers: Function;
  users: ApiCallState<User[]>;
  request_for_test: ApiCallState<RequestForTest>;
  fetchAllRequestForTest: Function;
  fetchOneRequestForTest: Function;
};

export type ViewRFTPropType = {
  id: number;
  fetchUsers: Function;
  users: ApiCallState<User[]>;
  request_for_test: ApiCallState<RequestForTest>;
  fetchOneRequestForTest: Function;
};

export type StatusRFTPropType = {
  test_id: number;
  is_test_received: boolean;
  test_received_by: any;
  project: ApiCallState<Project>;
  fetchAllRequestForTest: Function;
};

export type PrintRFTPropType = {
  request_for_test: RequestForTest;
  project: ApiCallState<Project>;
  ref?: any;
  fetchUsers: Function;
  users: ApiCallState<User[]>;
};

export type RemarkPropType = {
  remarkData: any;
  users: ApiCallState<User[]>;
  fetchAllUser: Function;
  fetchAllRequestForTest: Function;
  project: ApiCallState<Project>;
};

export const sendRemark = (data: any) =>
  axios.post(API_BASE_URI + "/request-for-test-remark", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const updateSeen = (data: any) =>
  axios.post(API_BASE_URI + "/request-for-test/seen", data);

export const sendData = (data: any) =>
  axios.post(API_BASE_URI + "/request-for-test", data);

export const deleteData = (id: any) =>
  axios.delete(API_BASE_URI + `/request-for-test/${id}`);

export const receivedData = (data: any) =>
  axios.put(API_BASE_URI + "/request-for-test", data);

export const parseData = (remark: RequestForTest, user_id: number) => {
  let counter = 0;
  let user = remark.users.find((e: any) => e.id === user_id);
  if (user) {
    let last_seen = user?.["user_request_for_test"].last_seen;
    remark.request_for_test_remarks.forEach((e) => {
      if (!moment(last_seen).isSameOrAfter(moment(e.createdAt), "minute"))
        counter += 1;
    });
  } else {
    remark.request_for_test_remarks.forEach((e) => {
      counter += 1;
    });
  }
  return { counter };
};
