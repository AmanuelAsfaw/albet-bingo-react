import { Button } from "antd";
import Table, { ColumnType } from "antd/lib/table";
import { FC, useEffect, useState, useRef } from "react";
import { SHEPropType } from "./util/she.util";
import AddSHEComponent from "./components/AddSHE/AddSHE.component";
import { connect } from "react-redux";
import { fetchAllSHEs } from "../../../../../redux/SHE/SHE.action";
import ViewSHEComponent from "./components/ViewSHE/ViewSHE.component";
import PrintSHEComponent from "./components/PrintSHE/PrintSHE.component";
import { PrinterOutlined } from "@ant-design/icons";
import ReactToPrint from "react-to-print";

const SHEComponent: FC<SHEPropType> = ({
  project,

  she,
  fetchStaff,
  fetchLabour,
  fetchSHE,
}) => {
  // const componentRef = useRef(null);
  // const [selected, setSelected] = useState();

  // useEffect(() => {
  //   if (selected) window.print();
  // }, [selected]);

  useEffect(() => {
    fetchStaff();
    fetchLabour();
    fetchSHE({ project_id: project?.payload.id });
  }, []);

  const column: any = [
    {
      title: "Report NO",
      render: (record: any, data: any, index: any) => index + 1,
    },
    {
      title: "Report Date",
      dataIndex: "createdAt",
      render: (record: any, data: any, index: any) => data?.createdAt,
    },
    {
      title: "View",
      render: (record: any, data: any, index: any) => (
        <ViewSHEComponent she={data} />
      ),
    },
    {
      title: "",
      render: (record: any, data: any, index: any) => (
        <>
          <PrintSHEComponent she={data} />
        </>
      ),
    },
  ];

  return (
    <div className="row">
      <div className="col-md-12 mb-2">
        <AddSHEComponent />
      </div>
      <div className="col-md-12 hidden-print">
        <Table
          dataSource={she?.payload}
          columns={column}
          loading={she.isPending}
        />
      </div>
    </div>
  );
};

/**
 * Map State to Props
 *
 * @param state
 */
const mapStateToProps = (state: any) => ({
  she: state.she.fetchAll,
  project: state.project.fetchOne,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchSHE: (action: any) => dispatch(fetchAllSHEs(action)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SHEComponent);
