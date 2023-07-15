import axios from "axios";
import { isNil, toNumber } from "lodash";
import { API_BASE_URI } from "../../../../../../../redux/ApiCall";
import { CheckListFormItem } from "../../../../../../../redux/CheckListForm/CheckListForm.type";

export type AddCheckListPropType = {
  module: string;
  fetchData: Function;
};

export const sendData = (data: any) =>
  axios.post(API_BASE_URI + "/checklist", data);

export const checkListItemObject = (
  key: any,
  parent_id = null,
  index = "-1"
) => {
  return {
    key,
    index,
    parent_id,
    description: null,
    is_subtitle: false,
    value: null,
    children: [],
  };
};

export const parentIndexGenerator = (data: any[]) => {
  let temp = data.filter((e) => e.is_numbered);

  if (temp.length === 0) {
    return `${temp.length + 1}`;
  } else {
    let parent_index = temp[temp.length - 1].index;

    return `${toNumber(parent_index) + 1}`;
  }
};

export const childIndexGenerator = (parent_index: any, children: any[]) => {
  let parent_index_split = !isNil(parent_index)
    ? parent_index?.split(".")
    : ["1"];

  if (children.length === 0) {
    parent_index_split.push(`${children.length + 1}`);
  } else {
    let last_index = children[children.length - 1].index;

    parent_index_split.push(
      `${toNumber(last_index.split(".").slice(-1).pop()) + 1}`
    );
  }

  return parent_index_split.join(".");
};

export const checkListFormItemsBuilder = (
  checkListFormItems: CheckListFormItem[],
  expandedKeys: any
) => {
  let result: any = [];

  let temp_expandedKeys = [...expandedKeys];

  const parentIterator = () => {
    checkListFormItems.forEach((item) => {
      if (item.parent_id === null) {
        let parent_key = item.id;
        let parent_index = item.is_numbered
          ? parentIndexGenerator(result)
          : null;

        temp_expandedKeys = [...temp_expandedKeys, parent_key];

        let temp: any = {
          ...item,
          key: parent_key,
          index: parent_index,
          children: [],
        };

        for (let i = 0; i < checkListFormItems.length; i++) {
          if (checkListFormItems[i].parent_id === item.id) {
            let child_key = checkListFormItems[i].id;

            temp_expandedKeys = [...temp_expandedKeys, child_key];

            temp.children.push({
              ...checkListFormItems[i],
              key: child_key,
              index: childIndexGenerator(parent_index, temp.children),
              children: [],
            });
          }
        }

        result.push(temp);
      }
    });
  };

  const childrenIterator = (children: any[]) => {
    children.forEach((child: any) => {
      for (let i = 0; i < checkListFormItems.length; i++) {
        if (child.id === checkListFormItems[i].parent_id) {
          let child_key = checkListFormItems[i].id;

          temp_expandedKeys = [...temp_expandedKeys, child_key];

          child.children.push({
            ...checkListFormItems[i],
            key: child_key,
            index: childIndexGenerator(child.index, child.children),
            children: [],
          });
        }
      }

      if (child.children.length > 0) childrenIterator(child.children);
    });
  };

  const removeId = (children: any[]) => {
    for (let i = 0; i < children.length; i++) {
      delete children[i].id;

      if (children[i].children.length > 0) removeId(children[i].children);
    }
  };

  parentIterator();

  result.forEach((parent: any) => {
    if (parent.children.length > 0) {
      childrenIterator(parent.children);
    }
  });

  removeId(result);

  return { data: result, expandedKeys: temp_expandedKeys };
};
