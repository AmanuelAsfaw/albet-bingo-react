import Menu from "antd/lib/menu";
import "./Sidebar.css";
import {
  UserOutlined,
  HomeOutlined,
  OrderedListOutlined,
  PlusOutlined,
  FolderAddOutlined,
  AppstoreAddOutlined,
  SolutionOutlined,
  DollarOutlined,
  HddOutlined,
  ProfileOutlined,
  ReconciliationOutlined,
} from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { RouteConstants } from "../../../router/Constants";
import { useEffect, useState } from "react";
import { HRTabs } from "../../../constants/Constants";
import { checkAuthorization } from "../../../utilities/utilities";
const { SubMenu } = Menu;
const SidebarComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selected, setSelected]: any = useState();
  const [openKeys, setOpenKeys] = useState(["dashboard"]);
  const rootSubmenuKeys = ["project", "sub_contract"];

  useEffect(() => {
    setSelected(location.pathname);
  }, [location.pathname]);

  const onOpenChange = (keys: any) => {
    const latestOpenKey = keys.find((key: any) => openKeys.indexOf(key) === -1);

    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  return (
    <div style={{ flex: "1 1 0%", overflow: "hidden auto" }}>
      <Menu
        {...(!localStorage.getItem("/")
          ? { openKeys: openKeys, onOpenChange: onOpenChange }
          : null)}
        inlineCollapsed={true}
        mode="inline"
        selectedKeys={[selected]}
        defaultSelectedKeys={["dashboard"]}
        onSelect={(e: any) => navigate(e)}
        theme="dark"
        // className="side_bar"
      >
        {checkAuthorization(RouteConstants.DASHBOARDS) ? (
          <Menu.Item
            key={RouteConstants.DASHBOARDS}
            icon={<HomeOutlined />}
            title="dashboard"
          >
            Dashboard
          </Menu.Item>
        ) : null}

        {checkAuthorization(RouteConstants.REGISTER_PROJECT) ? (
          <SubMenu key="project" icon={<AppstoreAddOutlined />} title="Project">
            <Menu.Item key={RouteConstants.PROJECTS}>List</Menu.Item>
            <Menu.Item key={RouteConstants.REGISTER_PROJECT}>Add</Menu.Item>
          </SubMenu>
        ) : checkAuthorization(RouteConstants.PROJECT_LIST) ? (
          <Menu.Item
            key={RouteConstants.PROJECTS}
            icon={<AppstoreAddOutlined />}
            title="Project"
          >
            Projects
          </Menu.Item>
        ) : null}

        {checkAuthorization(RouteConstants.PRE_CONTRACT) ? (
          <SubMenu
            key="pre_contract"
            icon={<AppstoreAddOutlined />}
            title="Pre Contract"
          >
            <Menu.Item key={RouteConstants.PRE_CONTRACT}>List</Menu.Item>
            <Menu.Item key={RouteConstants.REGISTER_PRE_CONTRACT}>
              Add
            </Menu.Item>
          </SubMenu>
        ) : null}

        {checkAuthorization(RouteConstants.SUB_CONTRACT_LIST) ? (
          <SubMenu
            key="sub_contract"
            icon={<SolutionOutlined />}
            title="Sub Contract"
          >
            <Menu.Item
              key={RouteConstants.SUB_CONTRACT_LIST}
              icon={<OrderedListOutlined />}
            >
              List
            </Menu.Item>
            <Menu.Item
              key={RouteConstants.REGISTER_SUB_CONTRACT}
              icon={<PlusOutlined />}
            >
              Add
            </Menu.Item>
          </SubMenu>
        ) : null}
        {checkAuthorization(RouteConstants.REPORT) ? (
          <Menu.Item
            key={RouteConstants.REPORT}
            icon={<ProfileOutlined />}
            title="Report"
          >
            Report
          </Menu.Item>
        ) : null}
        {checkAuthorization(RouteConstants.DOCUMENT) ? (
          <Menu.Item
            key={RouteConstants.DOCUMENT}
            icon={<FolderAddOutlined />}
            title="Documents"
          >
            Documents
          </Menu.Item>
        ) : null}

        {checkAuthorization(RouteConstants.HUMAN_RESOURCE) ? (
          <Menu.Item
            key={"/HR/" + HRTabs.DEPARTMENT}
            icon={<UserOutlined />}
            title="Human Resource"
          >
            Human Resource
          </Menu.Item>
        ) : null}

        {checkAuthorization(RouteConstants.PROCUREMENT) ? (
          <Menu.Item
            key={RouteConstants.PROCUREMENT}
            icon={<ReconciliationOutlined />}
            title="procurement"
          >
            Procurement
          </Menu.Item>
        ) : null}

        {checkAuthorization(RouteConstants.INVENTORY) ? (
          <Menu.Item
            key={RouteConstants.INVENTORY}
            icon={<HddOutlined />}
            title="inventory"
          >
            Inventory
          </Menu.Item>
        ) : null}

        {/* {checkAuthorization(RouteConstants.EQUIPMENT) ? (
          <Menu.Item
            key={RouteConstants.EQUIPMENT}
            icon={<VehicleTruckProfile style={{ width: "14px" }} />}
            title="Fixed Asset"
          >
            Fixed Asset
          </Menu.Item>
        ) : null} */}

        {checkAuthorization(RouteConstants.FINANCE) ? (
          <Menu.Item
            key={RouteConstants.FINANCE}
            icon={<DollarOutlined />}
            title="Finance"
          >
            Finance
          </Menu.Item>
        ) : null}

        {checkAuthorization(RouteConstants.TASK) ? (
          <Menu.Item
            key={RouteConstants.TASK}
            icon={<DollarOutlined />}
            title="Task"
          >
            Task
          </Menu.Item>
        ) : null}

        {checkAuthorization(RouteConstants.LETTER) ? (
          <Menu.Item
            key={RouteConstants.LETTER}
            icon={<DollarOutlined />}
            title="Letter"
          >
            Letter
          </Menu.Item>
        ) : null}
      </Menu>
    </div>
  );
};
export default SidebarComponent;
