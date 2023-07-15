import { FC, lazy, Suspense, useEffect, useState } from "react";
import { connect } from "react-redux";
import Tabs from "antd/lib/tabs";
import LoadingIndicator from "../common/Loading";
import { Card } from "antd";
import { fetchOneProjects } from "../../redux/Project/Project.action";
import { useNavigate, useParams } from "react-router-dom";
import { ProjectMenuTabs } from "../../constants/Constants";
import { ApiCallState } from "../../redux/Utils";
import { Project } from "../../redux/Project/Project.type";
import { getUserData } from "../../utilities/utilities";
import { getPath, hasMenu } from "../common/Auth/Authentication.util";
import { last } from "lodash";
import HeaderComponent from "./Header/Header.component";
import ItemGroup from "./ItemGroup";

const DesignComponent = lazy(() => import("./Design"));
const DeliverablesComponent = lazy(() => import("./Deliverables"));
const ContractAdministrationsComponent = lazy(
  () => import("./ContractAdministration/index")
);
const SupervisionComponent = lazy(() => import("./Supervision"));

const DetailComponent = lazy(() => import("./Detail"));

const UserControlComponent = lazy(() => import("./UserControl"));

const TaskFollowUpComponent = lazy(() => import("./TaskFollowUp"));

const PlanningComponent = lazy(() => import("./Planning"));
const PreConceptComponent = lazy(() => import("./PreConcept"));
const ConceptComponent = lazy(() => import("./Concept"));

const ProjectMenuComponent: FC<{
  project: ApiCallState<Project>;
  fetchOneProjects: Function;
}> = ({ project, fetchOneProjects }) => {
  const param: any = useParams();
  const { id, header }: any = useParams();

  const navigate = useNavigate();

  const [tab, setTab] = useState(
    ProjectMenuTabs.SUPERVISION.toLocaleLowerCase()
  );

  useEffect(() => {
    fetchOneProjects(id);
  }, [fetchOneProjects, id]);

  useEffect(() => {
    setTab(header);
  }, [header]);

  useEffect(() => {
    if (getUserData().is_super_user) {
    } else {
      const t = last(getPath(project.payload, "project", "")?.split("/"));
      console.log({ t });
      if (t) {
        navigate(`/project/${id}/${getPath(project.payload, "project", "")}`);

        setTab(header);
      }
    }
    // navigate(`/project/${id}/${getPath(project.payload, "project", "")}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const onChangeTab = (event: any) => {
    if (!project.isPending) {
      switch (event) {
        case ProjectMenuTabs.SUPERVISION.toLocaleLowerCase()
          .split(" ")
          .join("-"):
          navigate(
            `/project/${id}/${getPath(
              project.payload,
              "header",
              "supervision"
            )}`
          );
          break;
        case ProjectMenuTabs.ITEM_GROUP.toLocaleLowerCase()
          .split(" ")
          .join("-"):
          navigate({
            pathname: `/project/${id}/item-group`,
          });
          break;

        case ProjectMenuTabs.CONCEPT.toLocaleLowerCase().split(" ").join("-"):
          navigate({
            pathname: `/project/${id}/concept`,
          });
          break;
        case ProjectMenuTabs.PRE_CONCEPT.toLocaleLowerCase()
          .split(" ")
          .join("-"):
          navigate({
            pathname: `/project/${id}/pre-concept`,
          });
          break;
        case ProjectMenuTabs.DESIGN.toLocaleLowerCase():
          navigate(
            `/project/${id}/${getPath(project.payload, "header", "design")}`
          );
          break;
        case ProjectMenuTabs.DELIVERABLES.toLocaleLowerCase():
          navigate(`/project/${id}/deliverables`);
          break;

        case ProjectMenuTabs.PLANNING.toLocaleLowerCase():
          navigate(`/project/${id}/${event}`);
          break;
        case ProjectMenuTabs.CONTRACT_ADMINISTRATION.toLocaleLowerCase()
          .split(" ")
          .join("-"):
          navigate(
            `/project/${id}/${getPath(
              project.payload,
              "header",
              "contract-administration"
            )}`
          );
          break;
        case ProjectMenuTabs.DETAIL.toLocaleLowerCase().split(" ").join("-"):
          navigate({
            pathname: `/project/${id}/${getPath(
              project.payload,
              "header",
              "detail"
            )}`,
          });
          break;
        case ProjectMenuTabs.USER_CONTROL.toLocaleLowerCase()
          .split(" ")
          .join("-"):
          navigate({
            pathname: `/project/${id}/${event}/*/${event}`,
          });
          break;

        case ProjectMenuTabs.USER_CONTROL.toLocaleLowerCase()
          .split(" ")
          .join("-"):
          navigate({
            pathname: `/project/${id}/${event}/*/${event}`,
          });
          break;

        case ProjectMenuTabs.TASK_FOLLOW_UP.toLocaleLowerCase()
          .split(" ")
          .join("-"):
          navigate({
            pathname: `/project/${id}/${event}/*/${event}`,
          });
          break;
      }

      setTab(event);
    }
  };

  return (
    <>
      <HeaderComponent />
      <Card loading={project.isPending && !project.payload}>
        <Tabs tabPosition="top" activeKey={tab} onChange={onChangeTab}>
          {hasMenu(
            project.payload,
            ProjectMenuTabs.ITEM_GROUP.toLocaleLowerCase().split(" ").join("-")
          ) ? (
            <Tabs.TabPane
              tab={ProjectMenuTabs.ITEM_GROUP}
              key={ProjectMenuTabs.ITEM_GROUP.toLocaleLowerCase()}
            >
              <Suspense fallback={<LoadingIndicator />}>
                <ItemGroup />
              </Suspense>
            </Tabs.TabPane>
          ) : null}

          {hasMenu(
            project.payload,
            ProjectMenuTabs.CONCEPT.toLocaleLowerCase().split(" ").join("-")
          ) ? (
            <>
              <Tabs.TabPane
                tab={ProjectMenuTabs.CONCEPT}
                key={ProjectMenuTabs.CONCEPT.toLocaleLowerCase()}
              >
                <Suspense fallback={<LoadingIndicator />}>
                  <ConceptComponent />
                </Suspense>
              </Tabs.TabPane>
              <Tabs.TabPane
                tab={ProjectMenuTabs.PRE_CONCEPT}
                key={ProjectMenuTabs.PRE_CONCEPT.toLocaleLowerCase()
                  .split(" ")
                  .join("-")}
              >
                <Suspense fallback={<LoadingIndicator />}>
                  <PreConceptComponent />
                </Suspense>
              </Tabs.TabPane>
            </>
          ) : null}
          {hasMenu(
            project.payload,
            ProjectMenuTabs.DESIGN.toLocaleLowerCase().split(" ").join("-")
          ) ? (
            <Tabs.TabPane
              tab={ProjectMenuTabs.DESIGN}
              key={ProjectMenuTabs.DESIGN.toLocaleLowerCase()}
            >
              <Suspense fallback={<LoadingIndicator />}>
                <DesignComponent />
              </Suspense>
            </Tabs.TabPane>
          ) : null}
          {hasMenu(
            project.payload,
            ProjectMenuTabs.DELIVERABLES.toLocaleLowerCase()
              .split(" ")
              .join("-")
          ) ? (
            <Tabs.TabPane
              tab={ProjectMenuTabs.DELIVERABLES}
              key={ProjectMenuTabs.DELIVERABLES.toLocaleLowerCase()}
            >
              <Suspense fallback={<LoadingIndicator />}>
                <DeliverablesComponent />
              </Suspense>
            </Tabs.TabPane>
          ) : null}

          <Tabs.TabPane
            tab={ProjectMenuTabs.PLANNING}
            key={ProjectMenuTabs.PLANNING.toLocaleLowerCase()}
          >
            <Suspense fallback={<LoadingIndicator />}>
              <PlanningComponent />
            </Suspense>
          </Tabs.TabPane>

          {hasMenu(
            project.payload,
            ProjectMenuTabs.SUPERVISION.toLocaleLowerCase().split(" ").join("-")
          ) ? (
            <Tabs.TabPane
              tab={ProjectMenuTabs.SUPERVISION}
              key={ProjectMenuTabs.SUPERVISION.toLocaleLowerCase()}
            >
              <Suspense fallback={<LoadingIndicator />}>
                <SupervisionComponent />
              </Suspense>
            </Tabs.TabPane>
          ) : null}

          {hasMenu(project.payload, "contract-administration") ? (
            <Tabs.TabPane
              tab={ProjectMenuTabs.CONTRACT_ADMINISTRATION}
              key={ProjectMenuTabs.CONTRACT_ADMINISTRATION.toLocaleLowerCase()
                .split(" ")
                .join("-")}
            >
              <Suspense fallback={<LoadingIndicator />}>
                <ContractAdministrationsComponent />
              </Suspense>
            </Tabs.TabPane>
          ) : null}

          {getUserData().is_super_user ? (
            <>
              <Tabs.TabPane
                tab={ProjectMenuTabs.DETAIL}
                key={ProjectMenuTabs.DETAIL.toLocaleLowerCase()
                  .split(" ")
                  .join("-")}
              >
                <Suspense fallback={<LoadingIndicator />}>
                  <DetailComponent />
                </Suspense>
              </Tabs.TabPane>
            </>
          ) : null}

          {getUserData().is_super_user ? (
            <>
              <Tabs.TabPane
                tab={ProjectMenuTabs.USER_CONTROL}
                key={ProjectMenuTabs.USER_CONTROL.toLocaleLowerCase()
                  .split(" ")
                  .join("-")}
              >
                <Suspense fallback={<LoadingIndicator />}>
                  <UserControlComponent />
                </Suspense>
              </Tabs.TabPane>
            </>
          ) : null}

           {getUserData().is_super_user ? (
            <>
              <Tabs.TabPane
                tab={ProjectMenuTabs.TASK_FOLLOW_UP}
                key={ProjectMenuTabs.TASK_FOLLOW_UP.toLocaleLowerCase()
                  .split(" ")
                  .join("-")}
              >
                <Suspense fallback={<LoadingIndicator />}>
                  <TaskFollowUpComponent />
                </Suspense>
              </Tabs.TabPane>
            </>
          ) : null}
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
const mapStateToProps = (state: any) => ({
  project: state.project.fetchOne,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchOneProjects: (payload: any) => dispatch(fetchOneProjects(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectMenuComponent);
