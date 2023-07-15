import { Button, Checkbox, Input, Divider, Row, Col } from "antd";
import { FC, useRef, useEffect } from "react";
import { connect } from "react-redux";
import { PrintWorkPermitPropType } from "../../util/WorkPermit.util";
import ReactToPrint from "react-to-print";
import { PrinterOutlined } from "@ant-design/icons";
import PdfHeaderComponent from "../../../../../../common/PdfHeader/PdfHeader.component";
import { fetchAllUser } from "../../../../../../../redux/User/User.action";

const PrintWorkPermitComponent: FC<PrintWorkPermitPropType> = ({
  work_permit,
  project,
  users,
  fetchUsers,
}) => {
  const componentRef = useRef(null);
  const { TextArea } = Input;

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <div>
      <ReactToPrint
        trigger={() => <Button type="text">Print</Button>}
        content={() => componentRef.current}
      />
      <div style={{ display: "none" }}>
        <div style={{ paddingTop: "20px" }} ref={componentRef}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <div style={{ flex: 1 }}>
              <PdfHeaderComponent type="consultant" />
            </div>
            <span style={{ flex: 2 }}>
              CONTRACTOR'S WORK PERMIT REQUEST REPORT
            </span>
          </div>
          <Divider />
          <Row>
            <Col span={12}>
              <Input value={"Project: " + project.payload?.name} />
            </Col>
            <Col span={12}>
              <Input value={"Format No: " + work_permit.format_no} />
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Input value={"Client: " + project.payload?.client?.name} />
            </Col>
            <Col span={12}>
              <Input value={"Date: " + work_permit.date} />
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Input
                value={"Consultant: " + project.payload?.consultant?.name}
              />
            </Col>
            <Col span={12}>
              <Input value={"Block: " + work_permit.block} />
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Input value={"MSE :" + work_permit.mse} />{" "}
            </Col>
            <Col span={12}>
              <Input value={"Work Permit No: " + work_permit.work_permit_no} />
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Input value={"Trade: " + work_permit.trade} />{" "}
            </Col>
            <Col span={12}>
              <Input value={"Axis: " + work_permit.axis} />
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Input value={"Spec.ref: " + work_permit.spec_ref} />{" "}
            </Col>
            <Col span={12}>
              <Input value={"Drawing ref: " + work_permit.spec_ref} />
            </Col>
          </Row>
          <Divider />
          <Row>
            <Col span={24}>
              Activity Requested:{" "}
              <TextArea
                value={work_permit.activity_requested}
                autoSize={{ minRows: 4, maxRows: 6 }}
              />{" "}
            </Col>
          </Row>
          <Divider />
          <div style={{ paddingTop: "10px", paddingBottom: "10px" }}>
            <span>Submitted By:</span>
          </div>
          <Row>
            <Col span={12}>
              <Input
                value={
                  " Name: " +
                  users.payload.find((e) => e.id === work_permit.submitted_name)
                    ?.full_name
                }
              />{" "}
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Input
                value={
                  "Title: " +
                  users.payload.find((e) => e.id === work_permit.submitted_name)
                    ?.role
                }
              />{" "}
            </Col>
            <Col span={12}>
              <Input value={"Date: " + work_permit.submitted_date} />
            </Col>
          </Row>
          <Divider />
          <div style={{ paddingTop: "10px", paddingBottom: "10px" }}>
            <span>Received By:</span>
          </div>
          <Row>
            <Col span={12}>
              <Input
                value={
                  "Name: " +
                  users.payload.find((e) => e.id === work_permit.received_name)
                    ?.full_name
                }
              />
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Input
                value={
                  "Title: " +
                  users.payload.find((e) => e.id === work_permit.received_name)
                    ?.role
                }
              />{" "}
            </Col>
            <Col span={12}>
              <Input
                value={
                  work_permit.received_date
                    ? "Date: " + work_permit.received_date
                    : "Date: "
                }
              />
            </Col>
          </Row>
          <Divider />
          <div style={{ paddingTop: "10px", paddingBottom: "10px" }}>
            <span>For Consultants use only:</span>
          </div>
          <Row>
            <Col span={12}>
              <Checkbox checked={work_permit.allowed_to_proceed}>
                Allowed to proceed
              </Checkbox>
            </Col>
            <Col span={12}>
              <Checkbox checked={work_permit.refused_to_proceed}>
                Refused to proceed
              </Checkbox>
            </Col>
          </Row>
          <Divider />
          <Row>
            <Col span={24}>
              Comments if any:{" "}
              <TextArea
                value={work_permit.comment}
                autoSize={{ minRows: 4, maxRows: 6 }}
              />
            </Col>
          </Row>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PrintWorkPermitComponent);
