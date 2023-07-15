import { FC, useEffect } from "react";
import { connect } from "react-redux";
import { DeliverablesTabs } from "../../../constants/Constants";
import Tabs from "antd/lib/tabs";
import { lazy, Suspense } from "react";
import LoadingIndicator from "../../common/Loading";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { hasSubMenu } from "../../common/Auth/Authentication.util";
import { DeliverablesComponentPropType } from "./util/utils";
const KeyPersonnelComponent = lazy(() => import("./KeyPersonnel/KeyPersonnel.component"));

const DeliverablesComponent: FC<DeliverablesComponentPropType> = ({
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
      case DeliverablesTabs.PERSONNEL.toLocaleLowerCase().split(" ").join("-"):
        navigate({
          pathname: `/project/${id}/${DeliverablesTabs.PERSONNEL.toLocaleLowerCase()
            .split(" ")
            .join("-")}`,
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
        DeliverablesTabs.PERSONNEL.toLocaleLowerCase().split(" ").join("-")
      ) ? (
        <Tabs.TabPane
          tab={DeliverablesTabs.PERSONNEL}
          key={DeliverablesTabs.PERSONNEL.toLocaleLowerCase().split(" ").join("-")}
        >
          <Suspense fallback={<LoadingIndicator />}>
            <KeyPersonnelComponent project={project.payload} />
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

export default connect(mapStateToProps, mapDispatchToProps)(DeliverablesComponent);
