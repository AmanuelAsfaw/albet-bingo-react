import { Tag } from "antd";
import moment from "moment";
import { FC } from "react";
import { connect } from "react-redux";
import { StatusWeeklySiteReportPropType } from "../../util/WeeklyReports.util";

const StatusTaskComponent: FC<StatusWeeklySiteReportPropType> = ({
  week,
  reportDetaillist_data,
}) => {
  const dateFormat = "DD-MM-YYYY h:mm A";

  const Render = () => {
    const item: any[] = [];
    if (
      reportDetaillist_data?.filter((item: any) => {
        return item.check === true;
      }).length === reportDetaillist_data?.length
    ) {
      item.push(
        <Tag color={"green"}>
          {`${
            reportDetaillist_data?.filter((item: any) => {
              return item.check === true;
            }).length
          } / ${reportDetaillist_data?.length}`}
        </Tag>
      );
    } else if (
      !moment("18:00", "h:mm A").isAfter(moment(week, dateFormat))
    ) {
      item.push(
        <Tag color={"yellow"}>
          {`${
            reportDetaillist_data?.filter((item: any) => {
              return item.check === true;
            }).length
          } / ${reportDetaillist_data?.length}`}
        </Tag>
      );
    } else if (
      moment("18:00", "h:mm A").isAfter(moment(week, dateFormat))
    ) {
      item.push(
        <Tag color={"red"} key={item.length}>
          {`${
            reportDetaillist_data?.filter((item: any) => {
              return item.check === true;
            }).length
          } / ${reportDetaillist_data?.length}`}
        </Tag>
      );
    }
    return item;
  };

  return <>{Render()}</>;
};

/**
 * Map State to Props
 *
 * @param state
 */
const mapStateToProps = (state: any) => ({});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StatusTaskComponent);
