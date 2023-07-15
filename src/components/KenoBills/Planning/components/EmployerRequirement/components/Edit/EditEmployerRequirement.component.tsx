import { EditOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, Input, Modal, Upload } from "antd";
import moment from "moment";
import { FC, useState } from "react";
import { connect } from "react-redux";
import { Message, NotificationType } from "../../../../../../../constants/Constants";
import { fetchAllEmployerRequirements } from "../../../../../../../redux/EmployerRequirement/EmployerRequirement.action";
import { ErrorHandler } from "../../../../../../../utilities/utilities";
import { OpenNotification } from "../../../../../../common/Notification/Notification.component";
import { EditEmployerRequirementPropType, sendData } from "../../utils/EmployerRequirement.util";

const EditEmployerRequirementComponent: FC<EditEmployerRequirementPropType> = ({ employer_requirement, fetchEmployerRequirement }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const { TextArea } = Input;

  const handleOk = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const Submit = (value: any) => {
    setLoading(true);

    let formData = new FormData();

    formData.append("date", value.date);
    formData.append("ref_no", value.ref_no);
    formData.append("file", value.file.file);
    formData.append("description", value.description);

    sendData(formData)
      .then(() => {
        handleOk();
        fetchEmployerRequirement();
        form.resetFields();
        setLoading(false);
        OpenNotification(
          NotificationType.SUCCESS,
          Message.EMPLOYER_REQUIREMENT_REGISTRATION_SUCCESS,
          ""
        );
      })
      .catch((error) => {
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            Message.EMPLOYER_REQUIREMENT_REGISTRATION_FAILED,
            e.message
          )
        );
      });
  };

  return (
    <>
      <Button
        type="text"
        icon={<EditOutlined />}
        onClick={() => setIsModalVisible(true)}
      >
        Edit Employer Requirement
      </Button>
      <Modal
        title="Edit Employer Requirement"
        className="fixed-modal"
        width={850}
        centered
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
              Save
            </Button>
          </>,
        ]}
      >
        <Form
          layout="vertical"
          onFinish={Submit}
          form={form}
          initialValues={{
            date: moment(employer_requirement.date),
            description: employer_requirement.description,
            ref_no: employer_requirement.ref_no,
          }}
        >
          <div className="row">
            <div className="col-md-6">
              <Form.Item
                label="Date"
                name="date"
                rules={[{ required: true, message: "Date Required!" }]}
              >
                <DatePicker />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item
                label="Reference Number"
                name="ref_no"
                rules={[
                  { required: true, message: "Reference Number Required!" },
                ]}
              >
                <Input placeholder="reference number" />
              </Form.Item>
            </div>
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
                  <Button className="btn-outline-secondary">
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
const mapStateToProps = (state: any) => ({});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchEmployerRequirement: (action: any) => dispatch(fetchAllEmployerRequirements(action)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditEmployerRequirementComponent);
