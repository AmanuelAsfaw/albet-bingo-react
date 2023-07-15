import { Button, Divider, Form, Input, Modal, Select } from "antd";
import { FC, useState, useEffect } from "react";
import { connect } from "react-redux";
import moment from "moment";
import {
  UsergroupAddOutlined,
  UserSwitchOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import {
  ShareKlingMaterialApprovalPropType,
  sendShareMaterialApproval,
  deleteShareMaterialApprovalData,
} from "../../util/KlingMaterialApproval.util";
import Table from "antd/lib/table";
import {
  NotificationType,
  RoleType,
} from "../../../../../../constants/Constants";
import { fetchAllLetter } from "../../../../../../redux/Letter/Letter.action";
import { fetchAllUser } from "../../../../../../redux/User/User.action";
import {
  getUserData,
  ErrorHandler,
} from "../../../../../../utilities/utilities";
import { OpenNotification } from "../../../../../common/Notification/Notification.component";
import { fetchAllKlingMaterialApproval } from "../../../../../../redux/KlingMaterialApproval/KlingMaterialApproval.action";
import { useParams } from "react-router-dom";

const ShareKlingMaterialApprovalComponent: FC<
  ShareKlingMaterialApprovalPropType
> = ({
  users,
  fetchAllUser,
  fetchKlingMaterialApproval,
  klingMaterialApproval,
  project,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const params = useParams();

  useEffect(() => {
    if (isModalVisible) {
      fetchAllUser();
    }
  }, [fetchKlingMaterialApproval, fetchAllUser, isModalVisible]);

  const handleOk = () => {
    setIsModalVisible(false);
    setLoading(false);
  };

  const Submit = (value: any) => {
    setLoading(true);
    let parsedData = value.shared_users.map((user_id: any) => {
      return {
        user_id,
        kling_material_approval_id: klingMaterialApproval.id,
        sender: getUserData().id,
        remark: value.remark,
        date: moment().format("DD-MM-YYYY LT"),
      };
    });
    sendShareMaterialApproval(parsedData)
      .then(() => {
        form.resetFields();
        fetchKlingMaterialApproval({ project_id: params?.id });
        setLoading(false);
        OpenNotification(
          NotificationType.SUCCESS,
          "Kling material approval Shared",
          ""
        );
      })
      .catch((error) => {
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            "Failed to share kling material approval",
            e.message
          )
        );
      });
  };

  const onDelete = (id: any) => {
    setLoading(true);
    deleteShareMaterialApprovalData(id)
      .then((res) => {
        form.resetFields();
        setLoading(false);
        fetchKlingMaterialApproval({ project_id: params?.id });
        OpenNotification(NotificationType.SUCCESS, "Letter Unshared", "");
      })
      .catch((error) => {
        setLoading(true);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            "Failed to Letter Unshared",
            e.message
          )
        );
      });
  };

  return (
    <>
      <Button
        className="btn-outline-small"
        icon={<UsergroupAddOutlined style={{ fontSize: 20 }} />}
        onClick={() => setIsModalVisible(true)}
      >
        Share
      </Button>
      <Modal
        className="fixed-modal"
        title="Share Letter"
        visible={isModalVisible}
        onCancel={handleOk}
        width={800}
        footer={[]}
      >
        <Form form={form} onFinish={Submit} layout="vertical">
          <div className="row">
            <div className="col-md-12">
              <Form.Item label="Remark" name="remark">
                <Input.TextArea rows={3} placeholder="message" />
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="col-md-10">
              <Form.Item name="shared_users" label="Add Users">
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
                  {project.payload.user_controls
                    .filter((e) => {
                      const found =
                        klingMaterialApproval.share_material_approvals?.findIndex(
                          (elem) => elem.user_id === e.user_id
                        );
                      return (
                        e.id !== getUserData().id &&
                        found === -1 &&
                        (e.role.name?.toLowerCase() === "consultant" ||
                          e.role.name?.toLowerCase() === "client" ||
                          e.role.name?.toLowerCase() === "contractor")
                      );
                    })
                    .map((e) => (
                      <Select.Option value={e?.user?.id}>
                        {e?.user?.full_name}
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
        </Form>
        <Divider />
        <div className="row mt-3">
          <div className="col-md-12">
            <Table
              loading={loading}
              pagination={false}
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
              columns={[
                {
                  title: "No.",
                  width: 100,
                  render: (value, record, index) => index + 1,
                },
                {
                  title: "User",
                  dataIndex: "user_id",
                  render: (value, record) => (
                    <span>
                      {
                        users.payload?.find((e) => e.id === record.user_id)
                          ?.full_name
                      }
                    </span>
                  ),
                },

                {
                  title: "Unshare",
                  width: 200,
                  align: "center",
                  render: (value, record) => (
                    <Button
                      type="text"
                      icon={<CloseOutlined />}
                      style={{ color: "red" }}
                      loading={loading}
                      onClick={() => onDelete(record.id)}
                    >
                      Unshare
                    </Button>
                  ),
                },
              ]}
              dataSource={klingMaterialApproval.share_material_approvals?.map(
                (e, index) => {
                  return {
                    ...e,
                    key: index,
                  };
                }
              )}
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
const mapStateToProps = (state: any) => ({
  users: state.user.fetchAll,
  project: state.project.fetchOne,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchAllUser: () => dispatch(fetchAllUser()),
  fetchKlingMaterialApproval: (action: any) =>
    dispatch(fetchAllKlingMaterialApproval(action)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShareKlingMaterialApprovalComponent);
