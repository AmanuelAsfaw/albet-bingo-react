import Button from "antd/lib/button";
import React, { FC, useState } from "react";
import {
  TestRequestItemPropType,
  TestRequestItemObject,
} from "./TestRequestITem.util";
import {
  Form,
  Input,
  Table,
  TableColumnProps,
  Upload,
  message,
  AutoComplete,
} from "antd";
import { MaterialsForTest } from "../../../../TestResult/component/AddTestResult/component/MaterialTested/MaterialTested.util";

const AttachmentComponent: FC<TestRequestItemPropType> = ({ dataAction }) => {
  const [data, setData] = dataAction;

  const appendItem = () => {
    setData([...data, TestRequestItemObject(Date.now())]);
  };

  const removeItem = (key: any) => {
    if (data.length > 1) {
      setData(data.filter((element: { key: any }) => element.key !== key));
    }
  };

  const onDescriptionChange = (key: any, description: string) => {
    let temp = [...data];
    let index = temp.findIndex((ele) => ele.key === key);

    if (index === -1) {
      setData([
        ...data,
        {
          key,
          description,
          material: null,
        },
      ]);
    } else {
      temp[index] = { ...temp[index], description };
      setData(temp);
    }
  };

  const onMaterialTestedChange = (key: any, material: any) => {
    let temp = [...data];
    let index = temp.findIndex((ele) => ele.key === key);

    if (index === -1) {
      setData([
        ...data,
        {
          key,
          material,
          description: null,
        },
      ]);
    } else {
      temp[index] = {
        ...temp[index],
        material,
      };
      setData(temp);
    }
  };

  const columns: TableColumnProps<{
    description: string;
    material: string;
    key: any;
  }>[] = [
    {
      title: "No.",
      render: (value, record, index) => index + 1,
    },
    {
      title: "Material to be Tested",
      render: (value, record, index) => (
        <Form.Item
          name={`material_${record.key}`}
          rules={[{ required: true, message: "Please input Material" }]}
        >
          <AutoComplete
            options={MaterialsForTest.map((e, index) => ({
              option: e.option,
              value: e.value,
              key: index,
            }))}
            placeholder="Material"
            filterOption={(inputValue, option) =>
              option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
              -1
            }
            onSelect={(value: any) => onMaterialTestedChange(record.key, value)}
          >
            <Input
              onChange={(event) =>
                onMaterialTestedChange(record.key, event.target.value)
              }
            />
          </AutoComplete>
        </Form.Item>
      ),
    },
    {
      title: "Description",
      render: (value, record, index) => (
        <Form.Item
          name={`description_${record.key}`}
          rules={[{ required: true, message: "Please input Description" }]}
        >
          <Input.TextArea
            onChange={(event) =>
              onDescriptionChange(record.key, event.target.value)
            }
          />
        </Form.Item>
      ),
    },
    {
      title: "Action",
      render: (value, record, index) => (
        <div className="d-flex">
          <Button type="dashed" onClick={() => removeItem(record.key)}>
            -
          </Button>
          <Button type="dashed" className="ml-1" onClick={() => appendItem()}>
            +
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={data} pagination={false} />
    </>
  );
};

export default AttachmentComponent;
