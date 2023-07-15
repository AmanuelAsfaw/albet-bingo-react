import { FC, useRef } from "react";
import { BASE_URI } from "../../../../../../../redux/ApiCall";
import { PrintTestRequestPropType } from "./PrintTestRequest.util";
import { Image, Table, Button } from "antd";
import SignatureComponent from "../../../../../../common/Signature/Signature.component";
import ReactToPrint from "react-to-print";
import { PrinterOutlined } from "@ant-design/icons";
import PdfHeaderComponent from "../../../../../../common/PdfHeader/PdfHeader.component";

const PrintTestRequestComponent: FC<PrintTestRequestPropType> = ({
  project,
  test_request,
}) => {
  const componentRef = useRef(null);
  return (
    <div>
      <ReactToPrint
        trigger={() => <Button type="text">Print</Button>}
        content={() => componentRef.current}
      />
      <div style={{ alignItems: "center", display: "none" }}>
        <div ref={componentRef}>
          <div className="col-lg-12 ml-4 mr-4">
            <PdfHeaderComponent type="consultant" />
            <div className="mb-2 text-center">
              <h4>REQUEST FOR MATERIAL TESTING</h4>
            </div>

            <div className="row mt-4">
              <div className="col-sm-6">
                <h6 style={{ fontSize: 14 }} className="mb-3">
                  <b>PROJECT:</b> {project.payload?.name}
                </h6>
                <h6 style={{ fontSize: 14 }}>
                  <b>SITE:</b> {project?.payload.location}
                </h6>
                <h6 style={{ fontSize: 14 }}>
                  <b>EMPLOYER:</b> {project.payload?.client?.name}
                </h6>
                <h6 style={{ fontSize: 14 }}>
                  <b>CONTRACTOR:</b> {project.payload?.contractor?.name}
                </h6>
                <h6 style={{ fontSize: 14 }}>
                  <b>SUPERVISOR:</b> {test_request?.er_approved_by.full_name}
                </h6>
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-md-12">
                <Table
                  pagination={false}
                  dataSource={test_request?.test_request_items}
                  columns={[
                    {
                      title: "Material",
                      dataIndex: "material",
                    },
                    {
                      title: "Description",
                      dataIndex: "description",
                    },
                  ]}
                />
              </div>
            </div>

            <div className="row mt-5">
              <div className="col-4">
                <h6>Test Requested By</h6>
                <p style={{ fontSize: "16px" }}>
                  <b>Name</b> {test_request?.er_test_requested_by.full_name}
                </p>
                <p style={{ fontSize: "16px" }}>
                  <b>DATE</b> {test_request?.date}
                </p>
              </div>

              <div className="col-4">
                <h6>Approved By</h6>

                {test_request?.is_approved ? (
                  <>
                    <p style={{ fontSize: "16px" }}>
                      <b>Name</b> {test_request?.er_approved_by.full_name}
                    </p>
                    <p style={{ fontSize: "16px" }}>
                      <b>Signature</b>{" "}
                      <SignatureComponent user={test_request?.er_approved_by} />
                    </p>
                    <p style={{ fontSize: "16px" }}>
                      <b>Date</b> {test_request?.authorize_date}
                    </p>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrintTestRequestComponent;
