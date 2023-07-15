import axios from "axios";

import { Financial } from "../../../../../redux/Financial/Financial.type";
import { ApiCallState } from "../../../../../redux/Utils";
import { API_BASE_URI } from "../../../../../redux/ApiCall";
import { SubCategory } from "../../../../../redux/SubCategory/SubCategory.type";
import { Category } from "../../../../../redux/Category/Category.type";

export type FinancialPropType = {
  financial: ApiCallState<Financial[]>;
  fetchAll: Function;
};
export type AddFinancialPropType = {
  financial: ApiCallState<Financial[]>;
  fetchAll: Function;
  fetchAllCategory: Function;
  fetchAllSubCategory: Function;
  sub_category: ApiCallState<SubCategory[]>;
  category: ApiCallState<Category[]>;
};

export type EditFinancialType = {
  financial: ApiCallState<Financial>;
  fetchAll: Function;
  fetchOne: Function;
  id?: number;
};

export const sendFinancial = (data: any) =>
  axios.post(API_BASE_URI + "/financial", data);

export const deleteFinancial = (id: any) =>
  axios.delete(API_BASE_URI + `/financial/${id}`);
