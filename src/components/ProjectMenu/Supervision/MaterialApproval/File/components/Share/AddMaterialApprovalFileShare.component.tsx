import { Button, Form, Modal, Select, Table } from "antd";
import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  CloseOutlined,
  ShareAltOutlined,
  UsergroupAddOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import {
  AddMaterialApprovalFileSharePropType,
  PUT,
} from "../../utils/MaterialApprovalFile.util";
import { OpenNotification } from "../../../../../../common/Notification/Notification.component";
import {
  ErrorHandler,
  getUserData,
} from "../../../../../../../utilities/utilities";
import { NotificationType } from "../../../../../../../constants/Constants";
import {
  fetchAllDocuments,
  setDocuments,
} from "../../../../../../../redux/Document/Document.action";
import { Document } from "../../../../../../../redux/Document/Document.type";

const AddMaterialApprovalFileShareComponent: FC<
  AddMaterialApprovalFileSharePropType
> = ({ document, documents, fetchDocuments, users, project, setDocuments }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    let temp = document.shared_users.map((id) => {
      let found = users.payload.find((user) => user.id === id);
      if (found) return found;
      else return null;
    });
    if (temp) {
      setData(temp.filter((e) => e));
    }
  }, [document, users]);

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const renderOwnerOption = () =>
    users.payload.map((e, index) =>
      e.id !== getUserData().id && e.is_super_user ? (
        <Select.Option key={Date.now() + index} value={e.id}>
          {e.full_name}
        </Select.Option>
      ) : null
    );

  const Submit = (value: any) => {
    onShare(value.shared_users);
  };

  const onUnshare = (id: number) => {
    let temp = [...documents.payload];
    let index = temp.findIndex((e) => e.id === document.id);
    if (index !== -1) {
      let item = temp[index];
      item = {
        ...item,
        shared_users: item.shared_users.filter((e) => e !== id),
      };
      temp.splice(index, 1, item);

      setDocuments(temp);
      setLoading(true);
      PUT({ id: document.id, shared_users: item.shared_users })
        .then(() => {
          setLoading(false);
          form.resetFields();
        })
        .catch((error) => {
          setLoading(false);
          ErrorHandler(error).map((e: any) =>
            OpenNotification(
              NotificationType.ERROR,
              "Filed to UnShare File",
              e.message
            )
          );
        });
    }
  };

  const onShare = (user_ids: number[]) => {
    let temp = [...documents.payload];
    let index = temp.findIndex((e) => e.id === document.id);
    if (index !== -1) {
      let item = temp[index];
      item = { ...item, shared_users: [...item.shared_users, ...user_ids] };
      temp.splice(index, 1, item);

      setDocuments(temp);
      setLoading(true);
      PUT({ id: document.id, shared_users: item.shared_users })
        .then(() => {
          setLoading(false);
          form.resetFields();
        })
        .catch((error) => {
          setLoading(false);
          ErrorHandler(error).map((e: any) =>
            OpenNotification(
              NotificationType.ERROR,
              "Filed to Share File",
              e.message
            )
          );
        });
    }
  };

  return (
    <>
      <Button
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
        visible={isModalVisible}
        onCancel={handleOk}
        width={700}
        footer={[<></>]}
      >
        <Form layout="vertical" onFinish={Submit} form={form}>
          <div className="row">
            <div className="col-md-8">
              <Form.Item name="shared_users" label="Shared Users">
                <Select
                  showSearch
                  mode="multiple"
                  optionFilterProp="children"
                  filterOption={(input: any, option: any) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                  placeholder="select users"
                >
                  {renderOwnerOption()}
                  {project.payload?.user_controls
                    .filter((e) => e.user_id !== getUserData().id)
                    .map((user, index) => (
                      <Select.Option key={index} value={user.user_id}>
                        {user.user?.full_name}
                      </Select.Option>
                    ))}
                </Select>
              </Form.Item>
            </div>
            <div className="col-md-2">
              <Form.Item label=" ">
                <Button
                  className="btn-outline-secondary"
                  icon={<UsergroupAddOutlined style={{ fontSize: 20 }} />}
                  onClick={() => form.submit()}
                  loading={loading}
                >
                  Share
                </Button>
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <Table
                title={() => (
                  <div className="d-flex" style={{ marginLeft: "-10px" }}>
                    <span style={{ color: "GrayText", fontSize: "18px" }}>
                      <UserSwitchOutlined />
                    </span>
                    <h5 style={{ color: "GrayText", paddingTop: "6px" }}>
                      Shared users
                    </h5>
                  </div>
                )}
                dataSource={data}
                columns={[
                  {
                    title: "No",
                    key: "no",
                    render: (value, record, index) => index + 1,
                  },
                  {
                    title: "User",
                    key: "user",
                    render: (value, record, index) => record.full_name,
                  },
                  {
                    title: "Action",
                    key: "action",
                    render: (value, record, index) => (
                      <Button
                        type="text"
                        icon={<CloseOutlined />}
                        danger
                        loading={loading}
                        onClick={() => onUnshare(record.id)}
                      >
                        Unshare
                      </Button>
                    ),
                  },
                ]}
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
const mapStateToProps = (state: any) => ({
  project: state.project.fetchOne,
  users: state.user.fetchAll,
  documents: state.document.fetchAll,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchDocuments: (action: any) => dispatch(fetchAllDocuments(action)),
  setDocuments: (action: Document) => dispatch(setDocuments(action)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddMaterialApprovalFileShareComponent);
