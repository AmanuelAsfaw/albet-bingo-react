import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, Input, Modal, Upload } from "antd";
import { toNumber } from "lodash";
import moment from "moment";
import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { Message, NotificationType } from "../../../../../../../constants/Constants";
import { fetchAllEmployerRequirements } from "../../../../../../../redux/EmployerRequirement/EmployerRequirement.action";
import { ErrorHandler } from "../../../../../../../utilities/utilities";
import { OpenNotification } from "../../../../../../common/Notification/Notification.component";
import { AddEmployerRequirementPropType, sendData } from "../../utils/EmployerRequirement.util";

const AddEmployerRequirementComponent: FC<AddEmployerRequirementPropType> = ({ fetchEmployerRequirement }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const { TextArea } = Input;
  
    const param = useParams()
    const [id, setId] = useState<number>(1);
    useEffect(() => {
      if (param.id) {
        setId(toNumber(param.id))
      }
    }, [param])
    const handleOk = () => {
      setIsModalVisible(false);
      form.resetFields();
    };
  
    const Submit = (value: any) => {
      setLoading(true);
    
      let formData = new FormData();
      formData.append("project_id",id.toString())
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
          className="btn-outline-secondary"
          style={{ float: "right" }}
          icon={<PlusOutlined />}
          onClick={() => setIsModalVisible(true)}
        >
          New Employer Requirement
        </Button>
        <Modal
          title="Employer Requirement"
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
                Register
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
  
  export default connect(mapStateToProps, mapDispatchToProps)(AddEmployerRequirementComponent);
  