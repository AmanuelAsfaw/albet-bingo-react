import { Table, Input } from "antd";
import moment from "moment";
import { FC } from "react";
import PdfHeaderComponent from "../../../../../common/PdfHeader/PdfHeader.component";
import SignatureComponent from "../../../../../common/Signature/Signature.component";
import CheckboxComponent from "./component/CheckboxGroupComponent.component";
import { PrintInspectionPropType } from "./PrintInspection.util";
import { isNil } from "lodash";

const PrintInspectionComponent: FC<PrintInspectionPropType> = ({
  inspection,
  project,
}) => {
  const MarkHeader = () => (
    <div className="pl-5">
      <p className="">Make a (√)</p>
      <div className="row" style={{ width: 200 }}>
        <div className="mr-4">
          <h6>C</h6>
        </div>
        <div className="mr-4">
          <h6>NC</h6>
        </div>
        <div className="mr-4">
          <h6>NA</h6>
        </div>
      </div>
    </div>
  );

  return (
    <div className="col-lg-12 visible-print">
      <PdfHeaderComponent type="consultant" />

      <div className="mb-2 text-center">
        <h4>CHECK LIST FOR WORK PERMIT</h4>
      </div>

      <div className="row mt-5">
        <div className="col-sm-6">
          <h5>
            <b>Project:</b> {project.payload?.name}
          </h5>
          <h5>
            <b>Employer:</b> {project.payload?.client?.name}
          </h5>
          <h5>
            <b>Contractor:</b> {project.payload?.contractor?.name}
          </h5>
          <h5>
            <b>Consultant:</b> {project.payload?.consultant?.name}
          </h5>
          <h5>
            <b>Location:</b> {inspection?.location}
          </h5>
          <h5>
            <b>Block : Axis</b> {inspection?.block}
          </h5>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-8">
          <Table
            pagination={false}
            size="small"
            dataSource={inspection?.inspection_items.map((item, index) => {
              return {
                ...item,
                key: index,
              };
            })}
            columns={[
              {
                title: <h4>{inspection?.name}</h4>,
                render: (value, record: any) =>
                  !record.is_subtitle ? (
                    record.description
                  ) : (
                    <b>{record.description}</b>
                  ),
                width: 1000,
              },
              {
                title: MarkHeader(),
                render: (value, record: any) =>
                  !record.is_subtitle ? (
                    <CheckboxComponent value={record.value} />
                  ) : null,
              },
            ]}
          />
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-md-8">
          <h5>Any other Remarks</h5>
          <Input.TextArea rows={7} value={inspection?.remark} />
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-md-8">
          <p style={{ fontSize: "18px" }}>
            For the above items are fullfilled{" "}
            <input
              type="checkbox"
              className="m-1"
              checked={
                !isNil(inspection?.is_fullfilled)
                  ? inspection?.is_fullfilled
                  : false
              }
            />{" "}
            / not fullfilled{" "}
            <input
              type="checkbox"
              className="m-1"
              checked={
                !isNil(inspection?.is_fullfilled)
                  ? !inspection?.is_fullfilled
                  : false
              }
            />
            , the contractor is hereby allowed
            <input
              type="checkbox"
              className="m-1"
              checked={
                !isNil(inspection?.is_allowed) ? inspection?.is_allowed : false
              }
            />{" "}
            / refused
            <input
              type="checkbox"
              className="m-1"
              checked={
                !isNil(inspection?.is_allowed) ? !inspection?.is_allowed : false
              }
            />
            to proceed to the next work.
          </p>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-md-6">
          <p className="font-weight-bold">For the Engineer or Consultant:-</p>
          <p>
            <b>Name</b> {inspection?.consultant?.full_name}
          </p>
          <p style={{ fontSize: "16px" }}>
            <b>Signature</b>{" "}
            <SignatureComponent user={inspection?.consultant} />
          </p>
          <p style={{ fontSize: "16px" }}>
            <b>Date</b> {moment(inspection?.createdAt).format("DD/MM/YYYY")}
          </p>
        </div>

        <div className="col-md-6">
          <p className="font-weight-bold">For the Contractor:-</p>
          {inspection?.is_allowed !== null ? (
            <>
              <p>
                <b>Name</b> {inspection?.contractor?.full_name}
              </p>
              <p style={{ fontSize: "16px" }}>
                <b>Signature</b>{" "}
                <SignatureComponent user={inspection?.contractor} />
              </p>
              <p>
                <b>Date</b> {moment(inspection?.updatedAt).format("DD/MM/YYYY")}
              </p>
            </>
          ) : (
            "-"
          )}
        </div>
      </div>
    </div>
  );
};

export default PrintInspectionComponent;
