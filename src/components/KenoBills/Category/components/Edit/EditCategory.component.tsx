import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Modal } from "antd";
import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { EditCategoryType, sendCategory } from "../../utils/Category.utils";
import { OpenNotification } from "../../../../common/Notification/Notification.component";
import { Message, NotificationType } from "../../../../../constants/Constants";
import { ErrorHandler } from "../../../../../utilities/utilities";

import {
  fetchAllCategory,
  fetchOneCategory,
} from "../../../../../redux/Category/Category.action";
import { useParams } from "react-router-dom";

const EditCategoryComponent: FC<EditCategoryType> = ({
  fetchOne,
  id,
  fetchAll,
  category,
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
      if (!category.isPending) {
        general_form.setFieldsValue({
          ...category.payload,
        });
      }
    }
  }, [category, isModalVisible]);

  const Submit = (value: any) => {
    setLoading(true);
    value.id = category.payload.id;
    value.project_id = project_id;
    sendCategory(value)
      .then(() => {
        setTimeout(() => {
          setLoading(false);
          fetchAll({ project_id: project_id });
          handleOk();
          clearForm();
          OpenNotification(
            NotificationType.SUCCESS,
            Message.CATEGORY_UPDATE_SUCCESS,
            ""
          );
        }, 1000);
      })
      .catch((error: any) => {
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            Message.CATEGORY_UPDATE_FAIL,
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
          {category.payload && renderContent()}
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
  category: state.category.fetchOne,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchAll: (action: any) => dispatch(fetchAllCategory(action)),
  fetchOne: (action: any) => dispatch(fetchOneCategory(action)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditCategoryComponent);
