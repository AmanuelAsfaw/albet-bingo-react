import React, { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchAllBoqs } from "../../../redux/Boq/Boq.action";
import { format, groupOption } from "../../../utilities/utilities";
import { ItemSelectPropType, parseBoq } from "./ItemSelector.util";
import { Boq } from "../../../redux/Boq/Boq.type";
import { Button, Form, Modal, Table, Tabs } from "antd";

const BoqModalComponent: FC<ItemSelectPropType> = ({
  data,
  item_no,
  project,
  setItemNo,
  boq,
  fetchBoq,
  sub_contract,
  type,
}) => {
  useEffect(() => {
    if (type === "variation")
      fetchBoq({ project_id: project.id, is_variation: true });
    else
      fetchBoq({
        project_id: type === "sub-contract" ? sub_contract : project.id,
      });
  }, [sub_contract, type, fetchBoq, project]);

  const [selected_item, setSelectedItem] = useState<Boq | null>(data);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const onSelect = (record: Boq) => {
    setSelectedItem(record);
    setItemNo(record.id);
    handleOk();
  };

  const column = [
    {
      title: "Item No",
      dataIndex: "item_no",
      width: "10%",
    },
    {
      title: "Description",
      dataIndex: "task_name",
      width: "40%",
    },
    {
      title: "Unit",
      dataIndex: "unit",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      render: (value: any, data: any) =>
        data.id && data.unit ? format(value) : null,
    },
    {
      title: "Unit Price",
      dataIndex: "unit_price",
      render: (value: any, data: any) =>
        data.id && data.unit ? format(value) : null,
    },
    {
      title: "Total",
      dataIndex: "total",
      render: (value: any, data: any) =>
        data.id && data.unit ? format(value) : null,
    },
    {
      title: "Action",

      render: (value: any, data: any) =>
        data.id && data.unit ? (
          <Button
            className="btn-outline-secondary"
            disabled={!data.unit}
            onClick={() => onSelect(data)}
          >
            Select Item
          </Button>
        ) : null,
    },
  ];
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const parseTab = (boq: Boq[]) => {
    const tab: any[] = [];
    groupOption(boq, "sheet_name").forEach((e, index) =>
      tab.push({
        title: e,
        content: parseBoq(
          boq,

          e
        ),
        key: index,
      })
    );
    return tab;
  };

  const [initialPanes, setInitPanes] = useState(parseTab(boq.payload));

  useEffect(() => {
    setInitPanes(parseTab(boq.payload));
  }, [boq.isPending]);

  return (
    <>
      <div className="">
        <Form layout="horizontal">
          <Form.Item label="Item">
            <Button style={{ width: "100%" }} onClick={showModal}>
              {selected_item?.item_no
                ? ` ${selected_item.item_no} `
                : "Select Item"}
            </Button>
          </Form.Item>
        </Form>
      </div>
      <Modal
        style={{ top: 10 }}
        title="Items"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[]}
        width={1300}
      >
        <div className="row">
          {type === "sub-contract" ? (
            <div className="col-md-12">
              <Table
                columns={column}
                dataSource={boq.payload}
                pagination={false}
                onRow={(record, rowIndex) => {
                  return {
                    onClick: (event) => (record.unit ? onSelect(record) : null), // click row
                  };
                }}
              />
            </div>
          ) : (
            <>
              <div className="col-md-12">
                <Tabs tabPosition="bottom">
                  {initialPanes.map((pane) => (
                    <Tabs.TabPane
                      tab={pane.title}
                      key={pane.key}
                      closable={pane.closable}
                    >
                      <Table
                        columns={column}
                        dataSource={pane.content}
                        pagination={false}
                        onRow={(record, rowIndex) => {
                          return {
                            onClick: (event) =>
                              record.unit ? onSelect(record) : null, // click row
                          };
                        }}
                      />
                    </Tabs.TabPane>
                  ))}
                </Tabs>
              </div>
            </>
          )}
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
