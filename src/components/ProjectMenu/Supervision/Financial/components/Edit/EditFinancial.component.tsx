import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Col, Form, InputNumber, Modal } from "antd";
import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { EditFinancialType, sendFinancial } from "../../utils/Category.utils";
import { OpenNotification } from "../../../../../common/Notification/Notification.component";
import {
  Message,
  NotificationType,
} from "../../../../../../constants/Constants";
import { ErrorHandler } from "../../../../../../utilities/utilities";

import { fetchAllCategory } from "../../../../../../redux/Category/Category.action";
import {
  fetchAllFinancial,
  fetchOneFinancial,
} from "../../../../../../redux/Financial/Financial.action";
import moment from "moment";
import { useParams } from "react-router-dom";

const EditFinancialComponent: FC<EditFinancialType> = ({
  id,
  fetchAll,
  fetchOne,
  financial,
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

  const Submit = (value: any) => {
    setLoading(true);
    value.id = financial.payload.id;
    value.date = financial.payload.date;
    value.project_id = project_id;
    let temp = [];
    temp.push(value);
    sendFinancial(temp)
      .then(() => {
        setTimeout(() => {
          setLoading(false);
          fetchAll({ project_id });
          handleOk();
          clearForm();
          OpenNotification(
            NotificationType.SUCCESS,
            Message.FINANCIAL_UPDATE_SUCCESS,
            ""
          );
        }, 1000);
      })
      .catch((error: any) => {
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            Message.FINANCIAL_UPDATE_FAIL,
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
            label="Contract amount in birr"
            name="contract_amount_in_birr"
            rules={[
              { required: true, message: "Contract amount in birr required" },
            ]}
          >
            <InputNumber />
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
            <InputNumber />
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
            <InputNumber />
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
            <InputNumber />
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
            <InputNumber />
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
            <InputNumber />
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
            <InputNumber />
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
            <InputNumber />
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
            <InputNumber />
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
            <InputNumber />
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
          title="Edit Category"
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
  category: state.category.fetchAll,
  sub_category: state.sub_category.fetchOne,
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
  fetchAllCategory: (action: any) => dispatch(fetchAllCategory(action)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditFinancialComponent);
