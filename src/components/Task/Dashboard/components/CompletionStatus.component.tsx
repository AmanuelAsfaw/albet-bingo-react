import { Card } from "antd";
import { FC, useState } from "react";
import { connect } from "react-redux";
import { Legend, Pie, PieChart, Sector } from "recharts";
import { format } from "../../../../utilities/utilities";
import { CompletionStatusProp } from "../util/dashboard.util";

const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    name,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text
        x={cx}
        y={cy}
        dy={8}
        style={{ fontSize: 30 }}
        textAnchor="middle"
        fill={fill}
      >
        {format(value, true)}
      </text>

      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >
        {name}
      </text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`${format(value, true)} tasks (${(percent * 100)?.toFixed(0)}%)`}
      </text>
    </g>
  );
};

const CompletionStatus: FC<CompletionStatusProp> = ({ task_report }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const data = () => {
    return [
      {
        name: "Completed",
        value: task_report?.payload?.completed ?? 0,
      },
      {
        name: "Incomplete",
        value: task_report?.payload?.incomplete ?? 0,
      },
    ];
  };

  return (
    <Card title="Total tasks by completion status">
      <PieChart width={730} height={300}>
        <Pie
          activeIndex={activeIndex}
          onMouseEnter={onPieEnter}
          activeShape={renderActiveShape}
          data={data()}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          innerRadius={60}
          fill="#8884d8"
        />
        <Legend />
      </PieChart>
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

export default connect(mapStateToProps, mapDispatchToProps)(CompletionStatus);
