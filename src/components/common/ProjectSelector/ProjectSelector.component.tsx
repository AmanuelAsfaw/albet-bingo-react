import { Form, Select } from "antd";
import { FC, useEffect } from "react";
import { connect } from "react-redux";
import { fetchAllListProjects } from "../../../redux/Project/Project.action";
import { SelectorFeedBack } from "../../../utilities/utilities";
import { ProjectSelectorPropType } from "./ProjectSelector.util";

const ProjectSelectorComponent: FC<ProjectSelectorPropType> = ({
  fetchProjects,
  onChange,
  projects,
  project_id,
}) => {
  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return (
    <Form.Item
      label="Project"
      {...SelectorFeedBack(project_id, projects)}
      initialValue={project_id}
    >
      <Select placeholder="Select" onChange={onChange}>
        {projects.payload.map((e, index) => (
          <Select.Option key={index} value={e.id}>
            {e.name}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

/**
 * Map State to Props
 *
 * @param state
 */
const mapStateToProps = (state: any) => ({
  projects: state.project.fetchList,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchProjects: () => dispatch(fetchAllListProjects()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectSelectorComponent);
