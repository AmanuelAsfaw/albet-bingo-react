import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  Modal,
  Divider,
} from "antd";
import { FC, useState, useEffect } from "react";
import { connect } from "react-redux";
import { EyeOutlined } from "@ant-design/icons";
import { ViewWorkPermitPropType } from "../../util/WorkPermit.util";
import { fetchOneWorkPermit } from "../../../../../../../redux/WorkPermit/WorkPermit.action";
import { isEmpty, toNumber } from "lodash";
import moment from "moment";
import { fetchAllUser } from "../../../../../../../redux/User/User.action";

const ViewWorkPermitComponent: FC<ViewWorkPermitPropType> = ({
  project,
  work_permit,
  id,
  fetchOneWorkPermit,
  users,
  fetchUsers,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
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
        submitted_date: moment(work_permit.payload.submitted_date, dateFormat),
      });
    }
  }, [work_permit, isModalVisible]);

  const handleOk = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  return (
    <>
      <Button type="text" onClick={() => setIsModalVisible(true)}>
        Detail
      </Button>
      <Modal
        className="fixed-modal"
        style={{ top: 35 }}
        width={1300}
        title="Work Permit Detail"
        visible={isModalVisible}
        onCancel={handleOk}
        footer={[]}
      >
        <Form layout="vertical" form={form}>
          <div className="row">
            <div className="col-md-6">
              <Form.Item label="Project">
                <Input value={project.payload?.name} />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item label="Format No">
                <Input value={work_permit.payload.format_no} />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item label="Client">
                <Input value={project.payload?.client?.name} />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item
                label="Date"
                rules={[{ required: true, message: "Please input Date" }]}
              >
                <DatePicker
                  value={
                    work_permit.payload.date
                      ? moment(work_permit.payload.date, dateFormat)
                      : moment()
                  }
                  allowClear={false}
                  format={dateFormat}
                />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item label="Consultant">
                <Input value={project.payload?.consultant?.name} />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item label="Block">
                <Input value={work_permit.payload.block} />
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <Form.Item label="MSE">
                <Input value={work_permit.payload.mse} />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item label="Work Permit No">
                <Input value={work_permit.payload.work_permit_no} />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item label="Trade">
                <Input value={work_permit.payload.trade} />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item label="Axis">
                <Input value={work_permit.payload.axis} />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item label="Spec.ref">
                <Input value={work_permit.payload.spec_ref} />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item label="Drawing ref">
                <Input value={work_permit.payload.drawing_ref} />
              </Form.Item>
            </div>
          </div>
          <Divider />
          <div className="row">
            <div className="col-md-12">
              <Form.Item label="Activity Requested">
                <TextArea
                  value={work_permit.payload.activity_requested}
                  autoSize={{ minRows: 4, maxRows: 6 }}
                />
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
                rules={[{ required: true, message: "Name Required!" }]}
              >
                <Input
                  value={
                    users.payload.find(
                      (e) =>
                        e.id === toNumber(work_permit.payload.submitted_name)
                    )?.full_name
                  }
                />
              </Form.Item>
            </div>

            <div className="col-md-6">
              <Form.Item label="Title">
                <Input
                  value={
                    users.payload.find(
                      (e) =>
                        e.id === toNumber(work_permit.payload.submitted_name)
                    )?.role
                  }
                />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item
                label="Date"
                rules={[
                  { required: false, message: "Please input Submitted Date" },
                ]}
              >
                <DatePicker
                  value={
                    work_permit.payload.submitted_date
                      ? moment(work_permit.payload.submitted_date, dateFormat)
                      : moment()
                  }
                  allowClear={false}
                  format={dateFormat}
                />
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
                rules={[{ required: true, message: "Name Required!" }]}
              >
                <Input
                  value={
                    users.payload.find(
                      (e) =>
                        e.id === toNumber(work_permit.payload.received_name)
                    )?.full_name
                  }
                />
              </Form.Item>
            </div>

            <div className="col-md-6">
              <Form.Item label="Title">
                <Input
                  value={
                    users.payload.find(
                      (e) =>
                        e.id === toNumber(work_permit.payload.received_name)
                    )?.role
                  }
                />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item
                label="Date"
                rules={[
                  { required: false, message: "Please input Received Date" },
                ]}
              >
                <DatePicker
                  allowClear={false}
                  format={dateFormat}
                  value={
                    work_permit.payload.received_date
                      ? moment(work_permit.payload.received_date, dateFormat)
                      : undefined
                  }
                />
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
                rules={[
                  {
                    required: false,
                    message: "Please input Allowed to Proceed",
                  },
                ]}
              >
                <Checkbox checked={work_permit.payload.allowed_to_proceed}>
                  Allowed to proceed
                </Checkbox>
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item
                rules={[
                  {
                    required: false,
                    message: "Please input Refused to Proceed",
                  },
                ]}
              >
                <Checkbox checked={work_permit.payload.refused_to_proceed}>
                  Refused to proceed
                </Checkbox>
              </Form.Item>
            </div>
          </div>
          <Divider />
          <div className="row">
            <div className="col-md-12">
              <Form.Item label="Comments if any">
                <TextArea
                  value={work_permit.payload.comment}
                  autoSize={{ minRows: 4, maxRows: 6 }}
                />
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
  work_permit: state.work_permit.fetchOne,
  users: state.user.fetchAll,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchOneWorkPermit: (action: any) => dispatch(fetchOneWorkPermit(action)),
  fetchUsers: () => dispatch(fetchAllUser()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewWorkPermitComponent);
