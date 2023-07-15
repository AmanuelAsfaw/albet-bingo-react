import axios from "axios";
import { API_BASE_URI } from "../../../../../../redux/ApiCall";
import { EmployerRequirement } from "../../../../../../redux/EmployerRequirement/EmployerRequirement.type";
import { ApiCallState } from "../../../../../../redux/Utils";

export type EmployerRequirementPropType = {
    employer_requirement: ApiCallState<EmployerRequirement[]>;
    fetchEmployerRequirement: Function;
};

export type AddEmployerRequirementPropType = {
    fetchEmployerRequirement: Function;
};

export type EditEmployerRequirementPropType = {
    employer_requirement: EmployerRequirement;
    fetchEmployerRequirement: Function;
}



export const sendData = (data: any) =>
    axios.post(API_BASE_URI + "/employer-requirement", data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

export const deleteData = (id: any) =>
    axios.delete(API_BASE_URI + `/employer-requirement/${id}`);

export const PUT_STATUS = (data: any) =>
    axios.put(API_BASE_URI + "/employer-requirement-status", data);

export const DELETE_STATUS = (id: number) =>
    axios.delete(API_BASE_URI + `/employer-requirement-status/${id}`);

export const POST_STATUS = (data: any) =>
    axios.post(API_BASE_URI + "/employer-requirement-status", data);

