import { Button, DatePicker, Form, Input, InputNumber, Select } from "antd";

import moment from "moment";
import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  BUILD,
  BuildType,
  Message,
  NotificationType,
  ProjectTypes,
} from "../../../../../constants/Constants";
import { fetchOneProjects } from "../../../../../redux/Project/Project.action";
import {
  ErrorHandler,
  formatterNumber,
  NumberValidator,
  parserNumber,
} from "../../../../../utilities/utilities";
import { OpenNotification } from "../../../../common/Notification/Notification.component";
import { ProjectPropType, editData } from "../../utils/Detail.util";
let { Option } = Select;
const ProjectComponent: FC<ProjectPropType> = ({ fetchProject, project }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [project_type, setProjectType] = useState(project.payload?.type);

  const Submit = (value: any) => {
    setLoading(true);
    const data = {
      ...value,
      id: project.payload?.id,
      commencement_date: value.date[0].format("YYYY-MM-DD"),
      completion_date: value.date[1].format("YYYY-MM-DD"),
    };
    editData(data)
      .then(() => {
        form.resetFields();
        fetchProject(project.payload?.id);
        setLoading(false);
        OpenNotification(
          NotificationType.SUCCESS,
          Message.PROJECT_UPDATE_SUCCESS,
          ""
        );
      })
      .catch((error) => {
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            Message.PROJECT_UPDATE_FAILED,
            e.message
          )
        );
      });
  };

  useEffect(() => {
    if (project.payload) {
      setProjectType(project.payload?.type);
      form.setFieldsValue({
        ...project.payload,
        date: project.payload?.commencement_date
          ? [
              moment(project.payload?.commencement_date),
              moment(project.payload?.completion_date),
            ]
          : null,
      });
    }
  }, [project, form]);

  const renderUnit = () => {
    switch (project_type) {
      case ProjectTypes.BUILDING:
        return (
          <>
            <div className="col-md-2 register_project">
              <Form.Item
                label="Basement"
                rules={[{ required: true, validator: NumberValidator }]}
                name="basement_size"
              >
                <Input type="number" min={0} />
              </Form.Item>
            </div>
            <div className="col-md-2">
              <Form.Item
                label="Floor"
                rules={[{ required: true, validator: NumberValidator }]}
                name="floor_size"
              >
                <Input type="number" min={0} />
              </Form.Item>
            </div>
          </>
        );
      case ProjectTypes.RENOVATION:
        return <></>;
      case ProjectTypes.ROAD:
        return (
          <>
            <div className="col-md-4">
              <Form.Item
                label="Km"
                rules={[{ required: true, validator: NumberValidator }]}
                name="road_size"
              >
                <Input type="number" min={0} />
              </Form.Item>
            </div>
          </>
        );
      default:
        return (
          <div className="col-md-4">
            <Form.Item
              label="Size"
              rules={[{ required: true, message: "Please input Project Size" }]}
              name="custom_size"
            >
              <Input type="text" />
            </Form.Item>
          </div>
        );
    }
  };

  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <Form
            layout="vertical"
            initialValues={{
              ...project.payload,
              date: project.payload?.commencement_date
                ? [
                    moment(project.payload?.commencement_date),
                    moment(project.payload?.completion_date),
                  ]
                : null,
            }}
            form={form}
            onFinish={Submit}
          >
            <div className="row">
              <div className="col-md-4">
                <Form.Item
                  label="Project No"
                  name="project_no"
                  rules={[{ required: true, message: "Project No Required!" }]}
                >
                  <Input placeholder="No" />
                </Form.Item>
              </div>
              <div className="col-md-4">
                <Form.Item
                  label="Project Name"
                  name="name"
                  rules={[
                    { required: true, message: "Project Name Required!" },
                  ]}
                >
                  <Input placeholder="Name" />
                </Form.Item>
              </div>
              <div className="col-md-4">
                <Form.Item
                  label="Project Type"
                  rules={[
                    { required: true, message: "Please input Project Type!" },
                  ]}
                  name="type"
                >
                  <Select
                    onChange={(e) => setProjectType(e ? e.toString() : "")}
                  >
                    <Option value={ProjectTypes.BUILDING}>
                      {ProjectTypes.BUILDING}
                    </Option>

                    <Option value={ProjectTypes.ROAD}>
                      {ProjectTypes.ROAD}
                    </Option>
                    <Option
                      disabled={BUILD === BuildType.ENTERPRISE_PROJECT}
                      value={ProjectTypes.RENOVATION}
                    >
                      {ProjectTypes.RENOVATION}
                    </Option>
                    <Option
                      disabled={BUILD === BuildType.ENTERPRISE_PROJECT}
                      value={ProjectTypes.INDUSTRY}
                    >
                      {ProjectTypes.INDUSTRY}
                    </Option>
                    <Option
                      disabled={BUILD === BuildType.ENTERPRISE_PROJECT}
                      value={ProjectTypes.WATER}
                    >
                      {ProjectTypes.WATER}
                    </Option>
                    <Option
                      disabled={BUILD === BuildType.ENTERPRISE_PROJECT}
                      value={ProjectTypes.POWER}
                    >
                      {ProjectTypes.POWER}
                    </Option>
                  </Select>
                </Form.Item>
              </div>
              {renderUnit()}

              <div className="col-md-4">
                <Form.Item
                  label="Project Location"
                  rules={[{ required: true }]}
                  name="location"
                >
                  <Input placeholder="Location" />
                </Form.Item>
              </div>

              <div className="col-md-4">
                <Form.Item
                  label="Date"
                  rules={[
                    {
                      required: true,
                      message: "Please input Date!",
                    },
                  ]}
                  name="date"
                >
                  <DatePicker.RangePicker />
                </Form.Item>
              </div>

              <div className="col-md-4">
                <Form.Item
                  label="Project Budget"
                  rules={[{ required: true, validator: NumberValidator }]}
                  name="budget"
                >
                  <InputNumber
                    min={0}
                    formatter={formatterNumber}
                    parser={parserNumber}
                    style={{ width: "100%" }}
                    placeholder="Budget"
                  />
                </Form.Item>
              </div>
              <div className="col-md-4">
                <Form.Item
                  label="Contract Number"
                  rules={[{ required: true, message: "Contract No required!" }]}
                  name="contract_no"
                >
                  <Input />
                </Form.Item>
              </div>
            </div>
          </Form>
        </div>
      </div>
      <div className="row mt-2">
        <div className="col-md-12">
          <Button
            type="primary"
            style={{ float: "right" }}
            onClick={() => form.submit()}
            loading={loading}
          >
            Submit
          </Button>
        </div>
      </div>
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
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchProject: (action: any) => dispatch(fetchOneProjects(action)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectComponent);
