import React, { FC } from "react";
import { MeetingTablesType } from "../../../../util/Meeting.util";
import { Table, Button, Input, Select } from "antd";
import { ColumnsType } from "antd/lib/table";
import { GeneralWorkProgress } from "../../../../../../../../../constants/Constants";
import { removeHandler } from "../../../../../../../../../utilities/utilities";
const WorkProgressComponent: FC<MeetingTablesType> = ({ data, setData }) => {
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
      key: "no",
      render: (value: number, record: any, index: number) => `7.${index + 1}`,
    },
    {
      title: "General Work Progress",
      width: "60%",
      key: "date",
      render: (data, record) => (
        <Input.TextArea
          value={data.description}
          rows={3}
          onChange={(e) =>
            onChangeHandler(record.key, "description", e.target.value)
          }
        />
      ),
    },
    {
      title: "Progress Status",
      width: "20%",
      key: "date",
      render: (data, record) => (
        <Select
          style={{ width: "100%" }}
          placeholder="select"
          value={data.status}
          onChange={(e) => onChangeHandler(record.key, "status", e)}
        >
          {GeneralWorkProgress.map((e, index) => (
            <Select.Option key={index} value={e}>
              {e}
            </Select.Option>
          ))}
        </Select>
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

export default WorkProgressComponent;
