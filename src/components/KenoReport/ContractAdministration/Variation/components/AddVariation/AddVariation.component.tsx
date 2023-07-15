import { Button, DatePicker, Form, Input, InputNumber, Modal, Select, Upload } from "antd";
import { FC, useState, useEffect } from "react";
import { connect } from "react-redux";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import {
  AddVariationPropType,
  sendData,
} from "../../util/Variation.util";
import { OpenNotification } from "../../../../../common/Notification/Notification.component";
import {
  CONTRACT_ADMINSTRATION_TYPES,
  NotificationType,
} from "../../../../../../constants/Constants";
import { ErrorHandler, getUserData } from "../../../../../../utilities/utilities";
import moment from "moment";
import { fetchAllUser } from "../../../../../../redux/User/User.action";
import { fetchAllVariations } from "../../../../../../redux/Variation/Variation.action";
import TextArea from "antd/lib/input/TextArea";

const AddVariationComponent: FC<
  AddVariationPropType
> = ({ project, users, fetchUser, fetchVariation }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [request, setRequest] = useState("Variation");

  const [form] = Form.useForm();
  const dateFormat = "DD-MM-YYYY";

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const handleOk = () => {
    setIsModalVisible(false);
    form.resetFields();
    setLoading(false);
    setRequest("Variation");
  };

  const Submit = (value: any) => {
    setLoading(true);
    let formData = new FormData();
    formData.append("project_id", project.payload?.id);
    formData.append("date", value.date.format(dateFormat));
    formData.append("request", value.request);
    formData.append("description", value.description);
    formData.append("type", value?.type);
    formData.append("file", value?.file?.file);

    sendData(formData)
      .then(() => {
        handleOk();
        setLoading(false);
        setRequest("Variation");
        fetchVariation({ project_id: project.payload?.id });
        OpenNotification(
          NotificationType.SUCCESS,
          "Variation saved!",
          ""
        );
      })
      .catch((error) => {
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            "Failed to save variation!",
            e.message
          )
        );
      });
  };

  const onChangeHandler = (value: string) => {
    setRequest(value)
  };

  return (
    <>
      <Button
        className="btn-outline-secondary"
        style={{ float: "right" }}
        icon={<PlusOutlined />}
        onClick={() => setIsModalVisible(true)}
      >
        New Request
      </Button>
      <Modal
        width={900}
        centered
        title="New Request"
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
            request:"Variation"
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
                    message: "Variation Date Required!",
                  },
                ]}
              >
                <DatePicker allowClear={false} format={dateFormat} />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item
                label="Request"
                name="request"
                rules={[
                  {
                    required: true,
                    message: "Variation Request Type Required!",
                  },
                ]}
              >
                <Select
                  onChange={(e) => {
                    console.log(e);
                    onChangeHandler(e);
                  }}
                >
                  <Select.Option value="Variation">
                    Variation
                  </Select.Option>
                  <Select.Option value="Time Extension">
                    Time Extension
                  </Select.Option>
                </Select>
              </Form.Item>
            </div>
            {request && request === "Variation" && <div className="col-md-6">
              <Form.Item
                label="Type"
                name="type"
              >
                <Select
                >
                  <Select.Option value="Substitution (Addition-Omission)">
                    Substitution (Addition-Omission)
                  </Select.Option>
                  <Select.Option value="Excess quantity">
                    Excess quantity
                  </Select.Option>
                  <Select.Option value="Extra Work">
                    Extra Work
                  </Select.Option>
                </Select>
              </Form.Item>
            </div>}
            {request && request === "Time Extension" && <div className="col-md-6">
              <Form.Item
                label="Type"
                name="type"
              >
                <InputNumber />
              </Form.Item>
            </div>}

            <div className="col-md-6">
              <Form.Item
                label="Description"
                name="description"
                rules={[{ required: true, message: "Description Required!" }]}
              >
                <TextArea autoSize rows={2} placeholder="Description" />
              </Form.Item>
            </div>
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
  fetchVariation: (action: any) =>
    dispatch(fetchAllVariations(action)),
  fetchUser: (action: any) => dispatch(fetchAllUser(action)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddVariationComponent);
