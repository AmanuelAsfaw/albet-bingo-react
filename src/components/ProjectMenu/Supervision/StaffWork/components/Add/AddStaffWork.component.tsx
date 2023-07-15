import { Button, DatePicker, Form, InputNumber, Modal } from "antd";
import { FC, useState } from "react";
import { connect } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";
import { AddStaffWorkPropType, sendData } from "../../util/StaffWork.util";
import { OpenNotification } from "../../../../../common/Notification/Notification.component";
import {
  Message,
  NotificationType,
} from "../../../../../../constants/Constants";
import { ErrorHandler } from "../../../../../../utilities/utilities";
import { fetchAllStaffWork } from "../../../../../../redux/StaffWork/StaffWork.action";

import moment from "moment";
const AddStaffWorkComponent: FC<AddStaffWorkPropType> = ({
  fetchStaffWorks,
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
        form.resetFields();
        fetchStaffWorks({ project_id: project.payload?.id });
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
        Register StaffWork
      </Button>
      <Modal
        className="fixed-modal"
        centered
        width={1360}
        title="Register StaffWork"
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
          initialValues={{
            date: moment(),
            quality_control_managers: 0,
            project_managers: 0,
            safety_managers: 0,
            construction_engineers: 0,
            office_engineers: 0,
            site_engineers: 0,
            superintendents: 0,
            formans: 0,
            skilled_labours: 0,
            daily_labours: 0,
            guards: 0,
            janitors: 0,
            surveyors: 0,
            surveyor_assistants: 0,
            welders: 0,
          }}
        >
          <div className="row">
            <div className="col-md-12">
              <Form.Item label="Date" name="date" rules={[{ required: true }]}>
                <DatePicker />
              </Form.Item>
            </div>

            <div className="col-md-12 mt-3">
              <h6>Management</h6>
            </div>
            <div className="col-md-4">
              <Form.Item
                label="Quality Control Manager"
                name="quality_control_managers"
              >
                <InputNumber placeholder="QC" />
              </Form.Item>
            </div>
            <div className="col-md-4">
              <Form.Item label="Safety Manager" name="safety_managers">
                <InputNumber placeholder="safety manager" />
              </Form.Item>
            </div>
            <div className="col-md-4">
              <Form.Item label="Project Manager " name="project_managers">
                <InputNumber placeholder="project manager" />
              </Form.Item>
            </div>

            <div className="col-md-12 mt-3">
              <h6>Engineers</h6>
            </div>
            <div className="col-md-4">
              <Form.Item label="Office Engineer" name="office_engineers">
                <InputNumber placeholder="office engineer" />
              </Form.Item>
            </div>
            <div className="col-md-4">
              <Form.Item
                label="Construction Engineers"
                name="construction_engineers"
              >
                <InputNumber placeholder="construction engineer" />
              </Form.Item>
            </div>
            <div className="col-md-4">
              <Form.Item label="Site  Engineers" name="site_engineers">
                <InputNumber placeholder="site engineer" />
              </Form.Item>
            </div>

            <div className="col-md-12 mt-3">
              <h6>Skilled Labour</h6>
            </div>
            <div className="col-md-4">
              <Form.Item label="Superintendent" name="superintendents">
                <InputNumber placeholder="superintendent" />
              </Form.Item>
            </div>
            <div className="col-md-4">
              <Form.Item label="Forman" name="formans">
                <InputNumber placeholder="formans" />
              </Form.Item>
            </div>
            <div className="col-md-4">
              <Form.Item label="Skilled Labor" name="skilled_labours">
                <InputNumber placeholder="skilled_labours" />
              </Form.Item>
            </div>

            <div className="col-md-12 mt-3">
              <h6>UnSkilled Labour</h6>
            </div>
            <div className="col-md-4">
              <Form.Item label="Daily Labour" name="daily_labours">
                <InputNumber placeholder="daily labours" />
              </Form.Item>
            </div>

            <div className="col-md-12 mt-3">
              <h6>Other</h6>
            </div>
            <div className="col-md-3">
              <Form.Item label="Guard" name="guards">
                <InputNumber placeholder="guards" />
              </Form.Item>
            </div>
            <div className="col-md-3">
              <Form.Item label="Janitor" name="janitors">
                <InputNumber placeholder="janitors" />
              </Form.Item>
            </div>
            <div className="col-md-3">
              <Form.Item label="Surveyor" name="surveyors">
                <InputNumber placeholder="surveyors" />
              </Form.Item>
            </div>
            <div className="col-md-3">
              <Form.Item label="Surveyor Assistant" name="surveyor_assistants">
                <InputNumber placeholder="surveyor assistants" />
              </Form.Item>
            </div>
            <div className="col-md-3">
              <Form.Item label="Welder" name="welders">
                <InputNumber placeholder="welder" />
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
  fetchStaffWorks: (action: any) => dispatch(fetchAllStaffWork(action)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddStaffWorkComponent);
