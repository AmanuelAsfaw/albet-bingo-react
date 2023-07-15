import { Tabs } from "antd";
import { FC, useState } from "react";
import { connect } from "react-redux";
import MinutesOfMeetingComponent from "./MinutesOfMeetings";
import MeetingFileComponent from "./MeetingFile";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { ApiCallState } from "../../../../redux/Utils";
import { Project } from "../../../../redux/Project/Project.type";
import { isAuthenticationComponent } from "../../../common/Auth/Authentication.util";

const MeetingComponent: FC<{ project: ApiCallState<Project> }> = ({
  project,
}) => {
  const [selected_tab, setSelectedTab] = useState("");
  const { menu, id, header, tab }: any = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    setSelectedTab(tab);
  }, [tab]);

  // useEffect(() => {
  //   navigate(`/project/${id}/${getPath(project.payload, "menu", "reports")}`);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const onChange = (event: string) => {
    navigate({
      pathname: `/project/${id}/${header}/${menu}/${event}`,
    });
  };

  return (
    <div className="row">
      <div className="col-md-12">
        <Tabs tabPosition="top" activeKey={selected_tab} onChange={onChange}>
          {isAuthenticationComponent(
            project.payload,
            `${header}/${menu}/Minutes Of Meeting`
              .toLocaleLowerCase()
              .split(" ")
              .join("-")
          ) ? (
            <Tabs.TabPane
              tab="Minutes Of Meeting"
              key={"Minutes Of Meeting"
                .toLocaleLowerCase()
                .replaceAll(" ", "-")}
            >
              <MinutesOfMeetingComponent />
            </Tabs.TabPane>
          ) : null}
          {isAuthenticationComponent(
            project.payload,
            `${header}/${menu}/Minutes Of Meeting (Signed)`
              .toLocaleLowerCase()
              .split(" ")
              .join("-")
          ) ? (
            <Tabs.TabPane
              tab="Minutes Of Meeting (Signed)"
              key={"Minutes Of Meeting (Signed)"
                .toLocaleLowerCase()
                .replaceAll(" ", "-")}
            >
              <MeetingFileComponent />
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

export default connect(mapStateToProps, mapDispatchToProps)(MeetingComponent);
