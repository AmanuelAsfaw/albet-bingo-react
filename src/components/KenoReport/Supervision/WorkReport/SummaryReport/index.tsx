import { Tabs } from "antd";
import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import PhysicalProgressComponent from "./PhysicalProgress";
import FinancialProgressComponent from "./FinancialProgress";

const SummaryReportComponent: FC<{}> = ({ }) => {
    const [tab, setTab] = useState("1");

    const onChangeTab = (event: any) => {
      setTab(event);
    };

    return (
        <div className="row work_item">
          <div className="col-md-12">
            <Tabs tabPosition="top" activeKey={tab} onChange={onChangeTab}>
               <Tabs.TabPane tab="Physical Progress" key="1">
                <PhysicalProgressComponent />
              </Tabs.TabPane>
              <Tabs.TabPane tab="Financial Progress" key="2">
                <FinancialProgressComponent />
              </Tabs.TabPane>
            </Tabs>
          </div>
        </div>
      );
};

/**
 * Map State to Props
 *
 * @param state
 */
const mapStateToProps = (state: any) => ({
 
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  
});

export default connect(mapStateToProps, mapDispatchToProps)(SummaryReportComponent);
