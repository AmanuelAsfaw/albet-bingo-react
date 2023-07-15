import { last } from "lodash";
export type DocumentViewerPropType = {
  document: { url: string };
  disabled?:boolean;
};

export const getFileType = (url: string) => {
  if (url) {
    const split = url.split(".");
    return last(split);
  } else return "";
};
