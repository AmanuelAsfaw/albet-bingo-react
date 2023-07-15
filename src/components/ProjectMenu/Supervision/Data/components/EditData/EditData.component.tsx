import { Button, DatePicker, Form, Input, Modal, Select, Upload } from "antd";
import { FC, useState, useEffect } from "react";
import { connect } from "react-redux";
import { PlusOutlined, EditOutlined, UploadOutlined } from "@ant-design/icons";
import { EditDataPropType, sendData } from "../../util/Data.util";
import { OpenNotification } from "../../../../../common/Notification/Notification.component";
import {
  DATA_TYPES,
  NotificationType,
} from "../../../../../../constants/Constants";
import { ErrorHandler } from "../../../../../../utilities/utilities";
import {
  fetchAllData,
  fetchOneData,
} from "../../../../../../redux/Data/Data.action";
import { isEmpty } from "lodash";
import moment from "moment";

const EditDataComponent: FC<EditDataPropType> = ({
  project,
  users,
  data,
  fetchAllData,
  fetchOneData,
  id,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const dateFormat = "DD-MM-YYYY";

  useEffect(() => {
    if (isModalVisible) fetchOneData(id);
  }, [fetchOneData, id, isModalVisible]);

  useEffect(() => {
    if (!isEmpty(data.payload)) {
      form.setFieldsValue({
        ...data.payload,
        date: moment(data.payload.date, dateFormat),
      });
    }
  }, [data, isModalVisible]);

  const handleOk = () => {
    setIsModalVisible(false);
    form.resetFields();
    setLoading(false);
  };

  const Submit = (value: any) => {
    setLoading(true);
    let formData = new FormData();
    formData.append("id", id.toString());
    formData.append("project_id", project.payload?.id);
    formData.append("date", value.date.format(dateFormat));
    formData.append("reference_no", value.reference_no);
    formData.append("name", value.name);
    formData.append("type", value.type);
    if (value.file) formData.append("file", value.file?.file);
    formData.append("uploaded_by", `${data.payload?.uploaded_by}`);
    formData.append("revision_no", value.revision_no);

    sendData(formData)
      .then(() => {
        handleOk();
        setLoading(false);
        fetchAllData({ project_id: project.payload?.id });
        OpenNotification(NotificationType.SUCCESS, "Data edited!", "");
      })
      .catch((error) => {
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            "Failed to edit data",
            e.message
          )
        );
      });
  };

  return (
    <>
      <Button type="text" onClick={() => setIsModalVisible(true)}>
        Edit
      </Button>
      <Modal
        width={900}
        style={{ top: 30 }}
        title="Edit Data"
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
            ...data.payload,
            date: moment(data.payload.date, dateFormat),
          }}
        >
          <div className="row">
            <div className="col-md-6">
              <Form.Item
                label="Date"
                name="date"
                rules={[{ required: true, message: "Data Date Required!" }]}
              >
                <DatePicker allowClear={false} format={dateFormat} />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item
                label="Reference No"
                name="reference_no"
                rules={[
                  { required: true, message: "Data Reference Required!" },
                ]}
              >
                <Input />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: "Data Name Required!" }]}
              >
                <Input />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item
                label="Type"
                name="type"
                rules={[{ required: true, message: "Data Type Required!" }]}
              >
                <Select>
                  {DATA_TYPES.map((e, index) => (
                    <Select.Option key={index} value={e}>
                      {e}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item
                label="File"
                rules={[{ required: false, message: "Please input File" }]}
                name="file"
              >
                <Upload
                  defaultFileList={[
                    {
                      uid: "-1",
                      name: `${
                        data.payload?.document
                          ? data.payload?.document?.name
                          : "No File"
                      }`,
                      status: "done",
                    },
                  ]}
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
                    users.payload?.find(
                      (e) => e.id === data.payload?.uploaded_by
                    )?.full_name
                  }
                />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item
                label="Revision No"
                name="revision_no"
                rules={[
                  { required: true, message: "Data Revision No Required!" },
                ]}
              >
                <Input />
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
  data: state.data.fetchOne,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchAllData: (action: any) => dispatch(fetchAllData(action)),
  fetchOneData: (action: any) => dispatch(fetchOneData(action)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditDataComponent);
