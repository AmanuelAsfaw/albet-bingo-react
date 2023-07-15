import { PlusOutlined } from "@ant-design/icons";
import { Button, Col, DatePicker, Form, Input, Modal, Select } from "antd";
import moment from "moment";
import { FC, useState } from "react";
import { connect } from "react-redux";
import { sendMaterialApprovalStatus } from "../../utils/MaterialApprovalStatus.utils";
import { OpenNotification } from "../../../../../common/Notification/Notification.component";
import {
  Message,
  NotificationType,
} from "../../../../../../constants/Constants";
import { ErrorHandler } from "../../../../../../utilities/utilities";
import { AddMaterialApprovalStatusType } from "./AddMaterialApprovalStatus.utils";
import { fetchAllMaterialApprovalStatus } from "../../../../../../redux/MaterialApprovalStatus/MaterialApprovalStatus.action";
import { useParams } from "react-router-dom";

const AddMaterialApprovalStatus: FC<AddMaterialApprovalStatusType> = ({
  fetchAll,
  type,
}) => {
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
    sendMaterialApprovalStatus(value)
      .then(() => {
        setTimeout(() => {
          setLoading(false);
          fetchAll({ type, date: value.date, project_id: id });
          handleOk();
          clearForm();
          OpenNotification(
            NotificationType.SUCCESS,
            Message.MATERIAL_APPROVAL_STATUS_REGISTERED_SUCCESS,
            ""
          );
        }, 1000);
      })
      .catch((error: any) => {
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            Message.MATERIAL_APPROVAL_STATUS_REGISTERED_FAIL,
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
            label="Type"
            name="type"
            rules={[{ required: true, message: "Type required" }]}
            initialValue={type}
          >
            <Select
              style={{ width: 200 }}
              allowClear={false}
              showSearch
              defaultValue={type}
              options={[
                { label: "Architectural", value: "architectural" },
                { label: "MEP Electrical", value: "MEP Electrical" },
                { label: "MEP Mechanical", value: "MEP Mechanical" },
                { label: "MEP Sanitary", value: "MEP Sanitary" },
              ]}
              filterOption={(inputValue, option) =>
                option!.value
                  .toUpperCase()
                  .indexOf(inputValue.toUpperCase()) !== -1
              }
            />
          </Form.Item>
        </Col>
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
            label="Ref no"
            name="ref_no"
            rules={[{ required: true, message: "Ref No required" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col style={{ width: "100%" }}>
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Description required" }]}
          >
            <Input.TextArea />
          </Form.Item>
        </Col>
        <Col style={{ width: "100%" }}>
          <Form.Item
            label="Manufacturer /Brand Name"
            name="manufacturer"
            rules={[{ required: true, message: "Manufacturer required" }]}
          >
            <Input.TextArea />
          </Form.Item>
        </Col>
        <Col style={{ width: "100%" }}>
          <Form.Item
            label="Supplier /Remark"
            name="supplier"
            rules={[{ required: true, message: "Supplier required" }]}
          >
            <Input.TextArea />
          </Form.Item>
        </Col>
        <Col style={{ width: "100%" }}>
          <Form.Item
            label="Consultant receiving date"
            name="consultant_receiving_date"
            rules={[
              { required: true, message: "Consultant receiving date required" },
            ]}
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
            label="Return date from consultant"
            name="return_date"
            rules={[
              {
                required: true,
                message: "Return date from consultant required",
              },
            ]}
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
          <Form.Item label="Comments" name="comments">
            <Input />
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
        Add Material Approval Status
      </Button>

      <>
        <Modal
          className="fixed-modal"
          centered
          width={500}
          title="New Material Approval Status"
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
  material_approval_status: state.material_approval_status.fetchAll,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchAll: (action: any) => dispatch(fetchAllMaterialApprovalStatus(action)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddMaterialApprovalStatus);
