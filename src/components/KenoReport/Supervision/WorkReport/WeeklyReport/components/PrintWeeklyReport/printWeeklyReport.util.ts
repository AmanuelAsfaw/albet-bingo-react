import { WeekReport } from "../../../../../../../redux/WeekReport/WeekReport.type";

export type PrintWeeklyReportPrintPropType = {
  dataAction: [any, React.Dispatch<React.SetStateAction<any>>];
  visibilityAction: [any, React.Dispatch<React.SetStateAction<any>>];
  project: any;
};
export const parseData = (weekly_report: WeekReport) => {
  let is_done = false;
  let manPower, description, equipment, material, problem;

  if (weekly_report) {
    if (weekly_report?.description && weekly_report?.description !== "") {
      description = weekly_report?.description
        .split("---")
        .map((form: any) => JSON.parse(form));
    }
    if (weekly_report?.man_power && weekly_report?.man_power !== "") {
      manPower = weekly_report?.man_power
        .split("---")
        .map((form: any) => JSON.parse(form));
    }
    if (weekly_report?.equipment && weekly_report?.equipment !== "") {
      equipment = weekly_report?.equipment
        .split("---")
        .map((form: any) => JSON.parse(form));
    }
    if (weekly_report?.material && weekly_report?.material !== "") {
      material = weekly_report?.material
        .split("---")
        .map((form: any) => JSON.parse(form));
    }
    if (weekly_report?.problem && weekly_report?.problem !== "") {
      problem = weekly_report?.problem
        .split("---")
        .map((form: any) => JSON.parse(form));
    }
    is_done = true;
  }

  return {
    manPower,
    equipment,
    material,
    problem,
    description,
    is_done,
  };
};
