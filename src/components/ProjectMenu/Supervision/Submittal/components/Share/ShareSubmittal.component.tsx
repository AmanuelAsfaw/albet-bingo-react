import { Button, Divider, Form, Input, Modal, Select } from "antd";
import { FC, useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  ShareAltOutlined,
  UsergroupAddOutlined,
  UserSwitchOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { fetchAllSubmittal } from "../../../../../../redux/Submittal/Submittal.action";
import {
  ErrorHandler,
  getUserData,
} from "../../../../../../utilities/utilities";
import {
  PUT,
  ShareSubmittalPropType,
  sendShareData,
  deleteShareData,
} from "../../util/Submittal.util";
import { OpenNotification } from "../../../../../common/Notification/Notification.component";
import { NotificationType } from "../../../../../../constants/Constants";
import Table from "antd/lib/table";
import { fetchAllShareSubmittal } from "../../../../../../redux/ShareSubmittal/ShareSubmittal.action";

const ShareSubmittalComponent: FC<ShareSubmittalPropType> = ({
  submittal_id,
  project,
  users,
  share_submittal,
  fetchAllShareSubmittal,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (isModalVisible) {
      fetchAllShareSubmittal({ submittal_id: submittal_id });
    }
  }, [fetchAllShareSubmittal, submittal_id, isModalVisible]);

  const handleOk = () => {
    setIsModalVisible(false);
    form.resetFields();
    setLoading(false);
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
    setLoading(true);
    let parsedData = value.shared_users.map((user_id: any) => {
      return {
        user_id,
        project_id: project?.payload.id,
        submittal_id: submittal_id,
        sender: getUserData().id,
        remark: value.remark,
      };
    });

    sendShareData(parsedData)
      .then(() => {
        form.resetFields();
        setLoading(false);
        fetchAllShareSubmittal({ submittal_id: submittal_id });
        OpenNotification(NotificationType.SUCCESS, "Submittal Shared!!", "");
      })
      .catch((error) => {
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            "Failed to share submittal",
            e.message
          )
        );
      });
  };

  const onDelete = (id: any) => {
    setLoading(true);
    deleteShareData(id)
      .then(() => {
        form.resetFields();
        setLoading(false);
        fetchAllShareSubmittal({ submittal_id: submittal_id });
        OpenNotification(NotificationType.SUCCESS, "Submittal Unshared", "");
      })
      .catch((error) => {
        setLoading(true);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            "Failed to Unshared Submittal",
            e.message
          )
        );
      });
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
        title=" Submittal"
        visible={isModalVisible}
        onCancel={handleOk}
        width={800}
        footer={[]}
      >
        <Form form={form} onFinish={Submit} layout="vertical">
          <div className="row">
            <div className="col-md-12">
              <Form.Item label="Remark" name="remark">
                <Input.TextArea rows={1} placeholder="message" />
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
        </Form>
        <Divider />
        <div className="row mt-3">
          <div className="col-md-12">
            <Table
              loading={share_submittal.isPending}
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
                  width: 200,
                  render: (value, record) => (
                    <span>
                      {
                        users.payload.find((e) => e.id === record.user_id)
                          ?.full_name
                      }
                    </span>
                  ),
                },
                {
                  title: "Remark",
                  dataIndex: "remark",
                  width: 300,
                },
                {
                  title: "Unshare",
                  width: 100,
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
              dataSource={share_submittal.payload?.map((e, index) => {
                return {
                  ...e,
                  key: index,
                };
              })}
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
  project: state.project.fetchOne,
  users: state.user.fetchAll,
  share_submittal: state.share_submittal.fetchAll,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchAllShareSubmittal: (action: any) =>
    dispatch(fetchAllShareSubmittal(action)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShareSubmittalComponent);
