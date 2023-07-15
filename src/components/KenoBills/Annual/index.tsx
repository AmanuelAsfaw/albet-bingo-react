import { Tabs } from "antd";
import React, { Suspense } from "react";
import { AnnualReportTab } from "../../../constants/Constants";
import LoadingIndicator from "../../common/Loading";
import CategoryComponent from "../Category/components/Category.component";
import SubCategoryComponent from "../SubCategory/components/SubCategory.component";

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
      tab={AnnualReportTab.THIS_YEAR}
      key={AnnualReportTab.THIS_YEAR.toLocaleLowerCase().split(" ").join("-")}
    >
      <Suspense fallback={<LoadingIndicator />}>
        <CategoryComponent />
      </Suspense>
    </Tabs.TabPane>
    <Tabs.TabPane
      tab={AnnualReportTab.ANY_YEAR}
      key={AnnualReportTab.ANY_YEAR.toLocaleLowerCase().split(" ").join("-")}
    >
      <Suspense fallback={<LoadingIndicator />}>
        <SubCategoryComponent />
      </Suspense>
    </Tabs.TabPane>
    </Tabs>
  );
};

export default TodayReport;
