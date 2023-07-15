import { Tabs } from "antd";
import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { RootCheckListPropType } from "./index.util";
import CheckListFormComponent from "./CheckListForm/CheckListForm.component";
import CheckListComponent from "./CheckList/CheckList.component";
import FileStorage from "./FileStorage";
import { useNavigate, useParams } from "react-router-dom";
import {
  getPath,
  isAuthenticationComponent,
} from "../../../common/Auth/Authentication.util";

const RootCheckListComponent: FC<RootCheckListPropType> = ({
  module,
  project,
}) => {
  const [selected_tab, setSelectedTab] = useState("");
  const { menu, id, header, tab }: any = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    setSelectedTab(tab);
  }, [tab]);

  useEffect(() => {
    navigate(
      `/project/${id}/${getPath(
        project.payload,
        "menu",
        module.toLocaleLowerCase().split(" ").join("-")
      )}`
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChange = (event: string) => {
    navigate({
      pathname: `/project/${id}/${header}/${menu}/${event
        .toLocaleLowerCase()
        .replaceAll(" ", "-")}`,
    });
  };
  return (
    <div className="row work_item">
      <div className="col-md-12">
        <Tabs tabPosition="top" activeKey={selected_tab} onChange={onChange}>
          {isAuthenticationComponent(
            project.payload,
            `${header}/${module.toLowerCase()}/checklist-forms`
              .split(" ")
              .join("-")
          ) ? (
            <Tabs.TabPane tab="Checklist Forms" key="checklist-forms">
              <CheckListFormComponent module={module} />
            </Tabs.TabPane>
          ) : null}
          {isAuthenticationComponent(
            project.payload,
            `${header}/${module.toLowerCase()}/checklist`.split(" ").join("-")
          ) ? (
            <Tabs.TabPane tab="Checklist" key="checklist">
              <CheckListComponent module={module} />
            </Tabs.TabPane>
          ) : null}
          {isAuthenticationComponent(
            project.payload,
            `${header}/${module.toLowerCase()}/file-storage`
              .split(" ")
              .join("-")
          ) ? (
            <Tabs.TabPane tab="File Storage" key="file-storage">
              <FileStorage module={module} />
            </Tabs.TabPane>
          ) : null}
        </Tabs>
      </div>
    </div>
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
)(RootCheckListComponent);
