import { Card, Tabs } from "antd";
import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchAllProjects } from "../../redux/Project/Project.action";
import WeeklyReportComponent from "./WeeklyReport";

const ReportComponent: FC<{fetchProjects: Function}> = ({fetchProjects}) => {
  const [tab, setTab] = useState("1");

  const onChangeTab = (event: any) => {
    setTab(event);
  };

  useEffect(() => {
    fetchProjects();
  }, [])

  return (
    <Card className="plan_tab">
      <Tabs tabPosition="top" activeKey={tab} onChange={onChangeTab}>
        <Tabs.TabPane tab="Weekly" key="1">
          <WeeklyReportComponent tab={tab} />
        </Tabs.TabPane>
      </Tabs>
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
const mapDispatchToProps = (dispatch: any) => ({
  fetchProjects: (action: any) => dispatch(fetchAllProjects(action))

});

export default connect(mapStateToProps, mapDispatchToProps)(ReportComponent);
