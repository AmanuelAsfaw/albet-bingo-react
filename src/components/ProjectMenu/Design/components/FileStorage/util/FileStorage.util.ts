import axios from "axios";
import { API_BASE_URI } from "../../../../../../redux/ApiCall";
import { FileStorage } from "../../../../../../redux/FileStorage/FileStorage.type";
import { Project } from "../../../../../../redux/Project/Project.type";
import { ApiCallState } from "../../../../../../redux/Utils";

export type FileStoragePropType = {
  module: string;

  fetchAllStructuralFileStorage: Function;
  fetchAllArchitectureFileStorage: Function;
  fetchAllPlumbingFileStorage: Function;
  fetchAllMechanicalFileStorage: Function;
  fetchAllElectricalFileStorage: Function;
  fetchAllFireFightingFileStorage: Function;
  fetchAllSpecialSystemFileStorage: Function;
  fetchAllSanitaryFileStorage: Function;
  structuralFileStorages: ApiCallState<FileStorage[]>;
  architectureFileStorages: ApiCallState<FileStorage[]>;
  plumbingFileStorages: ApiCallState<FileStorage[]>;
  mechanicalFileStorages: ApiCallState<FileStorage[]>;
  electricalFileStorages: ApiCallState<FileStorage[]>;
  fireFightingFileStorages: ApiCallState<FileStorage[]>;
  specialSystemFileStorages: ApiCallState<FileStorage[]>;
  sanitaryFileStorages: ApiCallState<FileStorage[]>;

  project: ApiCallState<Project>;
};

export const deleteData = (id: number) =>
  axios.delete(API_BASE_URI + "/file-storage/" + id);
