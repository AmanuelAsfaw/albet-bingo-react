import { Button, Statistic, Modal } from "antd";
import { FC, useState } from "react";
import { connect } from "react-redux";
import { ViewPaymentsPropType } from "../../util/Payments.util";
import { format } from "../../../../../../../utilities/utilities";
const ViewPaymentComponent: FC<ViewPaymentsPropType> = ({ payment, users }) => {
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
        title="Payments"
        visible={isModalVisible}
        onCancel={handleOk}
        footer={[<></>]}
      >
        <div className="row">
          <div className="col-md-6">
            <Statistic
              title="Date"
              value={payment?.date}
              valueStyle={{ fontSize: 16, fontFamily: "Campton-Medium" }}
            />
          </div>
          <div className="col-md-6">
            <Statistic
              title="Reference No"
              value={payment?.reference_no}
              valueStyle={{ fontSize: 16, fontFamily: "Campton-Medium" }}
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-6">
            <Statistic
              title="Date"
              value={payment?.name}
              valueStyle={{ fontSize: 16, fontFamily: "Campton-Medium" }}
            />
          </div>
          <div className="col-md-6">
            <Statistic
              title="Date"
              value={payment.type}
              valueStyle={{ fontSize: 16, fontFamily: "Campton-Medium" }}
            />
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-md-6">
            <Statistic
              title="Payment Amount"
              value={format(payment.payment_amount)}
              valueStyle={{ fontSize: 16, fontFamily: "Campton-Medium" }}
            />
          </div>
          <div className="col-md-6">
            <Statistic
              title="Advance Repaid Amount"
              value={format(payment.advance_repaid_amount)}
              valueStyle={{ fontSize: 16, fontFamily: "Campton-Medium" }}
            />
          </div>
          <div className="col-md-6">
            <Statistic
              title="Retention Amount"
              value={format(payment.retention_amount)}
              valueStyle={{ fontSize: 16, fontFamily: "Campton-Medium" }}
            />
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-md-6">
            <Statistic
              title="Uploaded By"
              value={
                users.payload.find((e) => e.id === payment.uploaded_by)
                  ?.full_name
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
)(ViewPaymentComponent);
