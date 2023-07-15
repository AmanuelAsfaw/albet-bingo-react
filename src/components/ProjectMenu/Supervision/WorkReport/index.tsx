import Tabs from "antd/lib/tabs";
import React, { FC, useState } from "react";
import WeeklyReportComponent from "./WeeklyReport/index";
import MediaComponent from "./Media/index";
import WeeklyPlanComponent from "./WeeklyPlan";
import SummaryReportComponent from "./SummaryReport";
import MonthlyReportComponent from "./MonthlyReport";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ReportTab } from "../../../../constants/Constants";
import { isAuthenticationComponent } from "../../../common/Auth/Authentication.util";
import { connect } from "react-redux";
import { ApiCallState } from "../../../../redux/Utils";
import { Project } from "../../../../redux/Project/Project.type";
const WorkReportComponent: FC<{ project: ApiCallState<Project> }> = ({
  project,
}) => {
  const [selected_tab, setSelectedTab] = useState("");
  const { menu, id, header, tab }: any = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    setSelectedTab(tab);
  }, [tab]);

  // useEffect(() => {
  //   navigate(`/project/${id}/${getPath(project.payload, "menu", "reports")}`);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const onChange = (event: string) => {
    navigate({
      pathname: `/project/${id}/${header}/${menu}/${event}`,
    });
  };

  return (
    <div className="row work_item">
      <div className="col-md-12">
        <Tabs tabPosition="top" activeKey={selected_tab} onChange={onChange}>
          {isAuthenticationComponent(
            project.payload,
            `${header}/${menu}/Weekly Plan`
              .toLocaleLowerCase()
              .split(" ")
              .join("-")
          ) ? (
            <Tabs.TabPane
              tab={ReportTab.WEEKLY_PLAN}
              key={ReportTab.WEEKLY_PLAN.toLocaleLowerCase()
                .split(" ")
                .join("-")}
            >
              <WeeklyPlanComponent />
            </Tabs.TabPane>
          ) : null}
          {isAuthenticationComponent(
            project.payload,
            `${header}/${menu}/Weekly Report`
              .toLocaleLowerCase()
              .split(" ")
              .join("-")
          ) ? (
            <Tabs.TabPane
              tab={ReportTab.WEEKLY_REPORT}
              key={ReportTab.WEEKLY_REPORT.toLocaleLowerCase()
                .split(" ")
                .join("-")}
            >
              <WeeklyReportComponent />
            </Tabs.TabPane>
          ) : null}
          {isAuthenticationComponent(
            project.payload,
            `${header}/${menu}/Monthly Report`
              .toLocaleLowerCase()
              .split(" ")
              .join("-")
          ) ? (
            <Tabs.TabPane
              tab={ReportTab.MONTHLY_REPORT}
              key={ReportTab.MONTHLY_REPORT.toLocaleLowerCase()
                .split(" ")
                .join("-")}
            >
              <MonthlyReportComponent />
            </Tabs.TabPane>
          ) : null}
          {isAuthenticationComponent(
            project.payload,
            `${header}/${menu}/Photo and Videos`
              .toLocaleLowerCase()
              .split(" ")
              .join("-")
          ) ? (
            <Tabs.TabPane
              tab={ReportTab.PHOTO_AND_VIDEO}
              key={ReportTab.PHOTO_AND_VIDEO.toLocaleLowerCase()
                .split(" ")
                .join("-")}
            >
              <MediaComponent />
            </Tabs.TabPane>
          ) : null}
          {isAuthenticationComponent(
            project.payload,
            `${header}/${menu}/Summary Report`
              .toLocaleLowerCase()
              .split(" ")
              .join("-")
          ) ? (
            <Tabs.TabPane
              tab={ReportTab.SUMMARY_REPORT}
              key={ReportTab.SUMMARY_REPORT.toLocaleLowerCase()
                .split(" ")
                .join("-")}
            >
              <SummaryReportComponent />
            </Tabs.TabPane>
          ) : null}
          {/**
             *   <Tabs.TabPane tab="SHE" key="6">
            <SHEComponent />
          </Tabs.TabPane>
             */}
        </Tabs>
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
  project: state.project.fetchOne,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkReportComponent);
