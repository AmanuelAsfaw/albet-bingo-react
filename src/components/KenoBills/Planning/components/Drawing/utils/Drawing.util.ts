import axios from "axios";
import { API_BASE_URI } from "../../../../../../redux/ApiCall";
import { Drawing } from "../../../../../../redux/Drawing/Drawing.type";
import { User } from "../../../../../../redux/User/User.type";
import { ApiCallState } from "../../../../../../redux/Utils";

export type DrawingPropType = {
    drawing: ApiCallState<Drawing[]>;
    fetchDrawing: Function;
};

export type AddDrawingPropType = {
    fetchDrawing: Function;
};

export type EditDrawingPropType = {
    drawing: Drawing;
    fetchDrawing: Function;
}

export type ShareDrawingPropType = {
    fetchDrawing: Function;
    fetchAllUser: Function;
    users: ApiCallState<User[]>;
    drawing: Drawing;
};


export const sendData = (data: any) =>
    axios.post(API_BASE_URI + "/drawing", data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

export const deleteData = (id: any) =>
    axios.delete(API_BASE_URI + `/drawing/${id}`);

export const PUT_STATUS = (data: any) =>
    axios.put(API_BASE_URI + "/drawing-status", data);

export const DELETE_STATUS = (id: number) =>
    axios.delete(API_BASE_URI + `/drawing-status/${id}`);

export const POST_STATUS = (data: any) =>
    axios.post(API_BASE_URI + "/drawing-status", data);

