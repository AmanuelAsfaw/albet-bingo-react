import Tabs from "antd/lib/tabs";
import React, { FC, useState } from "react";
import TestResultComponent from "./TestResult/TestResult.component";

import CastingComponent from "./Casting/Casting.component";
import TestEvaluation from "./TestEvaluation";
import RequestForTestComponent from "./RequestForTest";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { getPath } from "../../../common/Auth/Authentication.util";
import { ApiCallState } from "../../../../redux/Utils";
import { Project } from "../../../../redux/Project/Project.type";
import { connect } from "react-redux";

const TestMenuComponent: FC<{ project: ApiCallState<Project> }> = ({
  project,
}) => {
  console.log("🚀 ~ file: Test.component.tsx ~ line 18 ~ project", project);
  const [selected_tab, setSelectedTab] = useState("");
  const { menu, id, header, tab }: any = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    setSelectedTab(tab);
  }, [tab]);

  useEffect(() => {
    navigate(
      `/project/${id}/${getPath(project?.payload, "menu", "material-test")}`
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
          <Tabs.TabPane
            tab="Request For Test"
            key={"Request For Test".toLocaleLowerCase().replaceAll(" ", "-")}
          >
            <RequestForTestComponent />
          </Tabs.TabPane>
          <Tabs.TabPane
            tab="Casting"
            key={"Casting".toLocaleLowerCase().replaceAll(" ", "-")}
          >
            <CastingComponent />
          </Tabs.TabPane>

          <Tabs.TabPane
            tab="Test Results"
            key={"Test Results".toLocaleLowerCase().replaceAll(" ", "-")}
          >
            <TestResultComponent />
          </Tabs.TabPane>
          <Tabs.TabPane
            tab="Test Evaluation"
            key={"Test Evaluation".toLocaleLowerCase().replaceAll(" ", "-")}
          >
            <TestEvaluation />
          </Tabs.TabPane>
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
const mapStateToProps = (state: any) => ({});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(TestMenuComponent);
