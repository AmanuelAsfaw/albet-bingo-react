import { FC, lazy, Suspense, useEffect, useState } from "react";
import { connect } from "react-redux";
import Tabs from "antd/lib/tabs";
import LoadingIndicator from "../common/Loading";
import { Card } from "antd";
import { fetchOneProjects } from "../../redux/Project/Project.action";
import { fetchOneGames } from "../../redux/Game/Game.action";
import { useNavigate, useParams } from "react-router-dom";
import { KenoReportTabs } from "../../constants/Constants";
import { ApiCallState } from "../../redux/Utils";
import { Project } from "../../redux/Project/Project.type";
import { Game } from "../../redux/Game/Game.type";
import { getUserData } from "../../utilities/utilities";
import { getPath, hasMenu } from "../common/Auth/Authentication.util";
import { last } from "lodash";
import HeaderComponent from "./Header/Header.component";

import ItemGroup from "./ItemGroup";

import TodayReport from "./Today";
import AnnualReport from "./Annual";
import MonthlyReport from "./Monthly";
import WeeklyReport from "./Weekly";

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

const KenoReportComponent: FC<{
  game: ApiCallState<Game>;
  fetchOneGames: Function;
}> = ({ game, fetchOneGames }) => {
  const param: any = useParams();
  const { id, header }: any = useParams();

  const navigate = useNavigate();

  const [tab, setTab] = useState(
    KenoReportTabs.SUPERVISION.toLocaleLowerCase()
  );

  useEffect(() => {
    setTab(header);
  }, [header]);

  useEffect(() => {
    if (getUserData().is_super_user) {
    } else {
      // const t = last(getPath(game.payload, "project", "")?.split("/"));
      const t = null;
      console.log({ t });
      if (t) {
        // navigate(`/project/${id}/${getPath(game.payload, "project", "")}`);

        setTab(header);
      }
    }
    // navigate(`/project/${id}/${getPath(project.payload, "project", "")}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const onChangeTab = (event: any) => {
    if (!game.isPending) {
      switch (event) {
        case KenoReportTabs.SUPERVISION.toLocaleLowerCase()
          .split(" ")
          .join("-"):
          // navigate(
          //   `/project/${id}/${getPath(
          //     game.payload,
          //     "header",
          //     "supervision"
          //   )}`
          // );
          break;
        case KenoReportTabs.ITEM_GROUP.toLocaleLowerCase()
          .split(" ")
          .join("-"):
          navigate({
            pathname: `/project/${id}/item-group`,
          });
          break;

        case KenoReportTabs.CONCEPT.toLocaleLowerCase().split(" ").join("-"):
          navigate({
            pathname: `/project/${id}/concept`,
          });
          break;
        case KenoReportTabs.PRE_CONCEPT.toLocaleLowerCase()
          .split(" ")
          .join("-"):
          navigate({
            pathname: `/project/${id}/pre-concept`,
          });
          break;
        case KenoReportTabs.DESIGN.toLocaleLowerCase():
          // navigate(
          //   `/project/${id}/${getPath(game.payload, "header", "design")}`
          // );
          break;
        case KenoReportTabs.DELIVERABLES.toLocaleLowerCase():
          navigate(`/project/${id}/deliverables`);
          break;

        case KenoReportTabs.PLANNING.toLocaleLowerCase():
          navigate(`/project/${id}/${event}`);
          break;
        case KenoReportTabs.CONTRACT_ADMINISTRATION.toLocaleLowerCase()
          .split(" ")
          .join("-"):
          // navigate(
          //   `/project/${id}/${getPath(
          //     game.payload,
          //     "header",
          //     "contract-administration"
          //   )}`
          // );
          break;
        case KenoReportTabs.DETAIL.toLocaleLowerCase().split(" ").join("-"):
          // navigate({
          //   pathname: `/project/${id}/${getPath(
          //     game.payload,
          //     "header",
          //     "detail"
          //   )}`,
          // });
          break;
        case KenoReportTabs.USER_CONTROL.toLocaleLowerCase()
          .split(" ")
          .join("-"):
          navigate({
            pathname: `/project/${id}/${event}/*/${event}`,
          });
          break;

        case KenoReportTabs.USER_CONTROL.toLocaleLowerCase()
          .split(" ")
          .join("-"):
          navigate({
            pathname: `/project/${id}/${event}/*/${event}`,
          });
          break;

        case KenoReportTabs.TASK_FOLLOW_UP.toLocaleLowerCase()
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
      <Card loading={game.isPending && !game.payload}>
        <Tabs tabPosition="top" activeKey={tab} onChange={onChangeTab}>
          {true ? (
            <Tabs.TabPane
              tab={KenoReportTabs.TODAY}
              key={KenoReportTabs.TODAY.toLocaleLowerCase()}
            >
              <Suspense fallback={<LoadingIndicator />}>
                <TodayReport />
              </Suspense>
            </Tabs.TabPane>
          ) : null}

          { true ? (
            <Tabs.TabPane
              tab={KenoReportTabs.WEEKLY}
              key={KenoReportTabs.WEEKLY.toLocaleLowerCase()}
            >
              <Suspense fallback={<LoadingIndicator />}>
                <WeeklyReport />
              </Suspense>
            </Tabs.TabPane>
          ) : null}

          {true ? (
            <Tabs.TabPane
              tab={KenoReportTabs.MONTHLY}
              key={KenoReportTabs.MONTHLY.toLocaleLowerCase()}
            >
              <Suspense fallback={<LoadingIndicator />}>
                <MonthlyReport />
              </Suspense>
            </Tabs.TabPane>
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
  game: state.game.fetchOne,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  // fetchOneProjects: (payload: any) => dispatch(fetchOneProjects(payload)),
  fetchOneGames: (payload: any) => dispatch(fetchOneGames(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(KenoReportComponent);
