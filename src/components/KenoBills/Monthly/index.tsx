import { Tabs } from "antd";
import React, { Suspense } from "react";
import { MonthlyBillsTab } from "../../../constants/Constants";
import LoadingIndicator from "../../common/Loading";
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
      tab={MonthlyBillsTab.THIS_MONTH}
      key={MonthlyBillsTab.THIS_MONTH.toLocaleLowerCase().split(" ").join("-")}
    >
      <Suspense fallback={<LoadingIndicator />}>
        <ThisMonthComponent />
      </Suspense>
    </Tabs.TabPane>
    <Tabs.TabPane
      tab={MonthlyBillsTab.ANY_MONTH}
      key={MonthlyBillsTab.ANY_MONTH.toLocaleLowerCase().split(" ").join("-")}
    >
      <Suspense fallback={<LoadingIndicator />}>
        <AnyMonthComponent />
      </Suspense>
    </Tabs.TabPane>
    </Tabs>
  );
};

export default TodayReport;
