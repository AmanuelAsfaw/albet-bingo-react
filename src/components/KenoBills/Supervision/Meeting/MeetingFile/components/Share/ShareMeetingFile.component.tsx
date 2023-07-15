import { Button, Divider, Form, Input, Modal, Select } from "antd";
import { FC, useState, useEffect } from "react";
import { connect } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";
import {
  ShareMeetingFilePropType,
  sendShareData,
  deleteShareData,
} from "../../util/MeetingFile.util";
import {
  UsergroupAddOutlined,
  UserSwitchOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import Table from "antd/lib/table";
import { isEmpty } from "lodash";
import {
  ErrorHandler,
  getUserData,
} from "../../../../../../../utilities/utilities";
import { OpenNotification } from "../../../../../../common/Notification/Notification.component";
import { NotificationType } from "../../../../../../../constants/Constants";
import { fetchAllShareMeetingFile } from "../../../../../../../redux/ShareMeetingFile/ShareMeetingFile.action";

const ShareMeetingFileComponent: FC<ShareMeetingFilePropType> = ({
  project,
  users,
  meeting_file_id,
  share_meeting_files,
  fetchAllShareMeetingFile,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<any>([]);
  const [datas, setDatas] = useState<any>([]);
  const [form] = Form.useForm();

  useEffect(() => {
    if (!isEmpty(project)) {
      let result = users.filter((o1) =>
        project.user_controls?.some(
          (o2) => o1.id === o2.user_id || o1.is_super_user
        )
      );
      setUserData(result);
    }
  }, [users, project, isModalVisible]);

  useEffect(() => {
    if (isModalVisible) {
      fetchAllShareMeetingFile({ meeting_file_id: meeting_file_id });
    }
  }, [fetchAllShareMeetingFile, meeting_file_id, isModalVisible]);

  const handleOk = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const Submit = (value: any) => {
    setLoading(true);
    let parsedData = value.shared_users.map((user_id: any) => {
      return {
        user_id,
        project_id: project?.id,
        meeting_file_id: meeting_file_id,
        sender: getUserData().id,
        remark: value.remark,
      };
    });

    sendShareData(parsedData)
      .then(() => {
        form.resetFields();
        setLoading(false);
        fetchAllShareMeetingFile({ meeting_file_id: meeting_file_id });
        OpenNotification(NotificationType.SUCCESS, "Meeting File Shared!!", "");
      })
      .catch((error) => {
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            "Failed to share meeting file",
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
        fetchAllShareMeetingFile({ meeting_file_id: meeting_file_id });
        OpenNotification(NotificationType.SUCCESS, "Meeting file Unshared", "");
      })
      .catch((error) => {
        setLoading(true);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            "Failed to Unshared meeting file",
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
        title="Share Meeting File"
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
                  {userData
                    .filter((e: any) => e.id !== getUserData().id)
                    .map((user: any) => (
                      <Select.Option value={user.id}>
                        {user.full_name}
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
              loading={share_meeting_files.isPending}
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
                      {users.find((e) => e.id === record.user_id)?.full_name}
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
              dataSource={share_meeting_files.payload?.map((e, index) => {
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
  share_meeting_files: state.share_meeting_file.fetchAll,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchAllShareMeetingFile: (action: any) =>
    dispatch(fetchAllShareMeetingFile(action)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShareMeetingFileComponent);
