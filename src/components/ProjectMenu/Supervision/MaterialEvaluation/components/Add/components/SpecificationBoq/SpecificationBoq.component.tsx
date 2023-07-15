import { FC } from "react";
import { connect } from "react-redux";
import {
  ApprovalRqtType,
  MaterialEvaluationSpecAndApprovalPropType,
  SpecBoqType,
} from "../../../../util/MaterialEvaluation.util";
import { Table, Button, Input, Select } from "antd";
import { ColumnsType } from "antd/lib/table";
import { removeHandler } from "../../../../../../../../utilities/utilities";
import TextArea from "antd/lib/input/TextArea";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";

const SpecificationBoq: FC<MaterialEvaluationSpecAndApprovalPropType> = ({
  dataAction,
}) => {
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

  const columns: ColumnsType<SpecBoqType> = [
    {
      width: "20px",
      render: (record, data, index) => "",
    },
    { width: "80px", render: (record, data, index) => "" },
    {
      width: "80px",
      render: (record, data, index) => "",
    },
    {
      width: "192px",
      dataIndex: "spec_and_rqt",
      key: "spec_and_rqt",
      render: (record, data, index) => (
        <TextArea
          bordered={false}
          autoSize
          value={record}
          onChange={(e) => {
            onChangeHandler(data.key, "spec_and_rqt", e.target.value);
          }}
        />
      ),
    },
    {
      width: "5%",
      dataIndex: "contractor_submittal",
      key: "contractor_submittal",
      render: (record, data, index) => (
        <Select
          style={{ width: "100%" }}
          value={record}
          onChange={(e) => {
            onChangeHandler(data.key, "contractor_submittal", e);
          }}
        >
          {[
            { sign: "√", value: "Yes" },
            { sign: "x", value: "No" },
          ].map((emp: any, index: any) => (
            <Select.Option value={emp.sign}>{emp.sign}</Select.Option>
          ))}
        </Select>
      ),
    },
    {
      width: "125px",
      dataIndex: "comment",
      key: "comment",
      render: (record, data, index) => (
        <TextArea
          bordered={false}
          autoSize
          value={record}
          onChange={(e) => {
            onChangeHandler(data.key, "comment", e.target.value);
          }}
        />
      ),
    },
    {
      width: "11%",
      render: (record, data) => "",
    },
    {
      width: "6%",
      render: (_record, _data, index) => (
        <div className="d-flex justify-content-center">
          <div className="px-2">
            <PlusOutlined
              onClick={() => {
                let fr = data;
                fr.push({
                  key: Date.now(),
                  spec_and_rqt: "",
                  contractor_submittal: "",
                  comment: "",
                });
                setData([...fr]);
              }}
            />
          </div>
          {index === 0 ? null : (
            <div className="px-2">
              <MinusOutlined
                onClick={() => {
                  let fr = data;
                  fr.splice(index, 1);
                  setData([...fr]);
                }}
              />
            </div>
          )}
        </div>
      ),
    },
  ];
  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={false}
      bordered={true}
      size="small"
    />
  );
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

export default connect(mapStateToProps, mapDispatchToProps)(SpecificationBoq);
