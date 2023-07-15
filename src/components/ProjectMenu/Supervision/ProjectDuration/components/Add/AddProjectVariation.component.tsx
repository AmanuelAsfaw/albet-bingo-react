import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
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
import { AddProjectVariationPropType } from "./AddProjectVariation.utils";
import { fetchAllProjects } from "../../../../../../redux/Project/Project.action";
import { fetchAllProjectVariations } from "../../../../../../redux/ProjectVariation/ProjectVariation.action";

const AddProjectVariationComponent: FC<AddProjectVariationPropType> = ({
  fetchAll,
  fetchAllProject,
  project,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [general_form] = Form.useForm();

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
    const formData = new FormData();
    Object.keys(value).forEach((item) => {
      if (item === "file") {
        formData.append("file", value[item].file);
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
            Message.PROJECT_VARIATION_REGISTERED_SUCCESS,
            ""
          );
        }, 1000);
      })
      .catch((error: any) => {
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            Message.PROJECT_VARIATION_REGISTERED_FAIL,
            e.message
          )
        );
      });
  };

  useEffect(() => {
    fetchAllProject();
  }, []);

  const renderContent = () => {
    return (
      <Form layout="vertical" form={general_form} onFinish={Submit}>
        <Col style={{ width: "100%" }}>
          <Form.Item
            label="Project"
            name="project_id"
            rules={[{ required: true, message: "Project required" }]}
          >
            <Select
              placeholder="select project"
              style={{ width: "150px" }}
              showSearch
              allowClear={false}
              filterOption={(inputValue, option) => {
                return (
                  (option?.children?.toString() ?? "")
                    .toLowerCase()
                    .indexOf(inputValue.toLowerCase()) !== -1
                );
              }}
            >
              {project.payload.map((items, index) => (
                <Select.Option value={items.id} key={index}>
                  {items.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Col style={{ width: "100%" }}>
          <Form.Item
            label="Date"
            name="date"
            rules={[{ required: true, message: "Date required" }]}
            initialValue={moment()}
          >
            <DatePicker allowClear={false} defaultValue={moment()} />
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
        icon={<PlusOutlined />}
      >
        Add Project Variation
      </Button>

      <>
        <Modal
          className="fixed-modal"
          centered
          width={500}
          title="New Project Variation"
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
  project_variation: state.project_variation.fetchAll,
  project: state.project.fetchAll,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchAll: (action: any) => dispatch(fetchAllProjectVariations(action)),
  fetchAllProject: (action: any) => dispatch(fetchAllProjects(action)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddProjectVariationComponent);
