import { FC } from "react";
import { connect } from "react-redux";
import { AttendancePropType } from "../../../../util/Meeting.util";
import { Table, Select, Button } from "antd";
import { ColumnsType } from "antd/lib/table";
import { removeHandler } from "../../../../../../../../../utilities/utilities";
const AttendanceComponent: FC<AttendancePropType> = ({
  users,
  data,
  setData,
}) => {
  const onChangeHandler = (key: number, value: any) => {
    const newData = [...data];

    const index = newData.findIndex((e) => e.key === key);
    if (index !== -1) {
      let item = newData[index];
      item = {
        ...item,
        user_id: value,
        ...users.payload.find((e) => e.id === value),
        id: null,
      };
      newData.splice(index, 1, item);
      setData(newData);
    }
  };

  const columns: ColumnsType<any> = [
    {
      title: "No",
      render: (value: number, record: any, index: number) => `1.${index + 1}`,
    },
    {
      title: "Full Name",
      dataIndex: "user_id",
      width: "30%",
      key: "date",
      render: (data, record) => (
        <Select
          style={{ width: "100%" }}
          value={record.user_id}
          onChange={(e) => onChangeHandler(record.key, e)}
        >
          {users.payload.map((e) => (
            <Select.Option value={e.id}>{e.full_name}</Select.Option>
          ))}
        </Select>
      ),
    },
    {
      title: "Position",
      width: "50%",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Action",
      render: (x, record) => (
        <>
          <Button
            className="btn-outline-secondary"
            onClick={() => removeHandler(record.key, data, setData)}
          >
            -
          </Button>
          <Button
            className="btn-outline-secondary"
            onClick={() => setData([...data, { key: Date.now() }])}
          >
            +
          </Button>
        </>
      ),
    },
  ];
  return <Table columns={columns} dataSource={data} pagination={false} />;
};

/**
 * Map State to Props
 *
 * @param state
 */
const mapStateToProps = (state: any) => ({
  users: state.user.fetchAll,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AttendanceComponent);
