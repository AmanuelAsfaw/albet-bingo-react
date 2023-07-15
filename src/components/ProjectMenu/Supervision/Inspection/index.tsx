import Tabs from "antd/lib/tabs";
import React, { FC, useState } from "react";
import InspectionFormComponent from "./InspectionForm/InspectionForm.component";
import InspectionRegisteredComponent from "./Inspection/Inspection.component";
import WorkPermitComponent from "./WorkPermit";
import FIleComponent from "./File";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import {
  getPath,
  isAuthenticationComponent,
} from "../../../common/Auth/Authentication.util";
import { ApiCallState } from "../../../../redux/Utils";
import { Project } from "../../../../redux/Project/Project.type";
import { connect } from "react-redux";
const InspectionComponent: FC<{ project: ApiCallState<Project> }> = ({
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
      `/project/${id}/${getPath(project.payload, "menu", "inspection")}`
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChange = (event: string) => {
    navigate({
      pathname: `/project/${id}/${header}/${menu}/${event}`,
    });
  };

  return (
    <div className="row work_item">
      <div className="col-md-12">
        <Tabs tabPosition="top" activeKey={selected_tab} onChange={onChange}>
          {isAuthenticationComponent(
            project.payload,
            `${header}/${menu}/Inspection Forms`
              .toLocaleLowerCase()
              .replaceAll(" ", "-")
          ) ? (
            <Tabs.TabPane
              tab="Inspection Forms"
              key={"Inspection Forms".toLocaleLowerCase().replaceAll(" ", "-")}
            >
              <InspectionFormComponent />
            </Tabs.TabPane>
          ) : null}
          {isAuthenticationComponent(
            project.payload,
            `${header}/${menu}/Inspection`
              .toLocaleLowerCase()
              .replaceAll(" ", "-")
          ) ? (
            <Tabs.TabPane
              tab="Inspection"
              key={"Inspection".toLocaleLowerCase().replaceAll(" ", "-")}
            >
              <InspectionRegisteredComponent />
            </Tabs.TabPane>
          ) : null}
          {isAuthenticationComponent(
            project.payload,
            `${header}/${menu}/Work Permit`
              .toLocaleLowerCase()
              .replaceAll(" ", "-")
          ) ? (
            <Tabs.TabPane
              tab="Work Permit"
              key={"Work Permit".toLocaleLowerCase().replaceAll(" ", "-")}
            >
              <WorkPermitComponent />
            </Tabs.TabPane>
          ) : null}
          {isAuthenticationComponent(
            project.payload,
            `${header}/${menu}/Inspection (File)`
              .toLocaleLowerCase()
              .replaceAll(" ", "-")
          ) ? (
            <Tabs.TabPane
              tab="Inspection (File)"
              key={"Inspection (File)".toLocaleLowerCase().replaceAll(" ", "-")}
            >
              <FIleComponent />
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
)(InspectionComponent);
