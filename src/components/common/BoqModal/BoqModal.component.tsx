import Button from "antd/lib/button";
import Table, { ColumnsType } from "antd/lib/table";

import Modal from "antd/lib/modal/Modal";
import React, { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchAllBoqs } from "../../../redux/Boq/Boq.action";
import { format, groupOption } from "../../../utilities/utilities";
import { BoqModalPropType } from "./BoqModal.util";
import { Tabs } from "antd";
import { ProjectTypes, SummaryTabs } from "../../../constants/Constants";
import { Boq } from "../../../redux/Boq/Boq.type";
import { toNumber } from "lodash";
const BoqModalComponent: FC<BoqModalPropType> = ({
  fetchBoq,
  boq,
  project_id,
  sub_contract,
  type,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const boq_column = [
    {
      title: "Item No",
      dataIndex: "item_no",
      width: "10%",
    },
    {
      title: "Description",
      dataIndex: "description",
      width: "40%",
    },
    {
      title: "Unit",
      dataIndex: "unit",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      render: (value: any) => format(value),
    },
    {
      title: "Unit Price",
      dataIndex: "unit_price",
      render: (value: any) => format(value),
    },
    {
      title: "Total",
      dataIndex: "total",
      render: (value: any) => format(value),
    },
  ];

  const sub_contract_column: ColumnsType<Boq> = [
    {
      title: "Item No",
      dataIndex: "item_no",
      width: "10%",
    },
    {
      title: "Description",
      dataIndex: "description",
      width: "30%",
    },
    {
      title: "Unit",
      dataIndex: "unit",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      render: (value: any) => format(value),
    },
    {
      title: "Unit Price",
      dataIndex: "unit_price",
      render: (value: any) => format(value),
    },
    {
      title: "Amount",
      dataIndex: "total",
      render: (value: any) => format(value),
    },
    {
      title: "Performed Quantity",
      dataIndex: "total",
      render: (value, record) =>
        format(record.current_quantity + record.previous_quantity),
    },

    {
      title: "Performed Amount",
      render: (value, record) =>
        format(
          (record.current_quantity + record.previous_quantity) *
            record.unit_price
        ),
    },
  ];

  const executive_column = [
    {
      title: "No",
      dataIndex: "no",
      width: "4%",
    },
    {
      title: "Description",
      dataIndex: "description",
      width: "40%",
    },
    {
      title: "Contract Amount",
      dataIndex: "total",
      render: (value: any, data: any) => (data.no ? format(value) : null),
    },
    {
      title: "Previously Executed",
      dataIndex: "previous",
      render: (value: any, data: any) => (data.no ? format(value) : null),
    },
    {
      title: "Current Executed",
      dataIndex: "current",
      render: (value: any, data: any) => (data.no ? format(value) : null),
    },
    {
      title: "To date Executed",
      render: (value: any, data: any) =>
        data.no ? format(data.previous + data.current) : null,
    },
  ];

  const measurement_column = [
    {
      title: "Item No",
      dataIndex: "item_no",
      key: "item_no",
    },
    {
      title: "Description",
      dataIndex: "task_name",
      key: "task_name",
    },
    {
      title: "Unit",
      dataIndex: "unit",
      key: "unit",
    },
    {
      title: "Unit Price",
      dataIndex: "unit_price",
      key: "unit_price",
      render: (value: any, data: any) => (data.id ? format(value) : null),
    },
    {
      title: "Contract",
      children: [
        {
          title: "Quantity",
          dataIndex: "quantity",
          key: "quantity",
          render: (value: any, data: any) => (data.id ? format(value) : null),
        },
        {
          title: "Amount",
          dataIndex: "total",
          key: "total",
          render: (value: any, data: any) => (data.id ? format(value) : null),
        },
      ],
    },
    {
      title: "Previous",
      children: [
        {
          title: "Quantity",
          dataIndex: "previous_quantity",
          key: "previous_quantity",
          render: (value: any, data: any) => (data.id ? format(value) : null),
        },
        {
          title: "Amount",
          dataIndex: "previous_quantity",
          key: "previous_total",
          render: (value: any, data: any) =>
            data.id ? format(value * data.unit_price) : null,
        },
      ],
    },
    {
      title: "Current",
      children: [
        {
          title: "Quantity",
          dataIndex: "current_quantity",
          key: "current_quantity",
          render: (value: any, data: any) => (data.id ? format(value) : null),
        },
        {
          title: "Amount",
          dataIndex: "current_quantity",
          key: "current_quantity",
          render: (value: any, data: any) =>
            data.id ? format(value * data.unit_price) : null,
        },
      ],
    },
    {
      title: "Total",
      children: [
        {
          title: "Quantity",

          key: "performed_total",
          render: (value: any, data: Boq) =>
            data.id
              ? format(
                  toNumber(data.current_quantity) +
                    toNumber(data.previous_quantity)
                )
              : null,
        },
        {
          title: "Amount",
          key: "performed_total",
          render: (value: any, data: Boq) =>
            data.id
              ? format(
                  toNumber(data.current_quantity * data.unit_price) +
                    toNumber(data.previous_quantity * data.unit_price)
                )
              : null,
        },
      ],
    },
  ];

  const parseTab = (boq: Boq[]) => {
    const tab: any[] = [];
    groupOption(boq, "sheet_name").forEach((e, index) =>
      tab.push({
        title: e,
        content: boq.filter((b) => b.sheet_name === e),
        key: index,
      })
    );
    return tab;
  };

  const parseMeasurementTab = (boqs: Boq[]) => {
    const tab: any[] = [];
    groupOption(boqs, "sheet_name").forEach((e, index) =>
      tab.push({
        title: e,
        content: boq.payload,
        key: index,
      })
    );
    return tab;
  };

  const initialPanes = parseTab(boq.payload);
  const measurementInitialPanes = parseMeasurementTab(boq.payload);
  useEffect(() => {
    if (isModalVisible) {
      fetchBoq({
        project_id: type === "sub-contract" ? sub_contract : project_id,
      });
    }
  }, [isModalVisible, project_id, fetchBoq, sub_contract, type]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button type="link" onClick={showModal}>
        Summary
      </Button>

      <Modal
        style={{ top: 10 }}
        title="Summary"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[]}
        width={1300}
      >
        {type === "sub-contract" ? (
          <Table
            loading={boq.isPending}
            columns={sub_contract_column}
            dataSource={boq.payload}
            pagination={false}
          />
        ) : (
          <Tabs type="card">
            <Tabs.TabPane tab={SummaryTabs.GRAND_SUMMARY} key="1">
              <Table
                pagination={false}
                columns={executive_column}
                loading={boq.isPending}
                dataSource={boq.payload}
              />
            </Tabs.TabPane>
            <Tabs.TabPane tab={SummaryTabs.BOQ} key="2">
              <Tabs tabPosition="bottom">
                {initialPanes.map((pane) => (
                  <Tabs.TabPane
                    tab={pane.title}
                    key={pane.key}
                    closable={pane.closable}
                  >
                    <Table
                      loading={boq.isPending}
                      columns={boq_column}
                      dataSource={pane.content}
                      pagination={false}
                    />
                  </Tabs.TabPane>
                ))}
              </Tabs>
            </Tabs.TabPane>
            <Tabs.TabPane tab={SummaryTabs.MEASUREMENT_CERTIFICATE} key="3">
              <div className="row">
                <div className="col-md-12">
                  <Tabs tabPosition="bottom">
                    {measurementInitialPanes.map((pane) => (
                      <Tabs.TabPane
                        tab={pane.title}
                        key={pane.key}
                        closable={pane.closable}
                      >
                        <Table
                          loading={boq.isPending}
                          columns={measurement_column}
                          dataSource={pane.content}
                          pagination={false}
                          summary={(pageData) => {
                            let contract_amount = 0;
                            let current_amount = 0;
                            let previous_amount = 0;

                            pageData.forEach((data) => {
                              contract_amount += data.total ? data.total : 0;
                              current_amount += data.current_quantity
                                ? data.current_quantity * data.unit_price
                                : 0;
                              previous_amount += data.previous_quantity
                                ? data.previous_quantity * data.unit_price
                                : 0;
                            });

                            return (
                              <Table.Summary.Row>
                                <Table.Summary.Cell
                                  index={1}
                                ></Table.Summary.Cell>
                                <Table.Summary.Cell index={2}>
                                  Total
                                </Table.Summary.Cell>
                                <Table.Summary.Cell
                                  index={3}
                                ></Table.Summary.Cell>
                                <Table.Summary.Cell
                                  index={4}
                                ></Table.Summary.Cell>
                                <Table.Summary.Cell
                                  index={5}
                                ></Table.Summary.Cell>
                                <Table.Summary.Cell index={6}>
                                  {format(contract_amount)}
                                </Table.Summary.Cell>
                                <Table.Summary.Cell
                                  index={7}
                                ></Table.Summary.Cell>
                                <Table.Summary.Cell index={8}>
                                  {format(previous_amount)}
                                </Table.Summary.Cell>
                                <Table.Summary.Cell
                                  index={9}
                                ></Table.Summary.Cell>
                                <Table.Summary.Cell index={10}>
                                  {format(current_amount)}
                                </Table.Summary.Cell>
                                <Table.Summary.Cell
                                  index={11}
                                ></Table.Summary.Cell>
                                <Table.Summary.Cell index={12}>
                                  {format(current_amount + previous_amount)}
                                </Table.Summary.Cell>
                              </Table.Summary.Row>
                            );
                          }}
                        />
                      </Tabs.TabPane>
                    ))}
                  </Tabs>
                </div>
              </div>
            </Tabs.TabPane>
          </Tabs>
        )}
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
  boq: state.boq.fetchAll,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchBoq: (action: any) => dispatch(fetchAllBoqs(action)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BoqModalComponent);
