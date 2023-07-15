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
import { EditOutlined } from "@ant-design/icons";
import { EditWorkPermitPropType, sendData } from "../../util/WorkPermit.util";
import { fetchAllUser } from "../../../../../../../redux/User/User.action";
import {
  fetchAllWorkPermit,
  fetchOneWorkPermit,
} from "../../../../../../../redux/WorkPermit/WorkPermit.action";
import { isEmpty } from "lodash";
import moment from "moment";
import { OpenNotification } from "../../../../../../common/Notification/Notification.component";
import { NotificationType } from "../../../../../../../constants/Constants";
import { ErrorHandler } from "../../../../../../../utilities/utilities";

const EditWorkPermitComponent: FC<EditWorkPermitPropType> = ({
  project,
  users,
  fetchUsers,
  work_permit,
  fetchAllWorkPermit,
  fetchOneWorkPermit,
  id,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const dateFormat = "DD-MM-YYYY";
  const { TextArea } = Input;

  useEffect(() => {
    if (isModalVisible) fetchUsers();
  }, [fetchUsers, isModalVisible]);

  useEffect(() => {
    if (isModalVisible) fetchOneWorkPermit(id);
  }, [fetchOneWorkPermit, id, isModalVisible]);

  useEffect(() => {
    if (!isEmpty(work_permit.payload)) {
      form.setFieldsValue({
        ...work_permit.payload,
        date: moment(work_permit.payload.date, dateFormat),
        submitted_title: users.payload.find(
          (e) => e.id === work_permit.payload.submitted_name
        )?.role,
        received_title: users.payload.find(
          (e) => e.id === work_permit.payload.received_name
        )?.role,
        submitted_date: moment(work_permit.payload.submitted_date, dateFormat),
        received_date: work_permit.payload.received_date
          ? moment(work_permit.payload.received_date, dateFormat)
          : undefined,
      });
    }
  }, [work_permit, isModalVisible]);

  const handleOk = () => {
    setIsModalVisible(false);
    form.resetFields();
    setLoading(false);
  };

  const Submit = (value: any) => {
    setLoading(true);
    const data = {
      ...value,
      id: id,
      project_id: project.payload?.id,
      date: value.date.format(dateFormat),
      submitted_date: value.submitted_date.format(dateFormat),
      received_date: value.received_date
        ? value.received_date.format(dateFormat)
        : "",
    };

    sendData(data)
      .then(() => {
        handleOk();
        setLoading(false);
        fetchAllWorkPermit({
          project_id: project.payload?.id,
        });
        OpenNotification(NotificationType.SUCCESS, "Work Permit edited!", "");
      })
      .catch((error) => {
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            "Failed to edit work permit",
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

  const onAllowedChange = (value: any) => {
    form.setFieldsValue({
      allowed_to_proceed: value.target.checked,
      refused_to_proceed: !value.target.checked,
    });
  };

  const onRefusedChange = (value: any) => {
    form.setFieldsValue({
      allowed_to_proceed: !value.target.checked,
      refused_to_proceed: value.target.checked,
    });
  };

  return (
    <>
      <Button type="text" onClick={() => setIsModalVisible(true)}>
        Edit
      </Button>
      <Modal
        style={{ top: 35 }}
        width={1300}
        className="fixed-modal"
        title="Work Permit Edit"
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
            date: work_permit.payload.date
              ? moment(work_permit.payload.date, dateFormat)
              : moment(),
            submitted_title: users.payload.find(
              (e) => e.id === work_permit.payload.submitted_name
            )?.role,
            received_title: users.payload.find(
              (e) => e.id === work_permit.payload.received_name
            )?.role,
            submitted_date: work_permit.payload.submitted_date
              ? moment(work_permit.payload.submitted_date, dateFormat)
              : moment(),
            received_date: work_permit.payload.received_date
              ? moment(work_permit.payload.received_date, dateFormat)
              : undefined,
          }}
        >
          <div className="row">
            <div className="col-md-6">
              <Form.Item label="Project">
                <Input value={project.payload?.name} />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item label="Format No" name="format_no">
                <Input />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item label="Client">
                <Input value={project.payload?.client?.name} />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item
                name="date"
                label="Date"
                rules={[{ required: true, message: "Please input Date" }]}
              >
                <DatePicker allowClear={false} format={dateFormat} />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item label="Consultant">
                <Input value={project.payload?.consultant?.name} />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item label="Block" name="block">
                <Input />
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <Form.Item label="MSE" name="mse">
                <Input />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item label="Work Permit No" name="work_permit_no">
                <Input />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item label="Trade" name="trade">
                <Input />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item label="Axis" name="axis">
                <Input />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item label="Spec.ref" name="spec_ref">
                <Input />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item label="Drawing ref" name="drawing_ref">
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
            <div className="col-md-6">
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

            <div className="col-md-6">
              <Form.Item label="Title" name="submitted_title">
                <Input />
              </Form.Item>
            </div>
            <div className="col-md-6">
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
            <div className="col-md-6">
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

            <div className="col-md-6">
              <Form.Item label="Title" name="received_title">
                <Input />
              </Form.Item>
            </div>
            <div className="col-md-6">
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
                valuePropName="checked"
                rules={[
                  {
                    required: false,
                    message: "Please input Allowed to Proceed",
                  },
                ]}
              >
                <Checkbox
                  checked={work_permit.payload.allowed_to_proceed}
                  onChange={onAllowedChange}
                >
                  Allowed to proceed
                </Checkbox>
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item
                name="refused_to_proceed"
                valuePropName="checked"
                rules={[
                  {
                    required: false,
                    message: "Please input Refused to Proceed",
                  },
                ]}
              >
                <Checkbox
                  checked={work_permit.payload.refused_to_proceed}
                  onChange={onRefusedChange}
                >
                  Refused to proceed
                </Checkbox>
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
  work_permit: state.work_permit.fetchOne,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchUsers: () => dispatch(fetchAllUser()),
  fetchAllWorkPermit: (action: any) => dispatch(fetchAllWorkPermit(action)),
  fetchOneWorkPermit: (action: any) => dispatch(fetchOneWorkPermit(action)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditWorkPermitComponent);
