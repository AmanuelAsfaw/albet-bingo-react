import { Button, Checkbox, Form, Input, Modal, Table } from "antd";
import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";
import { DataItem, POST } from "../../utils/UserMatrix.util";

import { AddUserMatrixPropType } from "../../utils/UserMatrix.util";
import { NotificationType } from "../../../../constants/Constants";
import { OpenNotification } from "../../../common/Notification/Notification.component";
import { ErrorHandler } from "../../../../utilities/utilities";
import { fetchAllRole } from "../../../../redux/Role/Role.action";
import { FEATURES } from "../../../../router/Constants";
import { groupBy } from "lodash";
import Text from "antd/lib/typography/Text";
const AddRoleComponent: FC<AddUserMatrixPropType> = ({ fetchRoles }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const [data, setData] = useState<DataItem[]>([]);

  const handleOk = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    setData(getData());
  }, []);

  const getData = () => {
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
          parsed.push({
            ...item,
            feature: item.name,
            is_header: false,
            is_title: false,
            key: parsed.length,
          });
        });
      }
    }

    return parsed;
  };

  const Submit = (value: any) => {
    setLoading(true);
    const parsed = {
      ...value,
      role_accesses: data.filter(
        (e) =>
          !e.is_title && (e.delete || e.read || e.write || e.edit || e.approver)
      ),
    };

    POST(parsed)
      .then(() => {
        fetchRoles();
        handleOk();
        setLoading(false);
        OpenNotification(NotificationType.SUCCESS, "Role Registered", "");
      })
      .catch((error) => {
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            "Failed to Register Role",
            e.message
          )
        );
      });
  };

  const onChange = (key: number, name: string, value: any) => {
    const newData = [...data];
    const index = newData.findIndex((e) => e.key === key);
    if (index !== -1) {
      let item = { ...newData[index], [name]: value };
      if (name === "full") {
        if (value)
          item = {
            ...item,
            delete: true,
            edit: true,
            read: true,
            write: true,
            approver: true,
          };
        else
          item = {
            ...item,
            delete: false,
            edit: false,
            read: false,
            write: false,
            approver: false,
          };
      }
      newData.splice(index, 1, item);
      setData(newData);
    }
  };

  return (
    <>
      <Button
        className="btn-outline-secondary"
        style={{ float: "right" }}
        icon={<PlusOutlined />}
        onClick={() => setIsModalVisible(true)}
      >
        Register
      </Button>
      <Modal
        className="fixed-modal"
        centered
        title="Role"
        width={1200}
        visible={isModalVisible}
        onCancel={handleOk}
        footer={[
          <>
            <Button className="btn-outline" htmlType="reset" onClick={handleOk}>
              Cancel
            </Button>
            <Button
              key="submit"
              type="primary"
              htmlType="submit"
              loading={loading}
              onClick={() => form.submit()}
            >
              Save Changes
            </Button>
          </>,
        ]}
      >
        <Form layout="vertical" onFinish={Submit} form={form}>
          <div className="row">
            <div className="col-md-4">
              <Form.Item
                name="name"
                label="Name"
                rules={[{ required: true, message: "Role Name is Required" }]}
              >
                <Input placeholder="Name" />
              </Form.Item>
            </div>
          </div>
          <div className="row mt-2">
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
                      record.is_title ? null : (
                        <Checkbox
                          disabled={
                            record.delete || record.edit || record.write
                          }
                          checked={record.read}
                          onChange={(e) =>
                            onChange(record.key, "read", e.target.checked)
                          }
                        />
                      ),
                  },
                  {
                    title: "Write",
                    key: "write",
                    align: "center",
                    render: (value, record) =>
                      record.is_title ? null : (
                        <Checkbox
                          checked={record.write}
                          onChange={(e) =>
                            onChange(record.key, "write", e.target.checked)
                          }
                        />
                      ),
                  },
                  {
                    title: "Edit",
                    key: "edit",
                    align: "center",
                    render: (value, record) =>
                      record.is_title ? null : (
                        <Checkbox
                          checked={record.edit}
                          onChange={(e) =>
                            onChange(record.key, "edit", e.target.checked)
                          }
                        />
                      ),
                  },
                  {
                    title: "Delete",
                    key: "delete",
                    align: "center",
                    render: (value, record) =>
                      record.is_title ? null : (
                        <Checkbox
                          checked={record.delete}
                          onChange={(e) =>
                            onChange(record.key, "delete", e.target.checked)
                          }
                        />
                      ),
                  },
                  {
                    title: "Approver",
                    key: "approver",
                    align: "center",
                    render: (value, record) =>
                      record.is_title ? null : (
                        <Checkbox
                          checked={record.approver}
                          onChange={(e) =>
                            onChange(record.key, "approver", e.target.checked)
                          }
                        />
                      ),
                  },
                  {
                    title: "Full Access",
                    key: "full",
                    align: "center",
                    render: (value, record) =>
                      record.is_title ? null : (
                        <Checkbox
                          checked={record.edit && record.delete && record.write}
                          onChange={(e) =>
                            onChange(record.key, "full", e.target.checked)
                          }
                        />
                      ),
                  },
                ]}
                dataSource={data}
                pagination={false}
              />
            </div>
          </div>
        </Form>
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
const mapDispatchToProps = (dispatch: any) => ({
  fetchRoles: (action: any) => dispatch(fetchAllRole(action)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddRoleComponent);
