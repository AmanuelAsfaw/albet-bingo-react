import Card from "antd/lib/card";
import { FC, useEffect } from "react";
import { connect } from "react-redux";

import TasksComponent from "../../components/Task";

const TaskComponent: FC<{}> = ({}) => {
  useEffect(() => {}, []);

  return (
    <Card className="no-border project_list_table p-2">
      <TasksComponent />
    </Card>
  );
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

export default connect(mapStateToProps, mapDispatchToProps)(TaskComponent);
