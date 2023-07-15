import { EyeOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Upload,
} from "antd";
import moment from "moment";
import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { sendProjectVariation } from "../../utils/ProjectVariation.utils";
import { OpenNotification } from "../../../../../common/Notification/Notification.component";
import {
  Message,
  NotificationType,
} from "../../../../../../constants/Constants";
import { ErrorHandler } from "../../../../../../utilities/utilities";
import { ProjectVariationType } from "./EditProjectVariation.utils";
import {
  fetchAllProjectVariations,
  fetchOneProjectVariation,
} from "../../../../../../redux/ProjectVariation/ProjectVariation.action";

const EditProjectDurationComponent: FC<ProjectVariationType> = ({
  fetchOne,
  id,
  fetchAll,
  project_variation,
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

  const clearForm = () => {
    general_form.resetFields();
  };

  useEffect(() => {
    isModalVisible ? fetchOne(id) : null;
  }, [fetchOne, id, isModalVisible]);

  useEffect(() => {
    if (isModalVisible) {
      if (!project_variation.isPending) {
        general_form.setFieldsValue({
          ...project_variation.payload,
          date: moment(project_variation.payload.date),
        });
      }
    }
  }, [project_variation.payload, isModalVisible]);

  const Submit = (value: any) => {
    setLoading(true);
    value.id = project_variation.payload.id;
    value.project_id = project_variation.payload.project_id;
    const formData = new FormData();
    Object.keys(value).forEach((item) => {
      if (item === "file") {
        formData.append("file", value[item]?.file);
      } else formData.append(item, value[item]);
    });
    sendProjectVariation(formData)
      .then(() => {
        setTimeout(() => {
          setLoading(false);
          fetchAll({});
          handleOk();
          clearForm();
          OpenNotification(
            NotificationType.SUCCESS,
            Message.PROJECT_VARIATION_UPDATE_SUCCESS,
            ""
          );
        }, 1000);
      })
      .catch((error: any) => {
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            Message.PROJECT_VARIATION_UPDATE_FAIL,
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
            label="Description"
            name="description"
            rules={[
              { required: true, message: "Site Hand Over Date required" },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
        </Col>

        <Col style={{ width: "100%" }}>
          <Form.Item
            label="Date"
            name="date"
            rules={[{ required: true, message: "Date required" }]}
          >
            <DatePicker allowClear={false} />
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
            label="Amount"
            name="amount"
            rules={[{ required: true, message: "Amount required" }]}
          >
            <InputNumber />
          </Form.Item>
        </Col>
        <Col style={{ width: "100%" }}>
          <Form.Item label="File" name="file">
            <Upload
              name="file"
              beforeUpload={() => {
                return false;
              }}
              type="select"
              multiple={false}
              maxCount={1}
            >
              <Button
                className="btn-outline-secondary"
                style={{ width: "100%" }}
              >
                <UploadOutlined /> Click to Upload
              </Button>
            </Upload>
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
        Edit
      </Button>

      <>
        <Modal
          className="fixed-modal"
          centered
          width={500}
          title="Edit Project Variation"
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
          {project_variation.payload && renderContent()}
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
  project_variation: state.project_variation.fetchOne,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchAll: (action: any) => dispatch(fetchAllProjectVariations(action)),
  fetchOne: (action: any) => dispatch(fetchOneProjectVariation(action)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditProjectDurationComponent);
