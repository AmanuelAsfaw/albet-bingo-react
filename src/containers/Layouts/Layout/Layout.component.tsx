import { FC, useState } from "react";
import { LayoutPropType } from "./Layout.utils";
import HeaderComponent from "../Header/Header.component";

import { Layout } from "antd";

import "./Layout.css";

const { Header, Content } = Layout;
const LayoutComponent: FC<LayoutPropType> = ({ children }) => {
  const [collapsed, setCollapse] = useState(true);

  const onCollapse = () => {
    setCollapse(!collapsed);
  };

  return (
    <div>
      <Layout style={{ minHeight: "100vh" }} className="body">
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            <HeaderComponent />
          </Header>
          <Content className="mt-4 mb-0 limit-container">
            {/* <HeaderMenuComponent /> */}
            {children}
          </Content>
          {/* <Footer
            style={{
              textAlign: "center",
              position: "relative",
              backgroundColor: "#f3f6fc",
            }}
          >
            ConDigital, Inc.
          </Footer> */}
        </Layout>
        {/* </div> */}
      </Layout>{" "}
    </div>
  );
};

export default LayoutComponent;
