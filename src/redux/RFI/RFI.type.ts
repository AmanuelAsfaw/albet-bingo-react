import { Project } from "../Project/Project.type";
import { User } from "../User/User.type";
import { ApiCallState } from "../Utils";

export type RFI = {
  id: number;
  rfi_number: string;
  rfi_date: string;
  title: string;
  specification_section: string;
  paragraph: string;
  drawing_reference: string;
  drawing_reference_image: string;
  detail: string;
  under_review: string;
  under_review_description: string;
  attachements: string;
  attachements_files: string;
  prepared_by_id: number;
  responder_id: number;
  project_id: number;
  user_id: number;
  status: string;
  rfi_prepared_by: User;
  rfi_responder_by: User;
  rfiResponse: any;
  project: Project;
  createdAt: Date;
  updatedAt: Date;
};

export type RFIStateTypes = {
  fetchAll: ApiCallState<RFI[]>;
};

export const RFIActionTypes = {
  FETCH_ALL_RFI: "FETCH_ALL_RFI",
  FETCH_ALL_RFI_RESET: "FETCH_ALL_RFI_RESET",
  FETCH_ALL_RFI_FAILURE: "FETCH_ALL_RFI_FAILURE",
  FETCH_ALL_RFI_SUCCESS: "FETCH_ALL_RFI_SUCCESS",
};
