import { EditOutlined, UploadOutlined } from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Modal,
  Progress,
  Select,
  Upload,
} from "antd";
import axios from "axios";
import moment from "moment";
import { FC, useState } from "react";
import { connect } from "react-redux";
import { NotificationType } from "../../../../../../../constants/Constants";
import { API_BASE_URI, BASE_URI } from "../../../../../../../redux/ApiCall";
import {
  ErrorHandler,
  getUserData,
} from "../../../../../../../utilities/utilities";
import { OpenNotification } from "../../../../../../common/Notification/Notification.component";
import { UploadType } from "../AddUpload/AddUpload.util";
import { EditUploadPropType } from "./EditUpload.util";

const EditUploadComponent: FC<EditUploadPropType> = ({
  module,
  project,
  upload,
  fetchData,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [uploadType, setUploadType] = useState(upload.upload_type);
  const [progress, setProgress] = useState(0);

  const handleOk = () => {
    setIsModalVisible(false);
    setUploadType(UploadType.FILE);
    setProgress(0);
  };

  const Submit = (value: any) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("id", upload.id.toString());
    formData.append("date", value.date?.format("YYYY-MM-DD"));
    formData.append("name", value.name);
    formData.append("module", module);
    formData.append("reference_no", value.reference_no);
    formData.append("upload_type", uploadType);
    formData.append("uploaded_by_id", getUserData().id.toString());
    formData.append("project_id", project.payload?.id.toString());
    if (uploadType === UploadType.FILE)
      formData.append("file", value.file.file);
    formData.append("link", value.link);

    axios
      .put(`${API_BASE_URI}/file-storage`, formData, {
        onUploadProgress: function (progress: any) {
          if (uploadType === UploadType.FILE) {
            setProgress(Math.round((progress.loaded * 100) / progress.total));
          }
        },
      })
      .then(() => {
        fetchData();
        form.resetFields();
        handleOk();
        setLoading(false);
        OpenNotification(NotificationType.SUCCESS, "File uploaded", "");
      })
      .catch((error: any) => {
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            "File not uploaded",
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
        forceRender
        style={{ top: 10 }}
        title="Register upload"
        open={isModalVisible}
        onCancel={handleOk}
        className="fixed-modal"
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
              Edit
            </Button>
          </>,
        ]}
      >
        <Form
          layout="vertical"
          onFinish={Submit}
          form={form}
          initialValues={{ ...upload, file: null, date: moment(upload.date) }}
        >
          <div className="row">
            <div className="col-md-12">
              <Form.Item
                label="Date"
                name="date"
                rules={[{ required: false, message: "Date is required" }]}
              >
                <DatePicker />
              </Form.Item>
            </div>
            <div className="col-md-12">
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: false, message: "Name is required" }]}
              >
                <Input />
              </Form.Item>
            </div>
            <div className="col-md-12">
              <Form.Item label="Design type">
                <Input value={module} />
              </Form.Item>
            </div>
            <div className="col-md-12">
              <Form.Item
                label="Reference no"
                name="reference_no"
                rules={[
                  { required: false, message: "Reference no is required" },
                ]}
              >
                <Input />
              </Form.Item>
            </div>
            <div className="col-md-12">
              <Form.Item
                label="Upload type"
                name="type"
                rules={[
                  { required: false, message: "Upload type no is required" },
                ]}
              >
                <Select
                  className="w-100"
                  value={uploadType}
                  onChange={(e) => setUploadType(e)}
                >
                  <Select.Option value={UploadType.FILE}>
                    {UploadType.FILE}
                  </Select.Option>
                  <Select.Option value={UploadType.LINK}>
                    {UploadType.LINK}
                  </Select.Option>
                </Select>
              </Form.Item>
            </div>
            {uploadType === UploadType.FILE ? (
              <div className="col-md-12">
                <Form.Item
                  label="Upload"
                  name="file"
                  rules={[
                    {
                      required: form.getFieldValue("type") === UploadType.FILE,
                      message: "Upload is required",
                    },
                  ]}
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
                {
                  <a
                    href={`${BASE_URI}/${upload.file_name}`}
                    className="mt-2"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Previous file
                  </a>
                }
              </div>
            ) : (
              <div className="col-md-12">
                <Form.Item
                  label="Link"
                  name="link"
                  rules={[
                    {
                      required: form.getFieldValue("type") === UploadType.LINK,
                      type: "url",
                      message: "Link is required",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </div>
            )}
            <div className="col-md-12">
              <Form.Item label="Uploaded by">
                <Input value={getUserData().full_name} />
              </Form.Item>
            </div>
            {progress !== 0 ? (
              <div className="col-md-12">
                <Form.Item label=".">
                  <Progress percent={progress} />
                </Form.Item>
              </div>
            ) : null}
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
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditUploadComponent);
