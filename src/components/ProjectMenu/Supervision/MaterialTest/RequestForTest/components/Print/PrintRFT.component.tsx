import { FC, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { fetchAllUser } from "../../../../../../../redux/User/User.action";
import { PrintRFTPropType } from "../../util/RequestForTest.util";
import ReactToPrint from "react-to-print";
import { PrinterOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Input, Row } from "antd";
import PdfHeaderComponent from "../../../../../../common/PdfHeader/PdfHeader.component";
import { BASE_URI } from "../../../../../../../redux/ApiCall";

const PrintRFTComponent: FC<PrintRFTPropType> = ({
  request_for_test,
  project,
  users,
  fetchUsers,
}) => {
  const componentRef = useRef(null);
  const { TextArea } = Input;

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers, request_for_test]);

  return (
    <div>
      <ReactToPrint
        trigger={() => <Button type="text">Print</Button>}
        content={() => componentRef.current}
      />
      <div className="visible-print">
        <div style={{ paddingTop: "20px" }} ref={componentRef}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <h1 style={{ flex: 2, width: "80px", textAlign: "center" }}>
              Requisition for Material Test
            </h1>
            <div
              style={{
                borderLeft: "2px solid black",
                paddingLeft: "10px",
                flex: 1,
              }}
            >
              <PdfHeaderComponent type="consultant" />
              <h6>Addis Ababa, Ethiopia</h6>
              <h6>Tel. +251 930 07 76 03, +251 118 96 58 04</h6>
              <h6>Fax. +251 116 620364</h6>
              <h6>www.acute.com</h6>
              <h6>Email: info@acute.com</h6>
              <h6
                style={{
                  color: "red",
                  fontWeight: "bold",
                  fontStyle: "italic",
                  textAlign: "center",
                }}
              >
                Avails Professional Excellence
              </h6>
            </div>
          </div>

          <div className="row mt-4 mx-2" style={{ outline: "2px solid" }}>
            <div className="col-lg-6">
              <div>
                <b>Project - </b>
                <u>{project?.payload.name ?? "Not Specified"}</u>
              </div>
              <div>
                <b>Client - </b>
                <u>{project.payload?.client?.name ?? "Not Specified"}</u>
              </div>
              <div>
                <b>Consultant - </b>
                <u>{project.payload?.consultant?.name ?? "Not Specified"}</u>
              </div>
              <div>
                <b>Contractor - </b>
                <u>{project.payload?.contractor?.name ?? "Not Specified"}</u>
              </div>
              <div>
                <b>Trade - </b>
                <u>{request_for_test?.trade ?? "Not Specified"}</u>
              </div>
              <div>
                <b>Spec. ref - </b>
                <u>{request_for_test?.spec_ref ?? "Not Specified"}</u>
              </div>
            </div>
            <div className="col-lg-6 text-right">
              <div>
                <b>Format No - </b>
                <u>{request_for_test?.format_no ?? "Not Specified"}</u>
              </div>
              <div>
                <b>Date - </b>
                <u>{request_for_test?.date ?? "Not Specified"}</u>
              </div>
              <div>
                <b>Block - </b>
                <u>{request_for_test?.block ?? "Not Specified"}</u>
              </div>
              <div>
                <b>Test No - </b>
                <u>{request_for_test?.test_no ?? "Not Specified"}</u>
              </div>
              <div>
                <b>Axis - </b>
                <u>{request_for_test?.axis ?? "Not Specified"}</u>
              </div>
              <div>
                <b>Drawing ref - </b>
                <u>{request_for_test?.drawing_ref ?? "Not Specified"}</u>
              </div>
            </div>
          </div>

          <h6
            className="font-italic mt-2"
            style={{ fontWeight: "bold", fontSize: "16px" }}
          >
            Test Required:{" "}
          </h6>
          <div className="row mx-2 mt-4" style={{ outline: "2px solid" }}>
            <div className="col-lg-12">
              <TextArea
                value={request_for_test.test_required}
                autoSize={{ minRows: 4, maxRows: 6 }}
              />
            </div>
          </div>
          <h6
            className="font-italic mt-2"
            style={{ fontWeight: "bold", fontSize: "16px" }}
          >
            Test Required By:{" "}
          </h6>
          <div className="row mt-4 mx-2" style={{ outline: "2px solid" }}>
            <div className="col-lg-6">
              <div>
                <b>Name - </b>
                <u>
                  {users.payload.find(
                    (e) => e.id === request_for_test?.test_required_by
                  )?.full_name ?? "Not Specified"}
                </u>
              </div>
              <div>
                <b>Title - </b>
                <u>
                  {users.payload.find(
                    (e) => e.id === request_for_test?.test_required_by
                  )?.role ?? "Not Specified"}
                </u>
              </div>
            </div>
            <div className="col-lg-6 text-right">
              <div>
                <b>Signature and Seal - </b>
                <img
                  src={
                    BASE_URI +
                    "/" +
                    users.payload.find(
                      (e) => e.id === request_for_test?.test_required_by
                    )?.signature?.signature_url
                  }
                  style={{ width: "100px" }}
                  alt="Signature"
                />
              </div>
              <div>
                <b>Date - </b>
                <u>{request_for_test?.date ?? "Not Specified"}</u>
              </div>
            </div>
          </div>
          <h6
            className="font-italic mt-2"
            style={{ fontWeight: "bold", fontSize: "16px" }}
          >
            Test Received By:{" "}
          </h6>
          <div className="row mt-4 mx-2" style={{ outline: "2px solid" }}>
            <div className="col-lg-6">
              <div>
                <b>Name - </b>
                <u>
                  {users.payload.find(
                    (e) => e.id === request_for_test?.test_received_by
                  )?.full_name ?? "Not Specified"}
                </u>
              </div>
              <div>
                <b>Title - </b>
                <u>
                  {users.payload.find(
                    (e) => e.id === request_for_test?.test_received_by
                  )?.role ?? "Not Specified"}
                </u>
              </div>
            </div>
            <div className="col-lg-6 text-right">
              <div>
                <b>Signature and Seal - </b>
                <img
                  src={
                    BASE_URI +
                    "/" +
                    users.payload.find(
                      (e) => e.id === request_for_test?.test_received_by
                    )?.signature?.signature_url
                  }
                  style={{ width: "100px" }}
                  alt="Signature"
                />
              </div>
              <div>
                <b>Date - </b>
                <u>{request_for_test?.date ?? "Not Specified"}</u>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Map State to Props
 *
 * @param state
 */
const mapStateToProps = (state: any) => ({
  project: state.project.fetchOne,
  users: state.user.fetchAll,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchUsers: () => dispatch(fetchAllUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PrintRFTComponent);
