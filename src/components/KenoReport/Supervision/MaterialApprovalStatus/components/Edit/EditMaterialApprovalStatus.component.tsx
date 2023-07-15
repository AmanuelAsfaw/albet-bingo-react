import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Col, DatePicker, Form, Input, Modal, Select } from "antd";
import moment from "moment";
import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { sendMaterialApprovalStatus } from "../../utils/MaterialApprovalStatus.utils";
import { OpenNotification } from "../../../../../common/Notification/Notification.component";
import {
  Message,
  NotificationType,
} from "../../../../../../constants/Constants";
import { ErrorHandler } from "../../../../../../utilities/utilities";
import { EditMaterialApprovalStatusType } from "./EditMaterialApprovalStatus.utils";
import {
  fetchAllMaterialApprovalStatus,
  fetchOneMaterialApprovalStatus,
} from "../../../../../../redux/MaterialApprovalStatus/MaterialApprovalStatus.action";
import { useParams } from "react-router-dom";

const EditMaterialApprovalStatus: FC<EditMaterialApprovalStatusType> = ({
  fetchOne,
  id,
  material_approval_status,
  fetchAll,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [general_form] = Form.useForm();
  const { id: project_id } = useParams();

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const clearForm = () => {
    general_form.resetFields();
  };

  useEffect(() => {
    isModalVisible ? fetchOne(id) : null;
  }, [fetchOne, id, isModalVisible]);

  useEffect(() => {
    if (isModalVisible) {
      if (!material_approval_status.isPending) {
        general_form.setFieldsValue({
          ...material_approval_status.payload,
          date: moment(material_approval_status.payload.date),
          return_date: moment(material_approval_status.payload.return_date),
          consultant_receiving_date: moment(
            material_approval_status.payload.consultant_receiving_date
          ),
        });
      }
    }
  }, [material_approval_status, isModalVisible]);

  const Submit = (value: any) => {
    setLoading(true);
    value.id = material_approval_status.payload.id;
    value.project_id = project_id;
    sendMaterialApprovalStatus(value)
      .then(() => {
        setTimeout(() => {
          setLoading(false);
          fetchAll({
            type: material_approval_status.payload.type,
            date: material_approval_status.payload.date,
            project_id,
          });
          handleOk();
          clearForm();
          OpenNotification(
            NotificationType.SUCCESS,
            Message.MATERIAL_APPROVAL_STATUS_UPDATE_SUCCESS,
            ""
          );
        }, 1000);
      })
      .catch((error: any) => {
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            Message.MATERIAL_APPROVAL_STATUS_UPDATE_FAIL,
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
            rules={[{ required: true, message: "Date required" }]}
          >
            <Select
              style={{ width: 200 }}
              allowClear={false}
              showSearch
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
          >
            <DatePicker picker="date" allowClear={false} />
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
          >
            <DatePicker picker="date" allowClear={false} />
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
          >
            <DatePicker picker="date" allowClear={false} />
          </Form.Item>
        </Col>
        <Col style={{ width: "100%" }}>
          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: "Ref No required" }]}
          >
            <Select
              style={{ width: 200 }}
              allowClear={false}
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
        icon={<EditOutlined />}
      >
        Edit
      </Button>

      <>
        <Modal
          className="fixed-modal"
          centered
          width={500}
          title="Edit Project Monthly Report"
          open={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <>
              <Button loading={loading} onClick={() => general_form.submit()}>
                Edit
              </Button>
            </>,
          ]}
        >
          {material_approval_status.payload && renderContent()}
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
  material_approval_status: state.material_approval_status.fetchOne,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchAll: (action: any) => dispatch(fetchAllMaterialApprovalStatus(action)),
  fetchOne: (action: any) => dispatch(fetchOneMaterialApprovalStatus(action)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditMaterialApprovalStatus);
