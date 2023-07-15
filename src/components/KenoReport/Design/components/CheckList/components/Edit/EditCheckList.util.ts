import axios from "axios";
import { isNil, toNumber } from "lodash";
import { API_BASE_URI } from "../../../../../../../redux/ApiCall";
import { CheckListItem } from "../../../../../../../redux/CheckList/CheckList.type";
import { CheckList } from "../../../../../../../redux/CheckList/CheckList.type";
import { User } from "../../../../../../../redux/User/User.type";
import { ApiCallState } from "../../../../../../../redux/Utils";

export type EditCheckListPropType = {
  data: CheckList;
  module: string;
  fetchData: Function;
  users: ApiCallState<User[]>;
  fetchAllUser: Function;
};

export const sendData = (data: any) =>
  axios.post(API_BASE_URI + "/checklist", data);

export const checkListFormItemObject = (
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
    children: [],
  };
};

const bubbleSort = (arr: CheckListItem[]) => {
  //Outer pass
  for (let i = 0; i < arr.length; i++) {
    //Inner pass
    for (let j = 0; j < arr.length - i - 1; j++) {
      //Value comparison using ascending order

      if (arr[j + 1].id < arr[j].id) {
        //Swapping
        [arr[j + 1], arr[j]] = [arr[j], arr[j + 1]];
      }
    }
  }
  return arr;
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

export const checkListItemsBuilder = (
  checkListItems: CheckListItem[],
  expandedKeys: any[]
) => {
  let result: any = [];

  let temp_expandedKeys = [...expandedKeys];

  let sortedCheckListItems = bubbleSort(checkListItems);

  const parentIterator = () => {
    sortedCheckListItems.forEach((item) => {
      if (item.parent_id === null) {
        let parent_key = item.id;
        let parent_index = item.is_numbered
          ? parentIndexGenerator(result)
          : null;

        temp_expandedKeys = [...temp_expandedKeys, parent_key];

        let temp: any = {
          ...item,
          key: parent_key,
          parent_index: null,
          index: parent_index,
          children: [],
        };

        for (let i = 0; i < sortedCheckListItems.length; i++) {
          if (sortedCheckListItems[i].parent_id === item.id) {
            let child_key = sortedCheckListItems[i].id;

            temp_expandedKeys = [...temp_expandedKeys, child_key];

            temp.children.push({
              ...sortedCheckListItems[i],
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
      for (let i = 0; i < sortedCheckListItems.length; i++) {
        if (child.id === sortedCheckListItems[i].parent_id) {
          let child_key = sortedCheckListItems[i].id;

          temp_expandedKeys = [...temp_expandedKeys, child_key];

          child.children.push({
            ...sortedCheckListItems[i],
            key: child_key,
            index: childIndexGenerator(child.index, child.children),
            children: [],
          });
        }
      }

      if (child.children.length > 0) childrenIterator(child.children);
    });
  };

  parentIterator();

  result.forEach((parent: any) => {
    if (parent.children.length > 0) {
      childrenIterator(parent.children);
    }
  });

  return { data: result, expandedKeys: temp_expandedKeys };
};
