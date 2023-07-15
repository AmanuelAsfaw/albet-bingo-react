import axios from "axios";
import { API_BASE_URI } from "../../../../redux/ApiCall";
import { WeeklyReport } from "../../../../redux/Report/WeeklyReport/WeeklyReport.type";
import { User } from "../../../../redux/User/User.type";
import { ApiCallState } from "../../../../redux/Utils";
import { Project } from "../../../../redux/Project/Project.type";
import moment from "moment";

export type WeeklySiteReportsPropType = {
  weekly_site_reports: ApiCallState<WeeklyReport[]>;
  fetchAllWeeklyReports: Function;
  fetchUsers: Function;
  users: ApiCallState<User[]>;
  projects: ApiCallState<Project[]>;
  fetchAllProjects: Function;
  tab: any;
};

export type AddWeeklySiteReportPropType = {
  fetchUsers: Function;
  users: ApiCallState<User[]>;
  fetchAllWeeklyReports: Function;
  tasks: WeeklyReport[];
  projects: ApiCallState<Project[]>;
  fetchAllProjects: Function;
  project: any;
};

export type EditWeeklySiteReportPropType = {
  fetchUsers: Function;
  users: ApiCallState<User[]>;
  weekly_site_report_id: number;
  fetchAllWeeklyReports: Function;
  fetchOneWeeklyReport: Function;
  weekly_site_report: ApiCallState<WeeklyReport>;
  projects: ApiCallState<Project[]>;
  fetchAllProjects: Function;
};

export type ViewWeeklySiteReportPropType = {
  id: number;
  fetchOneWeeklySiteReport: Function;
  weekly_report: ApiCallState<WeeklyReport>;
  // fetchUsers: Function;
  // users: ApiCallState<User[]>;
};

export type ReportWeeklySiteReportPropType = {
  id: number;
  fetchOneWeeklyReport: Function;
  weekly_report: ApiCallState<WeeklyReport>;
  fetchAllWeeklyReports: Function;
  fetchUsers: Function;
  users: ApiCallState<User[]>;
};

export type StatusWeeklySiteReportPropType = {
  week: string;
  reportDetaillist_data: any;
};

export type RemarkPropType = {
  remarkData: any;
  users: User[];
  fetchAllTask: Function;
};

export const showUploadLists = {
  showRemoveIcon: false,
};

export const progressBar = {
  strokeColor: {
    "0%": "#108ee9",
    "100%": "#87d068",
  },
  strokeWidth: 3,
  format: (percent: any) => percent && `${parseFloat(percent.toFixed(2))}%`,
};

export const sendData = (data: any) =>
  axios.post(API_BASE_URI + "/weekly-site-report", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const sendUpdateData = (data: any) =>
  axios.put(API_BASE_URI + "/weekly-site-report", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const updateSeen = (data: any) =>
  axios.post(API_BASE_URI + "/weekly-site-report/seen", data);

export const deleteData = (id: any) =>
  axios.delete(API_BASE_URI + `/weekly-site-report/${id}`);

export const deleteWeeklyReportDetailData = (id: any) =>
  axios.delete(
    API_BASE_URI + `/weekly-site-report/weekly-site-report-detail/${id}`
  );

export const sendRemark = (data: any) =>
  axios.post(API_BASE_URI + "/task-remark", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const reportWeeklyReport = (data: any) =>
  axios.put(API_BASE_URI + "/weekly-site-report/report-task", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const Download = (id: any) =>
  axios.get(API_BASE_URI + `/weekly-site-report-detail/download/${id}`, {
    responseType: "blob",
  });

export const remarkFileDownload = (id: any) =>
  axios.get(API_BASE_URI + `/task-remark/download/${id}`, {
    responseType: "blob",
  });

export const RemarkDownloadFile = (documents: any) => {
  remarkFileDownload(documents.id)
    .then((response) => {
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        // IE variant
        window.navigator.msSaveOrOpenBlob(
          new Blob([response.data], {
            type: response.headers["content-type"],
          }),
          documents.url?.split("-")[1]
        );
      } else {
        const url = window.URL.createObjectURL(
          new Blob([response.data], {
            type: response.headers["content-type"],
          })
        );
        const link = document.createElement("a");
        link.href = url;
        link.target = "_blank";
        link.setAttribute(
          "download",
          documents.url
            ?.split("-")
            ?.filter((e: any, index: number) => index > 0)
            ?.join("-")
        );
        document.body.appendChild(link);
        link.click();
        link?.parentNode?.removeChild(link);
      }
    })
    .catch((error) => {
      // OpenNotification(
      //   NotificationType.ERROR,
      //   Message.DOCUMENT_DOWNLOAD_FAILED,
      //   ""
      // );
    });
};
export const getUsers = (data: number[], users: User[]) => {
  let user_ids = data;
  let found: User[] = [];

  if (data)
    users.forEach((e) => {
      user_ids.forEach((id) => {
        if (id === e.id) found.push(e);
      });
    });

  return found;
};

export const DownloadFile = (documents: any) => {
  Download(documents.id)
    .then((response) => {
      console.log(documents.photo?.split("-")[1]);
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        // IE variant
        window.navigator.msSaveOrOpenBlob(
          new Blob([response.data], {
            type: response.headers["content-type"],
          }),
          documents.photo?.split("-")[1]
        );
      } else {
        const url = window.URL.createObjectURL(
          new Blob([response.data], {
            type: response.headers["content-type"],
          })
        );
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute(
          "download",
          documents.photo
            ?.split("-")
            ?.filter((e: any, index: any) => index > 0)
            ?.join("-")
        );
        link.target = "_blank";
        document.body.appendChild(link);
        link.click();
        link?.parentNode?.removeChild(link);
      }
    })
    .catch((error) => {
      // OpenNotification(
      //   NotificationType.ERROR,
      //   Message.DOCUMENT_DOWNLOAD_FAILED,
      //   ""
      // );
    });
};

export const parseData = (remark: WeeklyReport, user_id: number) => {
  let counter = 0;
  return { counter };
  // let user = remark.users.find((e: any) => e.id === user_id);
  // if (user) {
  //   let last_seen = user?.["user_task"].last_seen;
  //   remark.task_remarks.forEach((e) => {
  //     if (!moment(last_seen).isSameOrAfter(moment(e.createdAt), "minute"))
  //       counter += 1;
  //   });
  // } else {
  //   remark.task_remarks.forEach((e) => {
  //     counter += 1;
  //   });
  // }
  return { counter };
};
