import { BoQRegistrationStructure } from "../../util/BoQ.util";
export type TabPropType = {
  boq: BoQRegistrationStructure[];
  tab: string;
  setTab: Function;
  setBoq: Function;
};

export type TabItemPropType = {
  editing: boolean;
  name: string;
  previous: string;
};
