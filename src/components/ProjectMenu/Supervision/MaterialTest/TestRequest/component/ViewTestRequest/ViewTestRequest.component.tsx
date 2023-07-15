import Button from "antd/lib/button";
import React, { FC, useState } from "react";
import { ViewTestRequestPropType } from "./ViewTestRequest.util";
import { connect } from "react-redux";
import Modal from "antd/lib/modal/Modal";
import { Input, Image, Divider, Table, Form } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import {
  fetchOneTestResult,
  fetchOneTestResultReset,
} from "../../../../../../../redux/TestResult/TestResult.action";
import { BASE_URI } from "../../../../../../../redux/ApiCall";
import SignatureComponent from "../../../../../../common/Signature/Signature.component";

const ViewAddTestResultComponent: FC<ViewTestRequestPropType> = ({
  fetchOneTestResult,
  fetchOneTestResultReset,
  fetchOne,
  project,
  test_request,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleOnClick = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button type="text" onClick={handleOnClick}>
        View
      </Button>
      <Modal
        title="Test Request"
        style={{ top: 10 }}
        visible={isModalVisible}
        onCancel={handleOk}
        width={1000}
        footer={[]}
      >
        <div className="row">
          <div className="col-md-3">
            <p style={{ fontSize: 12, color: "gray" }}>Project</p>
            <h6>{project.payload?.name}</h6>
          </div>

          <div className="col-md-3">
            <p style={{ fontSize: 12, color: "gray" }}>Site</p>
            <h6>{project.payload?.location}</h6>
          </div>

          <div className="col-md-3">
            <p style={{ fontSize: 12, color: "gray" }}>Employer</p>
            <h6>{project.payload?.client?.name}</h6>
          </div>

          <div className="col-md-3">
            <p style={{ fontSize: 12, color: "gray" }}>Contractor</p>
            <h6>{project.payload?.contractor?.name}</h6>
          </div>
        </div>

        <Divider />

        <div className="row mt-4">
          <div className="col-md-12">
            <p className="mb-3">Materials Test Requested</p>

            <Table
              pagination={false}
              dataSource={test_request.test_request_items}
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
          <div className="col-md-4">
            <p style={{ fontSize: 12, color: "gray" }}>Test Requested By</p>
            <h6> {test_request.er_test_requested_by.full_name}</h6>
          </div>

          <div className="col-md-4">
            <p style={{ fontSize: 12, color: "gray" }}>Approved By</p>

            {test_request.is_approved ? (
              <h6>
                {test_request.er_approved_by.full_name}{" "}
                <SignatureComponent user={test_request?.er_approved_by} />
              </h6>
            ) : (
              "-"
            )}
          </div>

          <div className="col-md-4">
            <p style={{ fontSize: 12, color: "gray" }}>Date</p>
            <h6>{test_request.date}</h6>
          </div>
        </div>
      </Modal>
    </>
  );
};

/**
 * Map State to Props
 *
 * @param state
 */
const mapStateToProps = (state: any) => ({
  fetchOne: state.test_result.fetchOne,
  project: state.project.fetchOne,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchOneTestResult: (id: any) => dispatch(fetchOneTestResult({ id })),
  fetchOneTestResultReset: () => dispatch(fetchOneTestResultReset()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewAddTestResultComponent);
