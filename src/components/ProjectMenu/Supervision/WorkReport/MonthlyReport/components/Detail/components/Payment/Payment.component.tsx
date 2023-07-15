import { Table, Tag } from "antd";
import { FC } from "react";
import { connect } from "react-redux";
import { format } from "../../../../../../../../../utilities/utilities";
import { MonthlyDetailItemsPropType } from "../../../../util/MonthlyReport.util";

const PaymentComponent: FC<MonthlyDetailItemsPropType> = ({ data }) => {
  const RenderStatus = (value: number) => {
    if (value > 0 && value <= 50) {
      return <Tag color={"red"}>{format(value)}</Tag>;
    } else if (value > 50 && value <= 75) {
      return <Tag color={"yellow"}>{format(value)}</Tag>;
    } else if (value > 75 && value <= 100) {
      return <Tag color={"green"}>{format(value)}</Tag>;
    }
  };

  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <Table
            showHeader={false}
            columns={[
              {
                dataIndex: "description",
                key: "0",
              },
              {
                dataIndex: "amount",
                key: 1,
                render: (value) => format(value),
              },
            ]}
            dataSource={[
              {
                description: "Total Advance Taken",
                amount: data.payment?.total_advance,
              },
              {
                description: "Payment Certificate This Month",
                amount: data.payment?.payment_this_month,
              },
              {
                description: "Payment Certified to Date",
                amount: data.payment?.payment_to_date,
              },
              {
                description: "Advance Repaid to Date",
                amount: data.payment?.advance_repayment,
              },
            ]}
            pagination={false}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <Table
            pagination={false}
            columns={[
              {
                title: "DESCRIPTION",
                key: "0",
                dataIndex: "description",
              },
              {
                title: "THIS MONTH",
                children: [
                  {
                    title: "PLANNED",
                    key: "1",
                    dataIndex: "planned_amount",
                    render: (value) => format(value),
                  },
                  {
                    title: "EXECUTED",
                    key: "2",
                    dataIndex: "executed_amount",
                    render: (value) => format(value),
                  },
                  {
                    title: "%",
                    key: "3",
                    render: (value, record) =>
                      RenderStatus(
                        (record.executed_amount / record.planned_amount) * 100
                      ),
                  },
                ],
              },
            ]}
            dataSource={[
              {
                description:
                  "SUMMARIZED REVIEW OF PLAN & ACCOMPLISHMENT WITH RESPECT TO THE CONTRACT AMOUNT",
                planned_amount: data.planned_amount,
                executed_amount: data.executed_amount,
              },
            ]}
          />
        </div>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(PaymentComponent);
