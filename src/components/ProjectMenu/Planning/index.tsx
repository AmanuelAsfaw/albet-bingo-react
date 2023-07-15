import { Card, Tabs } from "antd";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import { PlanningTabs } from "../../../router/Constants";
import Contract from "./components/Contract";
import CostEstimation from "./components/CostEstimation";
import Drawing from "./components/Drawing";
import EmployerRequirement from "./components/EmployerRequirement";
import TenderDocument from "./components/TenderDocument";

const PlanningComponent = () => {
    const location = useLocation();

    // All tabs within CRM Container
    const tabs = [
        PlanningTabs.EMPLOYER_REQUIREMENT,
        PlanningTabs.COST_ESTIMATION,
        PlanningTabs.CONTRACT,
        PlanningTabs.TENDER_DOCUMENT,
        PlanningTabs.DRAWINGS,
    ];

    const [tab, setTab] = useState(
        PlanningTabs.EMPLOYER_REQUIREMENT.toLocaleLowerCase().split(" ").join("-")
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
            label: PlanningTabs.EMPLOYER_REQUIREMENT,
            key: PlanningTabs.EMPLOYER_REQUIREMENT.toLocaleLowerCase().split(" ").join("-"),
            children: <EmployerRequirement />,
        },
        {
            label: PlanningTabs.COST_ESTIMATION,
            key: PlanningTabs.COST_ESTIMATION.toLocaleLowerCase().split(" ").join("-"),
            children: <CostEstimation />,
        },
        {
            label: PlanningTabs.TENDER_DOCUMENT,
            key: PlanningTabs.TENDER_DOCUMENT.toLocaleLowerCase().split(" ").join("-"),
            children: <TenderDocument />,
        },
        {
            label: PlanningTabs.DRAWINGS,
            key: PlanningTabs.DRAWINGS.toLocaleLowerCase().split(" ").join("-"),
            children: <Drawing />,
        },
        {
            label: PlanningTabs.CONTRACT,
            key: PlanningTabs.CONTRACT.toLocaleLowerCase().split(" ").join("-"),
            children: <Contract />,
        },
    ];

    return (
        <>
            <Card>
                <Tabs
                    type="card"
                    items={items}
                    activeKey={tab}
                    onChange={onChangeTab}
                />
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

export default connect(mapStateToProps, mapDispatchToProps)(PlanningComponent);