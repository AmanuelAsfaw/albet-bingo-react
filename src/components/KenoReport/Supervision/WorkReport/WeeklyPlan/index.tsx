import { DeleteOutlined, MoreOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Popover, Table } from "antd";
import moment from "moment";
import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { NotificationType } from "../../../../../constants/Constants";
import { fetchAllUser } from "../../../../../redux/User/User.action";
import { fetchAllWeeklyPlan } from "../../../../../redux/WeeklyPlan/WeeklyPlan.action";
import {
  ErrorHandler,
  format,
  getUserData,
} from "../../../../../utilities/utilities";
import AuthenticationComponent from "../../../../common/Auth/Authentication.component";
import { OpenNotification } from "../../../../common/Notification/Notification.component";
import ReloadButtonComponent from "../../../../common/ReloadButton/ReloadButton.component";
import AddWeeklyPlanComponent from "./components/Add/AddWeeklyPlan.component";
import EditWeeklyPlanComponent from "./components/Edit/EditWeeklyPlan.component";
import ShareWeeklyPlanComponent from "./components/Share/ShareWeeklyPlan.component";
import ViewWeeklyPlanComponent from "./components/View/ViewWeeklyPlan.component";
import { DELETE, WeeklyPlanPropType } from "./utils/WeeklyPlan.util";

const WeeklyPlanComponent: FC<WeeklyPlanPropType> = ({
  fetchWeeklyPlans,
  weekly_plans,
  project,
  fetchUsers,
}) => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchWeeklyPlans({ project_id: project.payload?.id });
  }, [project, fetchWeeklyPlans]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const onDelete = (id: number) => {
    setLoading(true);
    DELETE(id)
      .then(() => {
        setLoading(false);
        fetchWeeklyPlans({ project_id: project.payload?.id });
        OpenNotification(NotificationType.SUCCESS, "Weekly Plan Removed", "");
      })
      .catch((error) => {
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            "Failed To Remove Weekly-Plan",
            e.message
          )
        );
      });
  };

  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <ReloadButtonComponent
            onClick={() =>
              fetchWeeklyPlans({ project_id: project?.payload.id })
            }
          />
          <AuthenticationComponent type="WRITE">
            <AddWeeklyPlanComponent />
          </AuthenticationComponent>
        </div>
      </div>
      <div className="row mt-2">
        <div className="col-md-12">
          <Table
            columns={[
              {
                title: "No",
                key: "key",
                dataIndex: "key",
              },
              {
                title: "Date",
                key: "date",
                render: (value, record) =>
                  moment(record.date).format("MMMM-YYYY"),
              },
              {
                title: "Total Amount",
                key: "total",
                render: (value, record) =>
                  format(
                    record.weekly_plan_items.reduce(
                      (total, current) =>
                        total +
                        current.week1 +
                        current.week2 +
                        current.week3 +
                        current.week4,
                      0
                    )
                  ),
              },
              {
                title: "Share",
                key: "Share",
                render: (value, record) =>
                  record.user_id === getUserData().id ? (
                    <ShareWeeklyPlanComponent weekly_plan={record} />
                  ) : null,
              },
              {
                title: "Action",
                key: "action",
                render: (value, record) => (
                  <Popover
                    placement="rightTop"
                    overlayClassName="action-popover"
                    trigger="focus"
                    content={
                      <div className="d-flex flex-column">
                        <EditWeeklyPlanComponent weekly_plan={record} />
                        <ViewWeeklyPlanComponent weekly_plan={record} />
                        <Popconfirm
                          placement="leftTop"
                          title="Are you sure you want to remove the weekly plan?"
                          onConfirm={() => onDelete(record.id)}
                          okText="Yes"
                          cancelText="No"
                        >
                          <Button danger type="text" loading={loading}>
                            Delete
                          </Button>
                        </Popconfirm>
                      </div>
                    }
                  >
                    <Button
                      icon={<MoreOutlined />}
                      className="btn-outline-secondary border-0"
                    ></Button>
                  </Popover>
                ),
              },
            ]}
            loading={weekly_plans.isPending}
            dataSource={weekly_plans.payload.map((e, index) => ({
              ...e,
              key: index + 1,
            }))}
          />
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
  weekly_plans: state.weekly_plan.fetchAll,
  project: state.project.fetchOne,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchWeeklyPlans: (action: any) => dispatch(fetchAllWeeklyPlan(action)),
  fetchUsers: (action: any) => dispatch(fetchAllUser(action)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WeeklyPlanComponent);
