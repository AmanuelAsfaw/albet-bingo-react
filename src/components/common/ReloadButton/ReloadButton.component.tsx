import { Button } from "antd";
import { FC } from "react";
import { ReloadButtonPropType } from "./ReloadButton.util";
import { ReloadOutlined } from "@ant-design/icons";
const ReloadButtonComponent: FC<ReloadButtonPropType> = ({ onClick }) => {
  return (
    <>
      <Button
        className="btn-outline-secondary float-right"
        icon={<ReloadOutlined />}
        onClick={onClick}
      />
    </>
  );
};

export default ReloadButtonComponent;
