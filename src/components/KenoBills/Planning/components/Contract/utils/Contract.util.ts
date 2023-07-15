import axios from "axios";
import { API_BASE_URI } from "../../../../../../redux/ApiCall";
import { Contract } from "../../../../../../redux/Contract/Contract.type";
import { User } from "../../../../../../redux/User/User.type";
import { ApiCallState } from "../../../../../../redux/Utils";

export type ContractPropType = {
    contract: ApiCallState<Contract[]>;
    fetchContract: Function;
};

export type AddContractPropType = {
    fetchContract: Function;
};

export type EditContractPropType = {
    contract: Contract;
    fetchContract: Function;
}

export type ShareContractPropType = {
    fetchContract: Function;
    fetchAllUser: Function;
    users: ApiCallState<User[]>;
    contract: Contract;
};


export const sendData = (data: any) =>
    axios.post(API_BASE_URI + "/contract", data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
export const deleteData = (id: any) =>
    axios.delete(API_BASE_URI + `/contract/${id}`);



export const PUT_STATUS = (data: any) =>
    axios.put(API_BASE_URI + "/contract-status", data);

export const DELETE_STATUS = (id: number) =>
    axios.delete(API_BASE_URI + `/contract-status/${id}`);

export const POST_STATUS = (data: any) =>
    axios.post(API_BASE_URI + "/contract-status", data);

