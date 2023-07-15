import { EditOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Select } from "antd";
import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Message, NotificationType } from "../../../../../constants/Constants";
import { fetchAllListProjects } from "../../../../../redux/Project/Project.action";
import { ErrorHandler } from "../../../../../utilities/utilities";
import { OpenNotification } from "../../../../common/Notification/Notification.component";
import { EditTaskCategoryProp, PUT_TASK_CATEGORY } from "../../util/task.util";

const EditTaskCategoryComponent: FC<EditTaskCategoryProp> = ({
  data,
  fetchTableData,
  fetchProjects,
  projects,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (isModalVisible) {
      fetchProjects();

      form.setFieldsValue({
        ...data,
      });
    }
  }, [isModalVisible]);

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const restForm = () => {
    form.resetFields();
  };

  const Submit = (value: any) => {
    setLoading(true);
    const _data = {
      ...value,
      id: data.id,
    };

    PUT_TASK_CATEGORY(_data)
      .then(() => {
        setLoading(false);
        handleOk();
        fetchTableData();
        restForm();
        OpenNotification(NotificationType.SUCCESS, Message.UPDATE_SUCCESS, "");
      })
      .catch((error) => {
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            Message.UPDATE_FAILED,
            e.message
          )
        );
      });
  };

  return (
    <>
      <Button
        type="text"
        icon={<EditOutlined />}
        onClick={() => setIsModalVisible(true)}
      >
        Edit
      </Button>
      <Modal
        centered
        className="fixed-modal"
        title="Edit Category"
        open={isModalVisible}
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
        <Form layout="vertical" onFinish={Submit} form={form}>
          <div className="row">
            <div className="col-md-12">
              <Form.Item
                name="project_id"
                label="Project"
                rules={[
                  {
                    required: true,
                    message: "Required",
                  },
                ]}
              >
                <Select
                  placeholder="project"
                  options={projects.payload.map((e) => ({
                    label: e.name,
                    value: e.id,
                  }))}
                  style={{
                    width: "100%",
                  }}
                  showSearch
                  filterOption={(inputValue, option) => {
                    return (
                      (option?.label?.toString() ?? "")
                        .toLowerCase()
                        .indexOf(inputValue.toLowerCase()) !== -1
                    );
                  }}
                />
              </Form.Item>
            </div>

            <div className="col-md-12">
              <Form.Item
                name="name"
                label="Name"
                rules={[
                  {
                    required: true,
                    message: "Required",
                  },
                ]}
              >
                <Input placeholder="category" />
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
  projects: state.project.fetchList,
  tasks: state.task.fetchAll,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchProjects: (action: any) => dispatch(fetchAllListProjects(action)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditTaskCategoryComponent);
