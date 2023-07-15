import { Card } from "antd";
import { FC, useEffect } from "react";
import { connect } from "react-redux";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { CompletionOverTimeProp } from "../util/dashboard.util";

const CompletionOverTime: FC<CompletionOverTimeProp> = ({ task_report }) => {
  useEffect(() => {}, []);

  return (
    <Card title="Task completion over time">
      <LineChart
        width={650}
        height={300}
        data={task_report.payload?.completion_over_time}
        // margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="date"
          height={60}
          angle={300}
          tickMargin={20}
          style={{ fontSize: 11, fontFamily: "sans-serif" }}
        />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="total" stroke="#8884d8" />
        <Line type="monotone" dataKey="completed" stroke="#82ca9d" />
      </LineChart>
    </Card>
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

export default connect(mapStateToProps, mapDispatchToProps)(CompletionOverTime);
