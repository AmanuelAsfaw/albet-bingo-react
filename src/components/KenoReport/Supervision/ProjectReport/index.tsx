import React, { FC, useEffect, useState } from "react";
import { ProjectReportPropType } from "./utils/ProjectReport.util";
import { connect } from "react-redux";
import ViewProjectReportComponent from "./components/ViewProjectReport.component";
import { fetchOneProjects } from "../../../../redux/Project/Project.action";

const ProjectReport: FC<ProjectReportPropType> = ({ projects }) => {
  return (
    <div className="row mt-2">
      <div className="col-md-12">
        <ViewProjectReportComponent project={projects.payload} />
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
  projects: state.project.fetchOne,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchOne: (action: any) => dispatch(fetchOneProjects(action)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectReport);
