import { Button, Modal, Statistic, Table } from "antd";
import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { CheckOutlined, EyeOutlined } from "@ant-design/icons";
import { DataItem, ViewUserMatrixPropType } from "../../utils/UserMatrix.util";
import { FEATURES } from "../../../../router/Constants";
import { Role } from "../../../../redux/Role/Role.type";
import { groupBy } from "lodash";

import Text from "antd/lib/typography/Text";
const AddUserMatrixComponent: FC<ViewUserMatrixPropType> = ({ role }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [data, setData] = useState<DataItem[]>([]);
  console.log("🚀 ~ file: EditUserMatrix.component.tsx ~ line 22 ~ data", data);

  const handleOk = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    setData(getData(role));
  }, [role]);

  const getData = (role: Role) => {
    let parsed: DataItem[] = [];

    let header_grouped = groupBy(FEATURES, (e) => e.header);
    for (let header in header_grouped) {
      let menu_grouped = groupBy(header_grouped[header], (e) => e.menu);
      parsed.push({
        feature: header,
        is_header: true,
        is_title: true,
        key: parsed.length,
      });
      for (let menu in menu_grouped) {
        parsed.push({
          feature: menu,
          is_header: false,
          is_title: true,
          key: parsed.length,
        });
        menu_grouped[menu].forEach((item) => {
          let found = role.role_accesses.find(
            (role_access) => item.path === role_access.path
          );
          if (found) {
            parsed.push({
              ...found,
              key: parsed.length,
              is_title: false,
              feature: item.name,
              is_header: false,
            });
          } else
            parsed.push({
              feature: item.name,
              is_title: false,
              key: parsed.length,
              delete: false,
              edit: false,
              read: false,
              write: false,
              path: item.path,
              is_header: false,
            });
        });
      }
    }

    return parsed;
  };

  return (
    <>
      <Button type="text" onClick={() => setIsModalVisible(true)}>
        View
      </Button>
      <Modal
        className="fixed-modal"
        centered
        title=""
        width={1300}
        visible={isModalVisible}
        onCancel={handleOk}
        footer={[<></>]}
      >
        <div className="row">
          <div className="col-md-12">
            <Statistic
              title="Name"
              value={role?.name}
              valueStyle={{ fontSize: 16, fontFamily: "Campton-Medium" }}
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-12">
            <Table
              scroll={{ y: 270 }}
              columns={[
                {
                  title: "Features",
                  key: "key",
                  dataIndex: "feature",
                  width: "30%",
                  render: (value, record) => {
                    let children: any = null;
                    let colSpan = 1;
                    let className = "";

                    if (record.is_title) {
                      if (record.is_header) {
                        colSpan = 1;
                        className = "user-matrix-table-header";
                      } else {
                        className = "user-matrix-table-menu";
                      }

                      children = (
                        <Text type="secondary">
                          {record.feature.toUpperCase()}
                        </Text>
                      );
                    } else {
                      className = "user-matrix-table-tab";
                      children = <Text strong>{record.feature}</Text>;
                    }

                    return {
                      children,
                      props: {
                        colSpan,
                        className,
                      },
                    };
                  },
                },
                {
                  title: "Read Only",
                  key: "read_only",
                  align: "center",

                  render: (value, record) =>
                    record.is_title ? null : record.read ? (
                      <span>
                        <CheckOutlined style={{ color: "#047857" }} />
                      </span>
                    ) : (
                      "-"
                    ),
                },
                {
                  title: "Write",
                  key: "write",
                  align: "center",
                  render: (value, record) =>
                    record.is_title ? null : record.write ? (
                      <span>
                        <CheckOutlined style={{ color: "#047857" }} />
                      </span>
                    ) : (
                      "-"
                    ),
                },
                {
                  title: "Edit",
                  key: "edit",
                  align: "center",
                  render: (value, record) =>
                    record.is_title ? null : record.edit ? (
                      <span>
                        <CheckOutlined style={{ color: "#047857" }} />
                      </span>
                    ) : (
                      "-"
                    ),
                },
                {
                  title: "Delete",
                  key: "delete",
                  align: "center",
                  render: (value, record) =>
                    record.is_title ? null : record.delete ? (
                      <span>
                        <CheckOutlined style={{ color: "#047857" }} />
                      </span>
                    ) : (
                      "-"
                    ),
                },
                {
                  title: "Approve",
                  key: "approve",
                  align: "center",
                  render: (value, record) =>
                    record.is_title ? null : record.approver ? (
                      <span>
                        <CheckOutlined style={{ color: "#047857" }} />
                      </span>
                    ) : (
                      "-"
                    ),
                },
              ]}
              dataSource={data}
              pagination={false}
            />
          </div>
        </div>
      </Modal>
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
)(AddUserMatrixComponent);
