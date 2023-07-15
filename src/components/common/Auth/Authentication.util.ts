import { Project } from "../../../redux/Project/Project.type";
import { ApiCallState } from "../../../redux/Utils";
import { FEATURES } from "../../../router/Constants";
import { getUserData } from "../../../utilities/utilities";

export type AuthenticationPropType = {
  children: React.ReactNode;
  project: ApiCallState<Project>;
  type: "DELETE" | "EDIT" | "WRITE" | "READ ONLY";
};

export const TypeAuthentication = (
  project: Project,
  type: "DELETE" | "EDIT" | "WRITE" | "READ ONLY",
  param: any
) => {
  let access_type = findOneFeatures(project, param.tab);
  if (access_type) {
    return (
      (type === "DELETE" && access_type.delete) ||
      (type === "EDIT" && access_type.edit) ||
      (type === "WRITE" && access_type.write) ||
      type === "READ ONLY"
    );
  } else return false;
};

export const isAuthenticationComponent = (project: Project, path: string) => {
  if (getUserData().is_super_user) {
    return true;
  } else {
    let features = findAllFeatures(project);

    return features.find((e) => e?.path === path) ? true : false;
  }
};

export const hasSubMenu = (project: Project, menu: string) => {
  if (getUserData().is_super_user) {
    return true;
  } else {
    let features = findAllFeatures(project);

    return features.find((e) => e?.menu === menu) ? true : false;
  }
};

export const hasMenu = (project: Project, header: string) => {
  if (getUserData().is_super_user) {
    return true;
  } else {
    let features = findAllFeatures(project);

    return features.find((e) => e?.header === header) ? true : false;
  }
};

export const getPath = (
  project: Project,
  type: "menu" | "header" | "project"| "planning",
  from: string
) => {
  if (getUserData().is_super_user) {
    if (type === "project") {
      return FEATURES.sort((a, b) => a.key - b.key)[0].path;
    } else if (type === "header") {
      return FEATURES.sort((a, b) => a.key - b.key).find(
        (e) => e?.header === from
      )?.path;
    } else {
      return FEATURES.sort((a, b) => a.key - b.key).find(
        (e) => e?.menu === from
      )?.path;
    }
  } else {
    const features = findAllFeatures(project);

    if (features.length > 0) {
      if (type === "project") return features[0]?.path;
      else if (type === "header") {
        return features.find((e) => e?.header === from)?.path;
      } else {
        return features.find((e) => e?.menu === from)?.path;
      }
    } else {
      return "";
    }
  }
};

export const findAllFeatures = (project: Project) => {
  const user_id = getUserData().id;

  if (getUserData().is_super_user) {
    return FEATURES;
  } else {
    const user_control = project?.user_controls?.find(
      (user_control) => user_control.user_id === user_id
    );
    if (user_control) {
      return user_control.role.role_accesses.map((e) =>
        FEATURES.find(
          (feature) =>
            feature.path === e.path && (e.read || e.write || e.delete || e.edit)
        )
      );
    } else {
      return [];
    }
  }
};

export const findOneFeatures = (project: Project, tab: string) => {
  const user_id = getUserData().id;

  const user_control = project?.user_controls?.find(
    (user_control) => user_control.user_id === user_id
  );
  if (user_control) {
    const f = FEATURES.find((e) => e.tab === tab);

    if (f) {
      return user_control.role.role_accesses.find((e) => e.path === f.path);
    } else {
      return null;
    }
  } else {
    return null;
  }
};
