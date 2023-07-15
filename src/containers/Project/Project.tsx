import { Card } from "antd";
import { lazy, useEffect } from "react";
import { connect } from "react-redux";

const ProjectComponent = lazy(() => import("../../components/Project"));

const Project = () => {
  useEffect(() => {}, []);

  return (
    <Card className="no-border project_list_table">
      <ProjectComponent />
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

export default connect(mapStateToProps, mapDispatchToProps)(Project);
