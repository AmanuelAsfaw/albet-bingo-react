import { Button, DatePicker, Form, Input, Modal, Upload } from "antd";
import { FC, useState } from "react";
import { connect } from "react-redux";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import {
  AddSiteHandOverPropType,
  sendData,
} from "../../utils/SiteHandover.util";
import { OpenNotification } from "../../../../../common/Notification/Notification.component";
import { NotificationType } from "../../../../../../constants/Constants";
import { ErrorHandler } from "../../../../../../utilities/utilities";
import { fetchAllSiteHandover } from "../../../../../../redux/SiteHandover/SiteHandover.action";
import moment from "moment";
const AddSiteHandoverComponent: FC<AddSiteHandOverPropType> = ({
  fetchSiteHandovers,
  project,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const Submit = (value: any) => {
    setLoading(true);

    let formData = new FormData();

    formData.append("date", value.date.format("YYYY-MM-DD"));
    formData.append("project_id", project.payload?.id);
    formData.append("client_name", value.client_name);
    formData.append("file", value.file.file);
    formData.append("consultant_name", value.consultant_name);
    formData.append("contractor_name", value.contractor_name);
    formData.append("location", value.location);
    formData.append("project_name", value.project_name);

    sendData(formData)
      .then(() => {
        handleOk();
        form.resetFields();
        fetchSiteHandovers({ project_id: project.payload?.id });
        setLoading(false);
        OpenNotification(
          NotificationType.SUCCESS,
          "Site Handover Registered",
          ""
        );
      })
      .catch((error) => {
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            "Failed to Register Site Handover ",
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
        Register
      </Button>
      <Modal
        className="fixed-modal"
        centered
        title="Register"
        visible={isModalVisible}
        width={1000}
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
          initialValues={{
            project_name: project.payload?.name,
            client_name: project.payload?.client?.name,
            consultant_name: project.payload?.consultant?.name,
            contractor_name: project.payload?.contractor?.name,
            location: project.payload?.location,
            date: moment(),
          }}
        >
          <div className="row">
            <div className="col-md-4">
              <Form.Item
                label="Date"
                name="date"
                rules={[{ required: true, message: "required" }]}
              >
                <DatePicker />
              </Form.Item>
            </div>
            <div className="col-md-4">
              <Form.Item
                label="Project Name"
                name="project_name"
                rules={[{ required: true, message: "required" }]}
              >
                <Input placeholder="project" />
              </Form.Item>
            </div>
            <div className="col-md-4">
              <Form.Item
                label="Location"
                name="location"
                rules={[{ required: true, message: "required" }]}
              >
                <Input placeholder="location" />
              </Form.Item>
            </div>
          </div>

          <div className="row">
            <div className="col-md-4">
              <Form.Item
                label="Client"
                name="client_name"
                rules={[{ required: true, message: "required" }]}
              >
                <Input placeholder="client" />
              </Form.Item>
            </div>
            <div className="col-md-4">
              <Form.Item
                label="Contractor"
                name="contractor_name"
                rules={[{ required: true, message: "required" }]}
              >
                <Input placeholder="contractor" />
              </Form.Item>
            </div>
            <div className="col-md-4">
              <Form.Item
                label="Consultant"
                name="consultant_name"
                rules={[{ required: true, message: "required" }]}
              >
                <Input placeholder="consultant" />
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
  fetchSiteHandovers: (action: any) => dispatch(fetchAllSiteHandover(action)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddSiteHandoverComponent);
