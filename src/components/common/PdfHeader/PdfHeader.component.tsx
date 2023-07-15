import { Image } from "antd";
import { FC } from "react";
import { PdfHeaderPropType } from "./PdfHeader.util";
import Logo from "../../../Images/ovid-klingLogo.png";
const PdfHeaderComponent: FC<PdfHeaderPropType> = ({ type }) => {
  const Header = () => {
    switch (type) {
      case "client":
        return (
          <div className="row">
            <div className="col-md-5">
              <Image src={Logo} width="220px" preview={false} />
            </div>
            <div className="col-md-7">
              <h4>Ovid-Kling Consult</h4>
            </div>
          </div>
        );
      case "consultant":
        return (
          <div className="row px-2">
            <div className="col-md-12">
              <Image src={Logo} width="166px" preview={false} />
            </div>
          </div>
        );
      case "contractor":
        return (
          <div className="row">
            <div className="col-md-12">
              <Image src={Logo} width="220px" preview={false} />
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

export default PdfHeaderComponent;
