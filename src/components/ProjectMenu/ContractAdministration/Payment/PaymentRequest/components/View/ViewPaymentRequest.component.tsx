import { Button, Statistic, Modal } from "antd";
import { FC, useState } from "react";
import { connect } from "react-redux";
import { EyeOutlined } from "@ant-design/icons";
import { ViewPaymentRequestPropType } from "../../util/PaymentRequest.util";
import { format } from "../../../../../../../utilities/utilities";
import { toNumber } from "lodash";
const ViewPaymentRequestComponent: FC<ViewPaymentRequestPropType> = ({
  payment_request,
  users,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleOk = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button type="text" onClick={() => setIsModalVisible(true)}>
        View
      </Button>
      <Modal
        className="fixed-modal"
        centered
        title="Payment-Request"
        visible={isModalVisible}
        onCancel={handleOk}
        footer={[<></>]}
      >
        <div className="row">
          <div className="col-md-6">
            <Statistic
              title="Date"
              value={payment_request?.date}
              valueStyle={{ fontSize: 16, fontFamily: "Campton-Medium" }}
            />
          </div>
          <div className="col-md-6">
            <Statistic
              title="Reference No"
              value={payment_request?.reference_no}
              valueStyle={{ fontSize: 16, fontFamily: "Campton-Medium" }}
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-6">
            <Statistic
              title="Date"
              value={payment_request?.name}
              valueStyle={{ fontSize: 16, fontFamily: "Campton-Medium" }}
            />
          </div>
          <div className="col-md-6">
            <Statistic
              title="Date"
              value={payment_request.type}
              valueStyle={{ fontSize: 16, fontFamily: "Campton-Medium" }}
            />
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-md-6">
            <Statistic
              title="Uploaded By"
              value={
                users.payload.find((e) => e.id === payment_request.uploaded_by)
                  ?.full_name
              }
              valueStyle={{ fontSize: 16, fontFamily: "Campton-Medium" }}
            />
          </div>
          <div className="col-md-6">
            <Statistic
              title="Payment Amount"
              value={format(payment_request.payment_amount)}
              valueStyle={{ fontSize: 16, fontFamily: "Campton-Medium" }}
            />
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-md-6">
            <Statistic
              title="Reviewed By"
              value={
                users.payload.find(
                  (e) => e.id === toNumber(payment_request.reviewed_by)
                )?.full_name
              }
              valueStyle={{ fontSize: 16, fontFamily: "Campton-Medium" }}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

/**
 * Map State to Props
 *
 * @param state
 */
const mapStateToProps = (state: any) => ({
  users: state.user.fetchAll,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewPaymentRequestComponent);
