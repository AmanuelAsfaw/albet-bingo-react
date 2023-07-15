import { FC, useEffect } from "react";
import { connect } from "react-redux";
import { DesignTabs } from "../../../constants/Constants";
import Tabs from "antd/lib/tabs";
import { lazy, Suspense } from "react";
import LoadingIndicator from "../../common/Loading";
import BoqComponent from "../Detail/components/BoQ";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ApiCallState } from "../../../redux/Utils";
import { Project } from "../../../redux/Project/Project.type";
import { getPath, hasSubMenu } from "../../common/Auth/Authentication.util";
const CheckListComponent = lazy(() => import("./components"));

const DesignComponent: FC<{ project: ApiCallState<Project> }> = ({
  project,
}) => {
  const [tab, setTab] = useState("");
  const { menu, id }: any = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    setTab(menu);
  }, [menu]);

  const onChange = (event: string) => {
    switch (event) {
      case DesignTabs.STRUCTURAL.toLocaleLowerCase().split(" ").join("-"):
        navigate({
          pathname: `/project/${id}/${getPath(
            project.payload,
            "menu",
            DesignTabs.STRUCTURAL.toLocaleLowerCase().split(" ").join("-")
          )}`,
        });
        break;

      case DesignTabs.ARCHITECTURE.toLocaleLowerCase().split(" ").join("-"):
        navigate({
          pathname: `/project/${id}/${getPath(
            project.payload,
            "menu",
            DesignTabs.ARCHITECTURE.toLocaleLowerCase().split(" ").join("-")
          )}`,
        });
        break;

      case DesignTabs.PLUMBING.toLocaleLowerCase().split(" ").join("-"):
        navigate({
          pathname: `/project/${id}/${getPath(
            project.payload,
            "menu",
            DesignTabs.PLUMBING.toLocaleLowerCase().split(" ").join("-")
          )}`,
        });
        break;
      case DesignTabs.MECHANICAL.toLocaleLowerCase().split(" ").join("-"):
        navigate({
          pathname: `/project/${id}/${getPath(
            project.payload,
            "menu",
            DesignTabs.MECHANICAL.toLocaleLowerCase().split(" ").join("-")
          )}`,
        });
        break;
      case DesignTabs.ELECTRICAL.toLocaleLowerCase().split(" ").join("-"):
        navigate({
          pathname: `/project/${id}/${getPath(
            project.payload,
            "menu",
            DesignTabs.ELECTRICAL.toLocaleLowerCase().split(" ").join("-")
          )}`,
        });
        break;
      case DesignTabs.FIRE_FIGHTING.toLocaleLowerCase().split(" ").join("-"):
        navigate({
          pathname: `/project/${id}/${getPath(
            project.payload,
            "menu",
            DesignTabs.FIRE_FIGHTING.toLocaleLowerCase().split(" ").join("-")
          )}`,
        });
        break;
      case DesignTabs.SPECIAL_SYSTEM.toLocaleLowerCase().split(" ").join("-"):
        navigate({
          pathname: `/project/${id}/${getPath(
            project.payload,
            "menu",
            DesignTabs.SPECIAL_SYSTEM.toLocaleLowerCase().split(" ").join("-")
          )}`,
        });
        break;
      case DesignTabs.SANITARY.toLocaleLowerCase().split(" ").join("-"):
        navigate({
          pathname: `/project/${id}/${getPath(
            project.payload,
            "menu",
            DesignTabs.SANITARY.toLocaleLowerCase().split(" ").join("-")
          )}`,
        });
        break;
      case DesignTabs.BOQ.toLocaleLowerCase().split(" ").join("-"):
        navigate({
          pathname: `/project/${id}/${getPath(
            project.payload,
            "menu",
            DesignTabs.BOQ.toLocaleLowerCase().split(" ").join("-")
          )}`,
        });
        break;
    }
  };

  return (
    <Tabs
      tabPosition="left"
      type="line"
      activeKey={tab}
      itemRef="ref"
      onChange={onChange}
    >
      {hasSubMenu(
        project.payload,
        DesignTabs.STRUCTURAL.toLocaleLowerCase().split(" ").join("-")
      ) ? (
        <Tabs.TabPane
          tab={DesignTabs.STRUCTURAL}
          key={DesignTabs.STRUCTURAL.toLocaleLowerCase().split(" ").join("-")}
        >
          <Suspense fallback={<LoadingIndicator />}>
            <CheckListComponent module={DesignTabs.STRUCTURAL} />
          </Suspense>
        </Tabs.TabPane>
      ) : null}

      {hasSubMenu(
        project.payload,
        DesignTabs.ARCHITECTURE.toLocaleLowerCase().split(" ").join("-")
      ) ? (
        <Tabs.TabPane
          tab={DesignTabs.ARCHITECTURE}
          key={DesignTabs.ARCHITECTURE.toLocaleLowerCase().split(" ").join("-")}
        >
          <Suspense fallback={<LoadingIndicator />}>
            <CheckListComponent module={DesignTabs.ARCHITECTURE} />
          </Suspense>
        </Tabs.TabPane>
      ) : null}
      {hasSubMenu(
        project.payload,
        DesignTabs.PLUMBING.toLocaleLowerCase().split(" ").join("-")
      ) ? (
        <Tabs.TabPane
          tab={DesignTabs.PLUMBING}
          key={DesignTabs.PLUMBING.toLocaleLowerCase().split(" ").join("-")}
        >
          <Suspense fallback={<LoadingIndicator />}>
            <CheckListComponent module={DesignTabs.PLUMBING} />
          </Suspense>
        </Tabs.TabPane>
      ) : null}
      {hasSubMenu(
        project.payload,
        DesignTabs.MECHANICAL.toLocaleLowerCase().split(" ").join("-")
      ) ? (
        <Tabs.TabPane
          tab={DesignTabs.MECHANICAL}
          key={DesignTabs.MECHANICAL.toLocaleLowerCase().split(" ").join("-")}
        >
          <Suspense fallback={<LoadingIndicator />}>
            <CheckListComponent module={DesignTabs.MECHANICAL} />
          </Suspense>
        </Tabs.TabPane>
      ) : null}
      {hasSubMenu(
        project.payload,
        DesignTabs.ELECTRICAL.toLocaleLowerCase().split(" ").join("-")
      ) ? (
        <Tabs.TabPane
          tab={DesignTabs.ELECTRICAL}
          key={DesignTabs.ELECTRICAL.toLocaleLowerCase().split(" ").join("-")}
        >
          <Suspense fallback={<LoadingIndicator />}>
            <CheckListComponent module={DesignTabs.ELECTRICAL} />
          </Suspense>
        </Tabs.TabPane>
      ) : null}
      {hasSubMenu(
        project.payload,
        DesignTabs.FIRE_FIGHTING.toLocaleLowerCase().split(" ").join("-")
      ) ? (
        <Tabs.TabPane
          tab={DesignTabs.FIRE_FIGHTING}
          key={DesignTabs.FIRE_FIGHTING.toLocaleLowerCase()
            .split(" ")
            .join("-")}
        >
          <Suspense fallback={<LoadingIndicator />}>
            <CheckListComponent module={DesignTabs.FIRE_FIGHTING} />
          </Suspense>
        </Tabs.TabPane>
      ) : null}
      {hasSubMenu(
        project.payload,
        DesignTabs.SPECIAL_SYSTEM.toLocaleLowerCase().split(" ").join("-")
      ) ? (
        <Tabs.TabPane
          tab={DesignTabs.SPECIAL_SYSTEM}
          key={DesignTabs.SPECIAL_SYSTEM.toLocaleLowerCase()
            .split(" ")
            .join("-")}
        >
          <Suspense fallback={<LoadingIndicator />}>
            <CheckListComponent module={DesignTabs.SPECIAL_SYSTEM} />
          </Suspense>
        </Tabs.TabPane>
      ) : null}
      {hasSubMenu(
        project.payload,
        DesignTabs.SANITARY.toLocaleLowerCase().split(" ").join("-")
      ) ? (
        <Tabs.TabPane
          tab={DesignTabs.SANITARY}
          key={DesignTabs.SANITARY.toLocaleLowerCase().split(" ").join("-")}
        >
          <Suspense fallback={<LoadingIndicator />}>
            <CheckListComponent module={DesignTabs.SANITARY} />
          </Suspense>
        </Tabs.TabPane>
      ) : null}
      {hasSubMenu(
        project.payload,
        DesignTabs.BOQ.toLocaleLowerCase().split(" ").join("-")
      ) ? (
        <Tabs.TabPane
          tab={DesignTabs.BOQ}
          key={DesignTabs.BOQ.toLocaleLowerCase().split(" ").join("-")}
        >
          <Suspense fallback={<LoadingIndicator />}>
            <BoqComponent />
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

export default connect(mapStateToProps, mapDispatchToProps)(DesignComponent);
