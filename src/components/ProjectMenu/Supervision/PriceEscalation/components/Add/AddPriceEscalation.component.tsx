import { Button, Form, Input, InputNumber, Modal, Select, Upload } from "antd";
import { FC, useState } from "react";
import { connect } from "react-redux";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import {
  AddPriceEscalationPropType,
  sendData,
} from "../../util/PriceEscalation.util";
import { OpenNotification } from "../../../../../common/Notification/Notification.component";
import {
  Message,
  NotificationType,
} from "../../../../../../constants/Constants";
import { ErrorHandler } from "../../../../../../utilities/utilities";
import { fetchAllPriceEscalationFile } from "../../../../../../redux/PriceEscalationFile/PriceEscalationFile.action";
import { toNumber } from "lodash";
const AddPriceEscalationComponent: FC<AddPriceEscalationPropType> = ({
  users,
  fetchPriceEscalationFile,
  price_escalations,
  project,
  payments,
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

    formData.append("total_amount", value.total_amount);
    formData.append("description", value.description);
    if (value.checked_by !== "")
      formData.append("checked_by", value.checked_by);
    if (value.approved_by !== "")
      formData.append("approved_by", value.checked_by);
    formData.append("file", value.file.file);
    formData.append("project_id", project.payload?.id);

    sendData(formData)
      .then(() => {
        fetchPriceEscalationFile({ project_id: project.payload?.id });
        handleOk();
        form.resetFields();
        setLoading(false);
        OpenNotification(
          NotificationType.SUCCESS,
          Message.PRICE_ESCALATION_SUCCESS,
          ""
        );
      })
      .catch((error) => {
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            Message.PRICE_ESCALATION_FAILED,
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
        Register Price-Escalation
      </Button>
      <Modal
        className="fixed-modal"
        centered
        title="Register Price-Escalation"
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
          initialValues={{ approved_by: "", checked_by: "" }}
        >
          <div className="row">
            <div className="col-md-12">
              <Form.Item label="Price-Escalation No">
                <Input value={price_escalations.payload.length + 1} />
              </Form.Item>
            </div>
            <div className="col-md-12">
              <Form.Item
                label="Description"
                rules={[{ required: true, message: "Description Required!" }]}
                name="description"
              >
                <Input.TextArea rows={3} placeholder="description" />
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
            <div className="col-md-6">
              <Form.Item
                label="Total Amount"
                rules={[{ required: true, message: "Total Amount Required!" }]}
                name={"total_amount"}
              >
                <InputNumber
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) =>
                    toNumber(value ? value.replace(/\$\s?|(,*)/g, "") : "")
                  }
                />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item label="Checked By" name="checked_by">
                <Select>
                  <Select.Option key={0} value={""}>
                    -
                  </Select.Option>
                  {users.payload.map((e, index) => (
                    <Select.Option key={index + 1} value={e.id}>
                      {e.full_name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item label="Approved By" name="approved_by">
                <Select>
                  <Select.Option key={0} value={""}>
                    -
                  </Select.Option>
                  {users.payload.map((e, index) => (
                    <Select.Option key={index + 1} value={e.id}>
                      {e.full_name}
                    </Select.Option>
                  ))}
                </Select>
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
  price_escalations: state.price_escalation_file.fetchAll,
  users: state.user.fetchAll,
  project: state.project.fetchOne,
  payments: state.payment_file.fetchAll,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchPriceEscalationFile: (action: any) =>
    dispatch(fetchAllPriceEscalationFile(action)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddPriceEscalationComponent);
