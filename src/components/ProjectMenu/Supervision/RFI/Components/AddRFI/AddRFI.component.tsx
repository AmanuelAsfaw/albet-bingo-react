import {
  Form,
  Modal,
  DatePicker,
  Select,
  Input,
  Upload,
  Button,
  Divider,
} from "antd";
import { FC, useState } from "react";
import { connect } from "react-redux";
import { AddRFI, AddRFIPropType, FormatRFINumber } from "../../util/RFI.util";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { UploadOutlined } from "@ant-design/icons";
import moment from "moment";
import {
  ErrorHandler,
  getUserData,
} from "../../../../../../utilities/utilities";
import {
  Message,
  NotificationType,
} from "../../../../../../constants/Constants";
import { OpenNotification } from "../../../../../common/Notification/Notification.component";
import SignatureComponent from "../../../../../common/Signature/Signature.component";

const AddRFIComponent: FC<AddRFIPropType> = ({
  rfi,
  user,
  users,
  project,
  fetchRFI,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [description, setDescription] = useState([{ value: "" }]);
  const [attachements, setAttachements] = useState([
    { value: "", file: { uid: "" } },
  ]);

  const handleOk = () => {
    setIsModalVisible(false);
    setDescription([{ value: "" }]);
    setAttachements([{ value: "", file: { uid: "" } }]);
  };

  const Submit = (value: any) => {
    const under_review_description = description
      .map((desc: any) => desc.value)
      .join("---");
    const attachementData = attachements
      .map((att: any) => att.value)
      .join("---");
    const rfi_number = project.payload?.id
      ? FormatRFINumber(project.payload, rfi.payload.length + 1)
      : "";

    console.log(value.attachements_files);

    const data = new FormData();
    data.append("rfi_number", rfi_number);
    data.append("rfi_date", value.rfi_date.format("DD-MMM-YYYY"));
    data.append("title", value.title);
    data.append("paragraph", value.paragraph);
    data.append("specification_section", value.specification_section);
    data.append("drawing_reference", value.drawing_reference);
    data.append("detail", value.detail);
    data.append("under_review", value.under_review);
    data.append("under_review_description", under_review_description);
    data.append("attachements", attachementData);
    data.append("prepared_by_id", value.prepared_by_id);
    data.append("responder_id", value.responder_id);
    data.append("project_id", project?.payload?.id);
    value.drawing_reference_image?.fileList.forEach((file: any) => {
      data.append("drawing_reference_image", file?.originFileObj);
    });
    // value.attachements_files?.fileList.forEach((file: any) => {
    //   data.append("attachements_files", file?.originFileObj);
    // });
    attachements.forEach((attachement: any) => {
      if (attachement.uid !== "") {
        data.append("attachements_files", attachement.file);
      }
    });

    setLoading(true);
    AddRFI(data)
      .then(() => {
        fetchRFI();
        form.resetFields();
        handleOk();
        setLoading(false);
        OpenNotification(NotificationType.SUCCESS, Message.RFI_SUCCESS, "");
      })
      .catch((error) => {
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            Message.RFI_FAILED,
            e.message
          )
        );
      });
  };

  console.log(attachements);

  return (
    <>
      <Button
        loading={
          user.isPending ||
          users.isPending ||
          project.isPending ||
          rfi.isPending
        }
        className="btn-outline-secondary"
        style={{ float: "right" }}
        icon={<PlusOutlined />}
        onClick={() => setIsModalVisible(true)}
      >
        Add RFI
      </Button>
      <Modal
        style={{ top: 10 }}
        title={
          <div style={{ textAlign: "center" }}>
            <h4>Request for information</h4>
          </div>
        }
        visible={isModalVisible}
        onCancel={handleOk}
        width={1024}
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
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 14 }}
          className="no-gutter"
          onFinish={Submit}
          form={form}
          initialValues={{
            rfi_date: moment(),
            under_review: "Material under review and the relevant request",
            prepared_by_id:
              users?.payload.length > 0
                ? users?.payload.filter(
                    (data) => data.id === getUserData().id
                  )[0].id
                : 0,
          }}
        >
          <div className="row" style={{ margin: 0, padding: 0 }}>
            <div className="col-md-6">
              <Form.Item label="Project">
                <Input value={project.payload?.name} />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item label="RFI number">
                <Input
                  value={
                    project.payload?.id
                      ? FormatRFINumber(project.payload, rfi.payload.length + 1)
                      : ""
                  }
                />
              </Form.Item>
            </div>
          </div>
          <div className="row" style={{ margin: 0, padding: 0 }}>
            <div className="col-md-6">
              <Form.Item label="To" name="responder_id">
                <Select placeholder="select">
                  {users.payload.map((e, index) => (
                    <Select.Option key={index} value={e.id}>
                      {e.full_name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item label="From" name="prepared_by_id">
                <Select placeholder="select">
                  {users.payload.map((e, index) => (
                    <Select.Option key={index} value={e.id}>
                      {e.full_name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
          </div>
          <div className="row" style={{ margin: 0, padding: 0 }}>
            <div className="col-md-6">
              <Form.Item label="date" name="rfi_date">
                <DatePicker name="rfi_date" />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item label="Project no">
                <Input value={`00${rfi.payload.length + 1}`} />
              </Form.Item>
            </div>
          </div>

          <Divider style={{ marginTop: 0, borderColor: "#d9d9d9" }} />

          <div className="row" style={{ padding: 0, margin: 0 }}>
            <div className="col-md-3"></div>
            <div className="col-md-6">
              <Form.Item label="Title" name="title">
                <Input value="" />
              </Form.Item>
            </div>
          </div>

          <Divider style={{ marginTop: 0, borderColor: "#d9d9d9" }} />

          <Form.Item
            label="Specification Section:"
            name="specification_section"
            className="p-0 m-0"
          >
            <Input value="" />
          </Form.Item>
          <Form.Item label="Paragraph:" name="paragraph" className="p-0 m-0">
            <Input value="dsfsdfksdbfj" />
          </Form.Item>
          <Form.Item
            label="Drawing reference:"
            name="drawing_reference"
            className="p-0 m-0"
          >
            <Input value="dsfsdfksdbfj" />
          </Form.Item>
          <Form.Item
            label=":"
            name="drawing_reference_image"
            className="p-0 m-0"
          >
            <Upload
              type="select"
              multiple={true}
              beforeUpload={() => {
                return false;
              }}
            >
              <Button icon={<UploadOutlined />}>
                Upload drawing reference
              </Button>
            </Upload>
          </Form.Item>
          <Form.Item label="Detail" name="detail" className="">
            <Input className="align-right" value="dsfsdfksdbfj" />
          </Form.Item>

          <Divider style={{ marginTop: 0, borderColor: "#d9d9d9" }} />

          <div className="row">
            <div className="col-md-9">
              <Form.Item name="under_review" label="" className="">
                <Input
                  className="align-right"
                  value="Material under review and the relevant request"
                />
              </Form.Item>
            </div>
            <div className="col-md-3">
              <Button
                type="primary"
                shape="circle"
                size="small"
                icon={<PlusOutlined />}
                onClick={() => {
                  let fr = description;
                  fr.push({ value: "" });
                  setDescription([...fr]);
                }}
              />

              {/* <PlusOutlined
                onClick={() => {
                  let fr = description;
                  fr.push({ value: "" });
                  setDescription([...fr]);
                }}
              /> */}
            </div>
          </div>

          <div style={{ paddingLeft: 50 }}>
            {description.map((data, index) => (
              <div className="row">
                <div className="col-md-9">
                  <Form.Item style={{ width: "100%" }} label="">
                    <Input
                      className="align-right"
                      value={data.value}
                      onChange={(e: any) => {
                        let st = data;
                        st.value = e.target.value;
                        description[index] = st;
                        setDescription([...description]);
                      }}
                    />
                  </Form.Item>
                </div>
                <div className="col-md-3">
                  <>
                    {index === 0 ? null : (
                      <MinusCircleOutlined
                        size={30}
                        className="ml-3 dynamic-delete-button"
                        onClick={() => {
                          let fr = description;
                          fr.splice(index, 1);
                          setDescription([...fr]);
                        }}
                      />
                    )}
                  </>
                </div>
              </div>
            ))}
          </div>

          <Divider style={{ marginTop: 0, borderColor: "#d9d9d9" }} />

          <div>
            <div className="row">
              <div className="col-md-9">
                <p>Attachements/Approvals/Test Results, if any:</p>
              </div>
              <div className="col-md-3">
                <Button
                  type="primary"
                  shape="circle"
                  size="small"
                  icon={<PlusOutlined />}
                  onClick={() => {
                    let fr = attachements;
                    fr.push({ value: "", file: { uid: "" } });
                    setAttachements([...fr]);
                  }}
                />
              </div>
            </div>
            {attachements.map((attachement, index) => (
              <div className="row">
                <div className="col-md-9">
                  <Form.Item label="">
                    <Input.TextArea
                      rows={4}
                      value={attachement.value}
                      onChange={(e: any) => {
                        let st = attachement;
                        st.value = e.target.value;
                        attachements[index] = st;
                        setAttachements([...attachements]);
                      }}
                    />
                  </Form.Item>
                </div>
                <div className="col-md-3">
                  {index === 0 ? null : (
                    <MinusCircleOutlined
                      className="ml-3 dynamic-delete-button"
                      onClick={() => {
                        let fr = attachements;
                        fr.splice(index, 1);
                        setAttachements([...fr]);
                      }}
                    />
                  )}
                </div>
                <div className="col-md-12">
                  <Form.Item name="attachements_files">
                    <Upload
                      type="select"
                      multiple={false}
                      beforeUpload={() => {
                        return false;
                      }}
                      onChange={(e: any) => {
                        let st: any = attachement;
                        st.file = e.file;
                        attachements[index] = st;
                        setAttachements([...attachements]);
                      }}
                    >
                      <Button icon={<UploadOutlined />}>Add Attachments</Button>
                    </Upload>
                  </Form.Item>
                </div>
              </div>
            ))}
          </div>

          <Divider style={{ marginTop: 10, borderColor: "#d9d9d9" }} />

          <div className="pt-20">
            <div className="row">
              <div className="col-md-2">Requested By:</div>
              <div className="col-md-2">{user.payload?.full_name}</div>
            </div>
            <div className="row">
              <div className="col-md-2">Responsibility:</div>
              <div className="col-md-2">{user.payload?.role}</div>
            </div>
            <div className="row">
              <div className="col-md-2">Date:</div>
              <div className="col-md-2">{moment().format("DD-MMM-YYYY")}</div>
            </div>
            <div className="row">
              <div className="col-md-2">Signature:</div>
              <div className="col-md-2">
                <SignatureComponent user={user.payload} />
              </div>
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
  // query: state.query.fetchAll,
  // users: state.user.fetchAll,
  users: state.user.fetchAll,
  user: state.user.fetchOne,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  // fetchQuery: (action: any) => dispatch(fetchAllQuery(action)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddRFIComponent);
