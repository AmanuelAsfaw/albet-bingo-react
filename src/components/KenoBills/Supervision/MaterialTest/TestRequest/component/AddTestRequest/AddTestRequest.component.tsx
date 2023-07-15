import React, { FC, useEffect, useState } from "react";
import { OpenNotification } from "../../../../../../common/Notification/Notification.component";
import Modal from "antd/lib/modal/Modal";
import {
  Message,
  NotificationType,
} from "../../../../../../../constants/Constants";
import { PlusOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { AddTestRequestPropType } from "./AddTestRequest.util";
import { Select, Divider, DatePicker, Form, Button } from "antd";
import { fetchAllTestRequest } from "../../../../../../../redux/TestRequest/TestRequest.action";
import { sendData } from "./AddTestRequest.util";
import { getUserData } from "../../../../../../../utilities/utilities";
import { fetchAllUser } from "../../../../../../../redux/User/User.action";
import moment from "moment";
import TestRequestItemComponent from "./component/TestRequestItem.component";
import { TestRequestItemObject } from "./component/TestRequestITem.util";

const AddTestRequestComponent: FC<AddTestRequestPropType> = ({
  project,
  fetchAllTestRequest,
  fetchAllUser,
  users,
}) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [testRequestItems, setTestRequestItems] = useState<
    { key: any; description: any; material: any }[]
  >([TestRequestItemObject(Date.now())]);

  useEffect(() => {
    fetchAllUser();
  }, [fetchAllUser]);

  const resetForm = () => {
    form.resetFields();
    setTestRequestItems([TestRequestItemObject(Date.now())]);
  };

  const handleOk = () => {
    resetForm();
    setIsModalVisible(false);
  };

  const disabledForwardDate = (current: any) => {
    // Can not select days after today
    return current && current > moment().endOf("day");
  };

  const Submit = (value: any) => {
    value.project_id = project.payload?.id;
    value.checked_by = value.checked_by === "" ? null : value.checked_by;
    value.authorized_by =
      value.authorized_by === "" ? null : value.authorized_by;
    value.testRequestItems = testRequestItems.map((value) => {
      return {
        description: value.description,
        material: value.material,
      };
    });

    setLoading(true);
    sendData(value)
      .then(() => {
        resetForm();
        handleOk();
        setLoading(false);
        fetchAllTestRequest(project.payload?.id);
        OpenNotification(
          NotificationType.SUCCESS,
          Message.TEST_FORM_SUCCESS,
          ""
        );
      })
      .catch((error) => {
        setLoading(false);
        error.response.data.errors.map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            Message.TEST_FORM_FAILED,
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
        New Request
      </Button>
      <Modal
        title="New Test Request"
        style={{ top: 10 }}
        visible={isModalVisible}
        onCancel={handleOk}
        width={1000}
        footer={[
          <>
            <Button
              key="submit"
              type="primary"
              htmlType="submit"
              loading={loading}
              onClick={() => form.submit()}
            >
              Register Request
            </Button>
          </>,
        ]}
      >
        <Form
          form={form}
          onFinish={Submit}
          layout="vertical"
          initialValues={{
            test_requested_by: getUserData().id,
            date: moment(),
          }}
        >
          <div className="row">
            <div className="col-md-3">
              <p style={{ fontSize: 12, color: "gray" }}>Project</p>
              <h6>{project.payload?.name}</h6>
            </div>

            <div className="col-md-3">
              <p style={{ fontSize: 12, color: "gray" }}>Site</p>
              <h6>{project.payload?.location}</h6>
            </div>

            <div className="col-md-3">
              <p style={{ fontSize: 12, color: "gray" }}>Employer</p>
              <h6>{project.payload?.client?.name}</h6>
            </div>

            <div className="col-md-3">
              <p style={{ fontSize: 12, color: "gray" }}>Contractor</p>
              <h6>{project.payload?.contractor?.name}</h6>
            </div>
          </div>

          <Divider />

          <div className="row mt-4">
            <div className="col-md-4">
              <Form.Item
                label="Test Requested By Supervisor"
                name="test_requested_by"
                rules={[
                  {
                    required: true,
                    message: "Please select Testing Requested By",
                  },
                ]}
              >
                <Select
                  placeholder="Test Requested By"
                  loading={users.isPending}
                >
                  {users.payload.map((ele, idx) => (
                    <Select.Option value={ele.id} key={idx}>
                      {ele.full_name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>

            <div className="col-md-4">
              <Form.Item
                label="Received By"
                name="approved_by"
                rules={[
                  {
                    required: true,
                    message: "Please select Received By",
                  },
                ]}
              >
                <Select
                  placeholder="Test Requested By"
                  loading={users.isPending}
                >
                  {users.payload.map((ele, idx) => (
                    <Select.Option value={ele.id} key={idx}>
                      {ele.full_name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>

            <div className="col-md-4">
              <Form.Item
                label="Date"
                name="date"
                rules={[
                  {
                    required: true,
                    message: "Please select Date",
                  },
                ]}
              >
                <DatePicker
                  format="YYYY-MM-DD"
                  disabledDate={disabledForwardDate}
                />
              </Form.Item>
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-md-12">
              <TestRequestItemComponent
                dataAction={[testRequestItems, setTestRequestItems]}
              />
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
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchAllTestRequest: (project_id: any) =>
    dispatch(fetchAllTestRequest(project_id)),
  fetchAllUser: () => dispatch(fetchAllUser()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddTestRequestComponent);
