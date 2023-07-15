import { Tag } from "antd";
import { FC } from "react";
import { connect } from "react-redux";
import { StatusPropType } from "../../util/Query.util";
import moment from "moment";
const StatusComponent: FC<StatusPropType> = ({ query }) => {
  const render = () => {
    if (
      query.is_answered &&
      moment(query.response_date).isBefore(moment(query.needed_by_date))
    ) {
      return <Tag color="green">Answered</Tag>;
    }
    if (
      query.is_answered &&
      moment(query.response_date).isAfter(moment(query.needed_by_date))
    ) {
      return <Tag color="green">Delayed & Answered</Tag>;
    } else if (
      !query.is_answered &&
      moment().isBefore(moment(query.needed_by_date))
    )
      return <Tag color="orange">Waiting</Tag>;
    else if (
      !query.is_answered &&
      moment().isAfter(moment(query.needed_by_date))
    )
      return <Tag color="cyan">Delayed & Waiting</Tag>;
  };

  return <>{render()}</>;
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

export default connect(mapStateToProps, mapDispatchToProps)(StatusComponent);
