import { Tag } from "antd";
import moment from "moment";
import { FC } from "react";
import { connect } from "react-redux";
import { StatusTaskPropType } from "../../util/Tasks.util";

const StatusTaskComponent: FC<StatusTaskPropType> = ({
  due_date,
  checklist_data,
}) => {
  const dateFormat = "DD-MM-YYYY h:mm A";

  const Render = () => {
    const item: any[] = [];
    if (
      checklist_data?.filter((item: any) => {
        return item.check === true;
      }).length === checklist_data?.length
    ) {
      item.push(
        <Tag color={"green"}>
          {`${
            checklist_data?.filter((item: any) => {
              return item.check === true;
            }).length
          } / ${checklist_data?.length}`}
        </Tag>
      );
    } else if (
      !moment("18:00", "h:mm A").isAfter(moment(due_date, dateFormat))
    ) {
      item.push(
        <Tag color={"yellow"}>
          {`${
            checklist_data?.filter((item: any) => {
              return item.check === true;
            }).length
          } / ${checklist_data?.length}`}
        </Tag>
      );
    } else if (
      moment("18:00", "h:mm A").isAfter(moment(due_date, dateFormat))
    ) {
      item.push(
        <Tag color={"red"} key={item.length}>
          {`${
            checklist_data?.filter((item: any) => {
              return item.check === true;
            }).length
          } / ${checklist_data?.length}`}
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
