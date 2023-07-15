import { Tabs } from "antd";
import React, { Suspense } from "react";
import { TodayReportTab } from "../../../constants/Constants";
import LoadingIndicator from "../../common/Loading";
import CategoryComponent from "../Category/components/Category.component";
import SubCategoryComponent from "../SubCategory/components/SubCategory.component";
import InstantComponent from "./components/Instant.component";
import A_GameComponent from "./components/A_Game.component";
import AllGameAnyDayComponent from "./components/AllGameAnyDay.component";
import A_GameAnyDayComponent from "./components/A_GameAnyDay.component";

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
      tab={TodayReportTab.INSTANT_REPORT}
      key={TodayReportTab.INSTANT_REPORT.toLocaleLowerCase().split(" ").join("-")}
    >
      <Suspense fallback={<LoadingIndicator />}>
        <InstantComponent />
      </Suspense>
    </Tabs.TabPane>
    <Tabs.TabPane
      tab={TodayReportTab.A_GAME_REPORT}
      key={TodayReportTab.A_GAME_REPORT.toLocaleLowerCase().split(" ").join("-")}
    >
      <Suspense fallback={<LoadingIndicator />}>
        <A_GameComponent />
      </Suspense>
    </Tabs.TabPane>
      <Tabs.TabPane
        tab={TodayReportTab.ANY_DAY_ALL_GAME_REPORT}
        key={TodayReportTab.ANY_DAY_ALL_GAME_REPORT.toLocaleLowerCase().split(" ").join("-")}
      >
        <Suspense fallback={<LoadingIndicator />}>
          <AllGameAnyDayComponent />
        </Suspense>
      </Tabs.TabPane>
      <Tabs.TabPane
        tab={TodayReportTab.ANY_DAY_BY_A_GAME_REPORT}
        key={TodayReportTab.ANY_DAY_BY_A_GAME_REPORT.toLocaleLowerCase().split(" ").join("-")}
      >
        <Suspense fallback={<LoadingIndicator />}>
          <A_GameAnyDayComponent />
        </Suspense>
      </Tabs.TabPane>
    </Tabs>
  );
};

export default TodayReport;
