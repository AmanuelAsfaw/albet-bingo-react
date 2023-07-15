import { Tabs } from "antd";
import React, { Suspense } from "react";
import { SummaryReportTab } from "../../../constants/Constants";
import LoadingIndicator from "../../common/Loading";
import CategoryComponent from "../Category/components/Category.component";
import SubCategoryComponent from "../SubCategory/components/SubCategory.component";
import InRangeComponent from "./components/InRange.component";
import ScannerComponent from "./components/Scanner.component";
import DailyComponent from "./components/Daily.component";
import WeeklyComponent from "./components/Weekly.component";
import MonthlyComponent from "./components/Monthly.component";
import AnnualComponent from "./components/Annual.component";

type Props = {};

const SummaryComponent = (props: Props) => {
  return (
    <Tabs
      tabPosition="left"
      type="line"
      // activeKey={selected_tab}
      itemRef="ref"
      // onChange={onChange}
    >
        <Tabs.TabPane
        tab={SummaryReportTab.IN_RANGE}
        key={SummaryReportTab.IN_RANGE.toLocaleLowerCase().split(" ").join("-")}
        >
            <Suspense fallback={<LoadingIndicator />}>
                <InRangeComponent />
            </Suspense>
        </Tabs.TabPane>
        
        <Tabs.TabPane
        tab={SummaryReportTab.SCANNER}
        key={SummaryReportTab.SCANNER.toLocaleLowerCase().split(" ").join("-")}
        >
            <Suspense fallback={<LoadingIndicator />}>
                <ScannerComponent />
            </Suspense>
        </Tabs.TabPane>
        
        <Tabs.TabPane
        tab={SummaryReportTab.DAILY}
        key={SummaryReportTab.DAILY.toLocaleLowerCase().split(" ").join("-")}
        >
            <Suspense fallback={<LoadingIndicator />}>
                <DailyComponent />
            </Suspense>
        </Tabs.TabPane>
        
        <Tabs.TabPane
        tab={SummaryReportTab.WEEKKLY}
        key={SummaryReportTab.WEEKKLY.toLocaleLowerCase().split(" ").join("-")}
        >
            <Suspense fallback={<LoadingIndicator />}>
                <WeeklyComponent />
            </Suspense>
        </Tabs.TabPane>
        
        <Tabs.TabPane
        tab={SummaryReportTab.MONTHLY}
        key={SummaryReportTab.MONTHLY.toLocaleLowerCase().split(" ").join("-")}
        >
            <Suspense fallback={<LoadingIndicator />}>
                <MonthlyComponent />
            </Suspense>
        </Tabs.TabPane>
        
        <Tabs.TabPane
        tab={SummaryReportTab.ANNUAL}
        key={SummaryReportTab.ANNUAL.toLocaleLowerCase().split(" ").join("-")}
        >
            <Suspense fallback={<LoadingIndicator />}>
                <AnnualComponent />
            </Suspense>
        </Tabs.TabPane>
        
    </Tabs>
  );
};

export default SummaryComponent;
