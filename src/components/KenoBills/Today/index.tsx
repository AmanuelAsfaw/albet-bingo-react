import { Tabs } from "antd";
import React, { Suspense } from "react";
import { TodayBillsTab } from "../../../constants/Constants";
import LoadingIndicator from "../../common/Loading";
import TodayComponent from "./TodayComponent/Today.component";
import TodayByGameComponent from "./TodayComponent/TodayByGame.component";
import AnyDayByGameComponent from "./TodayComponent/AnyDayByGame.component";
import AnyDayComponent from "./TodayComponent/AnyDay.component";
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
      tab={TodayBillsTab.TODAY_BILLS}
      key={TodayBillsTab.TODAY_BILLS.toLocaleLowerCase().split(" ").join("-")}
    >
      <Suspense fallback={<LoadingIndicator />}>
        <TodayComponent />
      </Suspense>
    </Tabs.TabPane>
    <Tabs.TabPane
      tab={TodayBillsTab.TODAY_BILLS_BY_GAME}
      key={TodayBillsTab.TODAY_BILLS_BY_GAME.toLocaleLowerCase().split(" ").join("-")}
    >
      <Suspense fallback={<LoadingIndicator />}>
        <TodayByGameComponent />
      </Suspense>
    </Tabs.TabPane>
    <Tabs.TabPane
      tab={TodayBillsTab.ANY_DAY_BILLS}
      key={TodayBillsTab.ANY_DAY_BILLS.toLocaleLowerCase().split(" ").join("-")}
    >
      <Suspense fallback={<LoadingIndicator />}>
        <AnyDayComponent />
      </Suspense>
    </Tabs.TabPane>
    <Tabs.TabPane
      tab={TodayBillsTab.ANY_DAY_BILLS_BY_GAME}
      key={TodayBillsTab.ANY_DAY_BILLS_BY_GAME.toLocaleLowerCase().split(" ").join("-")}
    >
      <Suspense fallback={<LoadingIndicator />}>
        <AnyDayByGameComponent />
      </Suspense>
    </Tabs.TabPane>
    </Tabs>
  );
};

export default TodayReport;
