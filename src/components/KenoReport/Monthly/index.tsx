import { Tabs } from "antd";
import React, { Suspense } from "react";
import { MonthlyReportTab } from "../../../constants/Constants";
import LoadingIndicator from "../../common/Loading";
import CategoryComponent from "../Category/components/Category.component";
import SubCategoryComponent from "../SubCategory/components/SubCategory.component";

import ThisMonthComponent from "./components/ThisMonth.component";
import AnyMonthComponent from "./components/AnyMonth.component";
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
      tab={MonthlyReportTab.THIS_MONTH}
      key={MonthlyReportTab.THIS_MONTH.toLocaleLowerCase().split(" ").join("-")}
    >
      <Suspense fallback={<LoadingIndicator />}>
        <ThisMonthComponent />
      </Suspense>
    </Tabs.TabPane>
    <Tabs.TabPane
      tab={MonthlyReportTab.ANY_MONTH}
      key={MonthlyReportTab.ANY_MONTH.toLocaleLowerCase().split(" ").join("-")}
    >
      <Suspense fallback={<LoadingIndicator />}>
        <AnyMonthComponent />
      </Suspense>
    </Tabs.TabPane>
    </Tabs>
  );
};

export default TodayReport;
