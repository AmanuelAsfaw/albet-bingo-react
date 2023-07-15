import { Tabs } from "antd";
import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import Site from "./Site";
import File from "./File";
import { useNavigate, useParams } from "react-router-dom";
import { ApiCallState } from "../../../../redux/Utils";
import { Project } from "../../../../redux/Project/Project.type";
import { isAuthenticationComponent } from "../../../common/Auth/Authentication.util";

const SiteDiaryComponent: FC<{ project: ApiCallState<Project> }> = ({
  project,
}) => {
  const [selected_tab, setSelectedTab] = useState("");
  const { menu, id, header, tab }: any = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    setSelectedTab(tab);
  }, [tab]);

  const onChange = (event: string) => {
    navigate({
      pathname: `/project/${id}/${header}/${menu}/${event
        .toLocaleLowerCase()
        .replaceAll(" ", "-")}`,
    });
  };

  return (
    <div className="row">
      <div className="col-md-12">
        <Tabs tabPosition="top" activeKey={selected_tab} onChange={onChange}>
          {isAuthenticationComponent(
            project.payload,
            `${header}/${menu}/Site Diary`
              .toLocaleLowerCase()
              .split(" ")
              .join("-")
          ) ? (
            <Tabs.TabPane tab="Site Diary" key={"site-diary"}>
              <Site />
            </Tabs.TabPane>
          ) : null}
          {isAuthenticationComponent(
            project.payload,
            `${header}/${menu}/Site Diary (Files)`
              .toLocaleLowerCase()
              .split(" ")
              .join("-")
          ) ? (
            <Tabs.TabPane tab="Site Diary (Files)" key={"site-diary-(files)"}>
              <File />
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

export default connect(mapStateToProps, mapDispatchToProps)(SiteDiaryComponent);
