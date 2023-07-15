import { Image } from "antd";
import { FC } from "react";
import { MemoHeaderPropType } from "./MemoHeader.util";
import Logo from "../../../Images/ovid-klingLogo.png";
const MemoHeaderComponent: FC<MemoHeaderPropType> = ({ type }) => {
  const Header = () => {
    switch (type) {
      case "client":
        return (
          <div className="row">
            <div className="col-md-5">
              <Image src={Logo} width="120px" preview={false} />
            </div>
            <div className="col-md-7">
              <h5>Project Memo</h5>
            </div>
          </div>
        );
      case "consultant":
        return (
          <div className="row">
            <div className="col-md-5">
              <Image src={Logo} width="78px" preview={false} />
            </div>
            <div className="col-md-7">
              <h5>Project Memo</h5>
            </div>
          </div>
        );
      case "contractor":
        return (
          <div className="row">
            <div className="col-md-5">
              <Image src={Logo} width="78px" preview={false} />
            </div>
            <div className="col-md-7">
              <h5>Project Memo</h5>
            </div>
          </div>
        );

      default:
        return (
          <div className="row">
            <div className="col-md-5">
              <Image src={Logo} width="78px" preview={false} />
            </div>
            <div className="col-md-7">
              <h5>Project Memo</h5>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="mb-2">
      <Header />
    </div>
  );
};

export default MemoHeaderComponent;
