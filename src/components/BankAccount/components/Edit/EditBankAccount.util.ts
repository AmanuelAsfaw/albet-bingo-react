import axios from "axios";
import { API_BASE_URI } from "../../../../redux/ApiCall";
import { BankAccount } from "../../../../redux/BankAccount/BankAccount.type";

export type EditBankAccountPropType = {
  fetchAllBankAccount: Function;
  data: BankAccount;
};

export const sendData = (data: any) =>
  axios.put(API_BASE_URI + "/bank_account", data);
