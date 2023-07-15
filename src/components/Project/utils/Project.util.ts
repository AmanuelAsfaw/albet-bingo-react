import axios from "axios";
import { API_BASE_URI } from "../../../redux/ApiCall";
import { Project } from "../../../redux/Project/Project.type";
import { ApiCallState } from "../../../redux/Utils";

export type ProjectPropType = {
  projects: ApiCallState<Project[]>;
  fetchProjects: Function;
};

export type AddProjectPropType = {
  fetchProjects: Function;
  projects: ApiCallState<Project[]>;
};

export const sendData = (data: any) =>
  axios.post(API_BASE_URI + "/project", data);

export const displaySize = (data: Project) => {
  switch (data.type) {
    case "Building":
      if (data.basement_size > 1)
        return data.basement_size + "B+G+" + data.floor_size;
      else if (data.basement_size === 1) return "B+G+" + data.floor_size;
      else return "G+" + data.floor_size;
    case "Road":
      return data.road_size + " Km";
    case "Mixed":
      return "Mixed";
    case "Water":
      return data.custom_size;
    case "Industry":
      return data.custom_size;
    default:
      return data.basement_size + "B+G+" + data.floor_size;
  }
};
