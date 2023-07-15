import axios from "axios";
import { API_BASE_URI } from "../../../../../../../redux/ApiCall";
import { authHeader } from "../../../../../../../utilities/utilities";

export const sendData = (data: any) =>
  axios.post(API_BASE_URI + "/casting", data, authHeader());
