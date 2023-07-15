import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  Modal,
  Statistic,
  Divider,
  Radio,
  Table,
} from "antd";

import { EyeOutlined } from "@ant-design/icons";
import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  DetailRequestPropType,
  getApprovalValue,
  isDone,
  parseApprovalValue,
  updateData,
} from "../../util/MaterialApproval.util";
import { OpenNotification } from "../../../../../../common/Notification/Notification.component";
import {
  MaterialRequestType,
  Message,
  NotificationType,
} from "../../../../../../../constants/Constants";
import {
  ErrorHandler,
  getRevisionNumber,
  getUserData,
  zeroPad,
} from "../../../../../../../utilities/utilities";
import moment from "moment";
import {
  fetchAllMaterialRequestApproval,
  fetchOneMaterialRequestApproval,
} from "../../../../../../../redux/MaterialRequestApproval/MaterialRequestApproval.action";
import { DownloadFile } from "../../../../../../Document/MyDocument/index.util";
import SignatureComponent from "../../../../../../common/Signature/Signature.component";
import DocumentViewerComponent from "../../../../../../common/DocumentViewer/DocumentViewer.component";

const DetailRequestComponent: FC<DetailRequestPropType> = ({
  material_request_approval,
  user,
  id,
  fetchMaterialApprovalRequest,
  project,
  material_request_approvals,
  fetchMaterialApprovalRequests,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [approval, setApproval] = useState<any>(null);
  const [form] = Form.useForm();
  const [attachment, setAttachment] = useState<
    { id: number; description: string; yes: boolean; na: boolean; file: any }[]
  >([]);

  useEffect(() => {
    if (isModalVisible) {
      fetchMaterialApprovalRequest(id);
    }
  }, [isModalVisible, id, fetchMaterialApprovalRequest]);

  useEffect(() => {
    if (material_request_approval) {
      const { material_attachment } = material_request_approval.payload;
      setAttachment([
        {
          id: 1,
          description: "Samples Submitted",
          yes: material_attachment?.sample_submitted,
          na: !material_attachment?.sample_submitted,
          file: null,
        },
        {
          id: 2,
          description: "Original Brochure",
          yes: material_attachment?.original_brochure !== null,
          na: material_attachment?.original_brochure === null,
          file: material_attachment?.original_brochure_file,
        },
        {
          id: 3,
          description: "Other supporting documents attached",
          yes: material_attachment?.other !== null,
          na: material_attachment?.other === null,
          file: material_attachment?.other_file,
        },
      ]);
    }
    setApproval(getApprovalValue(material_request_approval.payload));
  }, [material_request_approval]);

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const clear = () => {
    form.resetFields();
    setAttachment([
      {
        id: 1,
        description: "Samples Submitted",
        yes: false,
        na: true,
        file: null,
      },
      {
        id: 2,
        description: "Original Brochure",
        yes: false,
        na: true,
        file: null,
      },
      {
        id: 3,
        description: "Other supporting documents attached",
        yes: false,
        na: true,
        file: null,
      },
    ]);
  };

  const Submit = (value: any) => {
    setLoading(true);
    const data = {
      ...value,
      ...parseApprovalValue(value.approval),
      id: material_request_approval.payload.id,
      response_date: moment().format("YYYY-MM-DD"),
    };

    updateData(data)
      .then(() => {
        fetchMaterialApprovalRequests({ project_id: project.payload?.id });
        handleOk();
        clear();
        setLoading(false);
        OpenNotification(
          NotificationType.SUCCESS,
          Message.MATERIAL_APPROVAL_SUCCUSS,
          ""
        );
      })
      .catch((error) => {
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            Message.MATERIAL_APPROVAL_FAILED,
            e.message
          )
        );
      });
  };

  return (
    <>
      <Button type="text" onClick={() => setIsModalVisible(true)}>
        View
      </Button>
      {isModalVisible ? (
        <Modal
          centered
          title="Detail Request"
          className="fixed-modal"
          visible={isModalVisible}
          onCancel={handleOk}
          width={750}
          footer={[
            <>
              {isDone(material_request_approval.payload) ||
              user.payload.id !==
                material_request_approval.payload.approved_by ? null : (
                <Button
                  key="submit"
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  onClick={() => form.submit()}
                >
                  Submit
                </Button>
              )}
            </>,
          ]}
        >
          <Form layout="vertical" onFinish={Submit} form={form}>
            <div className="row">
              <div className="col-md-6">
                <Statistic
                  title="Client"
                  value={project.payload?.client?.name}
                  valueStyle={{ fontSize: 16, fontFamily: "Campton-Medium" }}
                />
                <Statistic
                  title="Consultant"
                  value={project.payload?.consultant?.name}
                  valueStyle={{ fontSize: 16, fontFamily: "Campton-Medium" }}
                />
                <Statistic
                  title="Contractor"
                  value={project.payload?.contractor?.name}
                  valueStyle={{ fontSize: 16, fontFamily: "Campton-Medium" }}
                />
              </div>
              <div className="col-md-6">
                <Statistic
                  title="Project Name"
                  value={project.payload?.name}
                  valueStyle={{ fontSize: 16, fontFamily: "Campton-Medium" }}
                />
                <Statistic
                  title="Project No"
                  value={project.payload?.id}
                  valueStyle={{ fontSize: 16, fontFamily: "Campton-Medium" }}
                />
                <Statistic
                  title="Project Manager"
                  value={"-"}
                  valueStyle={{ fontSize: 16, fontFamily: "Campton-Medium" }}
                />
              </div>
            </div>

            <Divider />
            <div className="row">
              <div className="col-lg-12">
                <Form.Item label="Type">
                  <Input value={material_request_approval.payload.type} />
                </Form.Item>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <Form.Item label="No">
                  <Input
                    value={zeroPad(material_request_approval.payload.id)}
                  />
                </Form.Item>
              </div>
              <div className="col-lg-6">
                <Form.Item label="Revision No">
                  <Input
                    value={
                      material_request_approval.payload.type ===
                      MaterialRequestType.APPROVAL_REQUEST
                        ? 0
                        : getRevisionNumber(
                            material_request_approvals.payload,
                            material_request_approval.payload.ref,
                            id
                          )
                    }
                  />
                </Form.Item>
              </div>
            </div>

            <Divider />
            <div className="row">
              <div className="col-lg-12">
                <Form.Item label="Material Description">
                  <Input
                    value={material_request_approval.payload.description}
                  />
                </Form.Item>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <Form.Item label="Date">
                  <DatePicker
                    value={moment(material_request_approval.payload.date)}
                  />
                </Form.Item>
              </div>
              <div className="col-lg-6">
                <Form.Item label="Sec. S/C Ref.">
                  <Input value="-" />
                </Form.Item>
              </div>
            </div>

            <Divider />
            <div className="row">
              <div className="col-lg-12">
                <Form.Item label="Material Trade Name">
                  <Input value={material_request_approval.payload.trade_no} />
                </Form.Item>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <Form.Item label="Manufacturer/Supplier">
                  <Input
                    value={material_request_approval.payload.manufacturer}
                  />
                </Form.Item>
              </div>
              <div className="col-lg-6">
                <Form.Item label="Country of Origin">
                  <Input
                    value={material_request_approval.payload.country_of_origin}
                  />
                </Form.Item>
              </div>
            </div>

            <Divider />
            <div className="row">
              <div className="col-lg-12">
                <Form.Item label="Contract Specification Details">
                  <Input.TextArea
                    rows={4}
                    value={
                      material_request_approval.payload.contract_specific_detail
                    }
                  />
                </Form.Item>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <Form.Item label="Discipline">
                  <Input value={material_request_approval.payload.discipline} />
                </Form.Item>
              </div>
              <div className="col-lg-6">
                <Form.Item label="Location / Area of Use">
                  <Input
                    value={material_request_approval.payload.local_area_of_use}
                  />
                </Form.Item>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <Form.Item label="Technical Details of Proposed Material">
                  <Input.TextArea
                    rows={4}
                    value={material_request_approval.payload.technical_detail}
                  />
                </Form.Item>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <Table
                  size="small"
                  pagination={false}
                  columns={[
                    {
                      title: "",
                      render: (value, record, index) => index + 1,
                    },
                    {
                      title: "",
                      dataIndex: "description",
                    },
                    {
                      title: "Yes",
                      render: (value, record) => (
                        <Checkbox checked={record.yes} />
                      ),
                    },
                    {
                      title: "N/A",
                      render: (value, record) => (
                        <Checkbox checked={record.na} />
                      ),
                    },
                    {
                      title: "",
                      render: (value, record) =>
                        record.id !== 1 && record.yes ? (
                          <>
                            <Button
                              type="link"
                              onClick={() => DownloadFile(record.file)}
                            >
                              Download
                            </Button>
                            {record.file ? (
                              <DocumentViewerComponent document={record.file} />
                            ) : null}
                          </>
                        ) : null,
                    },
                  ]}
                  dataSource={attachment}
                />
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-md-12">
                <h6 style={{ textAlign: "center" }}>For Contractor</h6>
              </div>
            </div>

            {user.payload.id !==
              material_request_approval.payload.approved_by ||
            isDone(material_request_approval.payload) ? (
              <div className="row">
                <div className="col-md-12">
                  <Form.Item label="Approval">
                    <Radio.Group value={approval} defaultValue={approval}>
                      <Radio value={1}>Approved</Radio>
                      <Radio value={2}>Approved with Comments</Radio>
                      <Radio value={3}>Revise and Resubmit</Radio>
                      <Radio value={4}>Not Approved</Radio>
                    </Radio.Group>
                  </Form.Item>
                </div>
              </div>
            ) : (
              <div className="row">
                <div className="col-md-12">
                  <Form.Item
                    label="Approval"
                    name="approval"
                    rules={[{ message: "Required", required: true }]}
                  >
                    <Radio.Group
                      value={approval}
                      onChange={(e) => setApproval(e.target.value)}
                    >
                      <Radio value={1}>Approved</Radio>
                      <Radio value={2}>Approved with Comments</Radio>
                      <Radio value={3}>Revise and Resubmit</Radio>
                      <Radio value={4}>Not Approved</Radio>
                    </Radio.Group>
                  </Form.Item>
                </div>
              </div>
            )}

            <div className="row">
              <div className="col-md-12">
                {user.payload.id ===
                  material_request_approval.payload.approved_by &&
                !isDone(material_request_approval.payload) ? (
                  <Form.Item
                    label="Consultant Comments"
                    name="comment"
                    rules={[
                      { message: "Comment Required", required: approval === 2 },
                    ]}
                  >
                    <Input.TextArea rows={5} />
                  </Form.Item>
                ) : (
                  <Form.Item>
                    <Input.TextArea
                      rows={5}
                      value={material_request_approval.payload.comment}
                    />
                  </Form.Item>
                )}
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <Form.Item label="Name">
                  <Input
                    value={
                      material_request_approval.payload
                        ?.material_approval_approved_by?.full_name
                    }
                  />
                </Form.Item>
              </div>
              {material_request_approval.payload.approved ||
              getUserData().id ===
                material_request_approval.payload.approved_by ? (
                <>
                  <div className="col-md-6">
                    <Form.Item label="Signature">
                      <SignatureComponent
                        user={
                          material_request_approval.payload
                            .material_approval_approved_by
                        }
                      />
                    </Form.Item>
                  </div>
                  <div className="col-md-6">
                    <Form.Item label="Designation">
                      <Input
                        value={
                          material_request_approval.payload
                            ?.material_approval_approved_by?.role
                        }
                      />
                    </Form.Item>
                  </div>
                  <div className="col-md-6">
                    <Form.Item label="Date">
                      <DatePicker value={moment()} />
                    </Form.Item>
                  </div>
                </>
              ) : null}
            </div>
          </Form>
        </Modal>
      ) : null}
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
  material_request_approvals: state.material_request_approval.fetchAll,
  material_request_approval: state.material_request_approval.fetchOne,
  users: state.user.fetchAll,
  user: state.user.fetchOne,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchMaterialApprovalRequest: (action: any) =>
    dispatch(fetchOneMaterialRequestApproval(action)),
  fetchMaterialApprovalRequests: (action: any) =>
    dispatch(fetchAllMaterialRequestApproval(action)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailRequestComponent);
