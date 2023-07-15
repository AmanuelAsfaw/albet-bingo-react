import { EditOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Table,
} from "antd";
import React, { FC, useEffect, useState } from "react";
import moment from "moment";
import { OpenNotification } from "../../../../common/Notification/Notification.component";
import { Message, NotificationType } from "../../../../../constants/Constants";
import { ErrorHandler } from "../../../../../utilities/utilities";
import { connect } from "react-redux";

import { CreateWeeklyPlanReport } from "../../utils/WeeklyPlanReport.util";
import {
  fetchAllWeeklyPlanReport,
  fetchOneWeeklyPlanReport,
} from "../../../../../redux/WeeklyPlanReport/WeeklyPlanReport.action";
import {
  EditWeeklyPlanReportPropType,
  GoalOfTheWeekType,
  WeekDaysType,
  WeeklyPlanType,
  ProjectActivityType,
} from "./EditWeeklyPlanReport.utils";

const EditWeeklyPlanReportComponent: FC<EditWeeklyPlanReportPropType> = ({
  project,
  id,
  fetchOne,
  fetchAll,
  weekly_plan,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [projectActivity, setProjectActivity] = useState<ProjectActivityType[]>(
    []
  );
  const [weekGoal, setWeekGoal] = useState<GoalOfTheWeekType[]>([]);
  const [weekPlan, setWeekPlan] = useState<WeeklyPlanType[]>([]);
  const [weekDays, setWeekDays] = useState<WeekDaysType[]>([
    { name: "Monday", week_plan: weekPlan },
    { name: "Tuesday", week_plan: weekPlan },
    { name: "Wednesday", week_plan: weekPlan },
    { name: "Thursday", week_plan: weekPlan },
    { name: "Friday", week_plan: weekPlan },
    { name: "Saturday", week_plan: weekPlan },
    { name: "Sunday", week_plan: weekPlan },
  ]);
  const [loading, setLoading] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [payload, setPayload] = useState<any>(null);
  const [general_form] = Form.useForm();

  useEffect(() => {
    isModalVisible ? fetchOne(id) : null;
  }, [fetchOne, id, isModalVisible]);

  useEffect(() => {
    if (isModalVisible) {
      if (
        !weekly_plan.isPending &&
        Object.keys(weekly_plan.payload).length > 0
      ) {
        const prjId = project.filter(
          (prj) => prj.id === weekly_plan.payload.project_id
        )[0]?.id;
        weekly_plan.payload.date = moment(weekly_plan.payload.date);
        setPayload(weekly_plan.payload);
        setCurrentProject(prjId);
        setWeekGoal(weekly_plan.payload.goals_for_the_week);
        setProjectActivity(weekly_plan.payload.project_activity_schedule ?? []);

        weekly_plan.payload.weekly_plan?.map((items: any, index: number) => {
          let newData = [...items.week_plan];
          weekDays[index].week_plan = newData;
          let temp = [...weekDays];
          setWeekDays(temp);
        });
      }
    }
  }, [weekly_plan, isModalVisible]);

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    clearForm();
  };

  const handleAdd = (data: any, setData: Function, selector: string) => {
    console.log(data, setData, selector);
    let newData = [...data];
    newData.push({ [selector]: "", key: new Date() });
    setData(newData);
  };

  const handleAddPlan = (index: number) => {
    let newData = [...weekDays[index].week_plan];
    newData.push({ week_plan: "", key: new Date() });
    let temp = [...weekDays];
    temp[index].week_plan = newData;
    setWeekDays(temp);
  };

  const handleRemove = (data: any, setData: Function, index: number) => {
    let newData = [...data];
    let removeItem = newData.filter((items, idx) => idx != index);
    setData(removeItem);
  };
  const handleRemoveWeekPlan = (weekDay: number, index: number) => {
    let newData = [...weekDays[weekDay].week_plan];
    let removeItem = newData.filter((items, idx) => idx != index);
    let temp = [...weekDays];
    temp[weekDay].week_plan = removeItem;
    setWeekDays(temp);
  };

  const clearForm = () => {
    general_form.resetFields();
    setWeekPlan([]);
    setWeekDays([
      { name: "Monday", week_plan: weekPlan },
      { name: "Tuesday", week_plan: weekPlan },
      { name: "Wednesday", week_plan: weekPlan },
      { name: "Thursday", week_plan: weekPlan },
      { name: "Friday", week_plan: weekPlan },
      { name: "Saturday", week_plan: weekPlan },
      { name: "Sunday", week_plan: weekPlan },
    ]);
    setWeekGoal([]);
  };

  const Submit = (value: any) => {
    setLoading(true);
    for (const key in value) {
      if (
        key.startsWith("goal_for_the_week") ||
        key.startsWith("week_plan") ||
        key.startsWith("project_activity_schedule")
      ) {
        delete value[key];
      }
    }
    value.goals_for_the_week = JSON.stringify(weekGoal);
    value.weekly_plan = JSON.stringify(weekDays);
    value.project_activity_schedule = JSON.stringify(projectActivity);
    value.id = weekly_plan.payload.id;
    CreateWeeklyPlanReport(value)
      .then(() => {
        setTimeout(() => {
          clearForm();
          setLoading(false);
          fetchAll();
          handleOk();
          OpenNotification(
            NotificationType.SUCCESS,
            Message.WEEKLY_PLAN_REPORT_REGISTERED_SUCCESS,
            ""
          );
        }, 1000);
      })
      .catch((error: any) => {
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            Message.WEEKLY_PLAN_REPORT_REGISTERED_FAIL,
            e.message
          )
        );
      });
  };
  const onChange = (
    key: any,
    selector: any,
    value: any,
    data: any,
    setData: Function,
    weekIndex: number
  ) => {
    let temp = [...data];
    let index = temp.findIndex((e) => e.key === key);

    if (index !== -1) {
      temp[index] = {
        ...temp[index],
        [selector]: value,
      };
      if (selector == "week_plan") {
        let week = [...weekDays];
        week[weekIndex].week_plan = temp;
        setWeekDays(week);
      } else setData(temp);
    }
  };

  const renderContent = () => {
    return (
      <Form
        layout="vertical"
        form={general_form}
        onFinish={Submit}
        initialValues={payload}
      >
        <Col style={{ width: "100%" }}>
          <Form.Item
            label="Project"
            name={"project_id"}
            initialValue={currentProject}
            rules={[{ required: true, message: "Project required" }]}
          >
            <Select
              defaultValue={currentProject}
              placeholder="Select Project"
              style={{ width: 200 }}
              allowClear={false}
              showSearch
              filterOption={(input, option) =>
                (option?.label.toLowerCase() ?? "").includes(
                  input.toLowerCase()
                )
              }
              options={project.map((item) => ({
                value: item.id,
                label: item.name,
              }))}
            ></Select>
          </Form.Item>
        </Col>
        <Col style={{ width: "100%" }}>
          <Form.Item
            label="Week"
            name={"date"}
            rules={[{ required: true, message: "Week required" }]}
          >
            <DatePicker picker="week" allowClear={false} />
          </Form.Item>
        </Col>
        <Col style={{ width: "100%" }}>
          <Form.Item
            label="Follow Up Resident"
            name={"follow_up_resident"}
            rules={[{ required: true, message: "Follow up resident required" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col style={{ width: "100%" }}>
          <p>Goal for the week</p>
          <Table
            columns={[
              {
                title: "No.",
                dataIndex: "no",
                key: 1,
                width: "50px",
                render: (record: any, value: any, index: any) => index + 1,
              },
              {
                title: "Goals For The Week",
                dataIndex: "goal_for_the_week",
                key: 2,
                width: "250px",
                render: (value: any, record: any, index: number) => (
                  <Form.Item
                    name={`_goal_for_the_week${record.key}`}
                    rules={[
                      {
                        required: true,
                        message: "Goal for the week required",
                      },
                    ]}
                    initialValue={value}
                  >
                    <Input.TextArea
                      defaultValue={value}
                      onChange={(e) =>
                        onChange(
                          record.key,
                          "goal_for_the_week",
                          e.target.value,
                          weekGoal,
                          setWeekGoal,
                          0
                        )
                      }
                    />
                  </Form.Item>
                ),
              },
              {
                title: "Action",
                dataIndex: "action",
                key: 2,
                width: "50px",
                render: (value: any, record: any, index) => (
                  <Button
                    onClick={() => handleRemove(weekGoal, setWeekGoal, index)}
                  >
                    <MinusOutlined />
                  </Button>
                ),
              },
            ]}
            footer={(res) => (
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Button
                  style={{ width: "80%" }}
                  onClick={() =>
                    handleAdd(weekGoal, setWeekGoal, "goal_for_the_week")
                  }
                >
                  <PlusOutlined />
                </Button>
              </div>
            )}
            dataSource={weekGoal}
          />
        </Col>
        <Col style={{ width: "100%" }}>
          <Form.Item label="Remark" name={"remark"}>
            <Input.TextArea />
          </Form.Item>
        </Col>
        <Row gutter={10} style={{ justifyContent: "space-between" }}>
          {weekDays.map((items, index) => (
            <Col key={index} style={{ width: "49%" }}>
              <p>{items.name}</p>

              <Table
                bordered
                columns={[
                  {
                    title: "No.",
                    dataIndex: "no",
                    key: 1,
                    width: "50px",
                    render: (record: any, value: any, index: any) => index + 1,
                  },
                  {
                    title: "Weekly Plan",
                    dataIndex: "week_plan",
                    key: 2,
                    width: "250px",
                    render: (value: any, record: any, innerIndex: number) => (
                      <Form.Item
                        name={`week_plan${record.key}`}
                        rules={[
                          {
                            required: true,
                            message: "Week plan required",
                          },
                        ]}
                        initialValue={record.week_plan}
                      >
                        <Input.TextArea
                          defaultValue={record.week_plan}
                          onChange={(e) =>
                            onChange(
                              record.key,
                              "week_plan",
                              e.target.value,
                              weekDays[index].week_plan,
                              setWeekDays,
                              index
                            )
                          }
                        />
                      </Form.Item>
                    ),
                  },
                  {
                    title: "Action",
                    dataIndex: "action",
                    key: 2,
                    width: "50px",
                    render: (value: any, record: any, innerIndex: number) => (
                      <Button
                        onClick={() => handleRemoveWeekPlan(index, innerIndex)}
                      >
                        <MinusOutlined />
                      </Button>
                    ),
                  },
                ]}
                footer={(res) => (
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Button
                      style={{ width: "80%" }}
                      onClick={() => handleAddPlan(index)}
                    >
                      <PlusOutlined />
                    </Button>
                  </div>
                )}
                dataSource={items.week_plan}
              />
            </Col>
          ))}
        </Row>
        <Col style={{ width: "100%" }}>
          <p>Project Activity Schedule</p>
          <Table
            columns={[
              {
                title: "No.",
                dataIndex: "no",
                key: 1,
                width: "50px",
                render: (record: any, value: any, index: any) => index + 1,
              },
              {
                title: "Project activity schedule",
                dataIndex: "project_activity_schedule",
                key: 2,
                width: "250px",
                render: (value: any, record: any, index: number) => (
                  <Form.Item
                    name={`project_activity_schedule${record.key}`}
                    rules={[
                      {
                        required: true,
                        message: "Project activity schedule required",
                      },
                    ]}
                    initialValue={value}
                  >
                    <Input.TextArea
                      defaultValue={value}
                      onChange={(e) =>
                        onChange(
                          record.key,
                          "project_activity_schedule",
                          e.target.value,
                          projectActivity,
                          setProjectActivity,
                          0
                        )
                      }
                    />
                  </Form.Item>
                ),
              },
              {
                title: "Action",
                dataIndex: "action",
                key: 2,
                width: "50px",
                render: (value: any, record: any, index) => (
                  <Button
                    onClick={() =>
                      handleRemove(projectActivity, setProjectActivity, index)
                    }
                  >
                    <MinusOutlined />
                  </Button>
                ),
              },
            ]}
            footer={(res) => (
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Button
                  style={{ width: "80%" }}
                  onClick={() =>
                    handleAdd(
                      projectActivity,
                      setProjectActivity,
                      "project_activity_schedule"
                    )
                  }
                >
                  <PlusOutlined />
                </Button>
              </div>
            )}
            dataSource={projectActivity}
          />
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
          width={1300}
          title="Edit Weekly Plan Report"
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
          {payload && renderContent()}
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
  weekly_plan: state.weekly_plan_report.fetchOne,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchAll: (action: any) => dispatch(fetchAllWeeklyPlanReport(action)),
  fetchOne: (action: any) => dispatch(fetchOneWeeklyPlanReport(action)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditWeeklyPlanReportComponent);
