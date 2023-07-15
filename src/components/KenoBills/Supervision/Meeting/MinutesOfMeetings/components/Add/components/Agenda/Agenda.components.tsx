import { FC } from "react";
import {
  MeetingTablesType,
  onChangeHandler1,
} from "../../../../util/Meeting.util";
import { Table, Button, Input } from "antd";
import { ColumnsType } from "antd/lib/table";
import { removeHandler } from "../../../../../../../../../utilities/utilities";
const AgendaComponent: FC<MeetingTablesType> = ({ data, setData }) => {
  const columns: ColumnsType<any> = [
    {
      title: "No",
      key: "no",
      render: (value: number, record: any, index: number) => `2.${index + 1}`,
    },
    {
      title: "Meeting Agendas",
      width: "80%",
      key: "date",
      render: (x, record) => (
        <Input.TextArea
          rows={3}
          value={record.description}
          onChange={(e) =>
            onChangeHandler1(record.key, e.target.value, data, setData)
          }
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

export default AgendaComponent;
