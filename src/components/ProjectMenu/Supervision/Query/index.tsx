import Table, { ColumnsType } from "antd/lib/table";
import { FC, useEffect } from "react";
import { connect } from "react-redux";
import { fetchAllQuery } from "../../../../redux/Query/Query.action";
import { Query } from "../../../../redux/Query/Query.type";
import { fetchAllUser, fetchOneUser } from "../../../../redux/User/User.action";
import { QueryPropType } from "./util/Query.util";
import moment from "moment";
import { getUserData, zeroPad } from "../../../../utilities/utilities";
import StatusComponent from "./components/Status/Status.component";
import AddQueryComponent from "./components/AddQuery/AddQuery.component";
import DetailComponent from "./components/DetailQuery/Detail.component";
import ReloadButtonComponent from "../../../common/ReloadButton/ReloadButton.component";

const QueryComponent: FC<QueryPropType> = ({
  fetchQuery,
  project,
  fetchUsers,
  fetchUser,
  query,
}) => {
  useEffect(() => {
    fetchQuery({ project_id: project.payload?.id });
    fetchUsers();
    fetchUser(getUserData().id);
  }, [fetchQuery, project, fetchUsers, fetchUser]);

  const column: ColumnsType<Query> = [
    {
      title: "Request No",
      render: (value, record) => zeroPad(record.id),
      sortDirections: ["descend", "ascend"],
      sorter: (a, b) => a.id - b.id,
    },

    {
      title: "Date",
      render: (value, record) => moment(record.date).format("DD/MM/YYYY"),
    },

    {
      title: "Status",
      render: (value, record) => <StatusComponent query={record} />,
    },
    {
      title: "Detail",
      render: (value, record) => (
        <DetailComponent id={record.id} record={record} />
      ),
    },
  ];

  return (
    <div className="row">
      <div className="col-md-12 mb-2">
        <ReloadButtonComponent
          onClick={() => fetchQuery({ project_id: project.payload?.id })}
        />
        <AddQueryComponent />
      </div>
      <div className="col-md-12">
        <Table
          columns={column}
          dataSource={query.payload}
          loading={query.isPending}
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
  query: state.query.fetchAll,
  user: state.user.fetchAll,
  project: state.project.fetchAll,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchUsers: (action: any) => dispatch(fetchAllUser(action)),
  fetchUser: (action: any) => dispatch(fetchOneUser(action)),
  fetchQuery: (action: any) => dispatch(fetchAllQuery(action)),
});

export default connect(mapStateToProps, mapDispatchToProps)(QueryComponent);
