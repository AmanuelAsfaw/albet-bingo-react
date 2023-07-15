import { Document } from "../Document/Document.type";
import { Project } from "../Project/Project.type";
import { User } from "../User/User.type";
import { ApiCallState } from "../Utils";

export type Letter = {
  id: number;
  date: string;
  subject: string;
  type: string;
  reference_number: string;
  from: string;
  to: string;
  letter_prepared: User;
  letter_from: User;
  letter_to: User;
  letter_users: {
    id: number;
    full_name: string;
    role: string;
    letter_users: { type: "to" | "cc" };
  }[];
  letter_messages: {
    user: User;
    message: string;
    date: string;
  }[];
  document: Document;
  share_letters: ShareLetterTypes[];
  user_id: number;
  letter_remarks: LetterRemark[];
  users: {
    id: number;
    user_letter: {
      id: number;
      user_id: number;
      letter_id: number;
      last_seen: string;
    };
  }[];
  project: Project
};

export type LetterRemark = {
  id: number | null;
  letter_id: number | null;
  date: string;
  remarked_by: number;
  remark: string;
  createdAt: string;
  document: Document;
};

export type ShareLetterTypes = {
  id: number;
  letter_id: number;
  user_id: number;
  remark: string;
  createdAt: string;
};
export type LetterStateTypes = {
  fetchAll: ApiCallState<Letter[]>;
  fetchOne: ApiCallState<Letter | {}>;
};

export const LetterActionTypes = {
  FETCH_ALL_LETTER: "FETCH_ALL_LETTER",
  FETCH_ALL_LETTER_RESET: "FETCH_ALL_LETTER_RESET",
  FETCH_ALL_LETTER_FAILURE: "FETCH_ALL_LETTER_FAILURE",
  FETCH_ALL_LETTER_SUCCESS: "FETCH_ALL_LETTER_SUCCESS",

  FETCH_ONE_LETTER: "FETCH_ONE_LETTER",
  FETCH_ONE_LETTER_RESET: "FETCH_ONE_LETTER_RESET",
  FETCH_ONE_LETTER_FAILURE: "FETCH_ONE_LETTER_FAILURE",
  FETCH_ONE_LETTER_SUCCESS: "FETCH_ONE_LETTER_SUCCESS",
};
