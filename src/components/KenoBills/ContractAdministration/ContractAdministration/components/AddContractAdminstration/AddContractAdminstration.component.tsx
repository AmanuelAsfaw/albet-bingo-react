import { Button, DatePicker, Form, Input, Modal, Select, Upload } from "antd";
import { FC, useState, useEffect } from "react";
import { connect } from "react-redux";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import {
  AddContractAdminstrationPropType,
  sendData,
} from "../../util/ContractAdminstration.util";
import { OpenNotification } from "../../../../../common/Notification/Notification.component";
import {
  CONTRACT_ADMINSTRATION_TYPES,
  NotificationType,
} from "../../../../../../constants/Constants";
import { ErrorHandler, getUserData } from "../../../../../../utilities/utilities";
import moment from "moment";
import { fetchAllContractAdminstration } from "../../../../../../redux/ContractAdminstration/ContractAdminstration.action";
import { fetchAllUser } from "../../../../../../redux/User/User.action";

const AddContractAdminstrationComponent: FC<
  AddContractAdminstrationPropType
> = ({ project, users, fetchUser, fetchAllContractAdminstration }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState("");
  console.log(
    "🚀 ~ file: AddContractAdminstration.component.tsx ~ line 25 ~ type",
    type
  );
  const [form] = Form.useForm();
  const dateFormat = "DD-MM-YYYY";

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const handleOk = () => {
    setIsModalVisible(false);
    form.resetFields();
    setLoading(false);
    setType("");
  };

  const Submit = (value: any) => {
    setLoading(true);
    let formData = new FormData();
    formData.append("project_id", project.payload?.id);
    formData.append("date", value.date.format(dateFormat));
    formData.append("reference_no", value.reference_no);
    formData.append("name", value.name);
    formData.append("type", value.type);
    formData.append("file", value?.file?.file);
    formData.append("uploaded_by", `${getUserData().id}`);
    if (value.expiry_date)
      formData.append("expiry_date", value.expiry_date.format(dateFormat));

    sendData(formData)
      .then(() => {
        handleOk();
        setLoading(false);
        setType("");
        fetchAllContractAdminstration({ project_id: project.payload?.id });
        OpenNotification(
          NotificationType.SUCCESS,
          "Contract adminstration saved!",
          ""
        );
      })
      .catch((error) => {
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            "Failed to save contract adminstration ",
            e.message
          )
        );
      });
  };

  const onChangeHandler = (value: string) => {
    setType("");
    if (
      value === "Performance Guarantee" ||
      value === "Advance Guarantee" ||
      value === "Securities" ||
      value === "Contract Document"
    ) {
      setType(value);
    }
  };

  return (
    <>
      <Button
        className="btn-outline-secondary"
        style={{ float: "right" }}
        icon={<PlusOutlined />}
        onClick={() => setIsModalVisible(true)}
      >
        New Contract
      </Button>
      <Modal
        width={900}
        centered
        title="New Contract Adminstration"
        visible={isModalVisible}
        onCancel={handleOk}
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
            date: moment(),
          }}
        >
          <div className="row">
            <div className="col-md-6">
              <Form.Item
                label="Date"
                name="date"
                rules={[
                  {
                    required: true,
                    message: "Contract Adminstration Date Required!",
                  },
                ]}
              >
                <DatePicker allowClear={false} format={dateFormat} />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item
                label="Reference No"
                name="reference_no"
                rules={[
                  {
                    required: true,
                    message: "Contract Adminstration Reference Required!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item
                label="Name"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Contract Adminstration Name Required!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item
                label="Type"
                name="type"
                rules={[
                  {
                    required: true,
                    message: "Contract Adminstration Type Required!",
                  },
                ]}
              >
                <Select
                  onChange={(e) => {
                    console.log(e);
                    onChangeHandler(e);
                  }}
                >
                  {CONTRACT_ADMINSTRATION_TYPES.map((e, index) => (
                    <Select.Option key={index} value={e}>
                      {e}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            {type === "Contract Document" ||
            type === "Performance Guarantee" ||
            type === "Advance Guarantee" ||
            type === "Securities" ? (
              <>
                <div className="col-md-6">
                  <Form.Item
                    label="Expiry Date"
                    name="expiry_date"
                    rules={[
                      {
                        required: true,
                        message: "Expiry Date Required!",
                      },
                    ]}
                  >
                    <DatePicker allowClear={false} format={dateFormat} />
                  </Form.Item>
                </div>
              </>
            ) : null}
            <div className="col-md-6">
              <Form.Item
                label="File"
                rules={[{ required: true, message: "Please input File" }]}
                name="file"
              >
                <Upload
                  name="file"
                  beforeUpload={() => {
                    return false;
                  }}
                  type="select"
                  multiple={false}
                  maxCount={1}
                >
                  <Button
                    className="btn-outline-secondary"
                    style={{ width: "100%" }}
                  >
                    <UploadOutlined /> Click to Upload
                  </Button>
                </Upload>
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item
                label="Uploaded By"
                rules={[
                  {
                    required: false,
                    message: "Contract Adminstration Uploaded By Required!",
                  },
                ]}
              >
                <Input
                  value={
                    users.payload.find((e) => e.id === getUserData().id)
                      ?.full_name
                  }
                />
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
  users: state.user.fetchAll,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchAllContractAdminstration: (action: any) =>
    dispatch(fetchAllContractAdminstration(action)),
  fetchUser: (action: any) => dispatch(fetchAllUser(action)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddContractAdminstrationComponent);
