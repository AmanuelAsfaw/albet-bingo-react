import Button from "antd/lib/button";
import Table from "antd/lib/table";
import Modal from "antd/lib/modal/Modal";
import React, { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Tabs } from "antd";
import { BoqModalPropType } from "../../util/BoqSelector.util";
import { Boq } from "../../../../../redux/Boq/Boq.type";
import { format, groupOption } from "../../../../../utilities/utilities";
import { parseBoq } from "../../../ItemSelector/ItemSelector.util";

const BoqModalComponent: FC<BoqModalPropType> = ({ boq, setBoq, project }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const onSelect = (record: Boq) => {
    setBoq(record);
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
  }, [project.isPending]);

  return (
    <>
      <div className="">
        <Button style={{ width: "100%" }} onClick={showModal}>
          {boq?.item_no ? ` ${boq.item_no} ` : "Select Item"}
        </Button>
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
