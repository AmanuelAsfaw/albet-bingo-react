import { Tabs } from "antd";
import React, { Suspense } from "react";
import { WeeklyBillsTab } from "../../../constants/Constants";
import LoadingIndicator from "../../common/Loading";
import SubCategoryComponent from "../SubCategory/components/SubCategory.component";
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
      tab={WeeklyBillsTab.THIS_WEEK}
      key={WeeklyBillsTab.THIS_WEEK.toLocaleLowerCase().split(" ").join("-")}
    >
      <Suspense fallback={<LoadingIndicator />}>
        <ThisWeekComponent />
      </Suspense>
    </Tabs.TabPane>
    <Tabs.TabPane
      tab={WeeklyBillsTab.ANY_WEEK}
      key={WeeklyBillsTab.ANY_WEEK.toLocaleLowerCase().split(" ").join("-")}
    >
      <Suspense fallback={<LoadingIndicator />}>
        <AnyWeekComponent />
      </Suspense>
    </Tabs.TabPane>
    </Tabs>
  );
};

export default TodayReport;
