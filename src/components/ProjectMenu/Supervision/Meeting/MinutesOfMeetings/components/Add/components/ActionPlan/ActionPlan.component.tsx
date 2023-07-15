import React, { FC } from "react";
import { connect } from "react-redux";
import { ActionPlanPropType } from "../../../../util/Meeting.util";
import { Table, Select, Button, Input, DatePicker } from "antd";
import { ColumnsType } from "antd/lib/table";
import { removeHandler } from "../../../../../../../../../utilities/utilities";
const ActionPlanComponent: FC<ActionPlanPropType> = ({
  users,
  data,
  setData,
  participant,
}) => {
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
      render: (value: number, record: any, index: number) => `10.${index + 1}`,
    },
    {
      title: "Task",
      width: "30%",
      key: "task",
      render: (data, record) => (
        <Input
          value={record.task}
          onChange={(e) => onChangeHandler(record.key, "task", e.target.value)}
        />
      ),
    },
    {
      title: "Assigned To",
      dataIndex: "assigned_to",
      width: "30%",
      key: "assigned_to",
      render: (data, record) => (
        <Select
          style={{ width: "100%" }}
          value={record.assigned_to}
          onChange={(e) => onChangeHandler(record.key, "assigned_to", e)}
        >
          <Select.OptGroup label="Singing" key={1}>
            {users.payload.map((e) => (
              <Select.Option value={e.full_name}>{e.full_name}</Select.Option>
            ))}
          </Select.OptGroup>
          <Select.OptGroup label="Non-Singing" key={2}>
            {participant.map((e) => (
              <Select.Option value={e.name}>{e.name}</Select.Option>
            ))}
          </Select.OptGroup>
        </Select>
      ),
    },
    {
      title: "Schedule By",
      width: "20%",
      key: "schedule_by",
      render: (data, record) => (
        <DatePicker
          value={record.schedule_by}
          onChange={(e) => onChangeHandler(record.key, "schedule_by", e)}
        />
      ),
    },

    {
      title: "Action",
      render: (x, record) => (
        <>
          <Button
            className="mr-1"
            onClick={() => removeHandler(record.key, data, setData)}
          >
            -
          </Button>
          <Button
            className="mr-1"
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
)(ActionPlanComponent);
