import { Tabs } from "antd";
import { Suspense } from "react";
import { SupervisionReportTab } from "../../../../constants/Constants";
import LoadingIndicator from "../../../common/Loading";

import DesignChangeLogComponent from "../DesignChangeLog/DesignChangeLog.component";
import MaterialApprovalStatusComponent from "../MaterialApprovalStatus/MaterialApprovalStatus.component";
import FinancialComponent from "../Financial/Financial.component";
import ProjectReport from "../ProjectReport";

type Props = {};

const SuperVisionReportComponent = (props: Props) => {
  return (
    <Tabs
      tabPosition="top"
      type="line"
      // activeKey={selected_tab}
      itemRef="ref"
      // onChange={onChange}
    >
      <Tabs.TabPane
        tab={SupervisionReportTab.MATERIAL_APPROVAL_STATUS}
        key={SupervisionReportTab.MATERIAL_APPROVAL_STATUS.toLocaleLowerCase()
          .split(" ")
          .join("-")}
      >
        <Suspense fallback={<LoadingIndicator />}>
          <MaterialApprovalStatusComponent />
        </Suspense>
      </Tabs.TabPane>
      <Tabs.TabPane
        tab={SupervisionReportTab.DESIGN_CHANGE_LOG}
        key={SupervisionReportTab.DESIGN_CHANGE_LOG.toLocaleLowerCase()
          .split(" ")
          .join("-")}
      >
        <Suspense fallback={<LoadingIndicator />}>
          <DesignChangeLogComponent />
        </Suspense>
      </Tabs.TabPane>
      <Tabs.TabPane
        tab={SupervisionReportTab.FINANCIAL}
        key={SupervisionReportTab.FINANCIAL.toLocaleLowerCase()
          .split(" ")
          .join("-")}
      >
        <Suspense fallback={<LoadingIndicator />}>
          <FinancialComponent />
        </Suspense>
      </Tabs.TabPane>

      <Tabs.TabPane
        tab={SupervisionReportTab.MONTHLY_REPORT}
        key={SupervisionReportTab.MONTHLY_REPORT.toLocaleLowerCase()}
      >
        <Suspense fallback={<LoadingIndicator />}>
          <ProjectReport />
        </Suspense>
      </Tabs.TabPane>
    </Tabs>
  );
};

export default SuperVisionReportComponent;
