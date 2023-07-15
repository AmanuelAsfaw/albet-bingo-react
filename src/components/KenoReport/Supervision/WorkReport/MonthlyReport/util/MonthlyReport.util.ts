import { Meeting } from "../../../../../../redux/Meeting/Meeting.type";
import axios from "axios";
import { isNil, last, sortBy, toNumber } from "lodash";
import moment, { Moment } from "moment";
import { API_BASE_URI } from "../../../../../../redux/ApiCall";
import {
  MonthlyDifficulty,
  MonthlyReport,
} from "../../../../../../redux/MonthlyReport/MonthlyReport.type";
import { Project } from "../../../../../../redux/Project/Project.type";
import { SiteBook } from "../../../../../../redux/SiteBook/SiteBook.type";
import { TestResult } from "../../../../../../redux/TestResult/TestResult.type";
import { StaffWork } from "../../../../../../redux/StaffWork/StaffWork.type";
import { User } from "../../../../../../redux/User/User.type";
import { ApiCallState } from "../../../../../../redux/Utils";
import { WeekReport } from "../../../../../../redux/WeekReport/WeekReport.type";
import { format, zeroPad } from "../../../../../../utilities/utilities";

import { Media } from "../../../../../../redux/Media/Media.type";
import { SiteBookType } from "../../../../../../constants/Constants";
import { Boq } from "../../../../../../redux/Boq/Boq.type";
import { Payments } from "../../../../../../redux/Payments/Payments.type";
import { WeeklyPlan } from "../../../../../../redux/WeeklyPlan/WeeklyPlan.type";

export type MonthlyReportPropType = {
  monthly_reports: ApiCallState<MonthlyReport[]>;
  fetchMonthlyReports: Function;
  project: ApiCallState<Project>;

  fetchSiteOrder: Function;
  fetchUsers: Function;
  fetchTestResult: Function;
  fetchWeeklyReport: Function;
  fetchMeeting: Function;
  fetchStaffWork: Function;
  fetchMedia: Function;
  fetchPayments: Function;
  fetchWeekPlan: Function;
};

export type MonthlyDetailItemsPropType = {
  data: any;
};

export type MonthlyReportDetailPropType = {
  monthly_reports: MonthlyReport;
  index: number;
  project: ApiCallState<Project>;
  test_results: ApiCallState<TestResult[]>;
  site_order: ApiCallState<SiteBook[]>;
  weekly_reports: ApiCallState<WeekReport[]>;
  meetings: ApiCallState<Meeting[]>;
  type: "summary" | "detail";
  payments: ApiCallState<Payments[]>;
  weekly_plans: ApiCallState<WeeklyPlan[]>;
};

export type AddMonthlyReportPropType = {
  monthly_reports: ApiCallState<MonthlyReport[]>;
  fetchMonthlyReports: Function;
  project: ApiCallState<Project>;
  users: ApiCallState<User[]>;
  test_results: ApiCallState<TestResult[]>;
  site_order: ApiCallState<SiteBook[]>;
  weekly_reports: ApiCallState<WeekReport[]>;
  meetings: ApiCallState<Meeting[]>;
  staff_works: ApiCallState<StaffWork[]>;
  medias: ApiCallState<Media[]>;
  payments: ApiCallState<Payments[]>;
  weekly_plans: ApiCallState<WeeklyPlan[]>;
};

export type EditMonthlyReportPropType = {
  fetchMonthlyReports: Function;
  weekly_plans: ApiCallState<WeeklyPlan[]>;
  project: ApiCallState<Project>;
  users: ApiCallState<User[]>;
  test_results: ApiCallState<TestResult[]>;
  site_order: ApiCallState<SiteBook[]>;
  weekly_reports: ApiCallState<WeekReport[]>;
  meetings: ApiCallState<Meeting[]>;
  staff_works: ApiCallState<StaffWork[]>;
  medias: ApiCallState<Media[]>;
  monthly_report: MonthlyReport;
  index: number;
  payments: ApiCallState<Payments[]>;
};

export type AddMonthlyReportComponentPropType = {
  submitAction: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  resetFormAction: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  dataAction: [any, React.Dispatch<React.SetStateAction<any>>];
  next: Function;
};

export type MonthlyPrintPropType = {
  visibilityAction: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  dataAction: [any, React.Dispatch<React.SetStateAction<any>>];
  index: number;
  project: ApiCallState<Project>;
  test_results: ApiCallState<TestResult[]>;
  site_order: ApiCallState<SiteBook[]>;
  weekly_reports: ApiCallState<WeekReport[]>;
  meetings: ApiCallState<Meeting[]>;
  type: "summary" | "detail";
  weekly_plans: ApiCallState<WeeklyPlan[]>;
  payments: ApiCallState<Payments[]>;
};

export type AddReportComponentPropType = {
  submitAction: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  resetFormAction: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  dataAction: [any, React.Dispatch<React.SetStateAction<any>>];
  next: Function;
  dateAction: [any, React.Dispatch<React.SetStateAction<any>>];
  users?: ApiCallState<User[]>;
};

export type ShareMonthlyReportPropType = {
  monthly_report: MonthlyReport;
  monthly_reports: ApiCallState<MonthlyReport[]>;
  project: ApiCallState<Project>;
  setMonthlyReport: Function;

  users: ApiCallState<User[]>;
};

export const sendData = (data: any) =>
  axios.post(API_BASE_URI + "/monthly-report", data);

export const updateData = (data: any) =>
  axios.put(API_BASE_URI + "/monthly-report", data);

export const deleteData = (id: number) =>
  axios.delete(API_BASE_URI + "/monthly-report/" + id);

export const PUT = (data: any) =>
  axios.put(API_BASE_URI + "/monthly-report/only", data);

export const parsedData = (
  date: Moment,
  project: Project,
  monthly_report: MonthlyReport[],
  test_result: TestResult[],
  site_orders: SiteBook[],
  weekly_reports: WeekReport[],
  weekly_plans: WeeklyPlan[],
  meetings: Meeting[],
  payments: Payments[],
  medias: Media[]
) => {
  const last_monthly_report = last(monthly_report);
  const start_date = moment(project.commencement_date);
  const end_date = moment(project.completion_date);
  const { c_executed, c_planned } = getWeeklyCumulativePerformance(
    weekly_reports,
    weekly_plans,
    project.boqs,
    date.clone()
  );

  const elapsed = date.diff(start_date, "d");
  const { executed, planned } = getWeeklyPerformance(
    weekly_reports,
    weekly_plans,
    project.boqs,
    date.clone()
  );
  const total_planned = getTotalBoqPlanned(project.boqs);
  let data = {
    introduction: last_monthly_report?.introduction,
    date: date,
    evaluation_remark: [""],
    general_remark: [""],

    prepared_by: null,
    checked_by: null,
    progress: getProgressData(
      weekly_reports,
      weekly_plans,
      project,
      date.clone()
    ),
    monthly_claims: [{ key: Date.now() }],
    monthly_construction_status: getConstructionStatus(),
    monthly_contract: {
      variation: last_monthly_report?.monthly_contract?.variation,
      additional_time: last_monthly_report?.monthly_contract?.additional_time,
      date_of_signing: last_monthly_report?.monthly_contract?.date_of_signing
        ? moment(last_monthly_report?.monthly_contract?.date_of_signing)
        : null,
      extension_time: last_monthly_report?.monthly_contract?.extension_time,
      mobilization_time:
        last_monthly_report?.monthly_contract?.mobilization_time,
      revised_completion_date: end_date,
      supplementary: last_monthly_report?.monthly_contract?.supplementary,
      contract: total_planned,
      planned_amount: planned,
      contract_time: end_date.diff(start_date, "d"),
      commencement_date: start_date.format("YYYY-MM-DD"),
      completion_date: end_date.format("YYYY-MM-DD"),
      executed_amount: executed,
      cumulative_amount: c_executed,
      cumulative_planned: c_planned,
      planned: (planned / total_planned) * 100,
      executed: (executed / total_planned) * 100,
      planned_cumulative: (c_planned / total_planned) * 100,
      executed_cumulative: (c_executed / total_planned) * 100,
      time_elapsed: elapsed,
      time_percentage:
        format(100 * (elapsed / end_date.diff(start_date, "day")), true) + " %",
      advance: project.project_payment.advance_payment,
      advance_percentage: project.project_payment.advance_percent,
    },
    boq_executed: getBoqExecuted(project.boqs, date, weekly_reports),
    payment: getPayment(payments, date),
    monthly_difficulty: {
      equipment: false,
      manpower: false,
      material: false,
      other: false,
      other_interference: false,
      remark: [""],
      weather: false,
    },
    monthly_evaluations: [
      {
        description: "QUALITY OF WORKS",
        key: 1,
        status: "Good",
      },
      {
        description: "QUALITY OF MATERIALS",
        key: 2,
        status: "Good",
      },
      {
        description: "QUALITY OF WORKMANSHIP",
        key: 3,
        status: "Good",
      },
      {
        description: "PROGRESS",
        key: 4,
        status: "Good",
      },
      {
        description: "DELIVERY OF MATERIAL",
        key: 5,
        status: "Good",
      },
      {
        description: "MOBILIZATION OF MANPOWER",
        key: 6,
        status: "Good",
      },
      {
        description: "EQUIPMENT AVAILABILITY",
        key: 7,
        status: "Good",
      },
    ],
    monthly_instruction: {
      site_orders: getSiteOrder(site_orders, date.clone()),
      remark: [""],
    },
    monthly_qc: {
      remark: [""],
      ...getQC(test_result, date.clone()),
    },
    monthly_variations: [],
    meetings: getMeeting(meetings, date.clone()),
    name: `Report No. ${monthly_report.length + 1}`,
    project_id: project.id,
    project: project,
    monthly_manpowers: getMonthlyManpower(date.clone()),
    photos: getMedia(medias, date.clone()),
  };

  return data;
};

export const parsedEditData = (
  monthly_report: MonthlyReport,
  project: Project,

  test_result: TestResult[],
  site_orders: SiteBook[],
  weekly_reports: WeekReport[],
  weekly_plans: WeeklyPlan[],
  meetings: Meeting[],
  payments: Payments[],
  medias: Media[],
  index: number
) => {
  const start_date = moment(project.commencement_date);
  const end_date = moment(project.completion_date);
  const date = moment(monthly_report.date);
  // const { c_executed, c_planned } = getWeeklyCumulativePerformance(
  //   weekly_reports,
  //   date
  // );
  // const { executed, planned } = getWeeklyPerformance(weekly_reports, date);
  const total_planned = getTotalBoqPlanned(project.boqs);
  const { c_executed, c_planned } = getWeeklyCumulativePerformance(
    weekly_reports,
    weekly_plans,
    project.boqs,

    date.clone()
  );

  const { executed, planned } = getWeeklyPerformance(
    weekly_reports,
    weekly_plans,
    project.boqs,
    date.clone()
  );

  let data = {
    ...monthly_report,
    project: project,
    name: `Report No. ${index}`,
    project_id: project.id,
    date,
    index: index,
    prepared_by: monthly_report.monthly_report_prepared_by?.id,
    checked_by: monthly_report.monthly_report_approved_by?.id,
    prepared_by_name: monthly_report.monthly_report_prepared_by?.full_name,
    checked_by_name: monthly_report.monthly_report_approved_by?.full_name,
    createdAt: monthly_report.createdAt,
    boq_executed: getBoqExecuted(project.boqs, date, weekly_reports),
    payment: getPayment(payments, date),
    monthly_contract: {
      ...monthly_report.monthly_contract,
      revised_completion_date: moment(
        monthly_report.monthly_contract.revised_completion_date
      ),
      date_of_signing: moment(monthly_report.monthly_contract.date_of_signing),
      contract: total_planned,
      planned_amount: planned,
      executed_amount: executed,
      cumulative_amount: c_executed,
      cumulative_planned: c_planned,
      planned: (planned / total_planned) * 100,
      executed: (executed / total_planned) * 100,
      planned_cumulative: (c_planned / total_planned) * 100,
      executed_cumulative: (c_executed / total_planned) * 100,
      contract_time: end_date.diff(start_date, "day"),
      commencement_date: start_date.format("YYYY-MM-DD"),
      completion_date: end_date.format("YYYY-MM-DD"),
      time_elapsed: date.diff(start_date, "day"),
      time_percentage:
        format(
          100 *
            (date.diff(start_date, "day") / end_date.diff(start_date, "day")),
          true
        ) + " %",
      advance: project.project_payment.advance_payment,
      advance_percentage: project.project_payment.advance_percent,
    },

    monthly_evaluations: monthly_report.monthly_evaluations.map((e, index) => ({
      ...e,
      key: index,
    })),

    monthly_variations: monthly_report.monthly_variations.map((e, index) => ({
      ...e,
      key: index,
    })),

    monthly_qc: {
      remark: monthly_report.monthly_qc.remark,
      ...getQC(test_result, date),
    },

    monthly_construction_status: monthly_report.monthly_construction_status,

    monthly_instruction: {
      site_orders: getSiteOrder(site_orders, date),
      remark: monthly_report.monthly_instruction?.remark,
    },

    monthly_claims: monthly_report.monthly_claims.map((e, index) => ({
      ...e,
      key: index,
    })),
    meetings: getMeeting(meetings, date),
    progress: getProgressData(weekly_reports, weekly_plans, project, date),
    photos: getMedia(medias, date),
  };
  return data;
};

export const getMedia = (medias: Media[], date: Moment) => {
  let parsed: any[] = [];
  medias.forEach((media) => {
    if (moment(media.date).isSame(date, "month")) parsed.push(...media.Uploads);
  });
  return parsed;
};

export const getTotalBoqPlanned = (boqs: Boq[]) => {
  let total = 0;
  boqs.forEach((e) => {
    total += e.unit_price * e.quantity;
  });
  return total;
};

export const getConstructionStatus = () => {
  let completed: string[] = [];
  let under_progress: string[] = [];
  let not_started: string[] = [];

  return {
    completed,
    under_progress,
    not_started,
  };
};

export const parseMonthlyDifficultiesData = (data: MonthlyDifficulty) => {
  return [
    {
      name: "material",
      description: "Material",
      value: data.material ? "yes" : "no",
    },
    {
      name: "equipment",
      description: "Equipment",
      value: data.equipment ? "yes" : "no",
    },
    {
      name: "manpower",
      description: "Manpower",
      value: data.manpower ? "yes" : "no",
    },
    {
      name: "weather",
      description: "Weather",
      value: data.weather ? "yes" : "no",
    },
    {
      name: "other_interference",
      description: "Other Interference",
      value: data.other_interference ? "yes" : "no",
    },
    {
      name: "other",
      description: "Other",
      value: data.other ? "yes" : "no",
    },
  ];
};

export const getMonthlyManpower = (date: Moment) => {
  let start_date = date.clone().startOf("month");
  let end_date = date.clone().endOf("month");

  let data: {
    date: string;
    project_manager: boolean;
    office_engineer: boolean;
    site_engineer: boolean;
    general_forman: boolean;
  }[] = [];
  while (start_date.isSameOrBefore(end_date, "date")) {
    const is_sunday = start_date.weekday() !== 0;

    data.push({
      date: start_date.format("YYYY-MM-DD"),
      project_manager: is_sunday,
      office_engineer: is_sunday,
      site_engineer: is_sunday,
      general_forman: is_sunday,
    });

    start_date.add(1, "d");
  }
  return data;
};

const getQC = (test_results: TestResult[], date: Moment) => {
  let material: any[] = [];
  let one_page: any[] = [];
  let concrete: any[] = [];
  let parsed: any[] = [];
  let rebars: any[] = [];

  test_results.forEach((test_result) => {
    if (moment(test_result.date_of_testing).isSame(date, "month"))
      test_result.test_result_items.forEach((item) => {
        parsed.push({
          material: item.material_tested,
          order: moment(item.submitted_date).format("DD/MM/YYYY"),
          submitted: moment(test_result.date_of_testing).format("DD/MM/YYYY"),
          accepted: item.is_accepted,
          casting: item.casting,

          test_expected: item.casting
            ? `${item.casting.concrete_grade}, ${moment(
                test_result.date_of_testing
              ).diff(moment(item.casting?.date), "day")}, ${
                item.specified_quality
              }`
            : item.specified_quality,
        });
      });
  });

  parsed = sortBy(parsed, (e) => e.material);
  let pervious_material = null;

  for (let i = 0; i < parsed.length; i++) {
    const e = parsed[i];

    if (e.material?.toLowerCase()?.search("rebar") !== -1) {
      rebars = [...rebars, getRebarLength(e.material)];
    } else {
      if (rebars.length) {
        material.push({
          material: "Reinforced Bar",
        });
        material.push({
          material: rebars.join(" "),
          order: parsed[i - 1]?.order,
          submitted: parsed[i - 1]?.submitted,
          accepted: parsed[i - 1]?.accepted,
          test_expected: parsed[i - 1]?.test_expected,
        });
        one_page.push({ material: rebars.join(" ") });
        rebars = [];
      }

      if (pervious_material !== e.material) {
        material.push({
          material: e.material,
        });

        if (e.casting)
          one_page.push({
            material: `${e.casting?.concrete_grade} for ${e.casting?.structure_type}`,
          });
        else one_page.push({ material: e.material });
      }

      material.push({ ...e, material: "" });
    }

    pervious_material = e.material;
  }

  let last_rebar = last(parsed);

  if (
    rebars.length &&
    last_rebar?.material?.toLowerCase()?.search("rebar") !== -1
  ) {
    material.push({
      material: "Reinforced Bar",
    });
    material.push({
      material: rebars.join(" "),
      order: last_rebar?.order,
      submitted: last_rebar?.submitted,
      accepted: last_rebar?.accepted,
      test_expected: last_rebar?.test_expected,
      is_rebar: true,
    });
    one_page.push({ material: rebars.join(" ") });
    rebars = [];
  }

  test_results.forEach((test_result) => {
    if (moment(test_result.date_of_testing).isSame(date, "month"))
      test_result.test_result_items.forEach((item) => {
        if (item.casting) {
          concrete.push({
            cast_date: moment(item.casting?.date).format("DD/MM/YYYY"),
            submitted_date: moment(test_result.date_of_testing).format(
              "DD/MM/YYYY"
            ),
            type: item.casting?.cement_type,
            grade: item.casting.concrete_grade,
            source_of_concrete: item.casting.source_of_concrete,
            location: item.casting.structure_type,
            result_date: moment(test_result.date_of_testing).diff(
              moment(item.casting?.date),
              "day"
            ),
            test_result: item.test_result,
            remark: test_result.recommendation,
          });
        }
      });
  });

  return { material, concrete, one_page };
};

const getRebarLength = (material: string) => {
  if (material.search("6") !== -1 && material.search("16") === -1)
    return "Ф6mm";
  if (material.search("8") !== -1) return "Ф8mm";
  if (material.search("10") !== -1) return "Ф10mm";
  if (material.search("12") !== -1) return "Ф12mm";
  if (material.search("14") !== -1) return "Ф14mm";
  if (material.search("16") !== -1) return "Ф16mm";
  if (material.search("20") !== -1) return "Ф20mm";
  if (material.search("24") !== -1) return "Ф24mm";
};

const getSiteOrder = (site_orders: SiteBook[], date: Moment) => {
  const parsed: any[] = [];
  SiteBookType.forEach((type) => {
    parsed.push({ type });
    site_orders.forEach((e, index) => {
      if (moment(e.date).isSame(date, "month") && type === e.type)
        parsed.push({
          index: `Site Order ${zeroPad(index + 200 + 1, 3)}`,
          date: moment(e.date).format("DD/MM/YYYY"),
        });
    });
  });

  return parsed;
};

const getProgressData = (
  weekly_reports: WeekReport[],
  weekly_plans: WeeklyPlan[],
  project: Project,
  date: Moment
) => {
  let weekly_table: any[] = [];
  let weekly_graph: any[] = [];
  let monthly_table: any[] = [];
  let monthly_graph: any[] = [];
  let monthly_table_column: any[] = [
    {
      title: "Description",
      key: "description",
      dataIndex: "description",
    },
  ];
  let commencement_date = moment(project.commencement_date);
  let completion_date = moment(project.completion_date);
  let total_duration = completion_date.diff(commencement_date, "d");
  let start_of_month = date.startOf("month");

  let start_date = moment(project.commencement_date);
  let end_date = date.isBefore(completion_date, "month")
    ? date
    : completion_date;

  let executed: any = {
    week1: 0,
    week2: 0,
    week3: 0,
    week4: 0,
  };

  let planned: any = {
    week1: 0,
    week2: 0,
    week3: 0,
    week4: 0,
  };

  for (let i = 0; i < 4; i++) {
    const data = getWeeklyPerformance(
      weekly_reports,
      weekly_plans,
      project.boqs,
      start_of_month,
      "week"
    );
    executed[`week${i + 1}`] += data.executed;
    planned[`week${i + 1}`] += data.planned;

    start_of_month.add(1, "week");
  }

  while (start_date.isSameOrBefore(end_date, "month")) {
    monthly_table_column.push({
      title: start_date.format("MMM,YYYY"),
      dataIndex: start_date.format("MMM,YYYY"),
      key: start_date.format("MMM,YYYY"),
    });
    start_date.add(1, "month");
  }

  let total_planned =
    planned.week4 + planned.week3 + planned.week2 + planned.week1;

  weekly_table = [
    {
      description: "This Month’s Planned Value",
      week1: planned.week1,
      week2: planned.week2,
      week3: planned.week3,
      week4: planned.week4,
    },
    {
      description: "Cumulative Planned Value",
      week1: planned.week1,
      week2: planned.week2 + planned.week1,
      week3: planned.week3 + planned.week2 + planned.week1,
      week4: planned.week4 + planned.week3 + planned.week2 + planned.week1,
    },
    {
      description: "This Month’s Executed Value",
      week1: executed.week1,
      week2: executed.week2,
      week3: executed.week3,
      week4: executed.week4,
    },
    {
      description: "Cumulative Executed Value",
      week1: executed.week1,
      week2: executed.week2 + executed.week1,
      week3: executed.week3 + executed.week2 + executed.week1,
      week4: executed.week4 + executed.week3 + executed.week2 + executed.week1,
    },
    {
      description: "This Month’s Planned in %",
      week1: format((planned.week1 / total_planned) * 100, true) + "%",
      week2: format((planned.week2 / total_planned) * 100, true) + "%",
      week3: format((planned.week3 / total_planned) * 100, true) + "%",
      week4: format((planned.week4 / total_planned) * 100, true) + "%",
    },
    {
      description: "Cumulative Planned in %",
      week1: format((planned.week1 / total_planned) * 100, true) + "%",
      week2:
        format(((planned.week2 + planned.week1) / total_planned) * 100, true) +
        "%",
      week3:
        format(
          ((planned.week3 + planned.week2 + planned.week1) / total_planned) *
            100,
          true
        ) + "%",
      week4:
        format(
          ((planned.week4 + planned.week2 + planned.week1 + planned.week3) /
            total_planned) *
            100,
          true
        ) + "%",
    },
    {
      description: "This Month’s Executed in %",
      week1:
        planned.week1 !== 0
          ? format((executed.week1 / planned.week1) * 100, true) + "%"
          : 0 + "%",
      week2:
        planned.week2 !== 0
          ? format((executed.week2 / planned.week2) * 100, true) + "%"
          : 0 + "%",
      week3:
        planned.week3 !== 0
          ? format((executed.week3 / planned.week3) * 100, true) + "%"
          : 0 + "%",
      week4:
        planned.week14 !== 0
          ? format((executed.week4 / planned.week4) * 100, true) + "%"
          : 0 + "%",
    },
    {
      description: "Cumulative Executed in %",
      week1: format((executed.week1 / total_planned) * 100, true) + "%",
      week2:
        format(
          ((executed.week2 + executed.week1) / total_planned) * 100,
          true
        ) + "%",
      week3:
        format(
          ((executed.week3 + executed.week2 + executed.week1) / total_planned) *
            100,
          true
        ) + "%",
      week4:
        format(
          ((executed.week4 + executed.week2 + executed.week1 + executed.week3) /
            total_planned) *
            100,
          true
        ) + "%",
    },
  ];

  weekly_graph = [
    {
      name: "Week 1",
      planned: ((planned.week1 / total_planned) * 100).toFixed(2),
      executed: ((executed.week1 / total_planned) * 100).toFixed(2),
    },
    {
      name: "Week 2",
      planned: (
        ((planned.week2 + planned.week1) / total_planned) *
        100
      ).toFixed(2),
      executed: (
        ((executed.week2 + executed.week1) / total_planned) *
        100
      ).toFixed(2),
    },
    {
      name: "Week 3",
      planned: (
        ((planned.week3 + planned.week2 + planned.week1) / total_planned) *
        100
      ).toFixed(2),
      executed: (
        ((executed.week3 + executed.week2 + executed.week1) / total_planned) *
        100
      ).toFixed(2),
    },
    {
      name: "Week 4",
      planned: (
        ((planned.week4 + planned.week2 + planned.week1 + planned.week3) /
          total_planned) *
        100
      ).toFixed(2),
      executed: (
        ((executed.week4 + executed.week2 + executed.week1 + executed.week3) /
          total_planned) *
        100
      ).toFixed(2),
    },
  ];

  const weekly_graph_legend = [
    {
      description: "Cumulative Planned Value",
      week1: format((planned.week1 / total_planned) * 100, true) + "%",
      week2:
        format(((planned.week2 + planned.week1) / total_planned) * 100, true) +
        "%",
      week3:
        format(
          ((planned.week3 + planned.week2 + planned.week1) / total_planned) *
            100,
          true
        ) + "%",
      week4:
        format(
          ((planned.week4 + planned.week3 + planned.week2 + planned.week1) /
            total_planned) *
            100,
          true
        ) + "%",
    },

    {
      description: "Cumulative Executed Value",
      week1: format((executed.week1 / total_planned) * 100, true) + "%",
      week2:
        format(
          ((executed.week2 + executed.week1) / total_planned) * 100,
          true
        ) + "%",
      week3:
        format(
          ((executed.week3 + executed.week2 + executed.week1) / total_planned) *
            100,
          true
        ) + "%",
      week4:
        format(
          ((executed.week4 + executed.week3 + executed.week2 + executed.week1) /
            total_planned) *
            100,
          true
        ) + "%",
    },
  ];

  let monthly_planned: any = {};
  let monthly_executed: any = {};
  let time_elapsed: any = {};

  monthly_table_column.forEach((e) => {
    if (e.dataIndex !== "description") {
      const { c_planned, c_executed } = getWeeklyCumulativePerformance(
        weekly_reports,
        weekly_plans,
        project.boqs,
        moment(e.dataIndex, "MMM,YYYY")
      );
      const { planned, executed } = getWeeklyPerformance(
        weekly_reports,
        weekly_plans,
        project.boqs,
        moment(e.dataIndex, "MMM,YYYY")
      );

      // planned_amount += getCumulativePlanned(
      //   master_schedule,
      //   moment(e.dataIndex, "MMM,YYYY")
      // );
      monthly_planned[e.dataIndex] =
        format((planned / c_planned) * 100, true) + " %";
      monthly_executed[e.dataIndex] =
        format((executed / c_executed) * 100, true) + " %";
      time_elapsed[e.dataIndex] =
        format(
          (moment(e.dataIndex, "MMM,YYYY")
            .endOf("month")
            .diff(commencement_date, "d") /
            total_duration) *
            100,
          true
        ) + " %";
      monthly_graph.push({
        name: e.dataIndex,
        planned: ((planned / c_planned) * 100).toFixed(2),
        // executed: ((c_executed / total_cumulative_plan) * 100).toFixed(2),
        time: (
          (moment(e.dataIndex, "MMM,YYYY")
            .endOf("month")
            .diff(commencement_date, "d") /
            total_duration) *
          100
        ).toFixed(2),
      });
    }
  });

  monthly_table = [
    { ...monthly_planned, description: "Cumulative Planned" },
    { ...monthly_executed, description: "Cumulative Executed" },
    { ...time_elapsed, description: "Time Elapse" },
  ];
  const monthly_table_column_no_header = monthly_table_column;

  return {
    monthly_table_column_no_header,
    weekly_table,
    weekly_graph,
    monthly_table,
    monthly_graph,
    monthly_table_column,
    weekly_graph_legend,
  };
};

const getWeeklyCumulativePerformance = (
  weekly_report: WeekReport[],
  weekly_plans: WeeklyPlan[],
  boqs: Boq[],
  date: Moment
) => {
  let c_planned = 0;
  let c_executed = 0;
  weekly_report.forEach((e) => {
    if (moment(e.reporting_week, "YYYY, ww").isSameOrBefore(date, "month")) {
      e.description
        .split("---")
        .map((e) => JSON.parse(e))
        .forEach((e) => {
          let boq = getBoq(boqs, e.activity_desc);

          if (boq) {
            c_executed +=
              boq.unit_price * boq.quantity * (e.executed_qty / 100);
          }
        });
    }
  });

  weekly_plans.forEach((weekly_plan) => {
    if (moment(weekly_plan.date).isSameOrBefore(date, "month")) {
      weekly_plan.weekly_plan_items.forEach((e) => {
        c_planned += e.week1 + e.week2 + e.week3 + e.week4;
      });
    }
  });

  return { c_planned, c_executed };
};

const getWeeklyPerformance = (
  weekly_report: WeekReport[],
  weekly_plans: WeeklyPlan[],
  boqs: Boq[],
  date: Moment,
  type: "week" | "month" = "month"
) => {
  let planned = 0;
  let executed = 0;
  weekly_report.forEach((e) => {
    if (moment(e.reporting_week).isSame(date, type)) {
      e.description
        .split("---")
        .map((e) => JSON.parse(e))
        .forEach((e) => {
          let boq = getBoq(boqs, e.activity_desc);

          if (boq) {
            executed += boq.unit_price * boq.quantity * (e.executed_qty / 100);
          }
        });
    }
  });

  weekly_plans.forEach((weekly_plan) => {
    if (moment(weekly_plan.date).isSame(date, "month")) {
      weekly_plan.weekly_plan_items.forEach((e) => {
        planned += e.week1 + e.week2 + e.week3 + e.week4;
      });
    }
  });

  return { planned, executed };
};

const getBoq = (boqs: Boq[], description: string) => {
  return boqs.find((boq) => boq.description === description);
};

const getMeeting = (meetings: Meeting[], date: Moment) => {
  let meeting: any[] = [];
  meetings.forEach((e, index) => {
    if (moment(e.date).isSame(date, "month"))
      meeting.push(
        `Meeting ${zeroPad(index + 1)} conducted on ${moment(e.date).format(
          "DD/MM/YYYY"
        )}`
      );
  });

  return meeting;
};

export const getDetailData = (
  monthly_report: MonthlyReport,
  project: Project,
  test_result: TestResult[],
  site_orders: SiteBook[],
  weekly_reports: WeekReport[],
  weekly_plans: WeeklyPlan[],
  meetings: Meeting[],
  payments: Payments[],
  index: number
) => {
  const start_date = moment(project.commencement_date);
  const end_date = moment(project.completion_date);
  const date = moment(monthly_report.date).endOf("M");
  const { c_executed, c_planned } = getWeeklyCumulativePerformance(
    weekly_reports,
    weekly_plans,
    project.boqs,
    date
  );

  const { executed, planned } = getWeeklyPerformance(
    weekly_reports,
    weekly_plans,
    project.boqs,
    date
  );

  const elapsed = date.diff(start_date, "d");
  // const { executed, planned } = getWeeklyPerformance(weekly_reports, date);
  const total_planned = getTotalBoqPlanned(project.boqs);
  let data = {
    project: project,
    index: index,
    contract_summary: [
      {
        description: "DATE OF SIGNING OF CONTRACT",
        value:
          moment(monthly_report.monthly_contract.date_of_signing).format(
            "DD/MM/YYYY"
          ) + " G.C",
        bold: false,
      },
      {
        description: "CONTRACT VALUE WITH OUT VAT",
        value: format(total_planned) + " ETB",
        bold: true,
      },

      {
        description: "TOTAL AMOUNT",
        bold: true,
        value: format(total_planned) + " ETB",
      },
      {
        description: "CONTRACT TIME",
        value: format(end_date.diff(start_date, "d")) + " Calendar Days",
        bold: true,
      },
      {
        description: "MOBILIZATION TIME",
        value: monthly_report.monthly_contract.mobilization_time,
      },
      {
        description: "CONTRACT DATE",
        value: start_date.format("MMMM DD, YYYY"),
      },
      {
        description: "COMPLETION DATE",
        value: end_date.format("MMMM DD, YYYY"),
      },

      {
        description: "REVISED COMPLETION DATE",
        value: moment(
          monthly_report.monthly_contract.revised_completion_date
        ).format("DD/MM/YYYY"),
      },
      {
        description: "PLAN OF THE MONTH",
        value: format(planned),
      },

      {
        description: "PERCENTAGE OF WORK PLANNED THIS MONTH",
        value: format(100 * (planned / total_planned), true) + " %",
        bold: true,
      },
      {
        description: "EXECUTED IN THIS MONTH",
        value: format(executed),
        bold: true,
      },
      {
        description: "PERCENTAGE OF WORK EXECUTED THIS MONTH",
        value: format(100 * (executed / total_planned), true) + " %",
        bold: true,
      },
      {
        description: "PLAN VS EXECUTED",
        value: format(100 * (executed / planned), true) + " %",
        bold: true,
      },

      {
        description: "OVERALL PLANNED TO DATE",
        value: format(c_planned),
        bold: true,
      },

      {
        description: "PERCENTAGE OF WORK EXECUTED CUMULATIVE",
        value: format(100 * (c_executed / total_planned), true) + " %",
        bold: true,
      },

      {
        description: "PLANNED Vs EXECUTED IN %",
        value: format(100 * (c_executed / c_planned), true) + " %",
        bold: true,
      },

      {
        description: "SLIPPAGE IN %",
        value:
          format(
            (c_planned / total_planned) * 100 -
              (c_executed / total_planned) * 100,
            true
          ) + " %",
        bold: true,
      },

      {
        description: "TIME ELAPSED IN DAYS",
        value: elapsed,
        bold: true,
      },
      {
        description: "TIME ELAPSED IN PERCENT",
        value:
          format(100 * (elapsed / end_date.diff(start_date, "day")), true) +
          " %",
        bold: true,
      },
    ],
    executed_amount: executed,
    cumulative_amount: c_executed,
    cumulative_planned: c_planned,
    planned: (planned / total_planned) * 100,
    executed: (executed / total_planned) * 100,
    planned_cumulative: (c_planned / total_planned) * 100,
    executed_cumulative: (c_executed / total_planned) * 100,
    total_amount: total_planned,
    boq_executed: getBoqExecuted(project.boqs, date, weekly_reports),
    payment: getPayment(payments, date),

    total_duration: format(end_date.diff(start_date, "d")) + " Calendar Days",
    time_elapsed:
      format((elapsed / end_date.diff(start_date, "d")) * 100, true) +
      `% (${elapsed} days)`,

    // planned_work: 100 * (planned / total_planned),
    // cumulative_planned_work: 100 * (c_planned / total_planned),
    // executed_work: 100 * (executed / total_planned),
    // cumulative_executed_work: 100 * (c_executed / total_planned),
    // this_month_executed: {
    //   month: date.format("MMMM"),
    //   value: format(100 * (executed / planned), true) + " %",
    // },

    construction_status: monthly_report.monthly_construction_status,
    qc: {
      remark: monthly_report.monthly_qc?.remark,
      ...getQC(test_result, date),
    },
    difficulties: {
      table: [
        {
          description: "MATERIAL",
          value: monthly_report.monthly_difficulty?.material ? "Yes" : "No",
        },
        {
          description: "EQUIPMENT",
          value: monthly_report.monthly_difficulty?.equipment ? "Yes" : "No",
        },
        {
          description: "MANPOWER",
          value: monthly_report.monthly_difficulty?.manpower ? "Yes" : "No",
        },
        {
          description: "WEATHER",
          value: monthly_report.monthly_difficulty.weather ? "Yes" : "No",
        },
        {
          description: "OTHER INTERFERENCE",
          value: monthly_report.monthly_difficulty.other_interference
            ? "Yes"
            : "No",
        },
        {
          description: "OTHER",
          value: monthly_report.monthly_difficulty.other ? "Yes" : "No",
        },
      ],
      remark: monthly_report.monthly_difficulty.remark,
    },
    instructions: {
      site_orders: getSiteOrder(site_orders, date),
      remark: monthly_report.monthly_instruction?.remark,
    },
    evaluations: monthly_report.monthly_evaluations,

    variations: monthly_report.monthly_variations,
    claims: monthly_report.monthly_claims,
    meetings: getMeeting(meetings, date),
    progress: getProgressData(weekly_reports, weekly_plans, project, date),

    ...monthly_report,
    prepared_by: monthly_report.monthly_report_prepared_by,
    checked_by: monthly_report.monthly_report_approved_by,
  };
  return data;
};
export const ParsePie = (data: any) => {
  return [
    {
      name: "Planned Work This Month",
      value: toNumber(data.planned_work?.toFixed(2)),
    },
    {
      name: "Planned",
      value: 100 - toNumber(data.planned_work?.toFixed(2)),
    },
  ];
};
export const ParsePie2 = (data: any) => {
  return [
    {
      name: "Planned Work Cumulative",
      value: toNumber(data.cumulative_planned_work?.toFixed(2)),
    },
    {
      name: "Planned",
      value: 100 - toNumber(data.cumulative_planned_work?.toFixed(2)),
    },
  ];
};
export const ParsePie3 = (data: any) => {
  return [
    {
      name: "Executed Work This Month",
      value: toNumber(data.cumulative_executed_work?.toFixed(2)),
    },
    {
      name: "Planned",
      value: 100 - toNumber(data.cumulative_executed_work?.toFixed(2)),
    },
  ];
};
export const ParsePie4 = (data: any) => {
  return [
    {
      name: "Planned Work This Month",
      value: toNumber(data.cumulative_executed_work?.toFixed(2)),
    },
    {
      name: "Planned",
      value: 100 - toNumber(data.executed_work?.toFixed(2)),
    },
  ];
};
export const parseBeforeRegister = (data: MonthlyReport) => {
  let new_data = { ...data };
  let new_variation: any[] = [];
  let new_claim: any[] = [];
  new_data.monthly_variations.forEach((e, index) => {
    if (!(isNil(e.description) || isNil(e.amount))) new_variation.push(e);
  });

  new_data.monthly_claims.forEach((e, index) => {
    if (!(isNil(e.description) || isNil(e.reason) || isNil(e.duration)))
      new_claim.push(e);
  });

  new_data.monthly_variations = new_variation;
  new_data.monthly_claims = new_claim;
  return new_data;
};

export const getBoqExecuted = (
  boqs: Boq[],
  date: Moment,
  weekly_reports: WeekReport[]
) => {
  const parsed: {
    item_no: string;
    description: string;
    unit: string | null;
    unit_price: number | null;
    quantity: number | null;
    previous_quantity: number | null;
    this_month_quantity: number | null;
  }[] = [];

  boqs.forEach((boq) => {
    const { previous_quantity, this_month_quantity } = getBoqUnitPrice(
      boq,
      date,
      weekly_reports
    );

    // console.log(previous_quantity, this_month_quantity, boq.description);

    parsed.push({
      ...boq,
      previous_quantity,
      this_month_quantity,
    });
  });

  return parsed;
};

export const getBoqUnitPrice = (
  boq: Boq,
  date: Moment,
  weekly_reports: WeekReport[]
) => {
  // console.log(
  //   "🚀 ~ file: MonthlyReport.util.ts ~ line 1422 ~ date",
  //   date.format("YYYY-MM-DD"),
  //   moment(weekly_reports[0]?.reporting_week).format("YYYY-MM-DD"),
  //   moment(weekly_reports[0]?.reporting_week).isSameOrBefore(date, "month")
  // );
  let this_month_quantity = 0;
  let previous_quantity = 0;

  weekly_reports.forEach((e) => {
    if (moment(e.reporting_week).isSame(date, "month")) {
      e.description
        .split("---")
        .map((e) => JSON.parse(e))
        .forEach((e) => {
          if (e.activity_desc === boq.description) {
            this_month_quantity += boq.quantity * (e.executed_qty / 100);
          }
        });
    } else if (moment(e.reporting_week).isBefore(date, "month")) {
      e.description
        .split("---")
        .map((e) => JSON.parse(e))
        .forEach((e) => {
          if (e.activity_desc === boq.description) {
            previous_quantity += boq.quantity * (e.executed_qty / 100);
          }
        });
    }
  });

  return { this_month_quantity, previous_quantity };
};

export const getPayment = (payments: Payments[], date: Moment) => {
  let total_advance = 0;
  let payment_this_month = 0;
  let payment_to_date = 0;
  let advance_repayment = 0;
  payments.forEach((payment) => {
    if (moment(payment.date, "DD-MM-YYYY").isSameOrBefore(date, "month")) {
      if (moment(payment.date, "DD-MM-YYYY").isSame(date, "month")) {
        payment_this_month += payment.payment_amount;
        advance_repayment += payment.advance_repaid_amount;
      }
      if (payment.type === "Advance Payment") {
        total_advance = payment.payment_amount;
      }

      payment_to_date += payment.payment_amount;
    }
  });

  return {
    total_advance,
    payment_this_month,
    payment_to_date,
    advance_repayment,
  };
};
