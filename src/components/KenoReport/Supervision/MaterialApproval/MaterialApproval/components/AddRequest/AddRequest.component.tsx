import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  Modal,
  Select,
  Table,
  Upload,
  Divider,
  Statistic,
} from "antd";
import { FC, useState } from "react";
import { connect } from "react-redux";
import { UploadOutlined } from "@ant-design/icons";
import { PlusOutlined } from "@ant-design/icons";
import {
  AddRequestPropType,
  AttachmentPropType,
  sendData,
} from "../../util/MaterialApproval.util";
import { OpenNotification } from "../../../../../../common/Notification/Notification.component";
import {
  LIST_OF_COUNTRIES,
  MaterialRequestType,
  Message,
  NotificationType,
} from "../../../../../../../constants/Constants";
import {
  ErrorHandler,
  getLastId,
  zeroPad,
  getRevisionNumber,
} from "../../../../../../../utilities/utilities";
import moment from "moment";
import { fetchAllMaterialRequestApproval } from "../../../../../../../redux/MaterialRequestApproval/MaterialRequestApproval.action";
import SignatureComponent from "../../../../../../common/Signature/Signature.component";

const AddRequestComponent: FC<AddRequestPropType> = ({
  material_request_approval,
  project,
  user,
  users,
  fetchMaterialApprovalRequest,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState<any>(null);
  const [form] = Form.useForm();
  const [type, setType] = useState(MaterialRequestType.APPROVAL_REQUEST);
  const [attachment, setAttachment] = useState<AttachmentPropType[]>([
    { id: 1, description: "Samples Submitted", checked: false, file: null },
    { id: 2, description: "Original Brochure", checked: false, file: null },
    {
      id: 3,
      description: "Other supporting documents attached",
      checked: false,
      file: null,
    },
  ]);

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const onChange = (id: number, name: string, value: any) => {
    const newData = [...attachment];
    const index = newData.findIndex((e) => e.id === id);
    if (index !== -1) {
      let item = newData[index];
      item = { ...item, [name]: value };
      newData.splice(index, 1, item);
      setAttachment(newData);
    }
  };

  const clear = () => {
    form.resetFields();
    setId(null);
    setAttachment([
      { id: 1, description: "Samples Submitted", checked: true, file: null },
      { id: 2, description: "Original Brochure", checked: false, file: null },
      {
        id: 3,
        description: "Other supporting documents attached",
        checked: false,
        file: null,
      },
    ]);
  };

  const Submit = (value: any) => {
    setLoading(true);
    let formData = new FormData();

    formData.append("files", value.brochure_file?.file);
    formData.append("files", value.other_file?.file);
    formData.append("is_brochure", attachment[1].checked.toString());
    formData.append("other", attachment[2].checked.toString());
    formData.append("project_id", project.payload?.id);
    formData.append("prepared_by", user.payload.id.toString());
    formData.append("approved_by", value.approved_by);
    formData.append("date", value.date);
    formData.append("trade_no", value.trade_no);
    formData.append("description", value.description);
    formData.append("ref", value.ref);
    formData.append("manufacturer", value.manufacturer);
    formData.append("country_of_origin", value.country_of_origin);
    formData.append("contract_specific_detail", value.contract_specific_detail);
    formData.append("discipline", value.discipline);
    formData.append("local_area_of_use", value.local_area_of_use);
    formData.append("technical_detail", value.technical_detail);
    formData.append("type", value.type);
    formData.append("sample_submitted", attachment[0].checked + "");
    sendData(formData)
      .then(() => {
        fetchMaterialApprovalRequest({ project_id: project.payload?.id });
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
      <Button
        className="btn-outline-secondary"
        style={{ float: "right" }}
        icon={<PlusOutlined />}
        onClick={() => setIsModalVisible(true)}
      >
        Register Request
      </Button>
      <Modal
        className="fixed-modal"
        centered
        title="Register Request"
        visible={isModalVisible}
        onCancel={handleOk}
        width={800}
        footer={[
          <>
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
          layout="vertical"
          onFinish={Submit}
          form={form}
          initialValues={{
            type,
            date: moment(),
            country_of_origin: "Ethiopia",
          }}
        >
          <div className="row">
            <div className="col-md-4">
              <Statistic
                title="Client"
                value={project.payload?.client?.name}
                valueStyle={{ fontSize: 16, fontFamily: "Campton-Medium" }}
              />
            </div>
            <div className="col-md-4">
              <Statistic
                title="Consultant"
                value={project.payload?.consultant?.name}
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
          <div className="row mt-1">
            <div className="col-md-4">
              <Statistic
                title="Project Manager"
                value={"-"}
                valueStyle={{ fontSize: 16, fontFamily: "Campton-Medium" }}
              />
            </div>
            <div className="col-md-4">
              <Statistic
                title="Project No"
                value={project.payload?.id}
                valueStyle={{ fontSize: 16, fontFamily: "Campton-Medium" }}
              />
            </div>
            <div className="col-md-4">
              <Statistic
                title="Client"
                value={project.payload?.name}
                valueStyle={{ fontSize: 16, fontFamily: "Campton-Medium" }}
              />
            </div>
          </div>
          <Divider />
          <div className="row">
            <div className="col-lg-12">
              <Form.Item label="Type" name="type">
                <Select value={type} onChange={(e) => setType(e)}>
                  <Select.Option
                    key={0}
                    value={MaterialRequestType.APPROVAL_REQUEST}
                  >
                    {MaterialRequestType.APPROVAL_REQUEST}
                  </Select.Option>
                  <Select.Option
                    key={1}
                    value={MaterialRequestType.APPROVAL_RESUBMISSION}
                  >
                    {MaterialRequestType.APPROVAL_RESUBMISSION}
                  </Select.Option>
                </Select>
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              {type === MaterialRequestType.APPROVAL_REQUEST ? (
                <Form.Item label="No">
                  <Input
                    value={zeroPad(
                      getLastId(material_request_approval.payload)
                    )}
                  />
                </Form.Item>
              ) : (
                <Form.Item
                  label="No"
                  name="ref"
                  rules={[{ required: true, message: "Request No Required" }]}
                >
                  <Select placeholder="Select" onChange={(e) => setId(e)}>
                    {material_request_approval.payload.map((e) =>
                      !e.resubmitted ? (
                        <Select.Option value={e.id} key={e.id}>
                          {zeroPad(e.id)}
                        </Select.Option>
                      ) : null
                    )}
                  </Select>
                </Form.Item>
              )}
            </div>
            <div className="col-lg-6">
              <Form.Item label="Revision No">
                <Input
                  value={
                    type === MaterialRequestType.APPROVAL_REQUEST
                      ? 0
                      : getRevisionNumber(
                          material_request_approval.payload,
                          null,
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
              <Form.Item
                label="Material Description"
                name="description"
                rules={[
                  { message: "Material Description Required", required: true },
                ]}
              >
                <Input placeholder="description" />
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <Form.Item
                label="Date"
                name="date"
                rules={[{ required: true, message: "Date Required" }]}
              >
                <DatePicker />
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
              <Form.Item
                label="Material Trade Name"
                name="trade_no"
                rules={[
                  { message: "Material Trade Name Required", required: true },
                ]}
              >
                <Input placeholder="trade name" />
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <Form.Item
                label="Manufacturer/Supplier"
                name="manufacturer"
                rules={[{ required: true, message: "Manufacturer Required" }]}
              >
                <Input placeholder="supplier name" />
              </Form.Item>
            </div>
            <div className="col-lg-6">
              <Form.Item
                label="Country of Origin"
                name="country_of_origin"
                rules={[
                  { required: true, message: "Country of Origin Required!" },
                ]}
              >
                <Select placeholder="Select">
                  {LIST_OF_COUNTRIES.map((e, index) => (
                    <Select.Option value={e.name} key={index}>
                      {e.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
          </div>

          <Divider />
          <div className="row">
            <div className="col-lg-12">
              <Form.Item
                label="Contract Specification Details"
                name="contract_specific_detail"
                rules={[
                  {
                    required: false,
                    message: "Contract Specification Details Required",
                  },
                ]}
              >
                <Input.TextArea rows={4} placeholder="details" />
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <Form.Item
                label="Discipline"
                name="discipline"
                rules={[{ required: true, message: "Discipline Required" }]}
              >
                <Input placeholder="discipline" />
              </Form.Item>
            </div>
            <div className="col-lg-6">
              <Form.Item
                label="Location / Area of Use"
                name="local_area_of_use"
                rules={[
                  {
                    required: true,
                    message: "Location / Area of Use Required",
                  },
                ]}
              >
                <Input placeholder="location" />
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <Form.Item
                label="Technical Details of Proposed Material"
                name="technical_detail"
                rules={[
                  {
                    required: false,
                    message: "Technical Details of Proposed Material Required",
                  },
                ]}
              >
                <Input.TextArea rows={4} placeholder="details" />
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
                      <Checkbox
                        checked={record.checked}
                        onChange={(e) => onChange(record.id, "checked", true)}
                      />
                    ),
                  },
                  {
                    title: "N/A",
                    render: (value, record) => (
                      <Checkbox
                        checked={!record.checked}
                        onChange={(e) => onChange(record.id, "checked", false)}
                      />
                    ),
                  },
                  {
                    title: "",
                    render: (value, record) =>
                      record.id !== 1 && record.checked ? (
                        <Form.Item
                          name={
                            record.id === 2 ? "brochure_file" : "other_file"
                          }
                          rules={[{ message: "File required", required: true }]}
                        >
                          <Upload
                            name="file"
                            onChange={(e) =>
                              onChange(record.id, "file", e.file)
                            }
                            beforeUpload={(e) => {
                              return false;
                            }}
                            type="select"
                            multiple={false}
                            maxCount={1}
                          >
                            <Button className="btn-outline-secondary">
                              <UploadOutlined /> Click to Upload
                            </Button>
                          </Upload>
                        </Form.Item>
                      ) : null,
                  },
                ]}
                dataSource={attachment}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12 mt-4 mb-2">
              <h6>For Contractor</h6>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <Form.Item label="Name">
                <Input value={user.payload.full_name} />
              </Form.Item>
            </div>
            <div className="col-lg-6">
              <Form.Item label="Signature">
                <SignatureComponent user={user.payload} />
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <Form.Item label="Designation">
                <Input value={user.payload.role} />
              </Form.Item>
            </div>
            <div className="col-lg-6">
              <Form.Item
                label="Date"
                name="date"
                rules={[{ required: true, message: "Date Required" }]}
              >
                <DatePicker />
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <Form.Item
                label="Approved By"
                name="approved_by"
                rules={[{ required: true, message: "Approved by Required!" }]}
              >
                <Select placeholder="Select">
                  {users.payload.map((e, index) => (
                    <Select.Option value={e.id} key={index}>
                      {e.full_name}
                    </Select.Option>
                  ))}
                </Select>
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
  project: state.project.fetchOne,
  material_request_approval: state.material_request_approval.fetchAll,
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
    dispatch(fetchAllMaterialRequestApproval(action)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddRequestComponent);
