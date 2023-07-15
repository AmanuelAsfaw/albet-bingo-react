import { Tabs } from "antd";
import React, { Suspense } from "react";
import { WeeklyReportTab } from "../../../constants/Constants";
import LoadingIndicator from "../../common/Loading";
import ThisWeekComponent from "./components/ThisWeek.component";
import AnyWeekComponent from "./components/AnyWeek.component";

type Props = {};

const TodayReport = (props: Props) => {
  return (
    <Tabs
      tabPosition="left"
      type="line"
      // activeKey={selected_tab}
      itemRef="ref"
      // onChange={onChange}
    >
    <Tabs.TabPane
      tab={WeeklyReportTab.THIS_WEEK}
      key={WeeklyReportTab.THIS_WEEK.toLocaleLowerCase().split(" ").join("-")}
    >
      <Suspense fallback={<LoadingIndicator />}>
        <ThisWeekComponent />
      </Suspense>
    </Tabs.TabPane>
    <Tabs.TabPane
      tab={WeeklyReportTab.ANY_WEEK}
      key={WeeklyReportTab.ANY_WEEK.toLocaleLowerCase().split(" ").join("-")}
    >
      <Suspense fallback={<LoadingIndicator />}>
        <AnyWeekComponent />
      </Suspense>
    </Tabs.TabPane>
    </Tabs>
  );
};

export default TodayReport;
