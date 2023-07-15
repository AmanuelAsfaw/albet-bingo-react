import axios from "axios";
import { API_BASE_URI } from "../../../../../../redux/ApiCall";
import { Inspection } from "../../../../../../redux/Inspection/Inspection.type";
import { Project } from "../../../../../../redux/Project/Project.type";

import { ApiCallState } from "../../../../../../redux/Utils";
import { authHeader } from "../../../../../../utilities/utilities";

export type RegisterInspectionPropType = {
  inspection: Inspection;
  project: ApiCallState<Project>;
  fetchAllInspection: Function;
};

export const parseTableData = (inspection: any) => {
  return [
    { key: -1, type: "all", is_subtitle: false, description: "CHECK ALL" },
    ...inspection?.inspection_items
      .map((e: any, idx: number) => {
        return { ...e, key: idx };
      })
      .sort((a: any, b: any) => a.id - b.id),
  ];
};

export const sendData = (data: any) =>
  axios.put(API_BASE_URI + "/inspection", data, authHeader());
