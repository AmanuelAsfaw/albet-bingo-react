import Menu from "antd/lib/menu";
import { useLocation, useNavigate } from "react-router-dom";
import { RouteConstants } from "../../../router/Constants";
import { useEffect, useState } from "react";
import { HRTabs } from "../../../constants/Constants";
import { checkAuthorization } from "../../../utilities/utilities";

const HeaderMenuComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();
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
    <div className="hidden-print header-menu">
      <Menu
        {...(!localStorage.getItem("/")
          ? { openKeys: openKeys, onOpenChange: onOpenChange }
          : null)}
        mode="horizontal"
        selectedKeys={[selected]}
        defaultSelectedKeys={["dashboard"]}
        onSelect={(e: any) => {
          console.log(e.key);
          navigate(e.key);
        }}
        theme="light"
        // className="side_bar"
      >
        {checkAuthorization(RouteConstants.DASHBOARDS) ? (
          <Menu.Item
            key={RouteConstants.DASHBOARDS}
            // icon={<HomeOutlined />}
            title="dashboard"
          >
            Dashboard
          </Menu.Item>
        ) : null}
        {checkAuthorization(RouteConstants.REGISTER_PROJECT) ? (
          <Menu.Item key={RouteConstants.PROJECTS} title="Project">
            Project
          </Menu.Item>
        ) : checkAuthorization(RouteConstants.PROJECT_LIST) ? (
          <Menu.Item
            key={RouteConstants.PROJECTS}
            // icon={<AppstoreAddOutlined />}
            title="Project"
          >
            Projects
          </Menu.Item>
        ) : null}
        {checkAuthorization(RouteConstants.DOCUMENT) ? (
          <Menu.Item
            key={RouteConstants.DOCUMENT}
            // icon={<FolderAddOutlined />}
            title="Documents"
          >
            Documents
          </Menu.Item>
        ) : null}
        {checkAuthorization(RouteConstants.SUB_CONTRACT_LIST) ? (
          <Menu.Item
            key={RouteConstants.SUB_CONTRACT_LIST}
            // icon={<FolderAddOutlined />}
            title="Sub Contract"
          >
            Sub Contract
          </Menu.Item>
        ) : null}
        {/* {checkAuthorization(RouteConstants.TASK) ? (
          <Menu.Item
            key={RouteConstants.TASK}
            // icon={<DollarOutlined />}
            title="Task"
          >
            Task
          </Menu.Item>
        ) : null} */}
        {checkAuthorization(RouteConstants.LETTER) && false? (
          <Menu.Item
            key={RouteConstants.LETTER}
            // icon={<DollarOutlined />}
            title="Letter"
          >
            Letter
          </Menu.Item>
        ) : null}

        {/* {checkAuthorization(RouteConstants.PLANNING) ? (
          <Menu.Item
            key={RouteConstants.PLANNING}
            // icon={<DollarOutlined />}
            title="Planning"
            >
            Planning
            </Menu.Item>
          ) : null} */}
        {checkAuthorization(RouteConstants.COMMUNICATION) && false? (
          <Menu.Item
            key={RouteConstants.COMMUNICATION}
            // icon={<DollarOutlined />}
            title="Communication"
          >
            Communication
          </Menu.Item>
        ) : null}

        {/* {checkAuthorization(RouteConstants.REPORT) && false ? (
          <Menu.Item
            key={RouteConstants.REPORT}
            // icon={<DollarOutlined />}
            title="Site Report"
          >
            Site-Report
          </Menu.Item>
        ) : null} */}
        {/* <Menu.Item
          key={RouteConstants.WEEK_REPORTS}
          // icon={<DollarOutlined />}
          title="Report"
        >
          Report
        </Menu.Item> */}

        {/* <Menu.Item
          key={RouteConstants.STATUS_BOARD}
          // icon={<DollarOutlined />}
          title="Status-Board"
        >
          Status-Board
        </Menu.Item> */}

        {/* <Menu.Item key={RouteConstants.FINANCE} title="Finance">
          Finance
        </Menu.Item> */}

        {checkAuthorization(RouteConstants.TICKETING)? (
          <Menu.Item
            key={RouteConstants.TICKETING}
            // icon={<DollarOutlined />}
            title="Ticketing"
          >
            Ticketing
          </Menu.Item>
        ) : null}
        
        {/* {checkAuthorization(RouteConstants.KENO_GAME)? (
          <Menu.Item
            key={RouteConstants.KENO_GAME}
            // icon={<DollarOutlined />}
            title="KenoGame"
          >
            Keno Game
          </Menu.Item>
        ) : null} */}

        {checkAuthorization(RouteConstants.KENO_BILLS)? (
          <Menu.Item
            key={RouteConstants.KENO_BILLS}
            // icon={<DollarOutlined />}
            title="KenoBills"
          >
            Bills
          </Menu.Item>
        ) : null}

        {checkAuthorization(RouteConstants.KENO_REPORT)? (
          <Menu.Item
            key={RouteConstants.KENO_REPORT}
            // icon={<DollarOutlined />}
            title="Keno Report"
          >
            Report
          </Menu.Item>
        ) : null}

        {checkAuthorization(RouteConstants.SCANNED)? (
          <Menu.Item
            key={RouteConstants.SCANNED}
            // icon={<DollarOutlined />}
            title="Keno Scanner"
          >
            Scanner
          </Menu.Item>
        ) : null}

        {checkAuthorization(RouteConstants.DRAWED_GAMES)? (
          <Menu.Item
            key={RouteConstants.DRAWED_GAMES}
            // icon={<DollarOutlined />}
            title="Drawed Games"
          >
            Games
          </Menu.Item>
        ) : null}

        {checkAuthorization(RouteConstants.RESOURCE)? (
          <Menu.Item
            key={RouteConstants.RESOURCE}
            // icon={<DollarOutlined />}
            title="Keno Resource"
          >
            Resource
          </Menu.Item>
        ) : null}


      </Menu>
    </div>
  );
};
export default HeaderMenuComponent;
