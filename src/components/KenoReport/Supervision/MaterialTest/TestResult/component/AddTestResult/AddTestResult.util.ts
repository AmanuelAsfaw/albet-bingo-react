import axios from "axios";
import { API_BASE_URI } from "../../../../../../../redux/ApiCall";
import { authHeader } from "../../../../../../../utilities/utilities";

import { Project } from "../../../../../../../redux/Project/Project.type";
import { ApiCallState } from "../../../../../../../redux/Utils";
import { User } from "../../../../../../../redux/User/User.type";
import { Casting } from "../../../../../../../redux/Casting/Casting.type";

export type AddTestResultPropType = {
  project: ApiCallState<Project>;
  fetchAllTestResult: Function;
  users: ApiCallState<User[]>;
  fetchAllUser: Function;
  casting: ApiCallState<Casting[]>;
};

export const sendData = (data: any) =>
  axios.post(API_BASE_URI + "/test_result", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
