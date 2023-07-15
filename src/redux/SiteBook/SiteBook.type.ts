import { Document } from "./../Document/Document.type";
import { Project } from "./../Project/Project.type";
import { ApiCallState } from "../Utils";

export type SiteBook = {
  id: number;
  type: string;
  project_id: string;
  project: Project;
  date: any;
  document: any;
  no: any;
};

export type SiteBookStateTypes = {
  fetchAll: ApiCallState<SiteBook[]>;
  fetchOne: ApiCallState<SiteBook | {}>;
};

export const SiteBookActionTypes = {
  FETCH_ALL_SITE_BOOK: "FETCH_ALL_SITE_BOOK",
  FETCH_ALL_SITE_BOOK_RESET: "FETCH_ALL_SITE_BOOK_RESET",
  FETCH_ALL_SITE_BOOK_FAILURE: "FETCH_ALL_SITE_BOOK_FAILURE",
  FETCH_ALL_SITE_BOOK_SUCCESS: "FETCH_ALL_SITE_BOOK_SUCCESS",

  FETCH_ONE_SITE_BOOK: "FETCH_ONE_SITE_BOOK",
  FETCH_ONE_SITE_BOOK_RESET: "FETCH_ONE_SITE_BOOK_RESET",
  FETCH_ONE_SITE_BOOK_FAILURE: "FETCH_ONE_SITE_BOOK_FAILURE",
  FETCH_ONE_SITE_BOOK_SUCCESS: "FETCH_ONE_SITE_BOOK_SUCCESS",
};
