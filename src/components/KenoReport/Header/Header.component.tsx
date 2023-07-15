import Card from "antd/lib/card";
import Collapse from "antd/lib/collapse";
import { FC, useState } from "react";
import { connect } from "react-redux";
import "./Header.css";
import {
  UserAddOutlined,
  AppstoreAddOutlined,
  ArrowsAltOutlined,
} from "@ant-design/icons";
import { ApiCallState } from "../../../redux/Utils";
import { Project } from "../../../redux/Project/Project.type";

const { Panel } = Collapse;
const HeaderComponent: FC<{
  project: ApiCallState<Project>;
}> = ({ project }) => {
  const [collapse, setCollapse] = useState<any>([]);

  const renderProjectSize = () => {
    switch (project.payload?.type) {
      case "Building":
        return (
          <h5 className="header-value">
            {project.payload?.basement_size +
              "B+G+" +
              project.payload?.floor_size}
          </h5>
        );
      case "Road":
        return (
          <h5 className="header-value">{project.payload?.road_size + " Km"}</h5>
        );
      case "Mixed":
        return <h5 className="header-value">Mixed</h5>;
      case "Water":
        return <h5 className="header-value">{project.payload?.custom_size}</h5>;
      case "Industry":
        return <h5 className="header-value">{project.payload?.custom_size}</h5>;
    }
  };

  return (
    <Card className="overview-card" loading={project.isPending}>
      <Collapse
        expandIconPosition="right"
        bordered={false}
        onChange={(e) => setCollapse(e)}
      >
        <Panel
          header={collapse.length === 1 ? "Overview" : project.payload?.name}
          key="1"
        >
          <div className="row">
            <div className="col-xl-2 col-md-3 mc-4">
              <p className="mb-2 header">
                <UserAddOutlined />
                <span className="header-label pl-1">Project Name</span>
              </p>
              <h5 className="header-value">{project.payload?.name}</h5>
            </div>
            <div className="col-xl-2 col-md-3 mc-4">
              <p className="mb-2 header">
                <AppstoreAddOutlined />
                <span className="header-label pl-1">Type</span>
              </p>
              <h5 className="header-value">{project.payload?.type}</h5>
            </div>
            <div className="col-xl-2 col-md-3 mc-4">
              <p className="mb-2 header">
                <ArrowsAltOutlined />
                <span className="header-label pl-1">Size</span>
              </p>

              {renderProjectSize()}
            </div>
          </div>
        </Panel>
      </Collapse>
    </Card>
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

export default connect(mapStateToProps)(HeaderComponent);
