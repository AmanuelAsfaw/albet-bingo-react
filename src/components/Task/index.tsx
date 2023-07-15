import { Tabs } from "antd";
import { useState } from "react";
import DashboardComponent from "./Dashboard";
import TaskComponent from "./Task";
import BoardComponent from "./Board";

const TasksComponent = () => {
  const [tab, setTab] = useState("1");

  const onChangeTab = (event: any) => {
    setTab(event);
  };

  return (
    <Tabs tabPosition="top" activeKey={tab} onChange={onChangeTab}>
      <Tabs.TabPane tab="Dashboard" key="1">
        <DashboardComponent />
      </Tabs.TabPane>
      <Tabs.TabPane tab="List" key="2">
        <TaskComponent />
      </Tabs.TabPane>
      <Tabs.TabPane tab="Board" key="3">
        <BoardComponent />
      </Tabs.TabPane>
    </Tabs>
  );
};

export default TasksComponent;
