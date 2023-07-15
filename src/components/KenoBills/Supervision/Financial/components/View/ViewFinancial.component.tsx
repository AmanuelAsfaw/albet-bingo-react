import { EyeOutlined } from "@ant-design/icons";
import { Button, Col, DatePicker, Form, InputNumber, Modal } from "antd";
import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { EditFinancialType } from "../../utils/Category.utils";

import {
  fetchAllFinancial,
  fetchOneFinancial,
} from "../../../../../../redux/Financial/Financial.action";
import moment from "moment";

const ViewFinancialComponent: FC<EditFinancialType> = ({
  id,
  fetchAll,
  fetchOne,
  financial,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [general_form] = Form.useForm();

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    if (isModalVisible) {
      fetchOne(id);
    }
  }, [fetchOne, id, isModalVisible]);

  useEffect(() => {
    if (isModalVisible) {
      if (!financial.isPending) {
        general_form.setFieldsValue({
          ...financial.payload,
          date: moment(financial.payload.date),
        });
      }
    }
  }, [financial, isModalVisible]);

  const renderContent = () => {
    return (
      <Form layout="vertical" form={general_form}>
        <Col style={{ width: "100%" }}>
          <Form.Item label="Month" name="date">
            <DatePicker picker="month" disabled style={{ color: "black" }} />
          </Form.Item>
        </Col>
        <Col style={{ width: "100%" }}>
          <Form.Item
            label="Contract amount in birr"
            name="contract_amount_in_birr"
            rules={[
              { required: true, message: "Contract amount in birr required" },
            ]}
          >
            <InputNumber readOnly />
          </Form.Item>
        </Col>
        <Col style={{ width: "100%" }}>
          <Form.Item
            label="Previous planned in birr"
            name="previous_planned_in_birr"
            rules={[
              { required: true, message: "Previous planned in birr required" },
            ]}
          >
            <InputNumber readOnly />
          </Form.Item>
        </Col>
        <Col style={{ width: "100%" }}>
          <Form.Item
            label="Previous executed in birr"
            name="previous_executed_in_birr"
            rules={[
              { required: true, message: "Previous executed in birr required" },
            ]}
          >
            <InputNumber readOnly />
          </Form.Item>
        </Col>
        <Col style={{ width: "100%" }}>
          <Form.Item
            label="This month planned in birr"
            name="this_month_planned_in_birr"
            rules={[
              {
                required: true,
                message: "This month planned in birr required",
              },
            ]}
          >
            <InputNumber readOnly />
          </Form.Item>
        </Col>
        <Col style={{ width: "100%" }}>
          <Form.Item
            label="This month executed in birr"
            name="this_month_executed_in_birr"
            rules={[
              {
                required: true,
                message: "This month executed in birr required",
              },
            ]}
          >
            <InputNumber readOnly />
          </Form.Item>
        </Col>
        <Col style={{ width: "100%" }}>
          <Form.Item
            label="This month comp from plan"
            name="this_month_comp_from_plan"
            rules={[
              {
                required: true,
                message: "This month comp from plan required",
              },
            ]}
          >
            <InputNumber readOnly />
          </Form.Item>
        </Col>
        <Col style={{ width: "100%" }}>
          <Form.Item
            label="To date planned in birr"
            name="to_date_planned_in_birr"
            rules={[
              {
                required: true,
                message: "To date planned in birr required",
              },
            ]}
          >
            <InputNumber readOnly />
          </Form.Item>
        </Col>
        <Col style={{ width: "100%" }}>
          <Form.Item
            label="To date executed in birr"
            name="to_date_executed_in_birr"
            rules={[
              {
                required: true,
                message: "To date executed in birr required",
              },
            ]}
          >
            <InputNumber readOnly />
          </Form.Item>
        </Col>
        <Col style={{ width: "100%" }}>
          <Form.Item
            label="To date comp from plan"
            name="to_date_comp_from_plan"
            rules={[
              {
                required: true,
                message: "To date comp from plan required",
              },
            ]}
          >
            <InputNumber readOnly />
          </Form.Item>
        </Col>
        <Col style={{ width: "100%" }}>
          <Form.Item
            label="Total Accomplishment in percent"
            name="accmp_in_percent"
            rules={[
              {
                required: true,
                message: "Accmp in percent required",
              },
            ]}
          >
            <InputNumber readOnly />
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
        icon={<EyeOutlined />}
      >
        View
      </Button>

      <>
        <Modal
          className="fixed-modal"
          centered
          width={500}
          title="View Financial Report"
          open={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <>
              <Button loading={loading} onClick={() => general_form.submit()}>
                Close
              </Button>
            </>,
          ]}
        >
          {financial.payload && renderContent()}
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
  financial: state.financial.fetchOne,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchOne: (action: any) => dispatch(fetchOneFinancial(action)),
  fetchAll: (action: any) => dispatch(fetchAllFinancial(action)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewFinancialComponent);
