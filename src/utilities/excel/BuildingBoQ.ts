import _ from "lodash";
import { Units } from "../../constants/Constants";
import { getDescriptionType } from "../utilities";

class BuildingBoQ {
  data: any[];
  sheet_name: string;
  type: any;
  parsed: any[];

  constructor(data: any, sheet_name: string) {
    this.data = data;
    this.type = "";
    this.parsed = [];
    this.sheet_name = sheet_name;
  }

  parseBoq() {
    const previous_type = [];
    let start = -1;
    let previous_item = "";
    // Iterate Through Each Row
    this.data.forEach((col: any[], index) => {
      //Check if its The Start of the Excel File and set the index of the Start Row
      if (this.isTableState(col)) start = index;
      // If its the Start of Excel Data
      else if (start !== -1) {
        // Identify the Row Type
        if (col[1]) {
          this.parsed.push({
            item_no: col[0],
            sheet_name: this.sheet_name,
            description: col[1],
            unit: col[2] ? this.parseUnit(col[2]) : "",
            quantity:
              _.isNil(col[3]) || col[3] === "-" || _.isNil(col[2])
                ? 0
                : _.toNumber(col[3]),
            unit_price:
              _.isNil(col[4]) || col[4] === "-" || _.isNil(col[2])
                ? 0
                : _.toNumber(col[4]),
            amount:
              (_.isNil(col[4]) || col[4] === "-" || _.isNil(col[2])
                ? 0
                : _.toNumber(col[4])) *
              (_.isNil(col[3]) || col[3] === "-" || _.isNil(col[2])
                ? 0
                : _.toNumber(col[3])),

            key: this.parsed.length,
          });
        }

        // }
      }
      // if type is not null add push it to the type list
      if (this.type) previous_type.push(this.type);
    });
    return this.parsed;
  }

  private parseUnit = (unit: string): string => {
    let parsed = unit.toUpperCase();
    if (unit.toUpperCase() === "M2") parsed = Units.M2;
    else if (unit.toUpperCase() === "M3") parsed = Units.M3;
    else if (unit.toUpperCase() === "N0") parsed = Units.NO;
    else if (unit.toUpperCase() === "NO" || unit.toUpperCase() === "N0")
      parsed = Units.NO;

    return parsed;
  };

  private isTableState(col: any[]) {
    //check if col 0 to col 5 is a string
    return (
      _.isString(col[0]) &&
      _.isString(col[1]) &&
      _.isString(col[2]) &&
      _.isString(col[3]) &&
      _.isString(col[4]) &&
      _.isString(col[5])
    );
  }

  private getType(col: any[], previous_type: string) {
    if (
      col[1] &&
      _.isString(col[1]) &&
      !col[2] &&
      !col[3] &&
      !col[4] &&
      !col[5] &&
      this.isSuperTitle(col)
    ) {
      return "super_title";
    } else if (
      col[1] &&
      !col[2] &&
      !col[3] &&
      !col[4] &&
      !col[5] &&
      this.isTitle(col)
    ) {
      return "description";
    } else if (
      (col[1] && !col[2] && !col[3] && !col[4] && !col[5]) ||
      (col[1] && _.isString(col[1]) && _.isString(col[2]) && col[3] && col[5])
    )
      return "data";
    else return null;
  }

  private isSuperTitle(col: any[]) {
    if (col[1]) {
      let split = col[1].trim().split(".")[0];
      if (split && split.length === 1) {
        return split.charCodeAt(0) > 64 && split.charCodeAt(0) < 123;
      } else return false;
    } else return false;
  }
  private isTitle(col: any[]) {
    if (col[1]) {
      let split = col[1].split(".")[0];
      if (split && split.length > 0) {
        return split.charCodeAt(0) > 47 && split.charCodeAt(0) < 57;
      } else return false;
    } else return false;
  }
}
export default BuildingBoQ;
