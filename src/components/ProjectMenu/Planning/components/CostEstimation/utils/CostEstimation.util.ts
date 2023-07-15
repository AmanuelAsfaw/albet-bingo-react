import axios from "axios";
import { API_BASE_URI } from "../../../../../../redux/ApiCall";
import { CostEstimation } from "../../../../../../redux/CostEstimation/CostEstimation.type";
import { User } from "../../../../../../redux/User/User.type";
import { ApiCallState } from "../../../../../../redux/Utils";

export type CostEstimationPropType = {
    cost_estimation: ApiCallState<CostEstimation[]>;
    fetchCostEstimation: Function;
};

export type AddCostEstimationPropType = {
    fetchCostEstimation: Function;
};

export type EditCostEstimationPropType = {
    cost_estimation: CostEstimation;
    fetchCostEstimation: Function;
}

export type ShareCostEstimationPropType = {
    fetchCostEstimation: Function;
    fetchAllUser: Function;
    users: ApiCallState<User[]>;
    cost_estimation: CostEstimation;
};


export const sendData = (data: any) =>
    axios.post(API_BASE_URI + "/cost-estimation", data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

export const deleteData = (id: any) =>
    axios.delete(API_BASE_URI + `/cost-estimation/${id}`);

    export const PUT_STATUS = (data: any) =>
    axios.put(API_BASE_URI + "/cost-estimation-status", data);

export const DELETE_STATUS = (id: number) =>
    axios.delete(API_BASE_URI + `/cost-estimation-status/${id}`);

export const POST_STATUS = (data: any) =>
    axios.post(API_BASE_URI + "/cost-estimation-status", data);


