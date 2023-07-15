import { PlusOutlined } from "@ant-design/icons";
import { Button, Col, DatePicker, Form, Input, Modal, Select } from "antd";
import { FC, useState } from "react";
import { connect } from "react-redux";
import { AddCategoryPropType, sendCategory } from "../../utils/Category.utils";
import { OpenNotification } from "../../../../common/Notification/Notification.component";
import { Message, NotificationType } from "../../../../../constants/Constants";
import { ErrorHandler } from "../../../../../utilities/utilities";
import { fetchAllCategory } from "../../../../../redux/Category/Category.action";
import { useParams } from "react-router-dom";

const AddCategory: FC<AddCategoryPropType> = ({ fetchAll }) => {
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
    sendCategory(value)
      .then(() => {
        setTimeout(() => {
          setLoading(false);
          fetchAll({ project_id: id });
          handleOk();
          clearForm();
          OpenNotification(
            NotificationType.SUCCESS,
            Message.CATEGORY_REGISTERED_SUCCESS,
            ""
          );
        }, 1000);
      })
      .catch((error: any) => {
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            Message.CATEGORY_REGISTERED_FAIL,
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
            rules={[{ required: true, message: "Description required" }]}
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
        Add Category
      </Button>

      <>
        <Modal
          className="fixed-modal"
          centered
          width={500}
          title="New Category"
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
  category: state.category.fetchAll,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchAll: (action: any) => dispatch(fetchAllCategory(action)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddCategory);
