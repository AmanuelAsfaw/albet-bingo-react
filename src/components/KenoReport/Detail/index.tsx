import { Tabs } from "antd";
import { FC, Suspense, useEffect } from "react";
import { connect } from "react-redux";
import { DetailTabs } from "../../../constants/Constants";
import LoadingIndicator from "../../common/Loading";
import { DetailPropType } from "./utils/Detail.util";
import ProjectComponent from "./components/Project/Project.component";
import ClientComponent from "./components/Client/Client.component";
import ConsultantComponent from "./components/Consultant/Consultant.component";
import ContractorComponent from "./components/Contractor/Contractor.component";
import ProjectDurationComponent from "./components/ProjectDuration/ProjectDuration.component";
import TimeExtensionComponent from "./components/TimeExtension";

const DetailComponent: FC<DetailPropType> = () => {
  useEffect(() => {}, []);

  return (
    <Tabs
      tabPosition="left"
      type="line"
      defaultActiveKey={DetailTabs.PROJECT.toLocaleLowerCase()}
      itemRef="ref"
    >
      <Tabs.TabPane
        tab={DetailTabs.PROJECT}
        key={DetailTabs.PROJECT.toLocaleLowerCase().split(" ").join("-")}
      >
        <Suspense fallback={<LoadingIndicator />}>
          <ProjectComponent />
        </Suspense>
      </Tabs.TabPane>
      <Tabs.TabPane
        tab={DetailTabs.CLIENT}
        key={DetailTabs.CLIENT.toLocaleLowerCase().split(" ").join("-")}
      >
        <Suspense fallback={<LoadingIndicator />}>
          <ClientComponent />
        </Suspense>
      </Tabs.TabPane>
      <Tabs.TabPane
        tab={DetailTabs.CONTRACTOR}
        key={DetailTabs.CONTRACTOR.toLocaleLowerCase().split(" ").join("-")}
      >
        <Suspense fallback={<LoadingIndicator />}>
          <ContractorComponent />
        </Suspense>
      </Tabs.TabPane>
      <Tabs.TabPane
        tab={DetailTabs.CONSULTANT}
        key={DetailTabs.CONSULTANT.toLocaleLowerCase().split(" ").join("-")}
      >
        <Suspense fallback={<LoadingIndicator />}>
          <ConsultantComponent />
        </Suspense>
      </Tabs.TabPane>
      <Tabs.TabPane
        tab={DetailTabs.PROJECT_DURATION}
        key={DetailTabs.PROJECT_DURATION.toLocaleLowerCase()
          .split(" ")
          .join("-")}
      >
        <Suspense fallback={<LoadingIndicator />}>
          <ProjectDurationComponent />
        </Suspense>
      </Tabs.TabPane>
      <Tabs.TabPane
        tab={DetailTabs.TIME_EXTENSION}
        key={DetailTabs.TIME_EXTENSION.toLocaleLowerCase().split(" ").join("-")}
      >
        <Suspense fallback={<LoadingIndicator />}>
          <TimeExtensionComponent />
        </Suspense>
      </Tabs.TabPane>
    </Tabs>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailComponent);
