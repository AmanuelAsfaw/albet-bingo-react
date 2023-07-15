import Button from "antd/lib/button";
import Modal from "antd/lib/modal/Modal";
import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import Table, { ColumnsType } from "antd/lib/table";
import { LogPropType, updateSeen, parseData } from "./Log.util";
import { fetchAllLog } from "../../redux/Log/Log.action";
import { BellOutlined } from "@ant-design/icons";
import moment from "moment";
import { Badge, Tag } from "antd";
import { fetchOneUser } from "../../redux/User/User.action";
import { getUserData } from "../../utilities/utilities";

const LogComponent: FC<LogPropType> = ({ fetchLog, log, user, fetchUser }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading] = useState(false);
  const { id } = getUserData();
  const column: ColumnsType<any> = [
    {
      title: "Date",
      dataIndex: "date",
      render: (value: any) => moment(value).format("DD/MM/YYYY"),
      width: "15%",
      sortDirections: ["ascend", "descend"],
      defaultSortOrder: "descend",
      sorter: (a, b) => (moment(a.date).isBefore(moment(b.date), "D") ? -1 : 1),
    },
    {
      title: "Description",
      render: (value, record) =>
        record.description +
        (record.project ? ` on Project ${record.project.name}` : ""),
      width: "45%",
    },
    {
      title: "User",
      render: (value, record) => record.full_name,
      width: "15%",
    },
    {
      title: "Status",
      width: "15%",
      render: (value, record) =>
        record.status ? (
          <Tag color="green">Seen</Tag>
        ) : (
          <Tag color="cyan">Not Seen</Tag>
        ),
    },
  ];

  const data = parseData(log.payload, user.payload.last_seen);
  const handleOk = () => {
    updateSeen({ id }).then(() => fetchUser(id));

    setIsModalVisible(false);
  };

  useEffect(() => {
    fetchLog();
    fetchUser(id);
  }, [fetchLog, fetchUser, id]);

  return (
    <>
      <Badge
        status="error"
        count={data.counter}
        className="d-flex mr-3 notification-badge"
      >
        <Button
          type="link"
          icon={<BellOutlined />}
          onClick={() => setIsModalVisible(true)}
        ></Button>
      </Badge>

      <Modal
        centered
        width={1000}
        title="Log"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleOk}
        footer={[]}
      >
        <Table
          columns={column}
          loading={log.isPending}
          dataSource={data.parsed}
        />
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
  log: state.log.fetchAll,
  user: state.user.fetchOne,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchLog: (action: any) => dispatch(fetchAllLog(action)),
  fetchUser: (action: any) => dispatch(fetchOneUser(action)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LogComponent);
