import { Button, DatePicker, Form, Input, Modal, Select, Upload } from "antd";
import { FC, useState, useEffect } from "react";
import { connect } from "react-redux";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import {
  AddProjectTAskCategoryPropType,
  sendData,
} from "../../util/Catagory.util";
import { OpenNotification } from "../../../../../common/Notification/Notification.component";
import {
  NotificationType,
} from "../../../../../../constants/Constants";
import { ErrorHandler, getUserData } from "../../../../../../utilities/utilities";
import moment from "moment";
import { fetchAllUser } from "../../../../../../redux/User/User.action";
import { fetchAllProjectTaskCategory } from "../../../../../../redux/TaskFollowUp/ProjectTaskCategory/ProjectTaskCategory.action";

const AddCatagoryComponent: FC<
  AddProjectTAskCategoryPropType
> = ({ project, users, fetchUser, fetchAllProjectTaskCategory }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState("");
  console.log(
    "🚀 ~ file: AddCategory.component.tsx ~ line 25 ~ type",
    type
  );
  const [form] = Form.useForm();
  const dateFormat = "DD-MM-YYYY";

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const handleOk = () => {
    setIsModalVisible(false);
    form.resetFields();
    setLoading(false);
    setType("");
  };

  const Submit = (value: any) => {
    value.project_id = project.payload?.id 
    console.log(value);
    
    
    setLoading(true);

    sendData(value)
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
        icon={<PlusOutlined />}
        onClick={() => setIsModalVisible(true)}
      >
        New Category
      </Button>
      <Modal
        width={900}
        centered
        title="New Category"
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
            date: moment(),
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
  fetchUser: (action: any) => dispatch(fetchAllUser(action)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCatagoryComponent);
