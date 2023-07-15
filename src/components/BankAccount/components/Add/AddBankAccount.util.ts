import axios from "axios";
import { API_BASE_URI } from "../../../../redux/ApiCall";
import { authHeader } from "../../../../utilities/utilities";

export type AddBankAccountPropType = {
  is_private: boolean;
  fetchAllBankAccount: Function;
};

export const sendData = (data: any) =>
  axios.post(API_BASE_URI + "/bank_account", data, authHeader());
