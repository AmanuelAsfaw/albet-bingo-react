import { PlusOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, Input, Modal, Progress, Upload } from "antd";
import axios from "axios";
import moment from "moment";
import { FC, useState } from "react";
import { connect } from "react-redux";
import {
  Message,
  NotificationType,
} from "../../../../../../../constants/Constants";
import { API_BASE_URI } from "../../../../../../../redux/ApiCall";
import { ErrorHandler } from "../../../../../../../utilities/utilities";
import { OpenNotification } from "../../../../../../common/Notification/Notification.component";
import { AddMediaPropType } from "../../util/media.util";

function getBase64(file: any) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

const AddMediaComponent: FC<AddMediaPropType> = ({ fetchMedia, project }) => {
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);
  const [progress, setProgress] = useState(0);

  const handleCancel = () => setPreviewVisible(false);

  const handlePreview = async (file: any) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const dummyRequest = ({ file, onSuccess }: any) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  const handleChange = ({ fileList }: any) => setFileList(fileList);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const handleOk = () => {
    setProgress(0);
    setIsModalVisible(false);
    setFileList([]);
  };

  const handleSubmit = (values: any) => {
    if (fileList.length !== 0) {
      const formData = new FormData();
      formData.append("date", values.upload_date.format("YYYY-MM-DD"));
      formData.append("description", values.description);
      formData.append("project_id", project?.payload?.id);
      fileList.forEach((file: any) => {
        formData.append("files", file?.originFileObj);
      });

      setLoading(true);
      axios
        .post(API_BASE_URI + "/media", formData, {
          onUploadProgress: function (progress: any) {
            setProgress(Math.round((progress.loaded * 100) / progress.total));
          },
        })
        .then(() => {
          fetchMedia();
          form.resetFields();
          handleOk();
          setLoading(false);
          OpenNotification(
            NotificationType.SUCCESS,
            Message.UPLOAD_SUCCESS,
            ""
          );
        })
        .catch((error: any) => {
          setLoading(false);
          ErrorHandler(error).map((e: any) =>
            OpenNotification(
              NotificationType.ERROR,
              Message.UPLOAD_FAILED,
              e.message
            )
          );
        });
    } else {
      OpenNotification(
        NotificationType.ERROR,
        "Please select files to upload",
        ""
      );
    }
  };

  return (
    <>
      <Button
        loading={false}
        className="btn-outline-secondary"
        style={{ float: "right" }}
        icon={<PlusOutlined />}
        onClick={() => setIsModalVisible(true)}
      >
        Add Media
      </Button>
      <Modal
        // style={{ top: 200 }}
        title="Photos - Videos"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        width={1024}
        footer={[
          <>
            <Button
              className="btn-outline"
              htmlType="reset"
              onClick={() => setIsModalVisible(false)}
            >
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
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 14 }}
          className="no-gutter"
          onFinish={handleSubmit}
          form={form}
          initialValues={{
            upload_date: moment(),
          }}
        >
          <div className="row">
            <div className="col-md-12">
              <Form.Item
                label="Date"
                rules={[{ required: true, message: "Please input date" }]}
                name="upload_date"
              >
                <DatePicker name="upload_date" />
              </Form.Item>
            </div>
            <div className="col-md-12">
              <Form.Item
                rules={[
                  { required: true, message: "Please input description" },
                ]}
                label="Description"
                name="description"
              >
                <TextArea name="description" rows={4} />
              </Form.Item>
            </div>
            <div className="col-md-12">
              <Form.Item label="Photos - Videos">
                <Upload
                  listType="picture-card"
                  accept="video/*,image/*"
                  multiple={true}
                  customRequest={dummyRequest}
                  fileList={fileList}
                  onPreview={handlePreview}
                  onChange={handleChange}
                  beforeUpload={(file: any) => {
                    const allowedExtensions = [
                      "png",
                      "jpeg",
                      "jpg",
                      "mp4",
                      "mkv",
                      "gif",
                      "mov",
                      "mpeg",
                    ];
                    if (
                      !allowedExtensions.includes(file.name.split(".").pop()!)
                    ) {
                      return true;
                    } else {
                      return false;
                    }
                  }}
                >
                  {fileList.length >= 8 ? null : uploadButton}
                </Upload>
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
      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
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
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  // fetchQuery: (action: any) => dispatch(fetchAllQuery(action)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddMediaComponent);
