import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Modal, Select } from "antd";
import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  EditSubCategoryType,
  sendSubCategory,
} from "../../utils/Category.utils";
import { OpenNotification } from "../../../../common/Notification/Notification.component";
import { Message, NotificationType } from "../../../../../constants/Constants";
import { ErrorHandler } from "../../../../../utilities/utilities";

import { fetchAllCategory } from "../../../../../redux/Category/Category.action";
import {
  fetchAllSubCategory,
  fetchOneSubCategory,
} from "../../../../../redux/SubCategory/SubCategory.action";
import { useParams } from "react-router-dom";

const EditSubCategoryComponent: FC<EditSubCategoryType> = ({
  id,
  sub_category,
  fetchAll,
  fetchOne,
  category,
  fetchAllCategory,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<any>("");
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
      fetchAllCategory({ project_id });
    }
  }, [fetchOne, id, isModalVisible]);

  useEffect(() => {
    if (isModalVisible) {
      if (!sub_category.isPending) {
        general_form.setFieldsValue({
          ...sub_category.payload,
        });
      }
    }
  }, [sub_category, isModalVisible]);

  const Submit = (value: any) => {
    setLoading(true);
    value.id = sub_category.payload.id;
    value.project_id = project_id;
    sendSubCategory(value)
      .then(() => {
        setTimeout(() => {
          setLoading(false);
          fetchAll({ category_id: value.category_id, project_id });
          handleOk();
          clearForm();
          OpenNotification(
            NotificationType.SUCCESS,
            Message.SUB_CATEGORY_UPDATE_SUCCESS,
            ""
          );
        }, 1000);
      })
      .catch((error: any) => {
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            Message.SUB_CATEGORY_UPDATE_FAIL,
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
        <Col style={{ width: "100%" }}>
          <Form.Item
            label="Category"
            name="category_id"
            rules={[{ required: true, message: "Category required" }]}
          >
            <Select
              placeholder="select category"
              style={{ width: "100%" }}
              showSearch
              allowClear={false}
              onSearch={(input) => setSelectedCategory(input)}
              value={selectedCategory}
              filterOption={(inputValue, option) => {
                return (
                  (option?.children?.toString() ?? "")
                    .toLowerCase()
                    .indexOf(inputValue.toLowerCase()) !== -1
                );
              }}
            >
              {category.payload.map((items, index) => (
                <Select.Option value={items.id} key={index}>
                  {items.description}
                </Select.Option>
              ))}
            </Select>
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
          {sub_category.payload && renderContent()}
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
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchOne: (action: any) => dispatch(fetchOneSubCategory(action)),
  fetchAll: (action: any) => dispatch(fetchAllSubCategory(action)),
  fetchAllCategory: (action: any) => dispatch(fetchAllCategory(action)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditSubCategoryComponent);
