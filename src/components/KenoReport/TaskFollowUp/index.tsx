import { Tabs } from "antd";
import { lazy, useState } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import { ProjectTaskFollowUpTabs } from "../../../router/Constants";
import CatagoryComponent from "./Catagory";
import FollowUpComponent from "./FollowUp";

// const FollowUpComponent = lazy(() => import("./FollowUp"));

const ContractAdministrationsComponent = () => {
  const location = useLocation();

  // All tabs within CRM Container
  const tabs = [
    ProjectTaskFollowUpTabs.CATEGORY,
    ProjectTaskFollowUpTabs.FOLLOW_UP,
  ];

  const [tab, setTab] = useState(
    ProjectTaskFollowUpTabs.CATEGORY.toLocaleLowerCase()
      .split(" ")
      .join("-")
  );

  const onChangeTab = (event: any) => {
    setTab(event);
  };

  // Check if pathname contains tab key and open the tab || default - Lead
  // useEffect(() => {
  //     const key = location.pathname.trim().split("/").pop();
  //     if (key) {
  //         tabs.map((tabKey) => {
  //             if (key === tabKey.toLocaleLowerCase().split(" ").join("-")) {
  //                 setTab(key);
  //                 history.push("/crm", { replace: true });
  //             }
  //         });
  //     }
  // });

  const items = [
    {
      label: ProjectTaskFollowUpTabs.CATEGORY,
      key: ProjectTaskFollowUpTabs.CATEGORY.toLocaleLowerCase()
        .split(" ")
        .join("-"),
      children: <CatagoryComponent />,
    },
    {
      label: ProjectTaskFollowUpTabs.FOLLOW_UP,
      key: ProjectTaskFollowUpTabs.FOLLOW_UP.toLocaleLowerCase()
        .split(" ")
        .join("-"),
      children: <FollowUpComponent />,
    },
  ];

  return (
    <>
      <Tabs type="card" items={items} activeKey={tab} onChange={onChangeTab} />
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContractAdministrationsComponent);
