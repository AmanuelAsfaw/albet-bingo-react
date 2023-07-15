import {
  AutoComplete,
  Button,
  Checkbox,
  DatePicker,
  Divider,
  Form,
  Input,
  Modal,
  Select,
  Statistic,
  Upload,
  Table,
} from "antd";
import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  EditOutlined,
  DownloadOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { EditTestResultPropType, sendData } from "./EditTestResult.util";
import { OpenNotification } from "../../../../../../common/Notification/Notification.component";
import { ErrorHandler } from "../../../../../../../utilities/utilities";
import {
  Message,
  NotificationType,
} from "../../../../../../../constants/Constants";
import moment from "moment";
import { MaterialsForTest } from "../AddTestResult/component/MaterialTested/MaterialTested.util";
import { isNil } from "lodash";
import { DownloadFile } from "../../../../../../Document/MyDocument/index.util";
import { fetchAllTestResult } from "../../../../../../../redux/TestResult/TestResult.action";
import DocumentViewerComponent from "../../../../../../common/DocumentViewer/DocumentViewer.component";

const EditTestResultComponent: FC<EditTestResultPropType> = ({
  data,
  users,
  project,
  casting,
  fetchAllTestResult,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const [testResult, setTestResult] = useState<any>(data);

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const Submit = (value: any) => {
    setLoading(true);
    const temp = {
      ...testResult,
    };

    let formData = new FormData();

    for (var key in temp) {
      if (key === "test_result_items" || key === "test_result_documents")
        formData.append(key, JSON.stringify(temp[key]));
      else formData.append(key, temp[key]);
    }

    temp.test_result_documents.forEach((el: any, idx: number) => {
      if (!isNil(el.attached) && el.attached) {
        formData.append(`files`, value[`attachment_${el.id}`].file);
      }
    });

    sendData(formData)
      .then(() => {
        handleOk();
        setLoading(false);
        fetchAllTestResult(project.payload?.id);
        OpenNotification(
          NotificationType.SUCCESS,
          Message.TEST_RESULT_UPDATE_SUCCESS,
          ""
        );
      })
      .catch((error) => {
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            Message.TEST_RESULT_UPDATE_FAILED,
            e.message
          )
        );
      });
  };

  const onChange = (key: any, value: any) => {
    let temp = { ...testResult };

    temp[key] = value;
    setTestResult(temp);
  };

  const onTestResultItemChange = (id: any, key: any, value: any) => {
    let temp = { ...testResult };

    let index = temp.test_result_items.findIndex((el: any) => el.id === id);

    if (index !== -1) {
      let temp2 = [...temp.test_result_items];
      temp2[index] = {
        ...temp2[index],
        [key]: value,
      };

      setTestResult({ ...temp, test_result_items: temp2 });
    }
  };

  const onTestResultDocumentChange = (id: any, key: any, value: any) => {
    let temp = { ...testResult };

    let index = temp.test_result_documents.findIndex((el: any) => el.id === id);

    if (index !== -1) {
      let temp2 = [...temp.test_result_documents];
      temp2[index] = {
        ...temp2[index],
        [key]: value,
      };

      setTestResult({ ...temp, test_result_documents: temp2 });
    }
  };

  return (
    <>
      <Button type="text" onClick={() => setIsModalVisible(true)}>
        Edit
      </Button>
      <Modal
        width={1000}
        centered
        title="Edit TestResultComponent"
        className="fixed-modal"
        visible={isModalVisible}
        onCancel={handleOk}
        footer={[
          <>
            <Button className="btn-outline" htmlType="reset" onClick={handleOk}>
              Cancel
            </Button>
            <Button
              key="submit"
              type="primary"
              htmlType="submit"
              loading={loading}
              onClick={() => form.submit()}
            >
              Save Changes
            </Button>
          </>,
        ]}
      >
        <Form
          form={form}
          onFinish={Submit}
          layout="vertical"
          initialValues={{
            ...testResult,
            date_of_testing: moment(testResult.date_of_testing),
          }}
        >
          <div className="row">
            <div className="col-md-4">
              <Statistic
                title="Project"
                value={project.payload?.name}
                valueStyle={{ fontSize: 16, fontFamily: "Campton-Medium" }}
              />
            </div>

            <div className="col-md-4">
              <Statistic
                title="Employer"
                value={project.payload?.client?.name}
                valueStyle={{ fontSize: 16, fontFamily: "Campton-Medium" }}
              />
            </div>

            <div className="col-md-4">
              <Statistic
                title="Contractor"
                value={project.payload?.contractor?.name}
                valueStyle={{ fontSize: 16, fontFamily: "Campton-Medium" }}
              />
            </div>
          </div>

          <Divider />

          <div className="row mt-3">
            <div className="col-md-4">
              <Form.Item
                label="Contract Number"
                name="contract_number"
                rules={[
                  { required: true, message: "Please input Contract Number" },
                ]}
              >
                <Input
                  size="middle"
                  placeholder="contract number"
                  onChange={(e) => onChange("contract_number", e.target.value)}
                />
              </Form.Item>
            </div>

            <div className="col-md-4">
              <Form.Item
                label="Supervisor"
                name="supervisor_id"
                rules={[{ required: true, message: "Please input SUPERVISOR" }]}
              >
                <Select
                  loading={users.isPending}
                  placeholder="supervisor"
                  onSelect={(value: any) => {
                    form.setFieldsValue({ supervisor_id: value });
                    onChange("supervisor_id", value);
                  }}
                >
                  {users.payload.map((ele) => (
                    <Select.Option value={`${ele.id}`}>
                      {ele.full_name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>

            <div className="col-md-4">
              <Form.Item
                label="Site"
                name="site"
                rules={[{ required: true, message: "Please input Site" }]}
              >
                <Input
                  size="middle"
                  placeholder="site"
                  onChange={(e) => onChange("site", e.target.value)}
                />
              </Form.Item>
            </div>
          </div>

          <div className="row">
            <div className="col-md-4">
              <Form.Item
                label="Testing Lab"
                name="testing_lab"
                rules={[
                  { required: true, message: "Please input Testing Lab" },
                ]}
              >
                <Input
                  size="middle"
                  placeholder="testing lab"
                  onChange={(e) => onChange("testing_lab", e.target.value)}
                />
              </Form.Item>
            </div>

            <div className="col-md-4">
              <Form.Item
                label="Testing No."
                name="testing_number"
                rules={[
                  { required: true, message: "Please input Testing Number" },
                ]}
              >
                <Input
                  size="middle"
                  placeholder="testing number"
                  onChange={(e) => onChange("testing_number", e.target.value)}
                />
              </Form.Item>
            </div>

            <div className="col-md-4">
              <Form.Item
                label="Date of Testing"
                name="date_of_testing"
                rules={[
                  { required: true, message: "Please input Date of Testing" },
                ]}
              >
                <DatePicker
                  format="YYYY-MM-DD"
                  onChange={(e) =>
                    onChange("date_of_testing", moment(e).format("YYYY-MM-DD"))
                  }
                />
              </Form.Item>
            </div>
          </div>

          <Divider />

          <div className="row mb-3">
            <div className="col-md-4">
              <h6>Materials Tested</h6>
            </div>
            <div className="col-md-12">
              <Table
                size="small"
                pagination={false}
                dataSource={testResult.test_result_items}
                columns={[
                  {
                    title: "Material Tested",
                    dataIndex: "material_tested",
                    render: (value, record) => (
                      <Form.Item>
                        <AutoComplete
                          options={MaterialsForTest.map((e, index) => ({
                            option: e.option,
                            value: e.value,
                            key: index,
                          }))}
                          value={value}
                          placeholder="Material"
                          filterOption={(inputValue, option) =>
                            option!.value
                              .toUpperCase()
                              .indexOf(inputValue.toUpperCase()) !== -1
                          }
                          onSelect={(vx: any) =>
                            onTestResultItemChange(
                              record.id,
                              "material_tested",
                              vx
                            )
                          }
                          onChange={(vx) =>
                            onTestResultItemChange(
                              record.id,
                              "material_tested",
                              vx
                            )
                          }
                        />
                      </Form.Item>
                    ),
                  },
                  {
                    title: "Concrete Grade",
                    dataIndex: "casting_id",
                    render: (value, record) =>
                      record.material_tested === "Concrete" ? (
                        <Form.Item>
                          <Select
                            value={value}
                            onSelect={(vx: any) =>
                              onTestResultItemChange(
                                record.id,
                                "casting_id",
                                vx
                              )
                            }
                          >
                            {casting.payload.map((el, idx) => (
                              <Select.Option value={`${el.id}`}>
                                {el.concrete_grade}, {el.date}
                              </Select.Option>
                            ))}
                          </Select>
                        </Form.Item>
                      ) : (
                        "-"
                      ),
                  },
                  {
                    title: "Specified Quality",
                    dataIndex: "specified_quality",
                    render: (value, record) => (
                      <Form.Item>
                        <Input
                          value={value}
                          onChange={(vx) =>
                            onTestResultItemChange(
                              record.id,
                              "specified_quality",
                              vx.target.value
                            )
                          }
                        />
                      </Form.Item>
                    ),
                  },
                  {
                    title: "Test Result",
                    dataIndex: "test_result",
                    render: (value, record) => (
                      <Form.Item>
                        <Input
                          value={value}
                          onChange={(vx) =>
                            onTestResultItemChange(
                              record.id,
                              "test_result",
                              vx.target.value
                            )
                          }
                        />
                      </Form.Item>
                    ),
                  },
                  {
                    title: "Accepted/Rejected",
                    dataIndex: "is_accepted",
                    render: (value, record) => (
                      <>
                        <Form.Item>
                          <Checkbox
                            checked={value}
                            onClick={() =>
                              onTestResultItemChange(
                                record.id,
                                "is_accepted",
                                true
                              )
                            }
                          >
                            Accept
                          </Checkbox>
                        </Form.Item>

                        <Form.Item>
                          <Checkbox
                            checked={!value}
                            onClick={() =>
                              onTestResultItemChange(
                                record.id,
                                "is_accepted",
                                false
                              )
                            }
                          >
                            Reject
                          </Checkbox>
                        </Form.Item>
                      </>
                    ),
                  },
                ]}
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-4">
              <h6>Attachments</h6>
            </div>
            <div className="col-md-12">
              <Table
                size="small"
                pagination={false}
                dataSource={testResult.test_result_documents}
                columns={[
                  {
                    title: "Description",
                    dataIndex: "description",
                    render: (value, record) => (
                      <Form.Item>
                        <Input.TextArea
                          value={value}
                          onChange={(e) =>
                            onTestResultDocumentChange(
                              record.id,
                              "description",
                              e.target.value
                            )
                          }
                        />
                      </Form.Item>
                    ),
                  },
                  {
                    title: "Document",
                    children: [
                      {
                        title: "Download",
                        dataIndex: "document",
                        width: 100,
                        render: (value, record) =>
                          isNil(record.attached) && (
                            <>
                              <Button
                                type="link"
                                onClick={() => DownloadFile(record.document)}
                                icon={<DownloadOutlined />}
                              >
                                Attachment
                              </Button>
                              <DocumentViewerComponent
                                document={record.attached}
                              />
                            </>
                          ),
                      },
                      {
                        title: "Re upload",
                        dataIndex: "document",
                        render: (value, record) => (
                          <Form.Item name={`attachment_${record.id}`}>
                            <Upload
                              name={`attachment_${record.key}`}
                              beforeUpload={() => {
                                return false;
                              }}
                              maxCount={1}
                              onChange={() => {
                                onTestResultDocumentChange(
                                  record.id,
                                  "attached",
                                  true
                                );
                              }}
                              onRemove={(e) => {
                                return new Promise((resolve, reject) => {
                                  if (e.status === "removed") {
                                    onTestResultDocumentChange(
                                      record.id,
                                      "attached",
                                      null
                                    );
                                    resolve(true);
                                  } else {
                                    resolve(true);
                                  }
                                });
                              }}
                            >
                              <Button
                                className="btn-outline-secondary"
                                icon={<UploadOutlined />}
                              />
                            </Upload>
                          </Form.Item>
                        ),
                      },
                    ],
                  },
                ]}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-9">
              <Form.Item
                label="Recommendation of Designer"
                name="recommendation"
                rules={[
                  { required: true, message: "Please input Recommendation" },
                ]}
              >
                <Input.TextArea
                  rows={4}
                  placeholder="recommendation"
                  onChange={(e) => onChange("recommendation", e.target.value)}
                />
              </Form.Item>
            </div>
          </div>

          <Divider />

          <div className="row mt-4">
            <div className="col-md-1">
              <h3 className="pt-4">C.C</h3>
            </div>
            <div className="col-md-3">
              <Form.Item label="To Site Supervisor" name="supervisor_id">
                <Select
                  loading={users.isPending}
                  disabled
                  placeholder="supervisor"
                >
                  {users.payload.map((ele) => (
                    <Select.Option value={`${ele.id}`}>
                      {ele.full_name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>

            <div className="col-md-3">
              <Form.Item
                label="To Contractor"
                name="contractor_id"
                rules={[
                  { required: true, message: "Please select Contractor" },
                ]}
              >
                <Select
                  loading={users.isPending}
                  placeholder="contractor"
                  onSelect={(value: any) => onChange("contractor_id", value)}
                >
                  {users.payload.map((ele) => (
                    <Select.Option value={`${ele.id}`}>
                      {ele.full_name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>

            <div className="col-md-3">
              <Form.Item
                label="To Employer"
                name="employer_id"
                rules={[{ required: true, message: "Please select Employer" }]}
              >
                <Select
                  loading={users.isPending}
                  placeholder="employer"
                  defaultValue={testResult.employer_id}
                  onSelect={(value: any) => onChange("employer_id", value)}
                >
                  {users.payload.map((ele) => (
                    <Select.Option value={`${ele.id}`}>
                      {ele.full_name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
          </div>

          <div className="row mt-5">
            <div className="col-md-4">
              <Statistic
                title="Approved By"
                value={`${testResult.approved_by?.full_name} ${
                  testResult.approved_by?.company?.name
                    ? `/${testResult.approved_by?.company?.name}`
                    : ""
                }`}
                valueStyle={{ fontSize: 18, fontFamily: "Campton-Medium" }}
              />
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
  project: state.project.fetchOne,
  users: state.user.fetchAll,
  casting: state.casting.fetchAll,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchAllTestResult: (payload: any) => dispatch(fetchAllTestResult(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditTestResultComponent);
