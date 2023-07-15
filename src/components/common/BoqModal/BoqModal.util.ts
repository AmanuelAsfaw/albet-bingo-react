import { Boq } from "../../../redux/Boq/Boq.type";
import { ApiCallState } from "../../../redux/Utils";

export type BoqModalPropType = {
  fetchBoq: Function;
  boq: ApiCallState<Boq[]>;
  project_id: number;
  sub_contract: number | null;
  type: "sub-contract" | "progress" | "variation";
};
