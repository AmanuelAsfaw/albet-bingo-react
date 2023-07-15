import axios from "axios";
import { API_BASE_URI } from "../../../../redux/ApiCall";
import { Task } from "../../../../redux/Task/Task.type";
import { User } from "../../../../redux/User/User.type";
import { ApiCallState } from "../../../../redux/Utils";
import { Project } from "../../../../redux/Project/Project.type";
import moment from "moment";

export type TasksPropType = {
  tasks: ApiCallState<Task[]>;
  fetchAllTasks: Function;
  fetchUsers: Function;
  users: ApiCallState<User[]>;
  projects: ApiCallState<Project[]>;
  fetchAllProjects: Function;
};

export type AddTaskPropType = {
  fetchUsers: Function;
  users: ApiCallState<User[]>;
  fetchAllTasks: Function;
  tasks: Task[];
  projects: ApiCallState<Project[]>;
  fetchAllProjects: Function;
};

export type EditTaskPropType = {
  fetchUsers: Function;
  users: ApiCallState<User[]>;
  task_id: number;
  fetchAllTasks: Function;
  fetchOneTask: Function;
  task: ApiCallState<Task>;
  projects: ApiCallState<Project[]>;
  fetchAllProjects: Function;
};

export type ViewTaskPropType = {
  id: number;
  fetchOneTask: Function;
  task: ApiCallState<Task>;
  fetchUsers: Function;
  users: ApiCallState<User[]>;
};

export type ReportTaskPropType = {
  id: number;
  fetchOneTask: Function;
  task: ApiCallState<Task>;
  fetchAllTasks: Function;
  fetchUsers: Function;
  users: ApiCallState<User[]>;
};

export type StatusTaskPropType = {
  due_date: string;
  checklist_data: any;
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
  axios.post(API_BASE_URI + "/task", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const updateSeen = (data: any) =>
  axios.post(API_BASE_URI + "/task/seen", data);

export const deleteData = (id: any) =>
  axios.delete(API_BASE_URI + `/task/${id}`);

export const deleteTaskDetailData = (id: any) =>
  axios.delete(API_BASE_URI + `/task/task-detail/${id}`);

export const sendRemark = (data: any) =>
  axios.post(API_BASE_URI + "/task-remark", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const reportTask = (data: any) =>
  axios.put(API_BASE_URI + "/task/report-task", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const Download = (id: any) =>
  axios.get(API_BASE_URI + `/task/download/${id}`, {
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
      console.log(documents.url?.split("-")[1]);
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
        link.setAttribute(
          "download",
          documents.url
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

export const parseData = (remark: Task, user_id: number) => {
  let counter = 0;
  // let user = remark.users.find((e: any) => e.id === user_id);
  let user = [].find((e: any) => e.id === user_id);
  if (user) {
    // let last_seen = user?.["user_task"]?.last_seen;
    [].forEach((e) => {
      if (!moment("2202-2-1").isSameOrAfter(moment("2202-2-1"), "minute"))
        counter += 1;
    });
  } else {
    [].forEach((e) => {
      counter += 1;
    });
  }
  return { counter };
};
