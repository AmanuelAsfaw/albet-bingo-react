import { Button, DatePicker, Form, Input, Modal, Select, Upload } from "antd";
import { FC, useState, useEffect } from "react";
import { connect } from "react-redux";
import { EditOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons";
import {
  EditProjectTAskCategoryPropType,
  sendUpdateData,
} from "../../util/Catagory.util";
import { OpenNotification } from "../../../../../common/Notification/Notification.component";
import {
  CONTRACT_ADMINSTRATION_TYPES,
  NotificationType,
} from "../../../../../../constants/Constants";
import { ErrorHandler, getUserData } from "../../../../../../utilities/utilities";
import moment from "moment";import { fetchAllUser } from "../../../../../../redux/User/User.action";
import { fetchAllProjectTaskCategory, fetchOneProjectTaskCategory } from "../../../../../../redux/TaskFollowUp/ProjectTaskCategory/ProjectTaskCategory.action";

const EditCatagoryComponent: FC<
  EditProjectTAskCategoryPropType
> = ({ project, category,fetchAllProjectTaskCategory, fetchOneProjectTAskCategory }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState("");
  console.log(
    "🚀 ~ file: AddContractAdminstration.component.tsx ~ line 25 ~ type",
    type
  );
  const [form] = Form.useForm();
  const dateFormat = "DD-MM-YYYY";

  const handleOk = () => {
    setIsModalVisible(false);
    form.resetFields();
    setLoading(false);
    setType("");
  };

  const Submit = (value: any) => {
    value.project_id = category.project_id 
    value.id = category.id 
    console.log(value);
    
    
    setLoading(true);

    sendUpdateData(value)
      .then(() => {
        handleOk();
        setLoading(false);
        setType("");
        fetchAllProjectTaskCategory({ project_id: project.payload?.id });
        OpenNotification(
          NotificationType.SUCCESS,
          "Category saved!",
          ""
        );
      })
      .catch((error) => {
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            "Failed to save Category ",
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
        icon={<EditOutlined />}
        onClick={() => setIsModalVisible(true)}
      >
        Edit
      </Button>
      <Modal
        width={900}
        centered
        title="Edit Category"
        visible={isModalVisible}
        onCancel={handleOk}
        footer={[
          <>
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
            description: category.description,
          }}
        >
          <div className="row">
            
            <div className="col-md-6">
              <Form.Item
                label="Description"
                name="description"
                rules={[
                  {
                    required: true,
                    message: "Description Required!",
                  },
                ]}
              >
                <Input />
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
  users: state.user.fetchAll,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchAllProjectTaskCategory: (action: any) =>
    dispatch(fetchAllProjectTaskCategory(action)),
  fetchOneProjectTAskCategory: (action: any) => 
    dispatch(fetchOneProjectTaskCategory(action)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditCatagoryComponent);
