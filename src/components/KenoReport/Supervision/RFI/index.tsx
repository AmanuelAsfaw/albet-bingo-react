import { FC, useEffect, useState } from "react";
import { RFIPropType } from "./util/RFI.util";
import { Table, Tag, Button } from "antd";
import { ColumnsType } from "antd/lib/table";
import moment from "moment";
import AddRFIComponent from "./Components/AddRFI/AddRFI.component";
import { fetchAllUser, fetchOneUser } from "../../../../redux/User/User.action";
import { connect } from "react-redux";
import { getUserData } from "../../../../utilities/utilities";
import { fetchAllRFIs } from "../../../../redux/RFI/RFI.action";
import { RFI } from "../../../../redux/RFI/RFI.type";
import { RFIStatus } from "../../../../constants/Constants";
import { PrinterOutlined } from "@ant-design/icons";
import ViewRFIComponent from "./Components/ViewRFI/ViewRfi.component";
import PrintRFIComponent from "./Components/PrintRFI/PrintRFI.component";

const RFIComponent: FC<RFIPropType> = ({
  project,
  rfi,
  fetchUsers,
  fetchUser,
  fetchRFIs,
}) => {
  const [selected, setSelected] = useState<any>();

  useEffect(() => {
    if (selected) window.print();
  }, [selected]);

  useEffect(() => {
    fetchRFIs({ project_id: project?.payload?.id });
    fetchUsers();
    fetchUser(getUserData().id);
  }, []);

  const renderTag = (data: RFI) => {
    if (data?.rfiResponse?.id) return <Tag color="green">Answered</Tag>;
    return <Tag color="orange">Pending</Tag>;
  };

  const column: ColumnsType<RFI> = [
    {
      title: "RFI NO",
      dataIndex: "rfi_number",
    },
    {
      title: "Date",
      render: (value, record) => moment(record.createdAt).format("DD/MM/YYYY"),
    },
    {
      title: "From",
      render: (value, record) => record.rfi_prepared_by?.full_name,
    },
    {
      title: "To",
      render: (value, record) => record.rfi_responder_by?.full_name,
    },
    {
      title: "Status",
      render: (value, record: RFI) => renderTag(record),
    },
    {
      title: "Action",
      render: (value, record) => (
        <div className="row">
          <ViewRFIComponent rfi={record} fetchRFI={() => fetchRFIs()} />
          <Button
            className="btn-outline-secondary ml-1"
            icon={<PrinterOutlined />}
            onClick={() => {
              setSelected(record);
            }}
          >
            Print
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="row">
      <div className="col-md-12 mb-2">
        <AddRFIComponent fetchRFI={() => fetchRFIs()} rfi={rfi} />
      </div>
      <div className="col-md-12 hidden-print">
        <Table
          columns={column}
          dataSource={rfi.payload}
          loading={rfi.isPending}
        />
      </div>
      <PrintRFIComponent selected={selected} />
    </div>
  );
};

/**
 * Map State to Props
 *
 * @param state
 */
const mapStateToProps = (state: any) => ({
  rfi: state.rfi.fetchAll,
  project: state.project.fetchOne,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchUser: (action: any) => dispatch(fetchOneUser(action)),
  fetchUsers: (action: any) => dispatch(fetchAllUser(action)),
  fetchRFIs: (action: any) => dispatch(fetchAllRFIs(action)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RFIComponent);
