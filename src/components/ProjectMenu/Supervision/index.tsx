import Tabs from "antd/lib/tabs";
import { FC, useState } from "react";
import { useEffect } from "react";
import { lazy, Suspense } from "react";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getPath, hasSubMenu } from "../../common/Auth/Authentication.util";
import LoadingIndicator from "../../../components/common/Loading";
import { SummaryTabs } from "../../../constants/Constants";
import { Project } from "../../../redux/Project/Project.type";
import { ApiCallState } from "../../../redux/Utils";
import SuperVisionReportComponent from "./Report/Report.component";
import ReportComponent from "./Report/Report.component";
import ProjectVariationComponent from "./ProjectDuration/ProjectVariation.component";

const MeetingComponent = lazy(() => import("./Meeting"));

const InspectionComponent = lazy(() => import("./Inspection"));

const TestComponent = lazy(() => import("./MaterialTest"));

const SiteHandoverComponent = lazy(() => import("./SiteHandover"));

const SubmittalComponent = lazy(() => import("./Submittal"));

const MaterialApprovalComponent = lazy(() => import("./MaterialApproval"));

const SiteOrderComponent = lazy(() => import("./SiteOrder"));

const SiteDiaryComponent = lazy(() => import("./SiteDiary"));

const PaymentComponent = lazy(
  () => import("../ContractAdministration/Payment")
);

const DataComponent = lazy(() => import("./Data"));

const KlingMaterialApprovalComponent = lazy(
  () => import("./KlingMaterialApproval")
);

const SubmittalApprovalComponent: FC<{ project: ApiCallState<Project> }> = ({
  project,
}) => {
  const [selected_tab, setSelectedTab] = useState("");
  const { menu, id }: any = useParams();

  const navigate = useNavigate();
  useEffect(() => {
    setSelectedTab(menu);
  }, [menu]);

  // useEffect(() => {
  //   navigate(
  //     `/project/${id}/${getPath(project.payload, "header", "supervision")}`
  //   );
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const onChange = (event: string) => {
    switch (event) {
      case SummaryTabs.Kling_MATERIAL_APPROVAL.toLocaleLowerCase().replaceAll(
        " ",
        "-"
      ):
        navigate({
          pathname: `/project/${id}/${getPath(
            project.payload,
            "menu",
            "kling-material-approval"
          )}`,
        });
        break;
      case SummaryTabs.PROJECT_MONTHLY_REPORT.toLocaleLowerCase().replaceAll(
        " ",
        "-"
      ):
        navigate({
          pathname: `/project/${id}/${getPath(
            project.payload,
            "menu",
            "monthly-reports"
          )}`,
        });
        break;

      case SummaryTabs.MEETING.toLocaleLowerCase().replaceAll(" ", "-"):
        navigate({
          pathname: `/project/${id}/${getPath(
            project.payload,
            "menu",
            "minutes-of-meeting"
          )}`,
        });
        break;
      case SummaryTabs.SITE_HANDOVER.toLocaleLowerCase().replaceAll(" ", "-"):
        navigate({
          pathname: `/project/${id}/${getPath(
            project.payload,
            "menu",
            "site-handover"
          )}`,
        });
        break;
      case SummaryTabs.SITE_DIARY.toLocaleLowerCase().replaceAll(" ", "-"):
        navigate({
          pathname: `/project/${id}/${getPath(
            project.payload,
            "menu",
            "site-diary"
          )}`,
        });
        break;
      case SummaryTabs.SUBMITTAL.toLocaleLowerCase().replaceAll(" ", "-"):
        navigate({
          pathname: `/project/${id}/${getPath(
            project.payload,
            "menu",
            "submittal"
          )}`,
        });
        break;
      case SummaryTabs.INSPECTION.toLocaleLowerCase().replaceAll(" ", "-"):
        navigate({
          pathname: `/project/${id}/${getPath(
            project.payload,
            "menu",
            "inspection"
          )}`,
        });
        break;
      case SummaryTabs.TEST.toLocaleLowerCase().replaceAll(" ", "-"):
        navigate({
          pathname: `/project/${id}/${getPath(
            project.payload,
            "menu",
            "material-test"
          )}`,
        });
        break;
      case SummaryTabs.MATERIAL_APPROVAL.toLocaleLowerCase().replaceAll(
        " ",
        "-"
      ):
        navigate({
          pathname: `/project/${id}/${getPath(
            project.payload,
            "menu",
            "material-approval"
          )}`,
        });
        break;
      case SummaryTabs.REPORT.toLocaleLowerCase().replaceAll(" ", "-"):
        navigate({
          pathname: `/project/${id}/${getPath(
            project.payload,
            "menu",
            "reports"
          )}`,
        });
        break;
      case SummaryTabs.PAYMENT.toLocaleLowerCase().replaceAll(" ", "-"):
        navigate({
          pathname: `/project/${id}/${getPath(
            project.payload,
            "menu",
            "payment"
          )}`,
        });
        break;
      case SummaryTabs.DATA.toLocaleLowerCase().replaceAll(" ", "-"):
        navigate({
          pathname: `/project/${id}/${getPath(
            project.payload,
            "menu",
            "data"
          )}`,
        });
        break;
      case SummaryTabs.SITE_ORDER.toLocaleLowerCase().replaceAll(" ", "-"):
        navigate({
          pathname: `/project/${id}/${getPath(
            project.payload,
            "menu",
            "site-book"
          )}`,
        });
        break;
      case SummaryTabs.PROJECT_VARIATION.toLocaleLowerCase().replaceAll(
        " ",
        "-"
      ):
        navigate({
          pathname: `/project/${id}/${getPath(
            project.payload,
            "menu",
            "project-variation"
          )}`,
        });
        break;
    }
  };

  return (
    <Tabs
      tabPosition="left"
      type="line"
      activeKey={selected_tab}
      itemRef="ref"
      onChange={onChange}
    >
      {hasSubMenu(
        project.payload,
        SummaryTabs.MEETING.toLocaleLowerCase().split(" ").join("-")
      ) ? (
        <Tabs.TabPane
          tab={SummaryTabs.MEETING}
          key={SummaryTabs.MEETING.toLocaleLowerCase().replaceAll(" ", "-")}
        >
          <Suspense fallback={<LoadingIndicator />}>
            <MeetingComponent />
          </Suspense>
        </Tabs.TabPane>
      ) : null}
      {hasSubMenu(
        project.payload,
        SummaryTabs.SITE_HANDOVER.toLocaleLowerCase().split(" ").join("-")
      ) ? (
        <Tabs.TabPane
          tab={SummaryTabs.SITE_HANDOVER}
          key={SummaryTabs.SITE_HANDOVER.toLocaleLowerCase()
            .split(" ")
            .join("-")}
        >
          <Suspense fallback={<LoadingIndicator />}>
            <SiteHandoverComponent />
          </Suspense>
        </Tabs.TabPane>
      ) : null}

      {hasSubMenu(
        project.payload,
        SummaryTabs.SITE_DIARY.toLocaleLowerCase().split(" ").join("-")
      ) ? (
        <Tabs.TabPane
          tab={SummaryTabs.SITE_DIARY}
          key={SummaryTabs.SITE_DIARY.toLocaleLowerCase().split(" ").join("-")}
        >
          <Suspense fallback={<LoadingIndicator />}>
            <SiteDiaryComponent />
          </Suspense>
        </Tabs.TabPane>
      ) : null}

      {hasSubMenu(
        project.payload,
        SummaryTabs.SUBMITTAL.toLocaleLowerCase().split(" ").join("-")
      ) ? (
        <Tabs.TabPane
          tab={SummaryTabs.SUBMITTAL}
          key={SummaryTabs.SUBMITTAL.toLocaleLowerCase().replaceAll(" ", "-")}
        >
          <Suspense fallback={<LoadingIndicator />}>
            <SubmittalComponent />
          </Suspense>
        </Tabs.TabPane>
      ) : null}

      {hasSubMenu(
        project.payload,
        SummaryTabs.INSPECTION.toLocaleLowerCase().split(" ").join("-")
      ) ? (
        <Tabs.TabPane
          tab={SummaryTabs.INSPECTION}
          key={SummaryTabs.INSPECTION.toLocaleLowerCase().replaceAll(" ", "-")}
        >
          <Suspense fallback={<LoadingIndicator />}>
            <InspectionComponent />
          </Suspense>
        </Tabs.TabPane>
      ) : null}

      {hasSubMenu(
        project.payload,
        SummaryTabs.TEST.toLocaleLowerCase().split(" ").join("-")
      ) ? (
        <Tabs.TabPane
          tab={SummaryTabs.TEST}
          key={SummaryTabs.TEST.toLocaleLowerCase().split(" ").join("-")}
        >
          <Suspense fallback={<LoadingIndicator />}>
            <TestComponent project={project} />
          </Suspense>
        </Tabs.TabPane>
      ) : null}

      {hasSubMenu(
        project.payload,
        SummaryTabs.MATERIAL_APPROVAL.toLocaleLowerCase().split(" ").join("-")
      ) ? (
        <Tabs.TabPane
          tab={SummaryTabs.MATERIAL_APPROVAL}
          key={SummaryTabs.MATERIAL_APPROVAL.toLocaleLowerCase().replaceAll(
            " ",
            "-"
          )}
        >
          <Suspense fallback={<LoadingIndicator />}>
            <MaterialApprovalComponent />
          </Suspense>
        </Tabs.TabPane>
      ) : null}

      {/* {hasSubMenu(
        project.payload,
        SummaryTabs.REPORT.toLocaleLowerCase().split(" ").join("-")
      ) ? (
        <Tabs.TabPane
          tab={SummaryTabs.REPORT}
          key={SummaryTabs.REPORT.toLocaleLowerCase().replaceAll(" ", "-")}
        >
          <Suspense fallback={<LoadingIndicator />}>
            <ReportComponent />
          </Suspense>
        </Tabs.TabPane>
      ) : null} */}

      {hasSubMenu(
        project.payload,
        SummaryTabs.PAYMENT.toLocaleLowerCase().split(" ").join("-")
      ) ? (
        <Tabs.TabPane
          tab={SummaryTabs.PAYMENT}
          key={SummaryTabs.PAYMENT.toLocaleLowerCase()}
        >
          <Suspense fallback={<LoadingIndicator />}>
            <PaymentComponent />
          </Suspense>
        </Tabs.TabPane>
      ) : null}

      {hasSubMenu(
        project.payload,
        SummaryTabs.DATA.toLocaleLowerCase().split(" ").join("-")
      ) ? (
        <Tabs.TabPane
          tab={SummaryTabs.DATA}
          key={SummaryTabs.DATA.toLocaleLowerCase()}
        >
          <Suspense fallback={<LoadingIndicator />}>
            <DataComponent />
          </Suspense>
        </Tabs.TabPane>
      ) : null}

      {hasSubMenu(
        project.payload,
        SummaryTabs.SITE_ORDER.toLocaleLowerCase().split(" ").join("-")
      ) ? (
        <Tabs.TabPane
          tab={SummaryTabs.SITE_ORDER}
          key={SummaryTabs.SITE_ORDER.toLocaleLowerCase().split(" ").join("-")}
        >
          <Suspense fallback={<LoadingIndicator />}>
            <SiteOrderComponent />
          </Suspense>
        </Tabs.TabPane>
      ) : null}

      {hasSubMenu(
        project.payload,
        SummaryTabs.Kling_MATERIAL_APPROVAL.toLocaleLowerCase()
          .split(" ")
          .join("-")
      ) ? (
        <Tabs.TabPane
          tab={SummaryTabs.Kling_MATERIAL_APPROVAL}
          key={SummaryTabs.Kling_MATERIAL_APPROVAL.toLocaleLowerCase()
            .split(" ")
            .join("-")}
        >
          <Suspense fallback={<LoadingIndicator />}>
            <KlingMaterialApprovalComponent />
          </Suspense>
        </Tabs.TabPane>
      ) : null}
      {hasSubMenu(
        project.payload,
        SummaryTabs.PROJECT_MONTHLY_REPORT.toLocaleLowerCase()
          .split(" ")
          .join("-")
      ) ? (
        <Tabs.TabPane
          tab={SummaryTabs.PROJECT_MONTHLY_REPORT}
          key={SummaryTabs.PROJECT_MONTHLY_REPORT.toLocaleLowerCase()
            .split(" ")
            .join("-")}
        >
          <Suspense fallback={<LoadingIndicator />}>
            <SuperVisionReportComponent />
          </Suspense>
        </Tabs.TabPane>
      ) : null}

      {hasSubMenu(
        project.payload,
        SummaryTabs.PROJECT_VARIATION.toLocaleLowerCase().split(" ").join("-")
      ) ? (
        <Tabs.TabPane
          tab={SummaryTabs.PROJECT_VARIATION}
          key={SummaryTabs.PROJECT_VARIATION.toLocaleLowerCase()
            .split(" ")
            .join("-")}
        >
          <Suspense fallback={<LoadingIndicator />}>
            <ProjectVariationComponent />
          </Suspense>
        </Tabs.TabPane>
      ) : null}
    </Tabs>
  );
};
/**
 * Map State to Props
 *
 * @param state
 */
const mapStateToProps = (state: any) => ({
  project: state.project.fetchOne,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubmittalApprovalComponent);
