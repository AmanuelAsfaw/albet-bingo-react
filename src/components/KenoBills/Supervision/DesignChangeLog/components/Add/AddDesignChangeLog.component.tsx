import { PlusOutlined } from "@ant-design/icons";
import { Button, Col, DatePicker, Form, Input, Modal, Select } from "antd";
import moment from "moment";
import { FC, useState } from "react";
import { connect } from "react-redux";
import { sendDesignChangeLog } from "../../utils/DesignChangeLog.utils";
import { OpenNotification } from "../../../../../common/Notification/Notification.component";
import {
  Message,
  NotificationType,
} from "../../../../../../constants/Constants";
import { ErrorHandler } from "../../../../../../utilities/utilities";
import { AddDesignChangeLogPropType } from "./DesignChangeLog.utils";
import { fetchAllDesignChangeLog } from "../../../../../../redux/DesignChangeLog/DesignChangeLog.action";
import { useParams } from "react-router-dom";

const AddDesignChangeLog: FC<AddDesignChangeLogPropType> = ({ fetchAll }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [general_form] = Form.useForm();
  const { id } = useParams();

  const handleOk = () => {
    clearForm();
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    clearForm();
    setIsModalVisible(false);
  };

  const clearForm = () => {
    general_form.resetFields();
  };

  const Submit = (value: any) => {
    setLoading(true);
    value.project_id = id;
    sendDesignChangeLog(value)
      .then(() => {
        setTimeout(() => {
          setLoading(false);
          fetchAll({ project_id: id });
          handleOk();
          clearForm();
          OpenNotification(
            NotificationType.SUCCESS,
            Message.DESIGN_CHANGE_LOG_DELETE_SUCCESS,
            ""
          );
        }, 1000);
      })
      .catch((error: any) => {
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            Message.DESIGN_CHANGE_LOG_REGISTERED_FAIL,
            e.message
          )
        );
      });
  };

  const renderContent = () => {
    return (
      <Form layout="vertical" form={general_form} onFinish={Submit}>
        <Col style={{ width: "100%" }}>
          <Form.Item
            label="Date"
            name="date"
            rules={[{ required: true, message: "Date required" }]}
            initialValue={moment()}
          >
            <DatePicker
              defaultValue={moment()}
              picker="date"
              allowClear={false}
            />
          </Form.Item>
        </Col>

        <Col style={{ width: "100%" }}>
          <Form.Item
            label="Requested By"
            name="requested_by"
            rules={[{ required: true, message: "Requested By required" }]}
          >
            <Input />
          </Form.Item>
        </Col>

        <Col style={{ width: "100%" }}>
          <Form.Item
            label="Change Request Description"
            name="change_request_description"
            rules={[
              {
                required: true,
                message: "Change Request Description required",
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
        </Col>

        <Col style={{ width: "100%" }}>
          <Form.Item
            label="Reason For Change"
            name="reason_for_change"
            rules={[{ required: true, message: "Reason For Change required" }]}
          >
            <Input.TextArea />
          </Form.Item>
        </Col>

        <Col style={{ width: "100%" }}>
          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: "Status required" }]}
            initialValue={"approved"}
          >
            <Select
              style={{ width: 200 }}
              allowClear={false}
              defaultValue={"approved"}
              options={[
                { label: "Approved", value: "approved" },
                { label: "Pending", value: "pending" },
                { label: "Rejected", value: "rejected" },
              ]}
            />
          </Form.Item>
        </Col>

        <Col style={{ width: "100%" }}>
          <Form.Item
            label="Progress of Pending and Approved Changes"
            name="progress_of_pending_and_approved_changes"
            rules={[
              {
                required: true,
                message: "Progress of Pending and Approved Changes required",
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
        </Col>

        <Col style={{ width: "100%" }}>
          <Form.Item
            label="Action Related to Changes"
            name="action_related_to_changes"
            rules={[
              {
                required: true,
                message: "Action Related to Changes required",
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
        </Col>
        <Col style={{ width: "100%" }}>
          <Form.Item
            label="Notes"
            name="notes"
            rules={[
              {
                required: true,
                message: "Notes required",
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
        </Col>
      </Form>
    );
  };

  return (
    <div>
      <Button
        onClick={() => setIsModalVisible(true)}
        type="link"
        icon={<PlusOutlined />}
      >
        Add Design Change Log
      </Button>

      <>
        <Modal
          className="fixed-modal"
          centered
          width={500}
          title="New Design Change Log"
          open={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <>
              <Button loading={loading} onClick={() => general_form.submit()}>
                Add
              </Button>
            </>,
          ]}
        >
          {renderContent()}
        </Modal>
      </>
    </div>
  );
};

/**
 * Map State to Props
 *
 * @param state
 */
const mapStateToProps = (state: any) => ({
  design_change_log: state.design_change_log.fetchAll,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchAll: (action: any) => dispatch(fetchAllDesignChangeLog(action)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddDesignChangeLog);
