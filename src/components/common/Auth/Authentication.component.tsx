import { FC } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { getUserData } from "../../../utilities/utilities";
import {
  AuthenticationPropType,
  TypeAuthentication,
} from "./Authentication.util";

const AuthenticationComponent: FC<AuthenticationPropType> = ({
  children,
  type,
  project,
}) => {
  const param = useParams();

  if (getUserData().is_super_user) {
    return <>{children}</>;
  }
  if (TypeAuthentication(project.payload, type, param)) {
    return <>{children}</>;
  } else {
    return <></>;
  }
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
const mapDispatchToProps = (dispatch: any) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthenticationComponent);
