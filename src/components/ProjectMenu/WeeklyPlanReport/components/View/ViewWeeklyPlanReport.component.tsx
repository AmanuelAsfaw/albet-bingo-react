import { EyeOutlined } from "@ant-design/icons";
import { Button, Col, DatePicker, Form, Input, Modal, Row, Table } from "antd";
import { FC, useState } from "react";
import moment from "moment";
import { connect } from "react-redux";
import { ViewWeeklyPlanReportPropType } from "./ViewWeeklyPlanReport.utils";

const ViewWeeklyPlanReportComponent: FC<ViewWeeklyPlanReportPropType> = ({
  weekly_plan_report,
  project,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const projects = project.filter(
    (items) => items.id == weekly_plan_report.project_id
  )[0].name;

  const week_plan = {
    ...weekly_plan_report,
    date: moment(weekly_plan_report.date),
    project_id: projects,
  };
  const goal: any = weekly_plan_report.goals_for_the_week;
  const week: any = weekly_plan_report.weekly_plan;
  const projectActivity: any = weekly_plan_report.project_activity_schedule;

  const renderContent = () => {
    return (
      <Form layout="vertical" initialValues={week_plan}>
        <Form.Item label="Project" name={"project_id"}>
          <Input readOnly />
        </Form.Item>
        <Form.Item label="Week" name={"date"}>
          <DatePicker
            disabled
            allowClear={false}
            style={{ color: "red" }}
            picker="week"
          />
        </Form.Item>
        <Form.Item label="Follow Up Resident" name={"follow_up_resident"}>
          <Input readOnly />
        </Form.Item>
        <p>Goals For the Week</p>
        <Table
          dataSource={goal}
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
              render: (value: any, record: any, index: number) => value,
            },
          ]}
        />
        <Form.Item label="Remark" name={"remark"}>
          <Input readOnly />
        </Form.Item>
        <Row>
          {week.map((items: any, index: number) => (
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
                    render: (value: any) => value,
                  },
                ]}
                dataSource={items.week_plan}
              />
            </Col>
          ))}
        </Row>
        <p>Project Activity Schedule</p>
        <Table
          dataSource={projectActivity}
          columns={[
            {
              title: "No.",
              dataIndex: "no",
              key: 1,
              width: "50px",
              render: (record: any, value: any, index: any) => index + 1,
            },
            {
              title: "Project Activity Schedule",
              dataIndex: "project_activity_schedule",
              key: 2,
              width: "250px",
              render: (value: any, record: any, index: number) => value,
            },
          ]}
        />
      </Form>
    );
  };

  return (
    <div>
      <Button
        onClick={() => setIsModalVisible(true)}
        type="link"
        icon={<EyeOutlined />}
      >
        View
      </Button>

      <>
        <Modal
          className="fixed-modal"
          centered
          width={1300}
          title="View Weekly Plan Report"
          open={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <>
              <Button onClick={handleCancel}>Close</Button>
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
  //   weekly_plan: state.weekly_plan.fetchOne,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  //   fetchAll: (action: any) => dispatch(fetchAllWeeklyPlanReport(action)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewWeeklyPlanReportComponent);
