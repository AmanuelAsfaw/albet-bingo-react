import Button from "antd/lib/button";
import React, { FC, useState } from "react";
import {
  MaterialTestedPropType,
  MaterialTestedObject,
} from "./MaterialTested.util";
import { Form, Input, Table, AutoComplete, Select, Checkbox } from "antd";
import { MaterialsForTest } from "./MaterialTested.util";

const MaterialTestedComponent: FC<MaterialTestedPropType> = ({
  dataAction,
  allConcreteAction,
  casting,
}) => {
  const [data, setData] = dataAction;
  const [allConcrete, setAllConcrete] = allConcreteAction;

  const appendItem = () => {
    setData([...data, MaterialTestedObject(Date.now())]);
  };

  const removeItem = (key: any) => {
    if (data.length > 1) {
      setData(data.filter((element: { key: any }) => element.key !== key));
    }
  };

  const onChange = (key: any, selector: any, value: any) => {
    let temp = [...data];
    let index = temp.findIndex((ele) => ele.key === key);

    if (index !== -1) {
      temp[index] = { ...temp[index], [selector]: value };
      setData(temp);
    }
  };

  const onMaterialTestedChange = (key: any, material_tested: any) => {
    let temp = [...data];
    let index = temp.findIndex((ele) => ele.key === key);

    if (index === -1) {
      setData([
        ...data,
        {
          key,
          material_tested,
          test_result: null,
          specified_quality: null,
          casting_id: null,
          is_concrete: material_tested === "Concrete",
        },
      ]);
    } else {
      temp[index] = {
        ...temp[index],
        is_concrete: material_tested === "Concrete",
        material_tested,
      };
      setData(temp);
    }
  };

  return (
    <>
      <Table
        size="small"
        dataSource={data}
        pagination={false}
        columns={[
          {
            title: "Material Tested",
            width: 250,
            render: (value, record, index) =>
              allConcrete ? (
                <Form.Item
                  name={`material_tested-2-${record.key}`}
                  rules={[
                    {
                      required: true,
                      message: "Please select Material Tested",
                    },
                  ]}
                  initialValue="Concrete"
                >
                  <Input
                    readOnly
                    value={"Concrete"}
                    defaultValue={"Concrete"}
                  />
                </Form.Item>
              ) : (
                <Form.Item
                  name={`material_tested${record.key}`}
                  rules={[
                    {
                      required: true,
                      message: "Please select Material Tested",
                    },
                  ]}
                >
                  <AutoComplete
                    options={MaterialsForTest.map((e, index) => ({
                      option: e.option,
                      value: e.value,
                      key: index,
                    }))}
                    placeholder="Material"
                    filterOption={(inputValue, option) =>
                      option!.value
                        .toUpperCase()
                        .indexOf(inputValue.toUpperCase()) !== -1
                    }
                    onSelect={(value: any) =>
                      onMaterialTestedChange(record.key, value)
                    }
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
            width: 250,
            title: "Concrete Grade",
            render: (value, record, index) =>
              allConcrete || record.is_concrete ? (
                <Form.Item
                  name={`casting_id${record.key}`}
                  rules={[
                    {
                      required: true,
                      message: "Please select Casting Strength",
                    },
                  ]}
                >
                  <Select
                    loading={casting.isPending}
                    onSelect={(value: any) =>
                      onChange(record.key, "casting_id", value)
                    }
                    placeholder="concrete grade"
                  >
                    {casting.payload.map((ele) => (
                      <Select.Option value={`${ele.id}`}>
                        {ele.concrete_grade}, {ele.date}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              ) : (
                <p className="text-center">-</p>
              ),
          },
          {
            title: "Specified Quality",
            width: 250,
            render: (value, record, index) => (
              <Form.Item
                name={`specified_quality${record.key}`}
                rules={[
                  { required: true, message: "Please input Specified Quality" },
                ]}
              >
                <Input.TextArea
                  onChange={(event) =>
                    onChange(
                      record.key,
                      "specified_quality",
                      event.target.value
                    )
                  }
                  placeholder="specified quality"
                />
              </Form.Item>
            ),
          },
          {
            title: "Test Result",
            width: 250,
            render: (value, record, index) => (
              <Form.Item
                name={`test_result${record.key}`}
                rules={[
                  { required: true, message: "Please input Test Result" },
                ]}
              >
                <Input.TextArea
                  onChange={(event) =>
                    onChange(record.key, "test_result", event.target.value)
                  }
                  placeholder="test result"
                />
              </Form.Item>
            ),
          },
          {
            title: "Accepted/Rejected",

            render: (value, record, index) => (
              <>
                <Form.Item>
                  <Checkbox
                    checked={
                      record.is_accepted !== null ? record.is_accepted : false
                    }
                    onClick={() => onChange(record.key, "is_accepted", true)}
                  >
                    Accept
                  </Checkbox>
                </Form.Item>

                <Form.Item>
                  <Checkbox
                    checked={
                      record.is_accepted !== null ? !record.is_accepted : false
                    }
                    onClick={() => onChange(record.key, "is_accepted", false)}
                  >
                    Reject
                  </Checkbox>
                </Form.Item>

                {record.is_accepted === null && (
                  <Form.Item
                    name={`is_accepted${record.key}`}
                    rules={[
                      {
                        required: record.is_accepted === null,
                        message: "Please select Field",
                      },
                    ]}
                  >
                    <Input hidden />
                  </Form.Item>
                )}
              </>
            ),
          },
          {
            title: "Action",
            render: (value, record, index) => (
              <div className="d-flex">
                <Button
                  className="btn-outline-secondary"
                  onClick={() => removeItem(record.key)}
                >
                  -
                </Button>
                <Button
                  className="ml-1 btn-outline-secondary"
                  onClick={() => appendItem()}
                >
                  +
                </Button>
              </div>
            ),
          },
        ]}
      />
    </>
  );
};

export default MaterialTestedComponent;
