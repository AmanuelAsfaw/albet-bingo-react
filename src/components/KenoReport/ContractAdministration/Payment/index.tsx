import { Tabs } from "antd";
import { FC, Suspense, useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import LoadingIndicator from "../../../common/Loading"
import PaymentRequestComponent from "./PaymentRequest";
import PaymentsComponent from "./Payments";

const PaymentComponent: FC<{}> = () => {
  const [selected_tab, setSelectedTab] = useState("");
  const { menu, id, header, tab }: any = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    setSelectedTab(tab);
  }, [tab]);

  const onChange = (event: string) => {
    navigate({
      pathname: `/project/${id}/${header}/${menu}/${event
        .toLocaleLowerCase()
        .replaceAll(" ", "-")}`,
    });
  };
  return (
    <Tabs tabPosition="left" activeKey={selected_tab} onChange={onChange}>
      <Tabs.TabPane tab="Payment Request" key="payment-request">
        <Suspense fallback={<LoadingIndicator />}>
          <PaymentRequestComponent />
        </Suspense>
      </Tabs.TabPane>
      <Tabs.TabPane tab="Payments" key="payments">
        <Suspense fallback={<LoadingIndicator />}>
          <PaymentsComponent />
        </Suspense>
      </Tabs.TabPane>
    </Tabs>
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

export default connect(mapStateToProps, mapDispatchToProps)(PaymentComponent);
