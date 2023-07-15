import moment from "moment";
import { FC, useEffect } from "react";
import { connect } from "react-redux";
import { getCompany } from "../../../../../../utilities/utilities";
import { PrintPropType } from "../../util/Memo.util";

import MemoHeaderComponent from "../../../../../common/MemoHeader/MemoHeader.component";
import { Input } from "antd";

const PrintComponent: FC<PrintPropType> = ({
  visibilityAction,
  project,
  dataAction,
}) => {
  const [memo, setData] = dataAction;
  const [is_visible, setVisibility] = visibilityAction;

  window.onafterprint = () => {
    setVisibility(false);
    setData(null);
  };
  useEffect(() => {
    if (memo && is_visible) window.print();
  }, [memo, is_visible]);

  return (
    <div className="visible-print">
      <MemoHeaderComponent type={memo?.memo_from?.access_type} />
      <div className="row justify-content-end">
        <div className="col-md-4">
          <h6>
            <b>Ref No:- </b>
            <u>{memo?.reference_number}</u>
          </h6>
        </div>
      </div>
      <div className="row justify-content-end">
        <div className="col-md-4">
          <h6>
            <b>Date:- </b>
            <u>{moment(memo?.date).format("DD/MM/YYYY")}</u>
          </h6>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <h6>
            <b>To:- </b>
            <b className="text-uppercase">
              {memo?.memo_to?.full_name +
                " (" +
                getCompany(memo?.memo_to?.access_type, project?.payload) +
                ")"}
            </b>
          </h6>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-lg-8">
          <h6>
            <b>Subject:- </b>
            <b className="text-uppercase">
              <u>{memo?.subject}</u>
            </b>
          </h6>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <pre style={{ border: "0px" }}>
            {memo?.message?.replaceAll("*---*", "\n")}
          </pre>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-md-12">
          <h6>Yours sincerely,</h6>
          <h6>{memo?.memo_from?.full_name}</h6>
          <h6>{memo?.memo_from?.role}</h6>
        </div>
      </div>
    </div>
  );
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

export default connect(mapStateToProps, mapDispatchToProps)(PrintComponent);
