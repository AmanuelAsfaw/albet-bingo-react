import { Tabs } from "antd";
import React, { Suspense } from "react";
import { FinanceTab, SummaryTabs } from "../../constants/Constants";
import LoadingIndicator from "../common/Loading";
import BankAccountComponent from "../BankAccount/BankAccount.component";

type Props = {};

const Finance = (props: Props) => {
  return (
    <Tabs
      tabPosition="top"
      type="line"
      //   activeKey={selected_tab}
      itemRef="ref"
      //   onChange={onChange}
    >
      <Tabs.TabPane
        tab={FinanceTab.BANK_ACCOUNT}
        key={FinanceTab.BANK_ACCOUNT.toLocaleLowerCase().split(" ").join("-")}
      >
        <Suspense fallback={<LoadingIndicator />}>
          <BankAccountComponent is_private={false} />
        </Suspense>
      </Tabs.TabPane>
    </Tabs>
  );
};

export default Finance;
