import { Casting } from "../../../../../../../../../redux/Casting/Casting.type";
import { ApiCallState } from "../../../../../../../../../redux/Utils";

export type MaterialTestedPropType = {
  dataAction: any;
  allConcreteAction: any;
  casting: ApiCallState<Casting[]>;
};

export const MaterialTestedObject = (key: any) => {
  return {
    key,
    specified_quality: null,
    test_result: null,
    material_tested: null,
    casting_id: null,
    is_concrete: false,
    submitted_date: null,
    is_accepted: null,
  };
};

export const MaterialsForTest = [
  { option: "Adhesives & sealants", value: "Adhesives & sealants" },
  { option: "Bricks", value: "Bricks" },
  { option: "Blocks", value: "Blocks" },
  { option: "Building hardware", value: "Building hardware" },
  { option: "Cement", value: "Cement" },
  { option: "Ceramic", value: "Ceramic" },
  { option: "Concrete", value: "Concrete" },
  { option: "Grout", value: "Grout" },
  { option: "Mortar", value: "Mortar" },
  {
    option: "Construction materials & geological samples",
    value: "Construction materials & geological samples",
  },
  { option: "Floors", value: "Floors" },
  { option: "Insulating products", value: "Insulating products" },
  { option: "Lintels", value: "Lintels" },
  { option: "Masonry - slate & stone", value: "Masonry - slate & stone" },
  { option: "Pavers", value: "Pavers" },
  { option: "Pipes", value: "Pipes" },
  { option: "Rock & natural stone", value: "Rock & natural stone" },
  { option: "Slates", value: "Slates" },
  { option: "Soils & stabilized soils", value: "Soils & stabilized soils" },
  { option: "Tiles", value: "Tiles" },
  { option: "Rebar 8mm", value: "Rebar 8mm" },
  { option: "Rebar 10mm", value: "Rebar 10mm" },
  { option: "Rebar 12mm", value: "Rebar 12mm" },
  { option: "Rebar 14mm", value: "Rebar 14mm" },
  { option: "Rebar 16mm", value: "Rebar 16mm" },
  { option: "Rebar 20mm", value: "Rebar 20mm" },
  { option: "Rebar 24mm", value: "Rebar 24mm" },
];
