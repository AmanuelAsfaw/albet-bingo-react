import {
  Button,
  Form,
  Modal,
  AutoComplete,
  Input,
  DatePicker,
  Checkbox,
} from "antd";
import { FC, useState } from "react";
import { connect } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";
import { AddRiskLogPropType, sendData } from "../../util/RiskLog.util";
import { fetchAllRiskLog } from "../../../../../../redux/RiskLog/RiskLog.action";
import { OpenNotification } from "../../../../../common/Notification/Notification.component";
import {
  Message,
  NotificationType,
  RISK_CATEGORY,
  RISK_OWNER,
  RISK_RESPONSE_STRATEGY,
} from "../../../../../../constants/Constants";
import { ErrorHandler } from "../../../../../../utilities/utilities";
import moment from "moment";
const AddRiskLogComponent: FC<AddRiskLogPropType> = ({
  fetchRiskLogs,
  project,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const Submit = (value: any) => {
    setLoading(true);
    const data = {
      ...value,
      project_id: project.payload?.id,
    };
    sendData(data)
      .then(() => {
        fetchRiskLogs({ project_id: project.payload?.id });
        handleOk();
        setLoading(false);
        OpenNotification(NotificationType.SUCCESS, Message.GENERAL_SUCCESS, "");
      })
      .catch((error) => {
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            Message.GENERAL_FAILED,
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
        Register Risk
      </Button>
      <Modal
        className="fixed-modal"
        centered
        width={1360}
        title="Register Risk"
        visible={isModalVisible}
        onCancel={handleOk}
        footer={[
          <>
            <Button className="btn-outline" htmlType="reset" onClick={handleOk}>
              Cancel
            </Button>
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
          initialValues={{ date_rased: moment() }}
        >
          <div className="row">
            <div className="col-md-6">
              <Form.Item
                label="Category"
                name="category"
                rules={[{ message: "Category Required!", required: true }]}
              >
                <AutoComplete
                  options={RISK_CATEGORY.map((e) => ({ value: e }))}
                  placeholder="category"
                  filterOption={(inputValue, option: any) =>
                    option!.value
                      .toUpperCase()
                      .indexOf(inputValue.toUpperCase()) !== -1
                  }
                />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item
                label="Risk"
                name="risk"
                rules={[{ message: "Risk Required!", required: true }]}
              >
                <Input placeholder="risk" />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item
                label="Risk Cause"
                name="risk_cause"
                rules={[{ message: "Risk Cause Required!", required: true }]}
              >
                <Input.TextArea rows={3} placeholder="Cause" />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item
                label="Risk Impact"
                name="impact"
                rules={[{ message: "Risk Impact Required!", required: true }]}
              >
                <Input.TextArea rows={3} placeholder="impact" />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item
                label="Response Plan"
                name="response_plan"
                rules={[{ message: "Response Plan Required!", required: true }]}
              >
                <Input.TextArea rows={3} placeholder="impact" />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item
                label="Raised By"
                name="raised_by"
                rules={[{ message: "Raised by Required!", required: true }]}
              >
                <AutoComplete
                  options={RISK_OWNER.map((e) => ({ value: e }))}
                  placeholder="raised by"
                  filterOption={(inputValue, option: any) =>
                    option!.value
                      .toUpperCase()
                      .indexOf(inputValue.toUpperCase()) !== -1
                  }
                />
              </Form.Item>
            </div>

            <div className="col-md-6">
              <Form.Item
                label="Date Raised"
                name="date_rased"
                rules={[{ message: "Date Raised Required!", required: true }]}
              >
                <DatePicker />
              </Form.Item>
            </div>
            <div className="col-md-3">
              <Form.Item
                label="Cost Impact"
                name="cost_impact"
                valuePropName="checked"
              >
                <Checkbox />
              </Form.Item>
            </div>
            <div className="col-md-3">
              <Form.Item
                label="Schedule Impact"
                name="schedule_impact"
                valuePropName="checked"
              >
                <Checkbox />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item
                label="Response Strategy"
                name="response_strategy"
                rules={[{ message: "Response Plan Required!", required: true }]}
              >
                <AutoComplete
                  options={RISK_RESPONSE_STRATEGY.map((e) => ({ value: e }))}
                  placeholder="plan"
                  filterOption={(inputValue, option: any) =>
                    option!.value
                      .toUpperCase()
                      .indexOf(inputValue.toUpperCase()) !== -1
                  }
                />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item
                label="Risk Owner"
                name="risk_owner"
                rules={[
                  { message: "Response Owner Required!", required: true },
                ]}
              >
                <AutoComplete
                  options={RISK_OWNER.map((e) => ({ value: e }))}
                  placeholder="risk owner"
                  filterOption={(inputValue, option: any) =>
                    option!.value
                      .toUpperCase()
                      .indexOf(inputValue.toUpperCase()) !== -1
                  }
                />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item
                label="Status"
                name="status"
                rules={[{ message: "Status Required!", required: true }]}
              >
                <Input placeholder="status" />
              </Form.Item>
            </div>
            <div className="col-md-12">
              <Form.Item
                label="Note"
                name="note"
                rules={[{ message: "Note Required!", required: true }]}
              >
                <Input.TextArea rows={4} placeholder="note" />
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
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchRiskLogs: (action: any) => dispatch(fetchAllRiskLog(action)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddRiskLogComponent);
