import { FC } from "react";
import { connect } from "react-redux";
import {
  MaterialEvaluationItemPropType,
  MEItemType,
} from "../../../../util/MaterialEvaluation.util";
import { Table, Button, Input, AutoComplete, Radio, Select } from "antd";
import { ColumnsType } from "antd/lib/table";
import {
  removeHandler,
  zeroPad,
} from "../../../../../../../../utilities/utilities";
import { fetchAllMaterialRequest } from "../../../../../../../../redux/MaterialRequest/MaterialRequest.action";
import { ItemCategory } from "../../../../../../../../constants/Constants";
import TextArea from "antd/lib/input/TextArea";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";

const EvaluationItemComponent: FC<MaterialEvaluationItemPropType> = ({
  material,
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

  const columns: ColumnsType<MEItemType> = [
    {
      title: "No",
      width: "20px",
      render: (record, data, index) => zeroPad(index + 1, 2),
    },
    {
      title: "Material",
      dataIndex: "material",
      width: "80px",
      className: "px-1",
      render: (record, data, index) => (
        <AutoComplete
          bordered={false}
          value={record}
          onChange={(e) => {
            onChangeHandler(data.key, "material", e);
          }}
          options={material.payload
            .filter(
              (mat) => mat.item_category === ItemCategory.CONSTRUCTION_MATERIAL
            )
            .map((mat, index) => ({
              value: mat.description,
              key: index,
            }))}
          filterOption={(inputValue, option: any) =>
            option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
          }
          style={{ width: "100%" }}
        />
      ),
    },
    {
      title: "Item No",
      dataIndex: "item_no",
      width: "80px",
      key: "item_no",
      className: "px-1",
      render: (record, data, index) => (
        <AutoComplete
          bordered={false}
          value={record}
          onChange={(e) => {
            onChangeHandler(data.key, "item_no", e.toString());
          }}
          options={material.payload
            .filter(
              (mat) => mat.item_category === ItemCategory.CONSTRUCTION_MATERIAL
            )
            .filter((mat) => mat.description === data.material)
            .map((mat, index) => ({
              value: mat.id,
              key: index,
            }))}
          // filterOption={(inputValue, option: any) =>
          //   option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
          // }
          style={{ width: "100%" }}
        />
      ),
    },
    {
      title: "Specification and Approval Requirement",
      width: "192px",
      dataIndex: "spec_and_rqt",
      key: "spec_and_rqt",
      className: "px-1",
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
      title: "Contractor submittal",
      width: "5%",
      dataIndex: "contractor_submittal",
      key: "contractor_submittal",
      className: "px-1",
      render: (record, data, index) => (
        <Select
          style={{ width: "100%" }}
          allowClear
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
      title: "Comment",
      width: "125px",
      dataIndex: "comment",
      key: "comment",
      className: "px-1",
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
      title: "Status  A B C D",
      width: "11%",
      dataIndex: "status",
      key: "status",
      className: "px-1",
      render: (record, data) => (
        <Radio.Group
          value={record}
          onChange={(e) => {
            onChangeHandler(data.key, "status", e.target.value);
          }}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Radio value={"A"}></Radio>
          <Radio value={"B"}></Radio>
          <Radio value={"C"}></Radio>
          <Radio value={"D"}></Radio>
        </Radio.Group>
      ),
    },
    {
      title: "Action",
      width: "6%",
      className: "px-1",
      render: (_record, _data, index) => (
        <div className="d-flex justify-content-center">
          <div className="px-2">
            <PlusOutlined
              onClick={() => {
                let fr = data;
                fr.push({
                  key: Date.now(),
                  item_no: "",
                  material: "",
                  spec_and_rqt: "",
                  contractor_submittal: "",
                  comment: "",
                  status: "",
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
const mapStateToProps = (state: any) => ({
  material: state.material.fetchAll,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchMaterialRequest: (action: any) =>
    dispatch(fetchAllMaterialRequest(action)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EvaluationItemComponent);
