import { Button, Modal, Statistic, Table } from "antd";
import { FC, useState } from "react";
import { connect } from "react-redux";
import { EyeOutlined } from "@ant-design/icons";
import { ViewWeeklyPlanPropType } from "../../utils/WeeklyPlan.util";
import moment from "moment";
import { format } from "../../../../../../../utilities/utilities";
const ViewWeeklyPlanComponent: FC<ViewWeeklyPlanPropType> = ({
  weekly_plan,
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
        title="Weekly Plan"
        visible={isModalVisible}
        onCancel={handleOk}
        width={1300}
        footer={[<></>]}
      >
        <div className="row">
          <div className="col-md-4">
            <Statistic
              title="Date"
              value={moment(weekly_plan.date).format("YYYY-MM-DD")}
              valueStyle={{ fontSize: 16, fontFamily: "Campton-Medium" }}
            />
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-md-12">
            <Table
              columns={[
                {
                  title: "Item No",
                  key: "item_no",
                  dataIndex: "item_no",
                },
                {
                  title: "Description",
                  key: "description",
                  width: "50%",
                  dataIndex: "description",
                },
                {
                  title: "Contract Amount",
                  key: "contract_amount",
                  render: (value, record) => format(record.contract_amount),
                },
                {
                  title: "Week 1",
                  key: "week1",
                  render: (value, record) => format(record.week1),
                },
                {
                  title: "Week 2",
                  key: "week2",
                  render: (value, record) => format(record.week2),
                },
                {
                  title: "Week 3",
                  key: "week3",
                  render: (value, record) => format(record.week3),
                },
                {
                  title: "Week 4",
                  key: "week4",
                  render: (value, record) => format(record.week4),
                },
                {
                  title: "Total",
                  key: "Total",
                  render: (value, record) =>
                    format(
                      record.week1 + record.week2 + record.week3 + record.week4
                    ),
                },
              ]}
              dataSource={weekly_plan.weekly_plan_items}
              summary={(data) => {
                let total_contract_amount = 0;
                let total_week1 = 0;
                let total_week2 = 0;
                let total_week3 = 0;
                let total_week4 = 0;

                data.forEach((e) => {
                  total_contract_amount =
                    e.contract_amount + total_contract_amount;
                  total_week1 = total_week1 + e.week1;
                  total_week2 = total_week2 + e.week2;
                  total_week3 = total_week3 + e.week3;
                  total_week4 = total_week4 + e.week4;
                });

                return (
                  <>
                    <Table.Summary.Row>
                      <Table.Summary.Cell index={0} colSpan={2} align="center">
                        Grand Total
                      </Table.Summary.Cell>
                      <Table.Summary.Cell index={1}>
                        {format(total_contract_amount)}
                      </Table.Summary.Cell>
                      <Table.Summary.Cell index={2}>
                        {format(total_week1)}
                      </Table.Summary.Cell>
                      <Table.Summary.Cell index={3}>
                        {format(total_week2)}
                      </Table.Summary.Cell>
                      <Table.Summary.Cell index={4}>
                        {format(total_week3)}
                      </Table.Summary.Cell>
                      <Table.Summary.Cell index={5}>
                        {format(total_week4)}
                      </Table.Summary.Cell>
                      <Table.Summary.Cell index={5}>
                        {format(
                          total_week4 + total_week3 + total_week2 + total_week1
                        )}
                      </Table.Summary.Cell>
                    </Table.Summary.Row>
                  </>
                );
              }}
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
)(ViewWeeklyPlanComponent);
