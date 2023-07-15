import axios from "axios";
import { API_BASE_URI } from "../../../../../../redux/ApiCall";
import { TenderDocument } from "../../../../../../redux/Tenderdocument/TenderDocument.type";
import { ApiCallState } from "../../../../../../redux/Utils";

export type TenderDocumentPropType = {
    tender_document: ApiCallState<TenderDocument[]>;
    fetchTenderDocument: Function;
};

export type AddTenderDocumentPropType = {
    fetchTenderDocument: Function;
};

export type EditTenderDocumentPropType = {
    tender_document: TenderDocument;
    fetchTenderDocument: Function;
}



export const sendData = (data: any) =>
    axios.post(API_BASE_URI + "/tender-document", data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

export const deleteData = (id: any) =>
    axios.delete(API_BASE_URI + `/tender-document/${id}`);

export const PUT_STATUS = (data: any) =>
    axios.put(API_BASE_URI + "/tender-document-status", data);

export const DELETE_STATUS = (id: number) =>
    axios.delete(API_BASE_URI + `/tender-document-status/${id}`);

export const POST_STATUS = (data: any) =>
    axios.post(API_BASE_URI + "/tender-document-status", data);
