import { Card } from "antd";
import { lazy, useEffect } from "react";
import { connect } from "react-redux";

const CommunicationPanel = lazy(() => import("../../components/Communication"));

const CommunicationComponent = () => {
  useEffect(() => {}, []);

  return (
    <Card className="no-border project_list_table">
      <CommunicationPanel />
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommunicationComponent);
