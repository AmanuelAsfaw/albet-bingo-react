import {
  Button,
  Form,
  Modal,
  Popconfirm,
  Popover,
  Radio,
  Select,
  Table,
  Tag,
} from "antd";
import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  DeleteOutlined,
  MoreOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import { getUsers, SharePropType } from "./Share.util";
import { getUserData, searchProp, zeroPad } from "../../../utilities/utilities";
import { toNumber } from "lodash";
import { Status } from "../../../constants/Constants";
import {
  fetchAllUser,
  fetchFeatureUser,
} from "../../../redux/User/User.action";
import { ColumnsType } from "antd/lib/table";
import { KeyPersonnel } from "../../../redux/KeyPersonnel/KeyPersonnel.type";
import moment from "moment";
import KeyPersonnelFormComponent from "../../ProjectMenu/Deliverables/KeyPersonnel/components/KeyPersonnel.form.component";
const ShareComponent: FC<SharePropType> = ({
  loading,
  onShare,
  payload,
  users,
  project_id,
  onRemove,
  fetchUsersByFeature,
  fetchUsers,
  feature,
  type = "VCA",
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selected_user, setSelectedUser] = useState<
    undefined | typeof users.payload[0]
  >(undefined);

  useEffect(() => {
    console.log("from share", project_id);
    if (isModalVisible) {
      if (feature) {
        fetchUsersByFeature({ feature, project_id });
      } else {
        fetchUsers();
      }
    }
  }, [isModalVisible, feature]);

  const [form] = Form.useForm();

  const handleOk = () => {
    setIsModalVisible(false);
  };

  console.log("users >>  ", users);

  const getStatus = (status: number, type: string) => {
    if (type !== "View")
      switch (status) {
        case Status.PENDING:
          return <Tag color="yellow">Pending</Tag>;
        case Status.REVISE:
          return <Tag color="yellow">Revise</Tag>;
        case Status.APPROVED:
          return type === "Check" ? (
            <Tag color="green">Checked</Tag>
          ) : (
            <Tag color="green">Approved</Tag>
          );
        default:
          return <div></div>;
      }
  };

  const columns: ColumnsType<{
    id: number;
    type?: "View" | "Check" | "Approve";
    status?: number;
    assigned_by: number;
    user_id: number;
  }> = [
    {
      title: "No",
      key: "no",
      render: (value, record, index) => index + 1,
    },
    {
      title: "Name",
      key: "user",
      render: (value, record) =>
        users.payload.find((e) => e.id === record.user_id)?.full_name,
    },
  ];
  if (type === "VCA") {
    columns.push(
      {
        title: "Type",
        key: "type",
        render: (value, record) => record.type ?? "View",
      },
      {
        title: "Status",
        key: "status",

        render: (value, record) =>
          record.status && record.type
            ? getStatus(record.status, record.type)
            : null,
      }
    );
  }

  columns.push(
    {
      title: "Assigned By",
      key: "assigned_by",
      render: (value, record) =>
        users.payload.find((e) => e.id === record.assigned_by)?.full_name,
    },
    {
      title: "Action",
      key: "action",
      render: (value, record) =>
        record.assigned_by === toNumber(getUserData().id) ||
        getUserData().is_super_user ? (
          <Popconfirm
            placement="leftTop"
            title="Are you sure you want to remove this Assigned User?"
            onConfirm={() => onRemove(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger type="text">
              Delete
            </Button>
          </Popconfirm>
        ) : null,
    }
  );

  return (
    <>
      <Button
        className="pl-0"
        type="text"
        icon={<ShareAltOutlined />}
        onClick={() => setIsModalVisible(true)}
      >
        Share
      </Button>
      <Modal
        className="fixed-modal"
        centered
        title="Share"
        width={800}
        open={isModalVisible}
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
              Share
            </Button>
          </>,
        ]}
      >
        <Form
          layout="vertical"
          onFinish={(values) => onShare(values)}
          form={form}
          initialValues={{ type: "View" }}
        >
          <div className="row">
            <div className="col-md-6">
              <Form.Item
                label="User"
                name="user_id"
                rules={[{ required: true, message: "User is Required" }]}
              >
                <Select
                  placeholder="name"
                  {...searchProp}
                  onChange={(e) => {
                    setSelectedUser(
                      users.payload?.find((user) => user.id === e)
                    );
                    form.setFieldsValue({ type: "View" });
                  }}
                >
                  {getUsers(
                    users.payload,
                    payload?.map((e) => e.user_id)
                  ).map((user, index) => (
                    <Select.Option value={user.id} key={index}>
                      {user.full_name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            {type === "ViewOnly" && (
              <div className="col-md-6">
                <Form.Item label="Action" name="type">
                  <Radio.Group>
                    <Radio value="View"> View </Radio>
                    <Radio disabled={!selected_user?.approve} value="Check">
                      Check
                    </Radio>
                    <Radio disabled={!selected_user?.approve} value="Approve">
                      Approve
                    </Radio>
                  </Radio.Group>
                </Form.Item>
              </div>
            )}
          </div>
          <div className="row">
            <div className="col-md-12">
              <Table
                dataSource={payload}
                pagination={false}
                columns={columns}
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
const mapStateToProps = (state: any) => ({
  users_by_feature: state.user.fetchFeature,
  users: state.user.fetchAll,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchUsersByFeature: (action: any) => dispatch(fetchFeatureUser(action)),
  fetchUsers: (action: any) => dispatch(fetchAllUser(action)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShareComponent);
