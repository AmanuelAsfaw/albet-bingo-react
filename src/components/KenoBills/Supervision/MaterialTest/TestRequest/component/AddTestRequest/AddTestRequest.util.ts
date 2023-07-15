import axios from "axios";
import { API_BASE_URI } from "../../../../../../../redux/ApiCall";
import { authHeader } from "../../../../../../../utilities/utilities";

import { Project } from "../../../../../../../redux/Project/Project.type";
import { ApiCallState } from "../../../../../../../redux/Utils";
import { User } from "../../../../../../../redux/User/User.type";

export type AddTestRequestPropType = {
  project: ApiCallState<Project>;
  fetchAllTestRequest: Function;
  users: ApiCallState<User[]>;
  fetchAllUser: Function;
  // fetchAllTestReset: Function,
};

export const sendData = (data: any) =>
  axios.post(API_BASE_URI + "/test_request", data, authHeader());
