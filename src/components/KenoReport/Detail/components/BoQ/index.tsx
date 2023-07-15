import { FC, useEffect, useState } from "react";
import { BoQPropType } from "./util/BoQ.util";
import "./util/BoQ.css";
import { format, groupOption } from "../../../../../utilities/utilities";

import { connect } from "react-redux";
import { fetchOneProjects } from "../../../../../redux/Project/Project.action";
import { Table, Tabs } from "antd";

import ImportBoQComponent from "./components/ImportBoq/ImportBoq.component";
import { Boq } from "../../../../../redux/Boq/Boq.type";

const BoQComponent: FC<BoQPropType> = ({ project }) => {
  const [initialPanes, setInitialPanes] = useState<any[]>([]);
  const parseTab = (boqs: Boq[]) => {
    const tab: any[] = [];
    groupOption(boqs, "sheet_name").forEach((sheet_name, index) =>
      tab.push({
        title: sheet_name,
        content: boqs.filter((e) => e.sheet_name === sheet_name),
        key: index,
      })
    );
    return tab;
  };

  useEffect(() => {
    setInitialPanes(parseTab(project.payload?.boqs));
  }, [project.payload]);

  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <ImportBoQComponent />
        </div>
      </div>
      <div className="row">
        <div className="col contract_boq">
          <Tabs tabPosition="top">
            {initialPanes.map((pane) => (
              <Tabs.TabPane
                tab={pane.title}
                key={pane.key}
                closable={pane.closable}
              >
                <Table
                  loading={project.isPending}
                  className="contract_boq"
                  columns={[
                    {
                      title: "Item No",
                      key: "item_no",
                      dataIndex: "item_no",
                      // render: (value, record) =>
                      //   record.item_no
                      //     ? isNaN(toNumber(record.item_no)) && record.item_no
                      //       ? record.item_no
                      //       : toNumber(record.item_no)?.toFixed(2)
                      //     : "",
                    },
                    {
                      title: "Description",
                      key: "description",
                      dataIndex: "description",
                    },
                    {
                      title: "Unit",
                      key: "unit",
                      dataIndex: "unit",
                    },
                    {
                      title: "Unit Price",
                      key: "unit_price",
                      dataIndex: "unit_price",
                      render: (value, record) =>
                        record.unit ? format(value) : "",
                    },
                    {
                      title: "Quantity",
                      key: "quantity",
                      dataIndex: "quantity",
                      render: (value, record) =>
                        record.unit ? format(value) : "",
                    },
                    {
                      title: "Amount",
                      key: "amount",
                      dataIndex: "amount",
                      render: (value, record) =>
                        record.unit
                          ? format(record.unit_price * record.quantity)
                          : "",
                    },
                  ]}
                  dataSource={pane.content}
                  pagination={false}
                />
              </Tabs.TabPane>
            ))}
          </Tabs>
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
const mapStateToProps = (state: any) => ({
  project: state.project.fetchOne,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchProject: (action: any) => dispatch(fetchOneProjects(action)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BoQComponent);
