import { Tabs } from "antd";
import { lazy, useState } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import { ContractAdministrationTabs } from "../../../router/Constants";
import ContractAdministration from "./ContractAdministration";
import VariationComponent from "./Variation";
import ExternalDocumentComponent from "./ExternalDocument";
const PaymentComponent = lazy(() => import("./Payment"));

const ContractAdministrationsComponent = () => {
  const location = useLocation();

  // All tabs within CRM Container
  const tabs = [
    ContractAdministrationTabs.CONTRACT_ADMINISTRATION,
    ContractAdministrationTabs.VARIATION,
    ContractAdministrationTabs.EXTERNAL_DOCUMENT,
  ];

  const [tab, setTab] = useState(
    ContractAdministrationTabs.CONTRACT_ADMINISTRATION.toLocaleLowerCase()
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
      label: ContractAdministrationTabs.CONTRACT_ADMINISTRATION,
      key: ContractAdministrationTabs.CONTRACT_ADMINISTRATION.toLocaleLowerCase()
        .split(" ")
        .join("-"),
      children: <ContractAdministration />,
    },
    {
      label: ContractAdministrationTabs.VARIATION,
      key: ContractAdministrationTabs.VARIATION.toLocaleLowerCase()
        .split(" ")
        .join("-"),
      children: <VariationComponent />,
    },
    {
      label: ContractAdministrationTabs.EXTERNAL_DOCUMENT,
      key: ContractAdministrationTabs.EXTERNAL_DOCUMENT.toLocaleLowerCase()
        .split(" ")
        .join("-"),
      children: <ExternalDocumentComponent />,
    },
    {
      label: ContractAdministrationTabs.PAYMENT,
      key: ContractAdministrationTabs.PAYMENT.toLocaleLowerCase()
        .split(" ")
        .join("-"),
      children: <PaymentComponent />,
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
