import { FC, useState } from "react";
import Popover from "antd/lib/popover";
import { useNavigate } from "react-router-dom";
import { getInitials, getUserData, logout } from "../../../utilities/utilities";
import { RouteConstants } from "../../../router/Constants";
import Button from "antd/lib/button";
import Divider from "antd/lib/divider";
import Avatar from "antd/lib/avatar";
import Logo from "../../../Images/logogreen-icon.png";
import { UpCircleOutlined, UserAddOutlined } from "@ant-design/icons";
import HeaderMenuComponent from "./HeaderMenu.component";

import { connect } from "react-redux";
import { BUILD, BuildType } from "../../../constants/Constants";
import LogComponent from "../../../components/Log/Log.component";
import SettingsComponent from "../../../components/Settings";

const HeaderComponent: FC<{}> = ({}) => {
  const navigate = useNavigate();

  const [data] = useState(getUserData());

  return (
    <div className="limit-container">
      {/* <WelcomeModal setTourVisibility={setTourVisibility} /> */}
      <div className="row">
        <div className="header-wrapper">
          <div className="header-breadcrumb">
            <img src={Logo} alt="Logo" style={{maxWidth: '70px', marginRight: '5px'}}/>
            <span
              style={{
                lineHeight: "40px",
                fontWeight: "bold",
                fontSize: "20px",
              }}
            >
              AL-Betting
            </span>
          </div>
          <HeaderMenuComponent />
          <div className="header-icons">
            {data.is_super_user ? (
              <>
                <Button
                  type="link"
                  icon={<UserAddOutlined />}
                  onClick={(e) => navigate("/user-management/user-matrix")}
                ></Button>
              </>
            ) : null}
            <LogComponent />
            {/* <Button
              icon={<BookOutlined />}
              type="link"
              className="mr-1"
              onClick={() => setTourVisibility(true)}
            ></Button> */}
            {/* <TourModal
              isModalVisible={tour_visibility}
              setIsModalVisible={setTourVisibility}
            /> */}
            <Popover
              overlayClassName="header-popover"
              placement="bottomRight"
              content={
                <>
                  <h6 className="con-user">{data ? data.full_name : null}</h6>
                  <h6
                    style={{
                      backgroundColor: "#6a7a9c",
                      display: "inline",
                      color: "white",

                      padding: "6px",
                      borderRadius: "8px",
                      fontSize: "10px",
                    }}
                  >
                    {BUILD === BuildType.ENTERPRISE_PROJECT
                      ? BuildType.PROJECT
                      : BUILD}
                  </h6>
                  {BUILD === BuildType.PROJECT ||
                  BUILD === BuildType.ENTERPRISE_PROJECT ? (
                    <a target="blank" href="https://condigitaleth.com/demo/">
                      <Button
                        className="d-block"
                        type="link"
                        size="middle"
                        icon={
                          <UpCircleOutlined
                            style={{ verticalAlign: "text-bottom" }}
                          />
                        }
                        style={{ paddingLeft: "0px" }}
                      >
                        Upgrade Package
                      </Button>
                    </a>
                  ) : null}

                  {/* <Button type="link" icon={<SettingOutlined/>} style={{paddingLeft:"0px",marginTop:"5px"}} className="d-block">Setting</Button> */}
                  <SettingsComponent />

                  {/* <br></br> */}
                  <Divider style={{ marginBottom: "13px" }} />
                  <Button
                    style={{
                      paddingLeft: "0px",
                      marginTop: "0px",
                      paddingTop: "0px",
                    }}
                    className="btn btn-link"
                    onClick={() => {
                      logout();
                      navigate(RouteConstants.LOGIN);
                    }}
                  >
                    Sign Out
                  </Button>
                </>
              }
              trigger="hover"
            >
              <Avatar style={{ color: "#fff", backgroundColor: "#0033a1" }}>
                {getInitials(data.full_name)}
              </Avatar>
              {/*
              <div className="col flex-row">
                <div className="header-avatar">
                  {/* <h5>{getInitials(data.full_name)}</h5>
                </div>

                {/* <span className="con-user ml-2">{data ? data.name : null}</span>
              </div> */}
            </Popover>
          </div>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HeaderComponent);
