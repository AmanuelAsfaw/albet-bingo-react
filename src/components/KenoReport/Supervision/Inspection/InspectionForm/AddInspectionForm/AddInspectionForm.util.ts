import axios from "axios";
import { API_BASE_URI } from "../../../../../../redux/ApiCall";
import { authHeader } from "../../../../../../utilities/utilities";

export type AddInspectionFormPropType = {
  fetchAllInspectionForm: Function;
};

export const sendData = (data: any) =>
  axios.post(API_BASE_URI + "/inspection_form", data, authHeader());

export const InspectionFormItemObject = (key: any) => {
  return {
    key,
    description: "",
    is_subtitle: false,
  };
};

export const parseInspectionFormData = (
  data: any,
  items: { key: any; description: any; is_subtitle: boolean }[]
) => {
  let parsedData: any = {
    name: data.inspection_name,
    inspection_form_items: [],
  };

  parsedData.inspection_form_items = items.map(
    ({ key, description, is_subtitle }) => {
      return { description, is_subtitle };
    }
  );

  return parsedData;
};
