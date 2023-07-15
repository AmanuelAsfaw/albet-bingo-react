import { MaterialRequest } from "../../../../../../redux/MaterialRequest/MaterialRequest.type";

export type PrintMaterialRequestPrintPropType = {
  project: any;
  dataAction: [any, React.Dispatch<React.SetStateAction<any>>];
  visibilityAction: [any, React.Dispatch<React.SetStateAction<any>>];
};

export const parseData = (material_request: MaterialRequest) => {
  let is_done = false;
  let pe;

  if (material_request) {
    if (
      material_request?.personnel_equipment &&
      material_request?.personnel_equipment !== ""
    ) {
      pe = material_request?.personnel_equipment
        .split("---")
        .map((form: any) => JSON.parse(form));
    }
    is_done = true;
  }

  return {
    pe,
    is_done,
  };
};
