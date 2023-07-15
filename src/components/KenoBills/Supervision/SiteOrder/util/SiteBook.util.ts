import { ApiCallState } from "../../../../../redux/Utils";
import axios from "axios";
import { API_BASE_URI } from "../../../../../redux/ApiCall";
import { Project } from "../../../../../redux/Project/Project.type";
import { SiteBook } from "../../../../../redux/SiteBook/SiteBook.type";

export type SiteBookPropType = {
  site_books: ApiCallState<SiteBook[]>;
  project: ApiCallState<Project>;
  fetchSiteBook: Function;
};

export type AddSiteBookPropType = {
  site_books: ApiCallState<SiteBook[]>;
  project: ApiCallState<Project>;
  fetchSiteBook: Function;
};

export type EditSiteBookPropType = {
  project: ApiCallState<Project>;
  fetchSiteBook: Function;
  site_book: SiteBook;
};

export const sendData = (data: any) =>
  axios.post(API_BASE_URI + "/site-book", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const editData = (data: any) =>
  axios.put(API_BASE_URI + "/site-book", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const deleteData = (id: number) =>
  axios.delete(`${API_BASE_URI}/site-book/${id}`);
