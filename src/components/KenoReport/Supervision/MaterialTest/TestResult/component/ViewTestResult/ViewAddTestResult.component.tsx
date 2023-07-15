import Button from "antd/lib/button";
import React, { FC, useState } from "react";
import { ViewAddTestResultPropType } from "./ViewAddTestResult.util";
import { connect } from "react-redux";
import Modal from "antd/lib/modal/Modal";
import { Form, Input, Divider, DatePicker, Table, Tag } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import {
  fetchOneTestResult,
  fetchOneTestResultReset,
} from "../../../../../../../redux/TestResult/TestResult.action";
import moment from "moment";
import { DataFormat } from "../../../../../../../utilities/utilities";
import DownloadOutlined from "@ant-design/icons/lib/icons/DownloadOutlined";
import { DownloadFile } from "../../../../../../Document/MyDocument/index.util";
import { isNil } from "lodash";
import DocumentViewerComponent from "../../../../../../common/DocumentViewer/DocumentViewer.component";

const ViewAddTestResultComponent: FC<ViewAddTestResultPropType> = ({
  fetchOneTestResult,
  fetchOneTestResultReset,
  fetchOne,
  project,
  test_result,
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
        title="Test Result"
        centered
        className="fixed-modal"
        visible={isModalVisible}
        onCancel={handleOk}
        width={1000}
        footer={[]}
      >
        <Form
          layout="vertical"
          initialValues={{
            ...test_result,
            supervisor: test_result.supervisor.full_name,
            approved_by: test_result.approved_by.full_name,
            contractor: test_result.contractor.full_name,
            employer: test_result.employer.full_name,
            date_of_testing: moment(test_result.date_of_testing, "YYYY/MM/DD"),
          }}
        >
          <div className="row">
            <div className="col-md-4">
              <p style={{ fontSize: 12, color: "gray" }}>PROJECT</p>
              <h5>{project.payload?.name}</h5>
            </div>

            <div className="col-md-4">
              <p style={{ fontSize: 12, color: "gray" }}>EMPLOYEER</p>
              <h5>{project.payload?.client?.name}</h5>
            </div>

            <div className="col-md-4">
              <p style={{ fontSize: 12, color: "gray" }}>CONTRACTOR</p>
              <h5>{project.payload?.contractor?.name}</h5>
            </div>
          </div>

          <Divider />

          <div className="row mt-3">
            <div className="col-md-4">
              <Form.Item label="Contract Number" name="contract_number">
                <Input readOnly />
              </Form.Item>
            </div>
          </div>

          <div className="row">
            <div className="col-md-3">
              <Form.Item label="Supervisor" name="supervisor">
                <Input readOnly />
              </Form.Item>
            </div>

            <div className="col-md-4">
              <Form.Item label="Site" name="site">
                <Input readOnly />
              </Form.Item>
            </div>
            <div className="col-md-4">
              <Form.Item label="Testing Lab" name="testing_lab">
                <Input readOnly />
              </Form.Item>
            </div>
          </div>

          <div className="row">
            <div className="col-md-3">
              <Form.Item label="Testing No." name="testing_number">
                <Input readOnly />
              </Form.Item>
            </div>

            <div className="col-md-4">
              <Form.Item label="Date of Testing" name="date_of_testing">
                <DatePicker disabled format="YYYY-MM-DD" />
              </Form.Item>
            </div>
          </div>

          <Divider />

          <div className="row">
            <div className="col-md-12">
              <Form.Item label="Materials Tested">
                <Table
                  pagination={false}
                  dataSource={test_result?.test_result_items}
                  columns={[
                    {
                      title: "Material Tested",
                      dataIndex: "material_tested",
                    },
                    {
                      title: "Casting",
                      render: (value, record, index) =>
                        !isNil(record.casting)
                          ? `${record.casting.concrete_grade} / ${record.casting.structure_type} / ${record.casting.source_of_concrete}`
                          : "-",
                    },
                    {
                      title: "Specified Quality",
                      dataIndex: "specified_quality",
                    },
                    {
                      title: "Test Result",
                      dataIndex: "test_result",
                    },
                    {
                      title: "Submitted Date",
                      dataIndex: "submitted_date",
                      render: (value) => moment(value).format("DD/MM/YYYY"),
                    },
                    {
                      title: "Accepted/Rejected",
                      dataIndex: "is_accepted",
                      render: (value) =>
                        value ? (
                          <Tag color={"success"}>Accepted</Tag>
                        ) : (
                          <Tag color={"red"}>Rejected</Tag>
                        ),
                    },
                  ]}
                />
              </Form.Item>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <Form.Item label="Attachments">
                <Table
                  pagination={false}
                  dataSource={test_result?.test_result_documents.map(
                    (item: any) => {
                      return {
                        description: item?.description,
                        date: item?.date,
                        document: item.document,
                      };
                    }
                  )}
                  columns={[
                    {
                      title: "Description.",
                      dataIndex: "description",
                    },
                    {
                      title: "Upload Date",
                      render: (value, record, index) =>
                        moment(record.date).format("DD/MM/YYYY HH:MM"),
                    },
                    {
                      title: "Size",
                      render: (value, record, index) =>
                        DataFormat(record.document.size),
                    },
                    {
                      title: "Action",
                      render: (value, record, index) => (
                        <>
                          <Button
                            className="btn-outline-secondary"
                            onClick={() => DownloadFile(record.document)}
                            icon={<DownloadOutlined />}
                          />
                          {record.document ? (
                            <DocumentViewerComponent
                              document={record.document}
                            />
                          ) : null}
                        </>
                      ),
                    },
                  ]}
                />
              </Form.Item>
            </div>
          </div>

          <div className="row">
            <div className="col-md-10">
              <Form.Item
                label="Recommendation of Designer"
                name="recommendation"
              >
                <Input.TextArea readOnly rows={4} />
              </Form.Item>
            </div>
          </div>

          <Divider />

          <div className="row mb-3">
            <div className="col-md-4">
              <Form.Item label="Approved By" name="approved_by">
                <Input readOnly />
              </Form.Item>
            </div>
          </div>

          <div className="row">
            <div className="col-md-1">
              <h5 className="pt-4">C.C</h5>
            </div>

            <div className="col-md-3">
              <Form.Item label="TO SITE SUPERVISOR" name="supervisor">
                <Input readOnly />
              </Form.Item>
            </div>

            <div className="col-md-3">
              <Form.Item label="TO CONTRACTOR" name="contractor">
                <Input readOnly />
              </Form.Item>
            </div>

            <div className="col-md-3">
              <Form.Item
                label="TO EMPLOYER"
                name="employer"
                rules={[{ required: true, message: "Please select Employer" }]}
              >
                <Input readOnly />
              </Form.Item>
            </div>
          </div>
        </Form>
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
