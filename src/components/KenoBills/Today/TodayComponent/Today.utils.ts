import axios from "axios";
import { ApiCallState } from "../../../../redux/Utils";
import { API_BASE_URI } from "../../../../redux/ApiCall";
import { Category } from "../../../../redux/Category/Category.type";
import { KenoBill } from "../../../../redux/KenoBills/KenoBill.type";

export type CategoryPropType = {
  category: ApiCallState<Category[]>;
  fetchAll: Function;
};
export type TodayPropType = {
  today_bills: ApiCallState<KenoBill[]>;
  fetchAll: Function;
};
export type AddCategoryPropType = {
  fetchAll: Function;
};

export type EditCategoryType = {
  category: ApiCallState<Category>;
  fetchAll: Function;
  fetchOne: Function;
  id?: number;
};

export const sendCategory = (data: any) =>
  axios.post(API_BASE_URI + "/category", data);

export const deleteCategory = (id: any) =>
  axios.delete(API_BASE_URI + `/category/${id}`);
