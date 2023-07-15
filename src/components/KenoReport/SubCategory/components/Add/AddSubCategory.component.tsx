import { PlusOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Modal, Select } from "antd";
import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  AddSubCategoryPropType,
  sendSubCategory,
} from "../../utils/Category.utils";
import { OpenNotification } from "../../../../common/Notification/Notification.component";
import { Message, NotificationType } from "../../../../../constants/Constants";
import { ErrorHandler } from "../../../../../utilities/utilities";
import { fetchAllSubCategory } from "../../../../../redux/SubCategory/SubCategory.action";
import { fetchAllCategory } from "../../../../../redux/Category/Category.action";
import { useParams } from "react-router-dom";

const AddSubCategory: FC<AddSubCategoryPropType> = ({
  fetchAll,
  category,
  fetchAllCategory,
  defaultCategory,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<any>("");
  const [defaultValue, setDefault] = useState<any>();
  const [general_form] = Form.useForm();
  const { id } = useParams();

  useEffect(() => {
    fetchAllCategory({ project_id: id });
  }, []);

  useEffect(() => {
    setDefault(
      category.payload.filter((item) => item.id == defaultCategory)[0]?.id
    );
  }, [category.payload, defaultCategory]);

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
    sendSubCategory(value)
      .then(() => {
        setTimeout(() => {
          setLoading(false);
          fetchAll({ category_id: defaultValue, project_id: id });
          handleOk();
          clearForm();
          OpenNotification(
            NotificationType.SUCCESS,
            Message.SUB_CATEGORY_REGISTERED_SUCCESS,
            ""
          );
        }, 1000);
      })
      .catch((error: any) => {
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            Message.SUB_CATEGORY_REGISTERED_FAIL,
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
            initialValue={defaultValue}
          >
            <Select
              defaultValue={defaultValue}
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
        icon={<PlusOutlined />}
      >
        Add Sub Category
      </Button>

      <>
        <Modal
          className="fixed-modal"
          centered
          width={500}
          title="New Sub Category"
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
  sub_category: state.sub_category.fetchAll,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchAll: (action: any) => dispatch(fetchAllSubCategory(action)),
  fetchAllCategory: (action: any) => dispatch(fetchAllCategory(action)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddSubCategory);
