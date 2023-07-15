import { Boq } from "../../../redux/Boq/Boq.type";
import { ApiCallState } from "../../../redux/Utils";

export type ItemSelectPropType = {
  boq: ApiCallState<Boq[]>;
  fetchBoq: Function;

  project: any;
  item_no: string;
  data: any;
  setItemNo: Function;
  sub_contract: number | null;
  type: "sub-contract" | "progress" | "variation" | "standard";
};

export const parseBoq = (boqs: any[], tab: string) => {
  const parsed: any[] = [];

  boqs.forEach((e) => {
    if (e.sheet_name === tab) {
      parsed.push({
        ...e,
        editable: true,
        contract_amount: e.unit_price * e.quantity,
      });
    }
  });
  return parsed;
};
