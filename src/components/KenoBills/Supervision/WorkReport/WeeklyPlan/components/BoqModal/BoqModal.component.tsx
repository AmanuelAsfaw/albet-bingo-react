import Button from "antd/lib/button";
import Table from "antd/lib/table";
import Modal from "antd/lib/modal/Modal";
import React, { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Checkbox, Tabs } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import {
  format,
  groupOption,
  parseUnit,
} from "../../../../../../../utilities/utilities";
import { Boq } from "../../../../../../../redux/Boq/Boq.type";
import { parseBoq } from "../../../../../../common/ItemSelector/ItemSelector.util";
import { BoqModalPropType } from "../../utils/WeeklyPlan.util";
import { WeeklyPlanItem } from "../../../../../../../redux/WeeklyPlan/WeeklyPlan.type";

const BoqModalComponent: FC<BoqModalPropType> = ({ dataAction, project }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRows, setSelectedRows] = useState<Boq[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [data, setData] = dataAction;
  const column = [
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
      title: "Quantity",
      dataIndex: "quantity",
      width: "10%",
      render: (value: any, data: any) =>
        data.id && data.unit ? format(value) : null,
    },
    {
      title: "Unit",
      dataIndex: "unit",
      width: "10%",
      render: (record: any, data: any, index: any) => parseUnit(record),
    },
    {
      title: "Unit Price",
      dataIndex: "unit_price",
      width: "10%",
      render: (value: any) => format(value),
    },
    {
      title: "Amount",
      dataIndex: "contract_amount",
      width: "10%",
      render: (value: any, data: any) =>
        data.id && data.unit ? format(value) : null,
    },
  ];

  const handleOk = () => {
    if (selectedRows) {
      let arr: WeeklyPlanItem[] = [];
      for (let i = 0; i < selectedRows.length; i++) {
        if (selectedRows[i]) {
          arr.push({
            key: Date.now() + arr.length,
            item_no: selectedRows[i].item_no,
            description: selectedRows[i].description,
            contract_amount:
              selectedRows[i].quantity * selectedRows[i].unit_price,
            week1: 0,
            week2: 0,
            week3: 0,
            week4: 0,
          });
        }
      }
      if (data.length === 1 && data[0].description === undefined) {
        setData(arr);
        handleCancel();
      } else {
        setData([...data, ...arr]);
        handleCancel();
      }
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedRows([]);
    setSelectedRowKeys([]);
  };

  const parseTab = (boq: Boq[]) => {
    const tab: any[] = [];
    groupOption(boq, "sheet_name").forEach((e, index) =>
      tab.push({
        title: e,
        content: parseBoq(boq, e),
        key: index,
      })
    );
    return tab;
  };

  const [initialPanes, setInitPanes] = useState(
    parseTab(project.payload?.boqs)
  );

  useEffect(() => {
    setInitPanes(parseTab(project.payload?.boqs));
  }, [project.isPending, project.payload?.boqs]);

  return (
    <>
      <div className="">
        <Button
          className="btn-outline-secondary"
          icon={<PlusOutlined />}
          onClick={() => setIsModalVisible(true)}
        >
          New Item
        </Button>
      </div>
      <Modal
        className="fixed-modal"
        centered
        title="Items"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button
            key="submit"
            type="primary"
            htmlType="submit"
            onClick={handleOk}
          >
            Ok
          </Button>,
        ]}
        width={1200}
      >
        <div>
          <>
            <div className="col-md-12">
              {initialPanes[0]?.content?.length > 0 && (
                <>
                  <Tabs tabPosition="bottom">
                    {initialPanes.map((pane) => (
                      <Tabs.TabPane
                        tab={pane.title}
                        key={pane.key}
                        closable={pane.closable}
                      >
                        <Table
                          rowSelection={{
                            onChange: (selectedRowKeys, selectedRows) => {
                              setSelectedRows(selectedRows);
                              setSelectedRowKeys(selectedRowKeys);
                            },
                            renderCell(value, record, index, originNode) {
                              let row = selectedRows;
                              let key = selectedRowKeys;

                              if (record.quantity * record.unit_price > 0)
                                return (
                                  <Checkbox
                                    onChange={(e) => {
                                      if (e.target.checked) {
                                        setSelectedRowKeys([...key, index]);
                                        setSelectedRows([...row, record]);
                                      } else {
                                        setSelectedRowKeys(
                                          key.filter((e) => e !== index)
                                        );
                                        setSelectedRows(
                                          row.filter(
                                            (e) => e.key !== record.key
                                          )
                                        );
                                      }
                                    }}
                                  />
                                );
                              else return null;
                            },
                          }}
                          columns={column}
                          dataSource={pane.content.map(
                            (i: any, index: number) => ({
                              key: index,
                              ...i,
                            })
                          )}
                          // pagination={true}
                        />
                      </Tabs.TabPane>
                    ))}
                  </Tabs>
                </>
              )}
            </div>
          </>
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
  project: state.project.fetchOne,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(BoqModalComponent);
