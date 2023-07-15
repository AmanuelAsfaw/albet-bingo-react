import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  Modal,
  Select,
  Divider,
} from "antd";
import { FC, useState, useEffect } from "react";
import { connect } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";
import { AddWorkPermitPropType, sendData } from "../../util/WorkPermit.util";
import moment from "moment";
import { fetchAllUser } from "../../../../../../../redux/User/User.action";
import {
  ErrorHandler,
  getUserData,
  zeroPad,
} from "../../../../../../../utilities/utilities";
import { OpenNotification } from "../../../../../../common/Notification/Notification.component";
import { NotificationType } from "../../../../../../../constants/Constants";
import { fetchAllWorkPermit } from "../../../../../../../redux/WorkPermit/WorkPermit.action";

const AddWorkPermitComponent: FC<AddWorkPermitPropType> = ({
  project,
  users,
  fetchUsers,
  work_permit,
  fetchAllWorkPermit,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const dateFormat = "DD-MM-YYYY";
  const { TextArea } = Input;

  useEffect(() => {
    if (isModalVisible)
      fetchAllWorkPermit({
        project_id: project.payload?.id,
      });
  }, [fetchAllWorkPermit, project, isModalVisible]);

  useEffect(() => {
    if (isModalVisible) fetchUsers();
  }, [fetchUsers, isModalVisible]);

  const handleOk = () => {
    setIsModalVisible(false);
    form.resetFields();
    setLoading(false);
  };

  const Submit = (value: any) => {
    setLoading(true);
    const data = {
      ...value,
      project_id: project.payload?.id,
      date: value.date.format(dateFormat),
      submitted_date: value.submitted_date.format(dateFormat),
    };
    sendData(data)
      .then(() => {
        handleOk();
        setLoading(false);
        fetchAllWorkPermit({
          project_id: project.payload?.id,
        });
        OpenNotification(NotificationType.SUCCESS, "Work Permit saved!", "");
      })
      .catch((error) => {
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            "Failed to save work permit",
            e.message
          )
        );
      });
  };

  const onSubmittedByChange = (value: any) => {
    form.setFieldsValue({
      submitted_title: users.payload.find((e) => e.id === value)?.role,
    });
  };

  const onReceivedByChange = (value: any) => {
    form.setFieldsValue({
      received_title: users.payload.find((e) => e.id === value)?.role,
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
        New Request
      </Button>
      <Modal
        style={{ top: 35 }}
        width={1000}
        className="fixed-modal"
        title="New Work Permit"
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
            submitted_date: moment(),
            work_permit_no: `${zeroPad(work_permit.payload.length + 1)}`,
            submitted_name: getUserData().id,
            submitted_title: users.payload.find(
              (e) => e.id === getUserData().id
            )?.role,
          }}
        >
          <div className="row">
            <div className="col-md-6">
              <Form.Item label="Project">
                <Input value={project.payload?.name} />
              </Form.Item>
            </div>
            <div className="col-md-2">
              <Form.Item label="Format No" name="format_no">
                <Input />
              </Form.Item>
            </div>
            <div className="col-md-2">
              <Form.Item
                name="date"
                label="Date"
                rules={[{ required: true, message: "Please input Date" }]}
              >
                <DatePicker allowClear={false} format={dateFormat} />
              </Form.Item>
            </div>
            <div className="col-md-2">
              <Form.Item label="Block" name="block">
                <Input />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item label="Client">
                <Input value={project.payload?.client?.name} />
              </Form.Item>
            </div>
            <div className="col-md-2">
              <Form.Item label="Work Permit No" name="work_permit_no">
                <Input />
              </Form.Item>
            </div>
            <div className="col-md-2">
              <Form.Item label="Axis" name="axis">
                <Input />
              </Form.Item>
            </div>
            <div className="col-md-2">
              <Form.Item label="Drawing ref" name="drawing_ref">
                <Input />
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <Form.Item label="Consultant">
                <Input value={project.payload?.consultant?.name} />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item label="MSE" name="mse">
                <Input />
              </Form.Item>
            </div>

            <div className="col-md-6">
              <Form.Item label="Trade" name="trade">
                <Input />
              </Form.Item>
            </div>

            <div className="col-md-6">
              <Form.Item label="Spec.ref" name="spec_ref">
                <Input />
              </Form.Item>
            </div>
          </div>
          <Divider />
          <div className="row">
            <div className="col-md-12">
              <Form.Item label="Activity Requested" name="activity_requested">
                <TextArea autoSize={{ minRows: 4, maxRows: 6 }} />
              </Form.Item>
            </div>
          </div>
          <Divider />
          <div style={{ paddingTop: "10px", paddingBottom: "10px" }}>
            <span>Submitted By:</span>
          </div>
          <div className="row">
            <div className="col-md-3">
              <Form.Item
                label="Name"
                name="submitted_name"
                rules={[{ required: true, message: "Name Required!" }]}
              >
                <Select showSearch onChange={onSubmittedByChange}>
                  {users.payload.map((e, i) => (
                    <Select.Option key={i + Date.now() + 70} value={e.id}>
                      {e.full_name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>

            <div className="col-md-3">
              <Form.Item label="Title" name="submitted_title">
                <Input />
              </Form.Item>
            </div>

            <div className="col-md-3">
              <Form.Item
                name="submitted_date"
                label="Date"
                rules={[
                  { required: false, message: "Please input Submitted Date" },
                ]}
              >
                <DatePicker allowClear={false} format={dateFormat} />
              </Form.Item>
            </div>
          </div>
          <Divider />
          <div style={{ paddingTop: "10px", paddingBottom: "10px" }}>
            <span>Received By:</span>
          </div>
          <div className="row">
            <div className="col-md-3">
              <Form.Item
                label="Name"
                name="received_name"
                rules={[{ required: true, message: "Name Required!" }]}
              >
                <Select showSearch onChange={onReceivedByChange}>
                  {users.payload.map((e, i) => (
                    <Select.Option key={i + Date.now() + 70} value={e.id}>
                      {e.full_name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>

            <div className="col-md-3">
              <Form.Item label="Title" name="received_title">
                <Input />
              </Form.Item>
            </div>
            <div className="col-md-3">
              <Form.Item
                name="received_date"
                label="Date"
                rules={[
                  { required: false, message: "Please input Received Date" },
                ]}
              >
                <DatePicker allowClear={false} format={dateFormat} />
              </Form.Item>
            </div>
          </div>
          <Divider />
          <div>
            <span>For Consultants use only:</span>
          </div>
          <div className="row">
            <div className="col-md-6">
              <Form.Item
                name="allowed_to_proceed"
                rules={[
                  {
                    required: false,
                    message: "Please input Allowed to Proceed",
                  },
                ]}
              >
                <Checkbox disabled>Allowed to proceed</Checkbox>
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item
                name="refused_to_proceed"
                rules={[
                  {
                    required: false,
                    message: "Please input Refused to Proceed",
                  },
                ]}
              >
                <Checkbox disabled>Refused to proceed</Checkbox>
              </Form.Item>
            </div>
          </div>
          <Divider />
          <div className="row">
            <div className="col-md-12">
              <Form.Item label="Comments if any" name="comment">
                <TextArea autoSize={{ minRows: 4, maxRows: 6 }} />
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
  work_permit: state.work_permit.fetchAll,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchUsers: () => dispatch(fetchAllUser()),
  fetchAllWorkPermit: (action: any) => dispatch(fetchAllWorkPermit(action)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddWorkPermitComponent);
