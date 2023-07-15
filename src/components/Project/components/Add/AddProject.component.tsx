import {
  AutoComplete,
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
} from "antd";
import { FC, useState } from "react";
import { connect } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";
import { AddProjectPropType, sendData } from "../../utils/Project.util";
import { fetchAllProjects } from "../../../../redux/Project/Project.action";
import { OpenNotification } from "../../../common/Notification/Notification.component";
import {
  BUILD,
  BuildType,
  Message,
  NotificationType,
  ProjectTypes,
  TypeOfProject,
} from "../../../../constants/Constants";
import {
  ErrorHandler,
  getLast,
  NumberValidator,
  zeroPad,
} from "../../../../utilities/utilities";
import { toNumber } from "lodash";
const AddProjectComponent: FC<AddProjectPropType> = ({
  fetchProjects,
  projects,
}) => {
  let { Option } = Select;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [project_type, setProjectType] = useState(ProjectTypes.BUILDING);

  const handleOk = () => {
    setIsModalVisible(false);
  };

  // const renderUnit = () => {
  //   switch (project_type) {
      // case ProjectTypes.BUILDING:
      //   return (
      //     <>
      //       <div className="col-md-3 register_project">
      //         <Form.Item
      //           label="Basement"
      //           rules={[{ required: true, validator: NumberValidator }]}
      //           name="basement_size"
      //         >
      //           <Input type="number" min={0} />
      //         </Form.Item>
      //       </div>
      //       <div className="col-md-3">
      //         <Form.Item
      //           label="Floor"
      //           rules={[{ required: true, validator: NumberValidator }]}
      //           name="floor_size"
      //         >
      //           <Input type="number" min={0} />
      //         </Form.Item>
      //       </div>
      //     </>
      //   );
      // case ProjectTypes.RENOVATION:
      //   return <></>;
      // case ProjectTypes.ROAD:
      //   return (
      //     <>
      //       <div className="col-md-4">
      //         <Form.Item
      //           label="Km"
      //           rules={[{ required: true, validator: NumberValidator }]}
      //           name="road_size"
      //         >
      //           <Input type="number" min={0} />
      //         </Form.Item>
      //       </div>
      //     </>
      //   );
      // default:
      //   return (
      //     <div className="col-md-4">
      //       <Form.Item
      //         label="Size"
      //         rules={[{ required: true, message: "Please input Project Size" }]}
      //         name="custom_size"
      //       >
      //         <Input type="text" />
      //       </Form.Item>
      //     </div>
      //   );
  //   }
  // };

  const Submit = (value: any) => {
    setLoading(true);
    const data = {
      ...value,
      project_type: TypeOfProject.POST_CONTRACT,
    };

    console.log({ data });

    sendData(data)
      .then(() => {
        form.resetFields();
        fetchProjects();
        handleOk();
        setLoading(false);
        OpenNotification(
          NotificationType.SUCCESS,
          Message.PROJECT_REGISTRATION_SUCCESS,
          ""
        );
      })
      .catch((error) => {
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            Message.PROJECT_REGISTRATION_FAILED,
            e.message
          )
        );
      });
  };

  return (
    <>
      <h6 className="float-left mt-4 pt-2 pl-3 mb-0 pb-0">Projects</h6>
      <Button
        className="btn-outline-secondary mt-4 mr-3"
        style={{ float: "right" }}
        icon={<PlusOutlined />}
        onClick={() => setIsModalVisible(true)}
      >
        Register
      </Button>
      <Modal
        className="fixed-modal"
        centered
        width={700}
        title="Register Project"
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
            project_no: zeroPad(getLast(projects.payload, "project_no")),
            type: project_type,
          }}
        >
          <div className="row">
            <div className="col-md-6">
              <Form.Item
                label="Project No"
                name="project_no"
                rules={[{ required: true, message: "Project No Required " }]}
              >
                <Input prefix={"P -"} />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: "Project Name Required " }]}
              >
                <Input placeholder="Project Name" />
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <Form.Item
                label="Project Type"
                rules={[
                  { required: true, message: "Please input Project Type!" },
                ]}
                name="type"
              >
                <AutoComplete
                  style={{width: "100%"}}
                  options={[
                    {
                      key: 1,
                      value: ProjectTypes.BUILDING,
                      label: ProjectTypes.BUILDING,
                    },
                    {
                      key: 2,
                      value: ProjectTypes.RENOVATION,
                      label: ProjectTypes.RENOVATION,
                      disabled: BUILD === BuildType.ENTERPRISE_PROJECT,
                    },
                    {
                      key: 3,
                      value: ProjectTypes.INDUSTRY,
                      label: ProjectTypes.INDUSTRY,
                      disabled: BUILD === BuildType.ENTERPRISE_PROJECT,
                    },
                    {
                      key: 4,
                      value: ProjectTypes.WATER,
                      label: ProjectTypes.WATER,
                      disabled: BUILD === BuildType.ENTERPRISE_PROJECT,
                    },
                    {
                      key: 5,
                      value: ProjectTypes.POWER,
                      label: ProjectTypes.POWER,
                      disabled: BUILD === BuildType.ENTERPRISE_PROJECT,
                    },
                  ]}
                  onSelect={(val) => setProjectType(val ? val.toString() : "")}
                  placeholder="Search"
                />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item
                label="Project Location"
                name="location"
                rules={[
                  { required: true, message: "Project Location Required " },
                ]}
              >
                <Input placeholder="Location" />
              </Form.Item>
            </div>
          </div>
          <div className="row">
            {/* {renderUnit()} */}
            <div className="col-md-6">
              <Form.Item
                label="Budget"
                name="budget"
                rules={[
                  { required: true, message: "Project Budget Required " },
                ]}
              >
                <InputNumber
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) =>
                    toNumber(value ? value.replace(/\$\s?|(,*)/g, "") : "")
                  }
                  placeholder="Budget"
                />
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
  projects: state.project.fetchAll,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchProjects: (action: any) => dispatch(fetchAllProjects(action)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddProjectComponent);
