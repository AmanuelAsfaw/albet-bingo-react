import { Form } from "antd";
import { FC, useEffect } from "react";
import { connect } from "react-redux";
import { fetchOneProjects } from "../../../redux/Project/Project.action";
import BoqModalComponent from "./components/Modal/BoqModal.component";
import { BoqSelectorPropType } from "./util/BoqSelector.util";

const BoqSelectorComponent: FC<BoqSelectorPropType> = ({
  project,
  fetchProject,
  project_id,
  required,
  boq,
  setBoq,
}) => {
  useEffect(() => {
    fetchProject(project_id);
  }, [project_id, fetchProject]);

  const Validator = () => {
    return new Promise((resolve, reject) => {
      if (required && !boq) reject("Item Required!");
      else resolve(null);
    });
  };

  return (
    <Form.Item
      label="Item"
      name="boq"
      rules={[{ required, validator: Validator }]}
    >
      <BoqModalComponent setBoq={setBoq} boq={boq} />
    </Form.Item>
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

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchProject: (action: any) => dispatch(fetchOneProjects(action)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BoqSelectorComponent);
