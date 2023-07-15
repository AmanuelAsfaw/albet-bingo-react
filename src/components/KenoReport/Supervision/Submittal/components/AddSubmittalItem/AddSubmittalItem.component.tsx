import { Button, Form, Modal, Input, Select, Upload } from "antd";
import { FC, useState } from "react";
import { connect } from "react-redux";

import { UploadOutlined } from "@ant-design/icons";
import {
  AddSubmittalItemPropType,
  getRefNumber,
  sendSubmittalItemData,
} from "../../util/Submittal.util";
import { OpenNotification } from "../../../../../common/Notification/Notification.component";
import {
  ErrorHandler,
  getLastId,
  getRevisionNumber,
} from "../../../../../../utilities/utilities";
import {
  Message,
  NotificationType,
  SubmittalAction,
  SubmittalItemType,
} from "../../../../../../constants/Constants";
import { fetchOneSubmittal } from "../../../../../../redux/Submittal/Submittal.action";

const AddSubmittalItemComponent: FC<AddSubmittalItemPropType> = ({
  fetchSubmittal,
  submittal_id,
  submittal,
  users,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [type, setType] = useState<any>(SubmittalItemType.NEW);
  const [id, setId] = useState<any>(1);

  const handleOk = () => {
    form.resetFields();
    setIsModalVisible(false);
  };

  const Submit = (value: any) => {
    setLoading(true);

    let formData = new FormData();

    if (value.cc) value.cc.forEach((e: any) => formData.append("cc", e));

    formData.append("remark", value.remark);
    formData.append("action", value.action);
    formData.append("action_by", value.action_by);
    formData.append("file", value.file.file);
    formData.append("submittal_id", submittal_id.toString());
    if (value.ref) formData.append("ref", value.ref);

    sendSubmittalItemData(formData)
      .then(() => {
        fetchSubmittal(submittal_id);
        handleOk();
        setLoading(false);
        OpenNotification(
          NotificationType.SUCCESS,
          Message.SUBMITTAL_SUCCESS,
          ""
        );
      })
      .catch((error) => {
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            Message.SUBMITTAL_FAILED,
            e.message
          )
        );
      });
  };

  return (
    <>
      <Button
        className="btn-outline-secondary"
        onClick={() => setIsModalVisible(true)}
        disabled={!submittal_id}
      >
        Upload a Submittal
      </Button>
      <Modal
        title="Upload a Submittal"
        centered
        className="fixed-modal"
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
            action: SubmittalAction.APPROVAL,
          }}
        >
          <div className="row">
            <div className="col-md-12">
              <Form.Item label="Type">
                <Select onChange={(e) => setType(e)} value={type}>
                  <Select.Option key={1} value={SubmittalItemType.NEW}>
                    {SubmittalItemType.NEW}
                  </Select.Option>
                  <Select.Option key={2} value={SubmittalItemType.RESUBMISSION}>
                    {SubmittalItemType.RESUBMISSION}
                  </Select.Option>
                </Select>
              </Form.Item>
            </div>
            {type === SubmittalItemType.NEW ? (
              <div className="col-md-6">
                <Form.Item label="Submittal Reference">
                  <Input
                    value={getRefNumber(
                      submittal.name,
                      getLastId(submittal.submittal_items)
                    )}
                  />
                </Form.Item>
              </div>
            ) : (
              <div className="col-md-6">
                <Form.Item
                  label="No"
                  name="ref"
                  rules={[{ message: "No is required", required: true }]}
                >
                  <Select placeholder="select" onChange={(e) => setId(e)}>
                    {submittal?.submittal_items?.map((e) => (
                      <Select.Option value={e.id}>
                        {getRefNumber(submittal.name, e.id)}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
            )}
            <div className="col-md-6">
              <Form.Item label="Revision No">
                <Input
                  value={
                    type === SubmittalItemType.NEW
                      ? 0
                      : getRevisionNumber(submittal.submittal_items, null, id)
                  }
                />
              </Form.Item>
            </div>

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
            <div className="col-md-12">
              <Form.Item
                label="Remark"
                name="remark"
                rules={[{ required: false, message: "Remark Required" }]}
              >
                <Input.TextArea rows={4} placeholder="remark" />
              </Form.Item>
            </div>
            <div className="col-md-12">
              <Form.Item
                label="Action"
                name="action"
                rules={[{ required: true, message: "Action Required!" }]}
              >
                <Select>
                  <Select.Option key="1" value={SubmittalAction.APPROVAL}>
                    {SubmittalAction.APPROVAL}
                  </Select.Option>
                  <Select.Option
                    key="2"
                    value={SubmittalAction.FOR_INFORMATION}
                  >
                    {SubmittalAction.FOR_INFORMATION}
                  </Select.Option>
                  <Select.Option
                    key="3"
                    value={SubmittalAction.FOR_PRELIMINARY}
                  >
                    {SubmittalAction.FOR_PRELIMINARY}
                  </Select.Option>
                  <Select.Option key="4" value={SubmittalAction.REVIEW}>
                    {SubmittalAction.REVIEW}
                  </Select.Option>
                </Select>
              </Form.Item>
            </div>
            <div className="col-md-12">
              <Form.Item label="CC" name="cc">
                <Select
                  mode="multiple"
                  allowClear
                  style={{ width: "100%" }}
                  placeholder="Please select"
                >
                  {users.map((e) => (
                    <Select.Option value={e.id}>{e.full_name}</Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            <div className="col-md-12">
              <Form.Item
                label="Action By"
                name="action_by"
                rules={[{ required: true, message: "Action by Required!" }]}
              >
                <Select placeholder="Please select">
                  {users.map((e) => (
                    <Select.Option value={e.id}>{e.full_name}</Select.Option>
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
const mapStateToProps = (state: any) => ({});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchSubmittal: (action: any) => dispatch(fetchOneSubmittal(action)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddSubmittalItemComponent);
