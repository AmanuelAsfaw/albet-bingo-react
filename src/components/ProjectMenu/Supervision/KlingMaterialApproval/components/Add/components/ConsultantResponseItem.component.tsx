import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { ConsultantResponseItemPropType } from "../../../util/KlingMaterialApproval.util";
import { Checkbox, Table } from "antd";

const ConsultantResponseItemComponent: FC<ConsultantResponseItemPropType> = ({
  response_item,
  setResponseItem,
  is_new,
}) => {
  const onChangeHandler = (key: number, name: string, value: any) => {
    const newData = [...response_item];
    const index = newData.findIndex((e) => e.key === key);
    if (index !== -1) {
      let item = newData[index];
      item = {
        ...item,
        [name]: value,
      };
      if (name === "yes") {
        item = {
          ...item,
          no: false,
        };
      }
      if (name === "no") {
        item = {
          ...item,
          yes: false,
        };
      }
      newData.splice(index, 1, item);
      setResponseItem(newData);
    }
  };

  return (
    <>
      <Table
        dataSource={response_item}
        pagination={false}
        columns={[
          {
            title: "No",
            render: (value, record, index) => index + 1,
          },
          {
            title: "",
            key: "description",
            dataIndex: "description",
          },
          {
            title: "Yes",
            key: "yes",
            dataIndex: "yes",
            render: (value, record) => (
              <Checkbox
                checked={value}
                onChange={(e) =>
                  onChangeHandler(record.key, "yes", e.target.checked)
                }
                disabled={is_new}
              />
            ),
          },
          {
            title: "No",
            key: "no",
            dataIndex: "no",
            render: (value, record) => (
              <Checkbox
                checked={value}
                onChange={(e) =>
                  onChangeHandler(record.key, "no", e.target.checked)
                }
                disabled={is_new}
              />
            ),
          },
        ]}
      />
    </>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConsultantResponseItemComponent);
