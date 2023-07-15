import { Card, Statistic } from "antd";
import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { CardsProp } from "../util/dashboard.util";
import { format } from "../../../../utilities/utilities";

const CardsComponent: FC<CardsProp> = ({ task_report }) => {
  return (
    <div className="row">
      <div className="col-md-3 text-center">
        <Card>
          <Statistic
            title="Completed tasks"
            value={format(task_report?.payload?.completed, true)}
            valueStyle={{ fontSize: 16, fontFamily: "Campton-Medium" }}
          />
        </Card>
      </div>

      <div className="col-md-3 text-center">
        <Card>
          <Statistic
            title="Incomplete tasks"
            value={format(task_report?.payload?.incomplete, true)}
            valueStyle={{ fontSize: 16, fontFamily: "Campton-Medium" }}
          />
        </Card>
      </div>

      <div className="col-md-3 text-center">
        <Card>
          <Statistic
            title="Overdue tasks"
            value={format(task_report?.payload?.overdue, true)}
            valueStyle={{ fontSize: 16, fontFamily: "Campton-Medium" }}
          />
        </Card>
      </div>

      <div className="col-md-3 text-center">
        <Card>
          <Statistic
            title="Total tasks"
            value={format(task_report?.payload?.total, true)}
            valueStyle={{ fontSize: 16, fontFamily: "Campton-Medium" }}
          />
        </Card>
      </div>
    </div>
  );
};

/**
 * Map State to Props
 *
 * @param state
 */
const mapStateToProps = (state: any) => ({
  task_report: state.task.fetchReport,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(CardsComponent);
