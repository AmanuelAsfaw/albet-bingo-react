import React, { FC } from "react";
import { connect } from "react-redux";
import { ParticipantPropType } from "../../../../util/Meeting.util";
import { Table, Button, Input } from "antd";
import { ColumnsType } from "antd/lib/table";
import { removeHandler } from "../../../../../../../../../utilities/utilities";
const ParticipantComponent: FC<ParticipantPropType> = ({ dataAction }) => {
  const [data, setData] = dataAction;
  const onChangeHandler = (key: number, name: string, value: any) => {
    const newData = [...data];

    const index = newData.findIndex((e) => e.key === key);
    if (index !== -1) {
      let item = newData[index];
      item = {
        ...item,
        [name]: value,
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
      dataIndex: "name",
      width: "30%",
      key: "name",
      render: (data, record) => (
        <Input
          value={record.name}
          onChange={(e) => {
            onChangeHandler(record.key, "name", e.target.value);
          }}
        />
      ),
    },
    {
      title: "Position",
      width: "50%",
      dataIndex: "role",
      key: "role",
      render: (data, record) => (
        <Input
          value={record.position}
          onChange={(e) => {
            onChangeHandler(record.key, "position", e.target.value);
          }}
        />
      ),
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
const mapStateToProps = (state: any) => ({});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ParticipantComponent);
