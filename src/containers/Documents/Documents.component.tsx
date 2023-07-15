import Card from "antd/lib/card";
import Tabs from "antd/lib/tabs";

import { useState, useEffect, FC } from "react";
import { connect } from "react-redux";
import DocumentComponent from "../../components/Document/MyDocument";
import SharedDocumentComponent from "../../components/Document/SharedDocument";
import {
  DocumentTabs,
  // DOCUMENT_STEP
} from "../../constants/Constants";

const Document: FC<{}> = ({}) => {
  const [tab, setTab] = useState("1");

  const onChangeTab = (event: any) => {
    setTab(event);
  };

  return (
    <>
      <Card>
        <Tabs type="card" activeKey={tab} onChange={onChangeTab}>
          <Tabs.TabPane tab={DocumentTabs.MY_DOCUMENT} key="1">
            <DocumentComponent />
          </Tabs.TabPane>
          <Tabs.TabPane tab={DocumentTabs.SHARED_DOCUMENT} key="2">
            <SharedDocumentComponent />
          </Tabs.TabPane>
        </Tabs>
      </Card>
    </>
  );
};
/**
 * Map State to Props
 *
 * @param state
 */
const mapStateToProps = (state: any) => ({});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Document);
