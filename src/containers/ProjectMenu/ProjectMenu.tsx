import { FC, useEffect } from "react";
import { connect } from "react-redux";
import { ProjectMenuPropType } from "./ProjectMenu.util";
import ProjectMenuComponent from "../../components/ProjectMenu";
const ProjectMenu: FC<ProjectMenuPropType> = () => {
  useEffect(() => {}, []);

  return <ProjectMenuComponent />;
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

export default connect(mapStateToProps, mapDispatchToProps)(ProjectMenu);
