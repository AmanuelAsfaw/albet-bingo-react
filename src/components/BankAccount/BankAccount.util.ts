import axios from "axios";
import { API_BASE_URI } from "../../redux/ApiCall";
import { BankAccount } from "../../redux/BankAccount/BankAccount.type";
import { ApiCallState } from "../../redux/Utils";

export type BankAccountComponentPropType = {
  is_private: boolean;
  fetchAllBankAccount: Function;
  fetchAll: ApiCallState<BankAccount[]>;
};

export const deleteData = (id: any) =>
  axios.delete(API_BASE_URI + `/bank_account/${id}`);
