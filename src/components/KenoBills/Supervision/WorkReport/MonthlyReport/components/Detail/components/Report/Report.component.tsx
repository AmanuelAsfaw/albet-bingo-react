import moment from "moment";
import { FC } from "react";
import { MonthlyDetailItemsPropType } from "../../../../util/MonthlyReport.util";

const ReportComponent: FC<MonthlyDetailItemsPropType> = ({ data }) => {
  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <h6 style={{ fontSize: "18px" }}>
            <b>Report No:</b> {data?.index}
          </h6>
        </div>
        <div className="col-md-12">
          <h6 style={{ fontSize: "18px" }}>
            <b>Month: </b>
            {moment(data?.date).format("MMMM-YYYY")}
          </h6>
        </div>
        <div className="col-md-12">
          <h6 style={{ fontSize: "18px" }}>
            <b>Date of Report: </b>
            {moment(data?.createdAt).format("YYYY-MM-DD")}
          </h6>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <h6 style={{ fontSize: "18px" }}>
            <b>Project: </b>
            {data?.project?.name}
          </h6>
        </div>
        <div className="col-md-12">
          <h6 style={{ fontSize: "18px" }}>
            <b>Employer: </b>
            {data?.project?.client?.name}
          </h6>
        </div>
        <div className="col-md-12">
          <h6 style={{ fontSize: "18px" }}>
            <b>Consultant: </b>
            {data?.project?.consultant?.name}
          </h6>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <h6 style={{ fontSize: "18px" }}>
            <b>Contactor: </b>
            {data?.project?.contractor?.name}
          </h6>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <h6 style={{ fontSize: "18px" }}>
            <b>Location: </b>
            {data?.project?.location}
          </h6>
        </div>
      </div>
    </>
  );
};

export default ReportComponent;
