import { getUserData } from "../../../../../utilities/utilities";
import axios from "axios";
import { API_BASE_URI } from "../../../../../redux/ApiCall";
import { MaterialEvaluation } from "../../../../../redux/MaterialEvaluation/MaterialEvaluation.type";
import { Project } from "../../../../../redux/Project/Project.type";
import { User } from "../../../../../redux/User/User.type";
import { Material } from "../../../../../redux/Material/Material.type";

import { ApiCallState } from "../../../../../redux/Utils";
import { MaterialEvaluationTypes } from "../../../../../constants/Constants";
import moment from "moment";

export type MaterialEvaluationPropType = {
  fetchMaterialEvaluations: Function;
  fetchMaterialEvaluation: Function;
  fetchMaterial: Function;
  fetchUsers: Function;
  material_evaluations: ApiCallState<MaterialEvaluation[]>;
  project: ApiCallState<Project>;
};

export type AddMaterialEvaluationPropType = {
  material: ApiCallState<Material[]>;
  fetchMaterialEvaluation: Function;
  project: ApiCallState<Project>;
  material_evaluations: ApiCallState<MaterialEvaluation[]>;
  users: ApiCallState<User[]>;
};

export type EditMaterialEvaluationPropType = {
  fetchMaterialEvaluations: Function;
  fetchMaterialEvaluation: Function;
  id: number;
  project: ApiCallState<Project>;
  users: ApiCallState<User[]>;
  material_evaluations: ApiCallState<MaterialEvaluation[]>;
  material_evaluation: ApiCallState<MaterialEvaluation>;
  index: number;
};

export type EvaluationItemPropType = {
  users: ApiCallState<User[]>;
  setData: Function;
  data: any;
};

export type MaterialEvaluationItemPropType = {
  material: ApiCallState<Material[]>;
  dataAction: [any, React.Dispatch<React.SetStateAction<any>>];
};

export type MaterialEvaluationSpecAndApprovalPropType = {
  dataAction: [any, React.Dispatch<React.SetStateAction<any>>];
};

export type ActionPlanPropType = {
  setData: Function;
  data: any;
  participant: any[];
  users: ApiCallState<User[]>;
};

export type MaterialEvaluationTablesType = {
  setData: Function;
  data: any;
};

export type DetailPropType = {
  material_evaluation: ApiCallState<MaterialEvaluation>;
  project: ApiCallState<Project>;
  users: ApiCallState<User[]>;
  fetchMaterialEvaluation: Function;
  material_evaluation_id: number;
  index: number;
};

export type PrintPropType = {
  material_evaluation: ApiCallState<MaterialEvaluation>;
  project: ApiCallState<Project>;
  is_visible: boolean;
  setVisibility: Function;
  index: number;
};

export type PrintMaterialEvaluationPrintPropType = {
  project: any;
  dataAction: [any, React.Dispatch<React.SetStateAction<any>>];
  visibilityAction: [any, React.Dispatch<React.SetStateAction<any>>];
};

export const parseData = (material_evaluation: MaterialEvaluation) => {
  let is_done = false;
  let pe;

  if (material_evaluation) {
    if (material_evaluation?.material_evaluation_items) {
      pe = material_evaluation?.material_evaluation_items.map((e, index) => ({
        key: index,
        ...e,
      }));
    }
    if (material_evaluation?.material_evaluation_boqs) {
      pe = material_evaluation?.material_evaluation_boqs.map((e, index) => ({
        key: index,
        ...e,
      }));
    }
    if (material_evaluation?.material_evaluation_approvals) {
      pe = material_evaluation?.material_evaluation_approvals.map(
        (e, index) => ({ key: index, ...e })
      );
    }
    is_done = true;
  }

  return {
    pe,
    is_done,
  };
};

export type StatusPropType = {
  material_evaluation: MaterialEvaluation;
  project: ApiCallState<Project>;
  fetchMaterialEvaluations: Function;
};

export const sendData = (data: any) =>
  axios.post(API_BASE_URI + "/material-evaluation", data);

export const editData = (data: any) =>
  axios.put(API_BASE_URI + "/material-evaluation", data);

export const deleteData = (id: number) =>
  axios.delete(API_BASE_URI + `/material-evaluation/${id}`);

export const onChangeHandler1 = (
  key: number,
  value: any,
  data: any[],
  setData: Function
) => {
  const newData = [...data];

  const index = newData.findIndex((e) => e.key === key);
  if (index !== -1) {
    let item = newData[index];
    item = {
      ...item,
      description: value,
    };
    newData.splice(index, 1, item);
    setData(newData);
  }
};

export const saveData = (data: any) => {
  localStorage.setItem("material_evaluation", JSON.stringify(data));
};

export const getData = () => {
  let saved_data = localStorage.getItem("material_evaluation");
  if (saved_data) {
    let parsed = JSON.parse(saved_data);
    return {
      ...parsed,
      date: moment(parsed.date),
    };
  } else
    return {
      type: "",
      date: moment(),
      material_evaluation_items: [InitialMEItemData],
      specification_boq: [InitialSpecBoqData],
      approval_rqt: [InitialApprovalRqtData],
    };
};

export const clearData = () => {
  localStorage.removeItem("material_evaluation");
};

export type MEItemType = {
  key: number;
  item_no: string;
  material: string;
  spec_and_rqt: string;
  contractor_submittal: string;
  comment: string;
  status: string;
};
export type SpecBoqType = {
  key: number;
  spec_and_rqt: string;
  contractor_submittal: string;
  comment: string;
};
export type ApprovalRqtType = {
  key: number;
  spec_and_rqt: string;
  contractor_submittal: string;
  comment: string;
};

export const InitialMEItemData: MEItemType[] = [
  {
    key: Date.now(),
    item_no: "",
    material: "",
    spec_and_rqt: "",
    contractor_submittal: "",
    comment: "",
    status: "",
  },
];
export const InitialSpecBoqData: SpecBoqType[] = [
  {
    key: Date.now(),
    spec_and_rqt: "",
    contractor_submittal: "",
    comment: "",
  },
];
export const InitialApprovalRqtData: ApprovalRqtType[] = [
  {
    key: Date.now(),
    spec_and_rqt: "II. APPROVAL REQUIREMENT",
    contractor_submittal: "",
    comment: "",
  },
  {
    key: Date.now() + 1,
    spec_and_rqt:
      "1. Compliance Statement: ( Compliance to specification and schematic drawing - in case of any difference between consultant design drawing and specification contractor to highlight the same",
    contractor_submittal: "",
    comment: "",
  },
  {
    key: Date.now() + 2,
    spec_and_rqt: "2. Construction drawing Reference No.",
    contractor_submittal: "",
    comment: "",
  },
  {
    key: Date.now() + 3,
    spec_and_rqt: "3. Technical Specification Extract (relevant items)",
    contractor_submittal: "",
    comment: "",
  },
  {
    key: Date.now() + 4,
    spec_and_rqt:
      "4. Company Profile (Supplier /Manufacturer) showing Contact details",
    contractor_submittal: "",
    comment: "",
  },
  {
    key: Date.now() + 5,
    spec_and_rqt: "5. Valid Registration / Business License",
    contractor_submittal: "",
    comment: "",
  },
  {
    key: Date.now() + 6,
    spec_and_rqt:
      "6. Manufacturers Reference (List of Projects in Ethiopia / other countries)",
    contractor_submittal: "",
    comment: "",
  },
  {
    key: Date.now() + 7,
    spec_and_rqt: "7. ISO Quality system certificate",
    contractor_submittal: "",
    comment: "",
  },
  {
    key: Date.now() + 8,
    spec_and_rqt: "8. Complete List of Materials or accessories",
    contractor_submittal: "",
    comment: "",
  },
  {
    key: Date.now() + 9,
    spec_and_rqt:
      "9. Catalogue cuts or entire Catalogues (Highlighted Selected items) Colored, stamped or originals",
    contractor_submittal: "",
    comment: "",
  },
  {
    key: Date.now() + 10,
    spec_and_rqt: "10. Descriptive Literature/ shop drawing/Detail",
    contractor_submittal: "",
    comment: "",
  },
  {
    key: Date.now() + 11,
    spec_and_rqt: "11. Valid Test Reports / Product conformity certificate",
    contractor_submittal: "",
    comment: "",
  },
  {
    key: Date.now() + 12,
    spec_and_rqt: "12. Sample Certificate of Origin",
    contractor_submittal: "",
    comment: "",
  },
  {
    key: Date.now() + 13,
    spec_and_rqt: "13. Draft Warranty / Guarantee Certificate",
    contractor_submittal: "",
    comment: "",
  },
  {
    key: Date.now() + 14,
    spec_and_rqt: "14. Manufacturers recommended spare parts list",
    contractor_submittal: "",
    comment: "",
  },
  {
    key: Date.now() + 15,
    spec_and_rqt: "15. Samples of Materials & Accessories",
    contractor_submittal: "",
    comment: "",
  },
];
