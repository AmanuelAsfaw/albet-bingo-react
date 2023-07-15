import { lazy, Suspense } from "react";
import { connect } from "react-redux";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useParams,
} from "react-router-dom";
import { RouteConstants } from "./Constants";

import Layout from "../containers/Layouts/Layout/Layout.component";
import LoadingIndicator from "../components/common/Loading";

import {
  checkAuthorization,
  getUserData,
  isLoggedIn,
} from "../utilities/utilities";
import ErrorBoundary from "../containers/Errors/ErrorBoundary/ErrorBoundary.component";
import ViewKlingMaterialApproval from "../components/ProjectMenu/Supervision/KlingMaterialApproval/components/View/ViewKlingMaterialApproval";
import WeeklyPlanReport from "../components/ProjectMenu/WeeklyPlanReport";
import ReportComponent from "../containers/Report/Reports.component";
import Finance from "../components/Finance/Finance.component";
import TicketingContainer from "../containers/Ticketing/Ticketing.container";
import KenoGameContainer from "../containers/KenoGame/KenoGame.container";

const ProjectListComponent = lazy(
  () => import("../containers/Project/Project")
);
const ProjectComponent = lazy(
  () => import("../containers/ProjectMenu/ProjectMenu")
);
const KenoReportComponent = lazy(
  () => import("../containers/KenoReport/KenoReport")
);
const KenoBillsComponent = lazy(
  () => import("../containers/KenoBills/KenoBills.container")
);
const UserComponent = lazy(
  () => import("../containers/UserManagement/UserManagement")
);
const EnterpriseLoginComponent = lazy(() => import("../components/Login"));
const SignupComponent = lazy(() => import("../components/Signup/index"));
const TaskComponent = lazy(() => import("../containers/Task/Task.component"));
const StatusBoardComponent = lazy(
  () => import("../containers/StatusBoard/StatusBoard.component")
);
const LettersComponent = lazy(
  () => import("../containers/Letter/Letters.component")
);
const CommunicationComponent = lazy(
  () => import("../containers/Communication/Communication.component")
);

const Index = () => {
  const RequireAuth = ({ children }: { children: JSX.Element }) => {
    
    const isAuthenticated = isLoggedIn();
    let location = useLocation();
    let params = useParams();

    let isAuthorized: any = false;
    if (isAuthenticated) {
      isAuthorized = checkAuthorization(location.pathname);
    }
    console.log({ location, isAuthenticated, isAuthorized, params });
    if ((isAuthenticated && isAuthorized) || getUserData().is_super_user)
      return children;
    return (
      <Navigate to={RouteConstants.LOGIN} state={{ from: location }} replace />
    );
  };

  return (
    <Routes>
      <Route
        path={RouteConstants.LOGIN}
        element={
          <ErrorBoundary>
            <Suspense fallback={<LoadingIndicator />}>
              <EnterpriseLoginComponent />
            </Suspense>
          </ErrorBoundary>
        }
      />

      <Route
        path={RouteConstants.SIGN_UP}
        element={
          <ErrorBoundary>
            <Suspense fallback={<LoadingIndicator />}>
              <SignupComponent />
            </Suspense>
          </ErrorBoundary>
        }
      />

      <Route
        path={RouteConstants.TASK}
        element={
          <ErrorBoundary>
            <RequireAuth>
              <Layout>
                <Suspense fallback={<LoadingIndicator />}>
                  <TaskComponent />{" "}
                </Suspense>
              </Layout>
            </RequireAuth>
          </ErrorBoundary>
        }
      />


      <Route
        path={RouteConstants.TASK}
        element={
          <ErrorBoundary>
            <RequireAuth>
              <Layout>
                <Suspense fallback={<LoadingIndicator />}>
                  <TaskComponent />{" "}
                </Suspense>
              </Layout>
            </RequireAuth>
          </ErrorBoundary>
        }
      />

      <Route
        path={RouteConstants.HUMAN_RESOURCE}
        element={
          <ErrorBoundary>
            <RequireAuth>
              <Layout>
                <Suspense fallback={<LoadingIndicator />}>
                  <TaskComponent />{" "}
                </Suspense>
              </Layout>
            </RequireAuth>
          </ErrorBoundary>
        }
      />
      <Route
        path={RouteConstants.LETTER}
        element={
          <ErrorBoundary>
            <RequireAuth>
              <Layout>
                <Suspense fallback={<LoadingIndicator />}>
                  <LettersComponent />{" "}
                </Suspense>
              </Layout>
            </RequireAuth>
          </ErrorBoundary>
        }
      />

      <Route
        path={RouteConstants.PROJECT}
        element={
          <ErrorBoundary>
            <RequireAuth>
              <Layout>
                <Suspense fallback={<LoadingIndicator />}>
                  <ProjectComponent />
                </Suspense>
              </Layout>
            </RequireAuth>
          </ErrorBoundary>
        }
      />

      <Route
        path={RouteConstants.PROJECT_MENU}
        element={
          <ErrorBoundary>
            <RequireAuth>
              <Layout>
                <Suspense fallback={<LoadingIndicator />}>
                  <ProjectComponent />{" "}
                </Suspense>
              </Layout>
            </RequireAuth>
          </ErrorBoundary>
        }
      />

      <Route
        path={RouteConstants.PROJECT_TAB}
        element={
          <ErrorBoundary>
            <RequireAuth>
              <Layout>
                <Suspense fallback={<LoadingIndicator />}>
                  <ProjectComponent />{" "}
                </Suspense>
              </Layout>
            </RequireAuth>
          </ErrorBoundary>
        }
      />

      <Route
        path={RouteConstants.PROJECT_LIST}
        element={
          <ErrorBoundary>
            <RequireAuth>
              <Layout>
                <Suspense fallback={<LoadingIndicator />}>
                  <ProjectListComponent key="1" />{" "}
                </Suspense>
              </Layout>
            </RequireAuth>
          </ErrorBoundary>
        }
      />

      <Route
        path={RouteConstants.PROJECTS}
        element={
          <ErrorBoundary>
            <RequireAuth>
              <Layout>
                <Suspense fallback={<LoadingIndicator />}>
                  <ProjectListComponent key="2" />{" "}
                </Suspense>
              </Layout>
            </RequireAuth>
          </ErrorBoundary>
        }
      />

      <Route
        path={RouteConstants.USER}
        element={
          <ErrorBoundary>
            <RequireAuth>
              <Layout>
                <Suspense fallback={<LoadingIndicator />}>
                  <UserComponent />{" "}
                </Suspense>
              </Layout>
            </RequireAuth>
          </ErrorBoundary>
        }
      />

      <Route
        path={RouteConstants.COMMUNICATION}
        element={
          <ErrorBoundary>
            <RequireAuth>
              <Layout>
                <Suspense fallback={<LoadingIndicator />}>
                  <CommunicationComponent key="2" />
                </Suspense>
              </Layout>
            </RequireAuth>
          </ErrorBoundary>
        }
      />

      <Route
        path={RouteConstants.REPORT}
        element={
          <ErrorBoundary>
            <RequireAuth>
              <Layout>
                <Suspense fallback={<LoadingIndicator />}>
                  <ReportComponent key="5" />
                </Suspense>
              </Layout>
            </RequireAuth>
          </ErrorBoundary>
        }
      />

      <Route
        path={RouteConstants.MATERIAL_APPROVAL}
        element={
          <ErrorBoundary>
            <RequireAuth>
              <Layout>
                <Suspense fallback={<LoadingIndicator />}>
                  <ViewKlingMaterialApproval key="45" />
                </Suspense>
              </Layout>
            </RequireAuth>
          </ErrorBoundary>
        }
      />
      <Route
        path={RouteConstants.WEEK_REPORTS}
        element={
          <ErrorBoundary>
            <RequireAuth>
              <Layout>
                <Suspense fallback={<LoadingIndicator />}>
                  <WeeklyPlanReport key="46" />
                </Suspense>
              </Layout>
            </RequireAuth>
          </ErrorBoundary>
        }
      />

      <Route
        path={RouteConstants.STATUS_BOARD}
        element={
          <ErrorBoundary>
            <RequireAuth>
              <Layout>
                <Suspense fallback={<LoadingIndicator />}>
                  <StatusBoardComponent key="47" />
                </Suspense>
              </Layout>
            </RequireAuth>
          </ErrorBoundary>
        }
      />

      <Route
        path={RouteConstants.FINANCE}
        element={
          <ErrorBoundary>
            <RequireAuth>
              <Layout>
                <Suspense fallback={<LoadingIndicator />}>
                  <Finance key="48" />
                </Suspense>
              </Layout>
            </RequireAuth>
          </ErrorBoundary>
        }
      />

      <Route
        path={RouteConstants.TICKETING}
        element={
          <ErrorBoundary>
            <RequireAuth>
              <Layout>
                <Suspense fallback={<LoadingIndicator />}>
                  <TicketingContainer key="70" />
                </Suspense>
              </Layout>
            </RequireAuth>
          </ErrorBoundary>
        }
      />

      <Route
        path={RouteConstants.KENO_GAME}
        element={
          <Suspense fallback={<LoadingIndicator />}>
            <KenoGameContainer key="71" />
          </Suspense>
        }
      />

      <Route
        path={RouteConstants.KENO_REPORT}
        element={
          <ErrorBoundary>
            <RequireAuth>
              <Layout>
                <Suspense fallback={<LoadingIndicator />}>
                <KenoReportComponent key="72" />
                </Suspense>
              </Layout>
            </RequireAuth>
          </ErrorBoundary>
        }
      />

      <Route
        path={RouteConstants.KENO_BILLS}
        element={
          <ErrorBoundary>
            <RequireAuth>
              <Layout>
                <Suspense fallback={<LoadingIndicator />}>
                <KenoBillsComponent key="73" />
                </Suspense>
              </Layout>
            </RequireAuth>
          </ErrorBoundary>
        }
      />

      <Route
        path={"/"}
        element={
          <Suspense fallback={<LoadingIndicator />}>
            <KenoGameContainer key="74" />
          </Suspense>
        }
      />
      <Route
        path="*"
        element={
          <Suspense fallback={<LoadingIndicator />}>
            <EnterpriseLoginComponent />
          </Suspense>
        }
      />
    </Routes>
  );
};

/**
 * Map State to Props
 *
 * @param state
 */
const mapStateToProps = (state: any) => ({});

export default connect(mapStateToProps)(Index);
