import { Button, DatePicker, Divider, Form, Input, Modal, Select } from "antd";
import { FC, useState, useEffect } from "react";
import { connect } from "react-redux";
import { EyeOutlined } from "@ant-design/icons";
import { ViewRFTPropType } from "../../util/RequestForTest.util";
import { fetchAllUser } from "../../../../../../../redux/User/User.action";
import { fetchOneRequestForTest } from "../../../../../../../redux/RequestForTest/RequestForTest.action";
import moment from "moment";

const ViewRFTComponent: FC<ViewRFTPropType> = ({
  id,
  users,
  request_for_test,
  fetchOneRequestForTest,
  fetchUsers,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const dateFormat = "DD-MM-YYYY";
  const { TextArea } = Input;

  useEffect(() => {
    if (isModalVisible) fetchOneRequestForTest(id);
  }, [fetchOneRequestForTest, id, isModalVisible]);

  useEffect(() => {
    if (isModalVisible) fetchUsers();
  }, [fetchUsers, isModalVisible]);

  const handleOk = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button type="text" onClick={() => setIsModalVisible(true)}>
        Detail
      </Button>
      <Modal
        style={{ top: 35 }}
        width={1000}
        className="fixed-modal"
        title="Request For Test Detail"
        visible={isModalVisible}
        onCancel={handleOk}
        footer={[]}
      >
        <Form layout="vertical" form={form}>
          <div className="row">
            <div className="col-md-6">
              <Form.Item
                label="Date"
                rules={[{ required: true, message: "Please input Date" }]}
              >
                <DatePicker
                  value={
                    request_for_test.payload.date
                      ? moment(request_for_test.payload.date, dateFormat)
                      : moment()
                  }
                  allowClear={false}
                  format={dateFormat}
                />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item label="Format No">
                <Input value={request_for_test.payload.format_no} />
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <Form.Item label="Block">
                <Input value={request_for_test.payload.block} />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item label="Test No">
                <Input value={request_for_test.payload.test_no} />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item label="Axis">
                <Input value={request_for_test.payload.axis} />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item label="Trade">
                <Input value={request_for_test.payload.trade} />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item label="Spec. Ref">
                <Input value={request_for_test.payload.spec_ref} />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item label="Drawing Ref">
                <Input value={request_for_test.payload.drawing_ref} />
              </Form.Item>
            </div>
          </div>
          <Divider />
          <div className="row">
            <div className="col-md-12">
              <Form.Item label="Test Required">
                <TextArea
                  value={request_for_test.payload.test_required}
                  autoSize={{ minRows: 4, maxRows: 6 }}
                />
              </Form.Item>
            </div>
          </div>
          <Divider />
          <div className="row">
            <div className="col-md-6">
              <Form.Item
                label="Test Required By"
                rules={[
                  { required: true, message: "Test Required By Required!" },
                ]}
              >
                <Input
                  value={
                    users.payload.find(
                      (e) => e.id === request_for_test.payload.test_required_by
                    )?.full_name
                  }
                />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item
                label="Test Received By"
                rules={[
                  { required: true, message: "Test Received By Required!" },
                ]}
              >
                <Input
                  value={
                    users.payload.find(
                      (e) => e.id === request_for_test.payload.test_received_by
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
                      (e) => e.id === request_for_test.payload.test_required_by
                    )?.role
                  }
                />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item label="Title">
                <Input
                  value={
                    users.payload.find(
                      (e) => e.id === request_for_test.payload.test_received_by
                    )?.role
                  }
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
  users: state.user.fetchAll,
  request_for_test: state.request_for_test.fetchOne,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchUsers: () => dispatch(fetchAllUser()),
  fetchOneRequestForTest: (action: any) =>
    dispatch(fetchOneRequestForTest(action)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewRFTComponent);
