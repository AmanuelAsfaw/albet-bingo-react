import { API_BASE_URI } from "../../../../../redux/ApiCall";
import axios from "axios";
import { groupBy } from "lodash";
import { Project } from "../../../../../redux/Project/Project.type";
import { StaffWork } from "../../../../../redux/StaffWork/StaffWork.type";
import { ApiCallState } from "../../../../../redux/Utils";

export type StaffWorkPropType = {
  staff_works: ApiCallState<StaffWork[]>;
  fetchStaffWorks: Function;
  project: ApiCallState<Project>;
};

export type AddStaffWorkPropType = {
  fetchStaffWorks: Function;
  project: ApiCallState<Project>;
};

export type DetailStaffWorkPropType = {
  staff_work: StaffWork;
};

export const sendData = (data: any) =>
  axios.post(API_BASE_URI + "/staff-work", data);

export const parseForTable = (staff_works: StaffWork[]) => {
  const parsed: any[] = [];
  let grouped = groupBy(staff_works, (e) => e.date);
  for (let date in grouped) {
    let total = 0;
    let total_managements = 0;
    let total_engineers = 0;
    let total_skilled = 0;
    let total_unskilled = 0;
    let total_other = 0;
    let quality_control_managers = 0;
    let safety_managers = 0;
    let project_managers = 0;
    let office_engineers = 0;
    let construction_engineers = 0;
    let site_engineers = 0;
    let superintendents = 0;
    let formans = 0;
    let skilled_labours = 0;
    let daily_labours = 0;
    let guards = 0;
    let janitors = 0;
    let surveyors = 0;
    let surveyor_assistants = 0;
    let welders = 0;

    grouped[date].forEach((e) => {
      total_managements +=
        e.office_engineers + e.quality_control_managers + e.safety_managers;
      total_engineers +=
        e.office_engineers + e.construction_engineers + e.site_engineers;
      total_skilled += e.superintendents + e.formans + e.skilled_labours;
      total_other +=
        e.welders + e.surveyors + e.surveyor_assistants + e.janitors + e.guards;
      total +=
        total_managements + total_engineers + total_skilled + total_other;
      quality_control_managers += e.quality_control_managers;
      safety_managers += e.safety_managers;
      project_managers += e.project_managers;
      office_engineers += e.office_engineers;
      construction_engineers += e.construction_engineers;
      site_engineers += e.site_engineers;
      superintendents += e.superintendents;
      formans += e.formans;
      skilled_labours += e.skilled_labours;
      daily_labours += e.daily_labours;
      guards += e.guards;
      janitors += e.janitors;
      surveyors += e.surveyors;
      surveyor_assistants += e.surveyor_assistants;
      welders += e.welders;
    });

    parsed.push({
      date,
      quality_control_managers,
      safety_managers,
      project_managers,
      office_engineers,
      construction_engineers,
      site_engineers,
      superintendents,
      formans,
      skilled_labours,
      daily_labours,
      guards,
      janitors,
      surveyors,
      surveyor_assistants,
      welders,
      total,
      total_managements,
      total_engineers,
      total_skilled,
      total_unskilled,
      total_other,
      key: parsed.length,
    });
  }

  return parsed;
};
