import { Card, Tabs } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserRegistration from "../../components/UserManagement";
import UserMatrix from "../../components/UserMatrix";
const UserManagement = () => {
  const [selected_tab, setSelectedTab] = useState("user-registration");
  const { tab }: any = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    setSelectedTab(tab);
  }, [tab]);

  useEffect(() => {
    navigate(`/user-management/${tab}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChange = (event: string) => {
    navigate(`/user-management/${event}`);
  };

  return (
    <Card>
      <Tabs
        type="card"
        activeKey={selected_tab}
        onChange={onChange}
        itemRef="ref"
      >
        <Tabs.TabPane tab={"User Matrix"} key={"user-matrix"}>
          <UserMatrix />
        </Tabs.TabPane>
        <Tabs.TabPane tab={"User Registration"} key={"user-registration"}>
          <UserRegistration />
        </Tabs.TabPane>
      </Tabs>
    </Card>
  );
};

export default UserManagement;
