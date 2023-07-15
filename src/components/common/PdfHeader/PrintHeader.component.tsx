import { Image } from "antd";
import { FC } from "react";
import { connect } from "react-redux";
import Logo from "../../../Images/ovid-klingLogo.png";
const PrintHeaderComponent: FC<{
  docNo: string;
  pageNo: string;
  docName: string;
}> = ({ docName, pageNo, docNo }) => {
  return (
    <div className="row">
      <div className="col-md-2 border border-dark">
        <Image src={Logo} height={70} width="120px" preview={false} />
      </div>
      <div className="col-md-7 border border-dark py-2">
        <div className="d-flex justify-content-center">
          <h4>Ovid-Kling Consult Plc</h4>
        </div>
      </div>
      <div className="col-md-3 border border-dark">
        <h6 className="d-flex justify-content-center mt-4">Document No.</h6>
        <h5 className="d-flex justify-content-center">
          <b>OF/OKC/{docNo}</b>
        </h5>
      </div>
      <div className="col-md-9 d-flex justify-content-center border border-dark py-2">
        <h3>{docName}</h3>
      </div>
      <div className="col border border-dark">
        <h6 className="d-flex justify-content-center">Issue No:</h6>
        <h6 className="d-flex justify-content-center"></h6>
      </div>
      <div className="col border border-dark">
        <h6 className="d-flex justify-content-center">Page No:</h6>
        <h6 className="d-flex justify-content-center">{pageNo}</h6>
      </div>
    </div>
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
)(PrintHeaderComponent);
