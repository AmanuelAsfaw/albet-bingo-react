import { Button, DatePicker, Form, Input, Modal, Upload } from "antd";
import { FC, useState } from "react";
import { connect } from "react-redux";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { AddInspectionFilePropType, POST } from "../../utils/Inspection.util";
import { OpenNotification } from "../../../../../../common/Notification/Notification.component";
import { NotificationType } from "../../../../../../../constants/Constants";
import {
  ErrorHandler,
  getUserData,
} from "../../../../../../../utilities/utilities";
import { fetchAllDocuments } from "../../../../../../../redux/Document/Document.action";
import moment from "moment";
const AddInspectionFileComponent: FC<AddInspectionFilePropType> = ({
  fetchDocuments,
  project,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const Submit = (value: any) => {
    let formData = new FormData();
    formData.append("name", value.name);
    formData.append("type", "Inspection");
    formData.append("date", value.date.format("YYYY-MM-DD"));
    formData.append("detail_type", value.detail_type);

    formData.append("project_id", project.payload?.id);
    formData.append("file", value.file.file);
    setLoading(true);

    POST(formData)
      .then(() => {
        fetchDocuments({ type: "Inspection", project_id: project.payload?.id });
        handleOk();
        setLoading(false);
        OpenNotification(NotificationType.SUCCESS, "File Uploaded", "");
      })
      .catch((error) => {
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(NotificationType.ERROR, "Filed To Upload", e.message)
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
        Register
      </Button>
      <Modal
        className="fixed-modal"
        centered
        title="Site-Diary File"
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
          layout="vertical"
          onFinish={Submit}
          form={form}
          initialValues={{ date: moment() }}
        >
          <div className="row">
            <div className="col-md-12">
              <Form.Item label="Date" name="date">
                <DatePicker allowClear={false} />
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <Form.Item
                label="Location"
                rules={[{ required: true, message: "Please input Location" }]}
                name="name"
              >
                <Input placeholder="location" />
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <Form.Item
                label="Inspection Type"
                rules={[
                  { required: true, message: "Please input Inspection Type" },
                ]}
                name="detail_type"
              >
                <Input placeholder="type" />
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
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
          <div className="row">
            <div className="col-md-12">
              <Form.Item label="Uploaded By">
                <Input value={getUserData().full_name} />
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
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchDocuments: (action: any) => dispatch(fetchAllDocuments(action)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddInspectionFileComponent);
