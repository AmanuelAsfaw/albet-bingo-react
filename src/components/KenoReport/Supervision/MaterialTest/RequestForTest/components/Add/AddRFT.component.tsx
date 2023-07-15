import { Button, DatePicker, Divider, Form, Input, Modal, Select } from "antd";
import { FC, useState, useEffect } from "react";
import { connect } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";
import { AddRFTPropType, sendData } from "../../util/RequestForTest.util";
import { fetchAllUser } from "../../../../../../../redux/User/User.action";
import moment from "moment";
import {
  ErrorHandler,
  getUserData,
  zeroPad,
} from "../../../../../../../utilities/utilities";
import { OpenNotification } from "../../../../../../common/Notification/Notification.component";
import { NotificationType } from "../../../../../../../constants/Constants";
import { fetchAllRequestForTest } from "../../../../../../../redux/RequestForTest/RequestForTest.action";

const AddRFTComponent: FC<AddRFTPropType> = ({
  project,
  users,
  fetchUsers,
  request_for_test,
  fetchAllRequestForTest,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const dateFormat = "DD-MM-YYYY";
  const { TextArea } = Input;

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
      is_test_received: false,
    };
    sendData(data)
      .then(() => {
        handleOk();
        setLoading(false);
        fetchAllRequestForTest({
          project_id: project.payload?.id,
        });
        OpenNotification(
          NotificationType.SUCCESS,
          "Request for test saved!",
          ""
        );
      })
      .catch((error) => {
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            "Failed to save request for test",
            e.message
          )
        );
      });
  };

  const onTestRequiredByChange = (value: any) => {
    form.setFieldsValue({
      test_required_by_title: users.payload.find((e) => e.id === value)?.role,
    });
  };

  const onTestReceivedByChange = (value: any) => {
    form.setFieldsValue({
      test_received_by_title: users.payload.find((e) => e.id === value)?.role,
    });
  };

  return (
    <>
      <Button
        className="btn-outline-secondary mt-4 mr-3"
        style={{ float: "right" }}
        icon={<PlusOutlined />}
        onClick={() => setIsModalVisible(true)}
      >
        New Request
      </Button>
      <Modal
        style={{ top: 35 }}
        width={1000}
        title="New Request For Test"
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
            test_required_by: getUserData().id,
            test_required_by_title: users.payload.find(
              (e) => e.id === getUserData().id
            )?.role,
            test_no: `${zeroPad(request_for_test.payload.length + 1)}`,
          }}
        >
          <div className="row">
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
              <Form.Item label="Format No" name="format_no">
                <Input />
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <Form.Item label="Block" name="block">
                <Input />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item label="Test No" name="test_no">
                <Input />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item label="Axis" name="axis">
                <Input />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item label="Trade" name="trade">
                <Input />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item label="Spec. Ref" name="spec_ref">
                <Input />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item label="Drawing Ref" name="drawing_ref">
                <Input />
              </Form.Item>
            </div>
          </div>
          <Divider />
          <div className="row">
            <div className="col-md-12">
              <Form.Item label="Test Required" name="test_required">
                <TextArea autoSize={{ minRows: 4, maxRows: 6 }} />
              </Form.Item>
            </div>
          </div>
          <Divider />
          <div className="row">
            <div className="col-md-6">
              <Form.Item
                label="Test Required By"
                name="test_required_by"
                rules={[
                  { required: true, message: "Test Required By Required!" },
                ]}
              >
                <Select showSearch onChange={onTestRequiredByChange}>
                  {users.payload.map((e, i) => (
                    <Select.Option key={i + Date.now() + 70} value={e.id}>
                      {e.full_name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item
                label="Test Received By"
                name="test_received_by"
                rules={[
                  { required: true, message: "Test Received By Required!" },
                ]}
              >
                <Select showSearch onChange={onTestReceivedByChange}>
                  {users.payload.map((e, i) => (
                    <Select.Option key={i + Date.now() + 70} value={e.id}>
                      {e.full_name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item label="Title" name="test_required_by_title">
                <Input />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item label="Title" name="test_received_by_title">
                <Input />
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
  users: state.user.fetchAll,
  project: state.project.fetchOne,
  request_for_test: state.request_for_test.fetchAll,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchUsers: () => dispatch(fetchAllUser()),
  fetchAllRequestForTest: (action: any) =>
    dispatch(fetchAllRequestForTest(action)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddRFTComponent);
