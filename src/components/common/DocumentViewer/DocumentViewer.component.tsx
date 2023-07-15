import { Button, Image } from "antd";
import React, { FC, useState } from "react";
import { connect } from "react-redux";
import { EyeOutlined } from "@ant-design/icons";
import { DocumentViewerPropType, getFileType } from "./DocumentViewer.util";
import { BASE_URI } from "../../../redux/ApiCall";
const DocumentViewerComponent: FC<DocumentViewerPropType> = ({
  document,
  disabled,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const Render = () => {
    if (
      getFileType(document.url)?.toLowerCase() === "png" ||
      getFileType(document.url)?.toLowerCase() === "jpg" ||
      getFileType(document.url)?.toLowerCase() === "jpeg"
    ) {
      return (
        <Image
          src={`${BASE_URI}/${document.url}`}
          style={{ display: "none" }}
          preview={{
            visible: isModalVisible,
            src: `${BASE_URI}/${document.url}`,
            onVisibleChange: (value) => {
              setIsModalVisible(value);
            },
          }}
        />
      );
    }
  };

  return (
    <>
      {getFileType(document.url)?.toLowerCase() === "png" ||
      getFileType(document.url)?.toLowerCase() === "jpg" ||
      getFileType(document.url)?.toLowerCase() === "jpeg" ||
      getFileType(document.url)?.toLowerCase() === "pdf" ? (
        <>
          <Button
            disabled={disabled ?? false}
            type="link"
            {...(getFileType(document.url)?.toLowerCase() === "pdf"
              ? { href: `${BASE_URI}/${document.url}` }
              : null)}
            target={"_blank"}
            icon={<EyeOutlined />}
            onClick={() => {
              setIsModalVisible(true);
            }}
          ></Button>
          {Render()}
        </>
      ) : null}
    </>
  );
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DocumentViewerComponent);
