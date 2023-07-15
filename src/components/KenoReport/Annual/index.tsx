import { Tabs } from "antd";
import React, { Suspense } from "react";
import { AnnualReportTab } from "../../../constants/Constants";
import LoadingIndicator from "../../common/Loading";
import ThisYearComponent from "./components/ThisYear.component";
import AnyYearComponent from "./components/AnyYear.component";

type Props = {};

const AnnualReport = (props: Props) => {
  return (
    <Tabs
      tabPosition="left"
      type="line"
      // activeKey={selected_tab}
      itemRef="ref"
      // onChange={onChange}
    >
    <Tabs.TabPane
      tab={AnnualReportTab.THIS_YEAR}
      key={AnnualReportTab.THIS_YEAR.toLocaleLowerCase().split(" ").join("-")}
    >
      <Suspense fallback={<LoadingIndicator />}>
        <ThisYearComponent />
      </Suspense>
    </Tabs.TabPane>
    <Tabs.TabPane
      tab={AnnualReportTab.ANY_YEAR}
      key={AnnualReportTab.ANY_YEAR.toLocaleLowerCase().split(" ").join("-")}
    >
      <Suspense fallback={<LoadingIndicator />}>
        <AnyYearComponent />
      </Suspense>
    </Tabs.TabPane>
    </Tabs>
  );
};

export default AnnualReport;
