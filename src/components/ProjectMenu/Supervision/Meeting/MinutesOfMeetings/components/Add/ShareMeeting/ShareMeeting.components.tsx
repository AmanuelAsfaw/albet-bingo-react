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
  ShareMeetingPropType,
  sendShareMeetingData,
  deleteShareMeetingData,
} from "./ShareMeeting.util";
import { ErrorHandler, getUserData } from "../../../../../../../../utilities/utilities";
import { OpenNotification } from "../../../../../../../common/Notification/Notification.component";
import { NotificationType } from "../../../../../../../../constants/Constants";
import { fetchAllMeeting } from "../../../../../../../../redux/Meeting/Meeting.action";
import { fetchAllUser } from "../../../../../../../../redux/User/User.action";
import Table from "antd/lib/table";
import { User } from "../../../../../../../../redux/User/User.type";
import { SharedMeeting } from "../../../../../../../../redux/SharedMeeting/SharedMeeting.type";

const ShareMeetingComponent: FC<ShareMeetingPropType> = ({
  users,
  fetchAllUser,
  fetchMeeting,
  meeting,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const [selectedUser, setSelectedUser] = useState<SharedMeeting[]>([]);

  useEffect(() => {
    if (isModalVisible) {
      fetchAllUser();
    }
  }, [fetchMeeting, fetchAllUser, isModalVisible]);

  useEffect(()=>{
    if(meeting.meeting_shared_users && meeting.meeting_shared_users.length){
      setSelectedUser(meeting.meeting_shared_users)
    }
  },[meeting])
  const handleOk = () => {
    setIsModalVisible(false);
    setLoading(false);
  };

  const Submit = (value: any) => {
    console.log(value);
    
    setLoading(true);
    let parsedData = value.shared_users.map((user_id: any) => {
      return {
        user_id,
        meeting_id: meeting.id,
        is_approved: false
        // remark: value.remark,
      };
    });

    sendShareMeetingData(parsedData)
      .then(() => {
        form.resetFields();
        fetchMeeting();
        setLoading(false);
        OpenNotification(NotificationType.SUCCESS, "Meeting Shared", "");
      })
      .catch((error) => {
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            "Failed to share meeting",
            e.message
          )
        );
      });
  };

  const onDelete = (id: any) => {
    setLoading(true);
    deleteShareMeetingData(id)
      .then((res) => {
        form.resetFields();
        setLoading(false);
        fetchMeeting();
        OpenNotification(NotificationType.SUCCESS, "Meeting Unshared", "");
      })
      .catch((error) => {
        setLoading(true);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            "Failed to Meeting Unshared",
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
        title="Share Meeting"
        visible={isModalVisible}
        onCancel={handleOk}
        width={800}
        footer={[]}
      >
        <Form form={form} onFinish={Submit} layout="vertical">
          
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
                  {users.payload
                    // .filter((e) => e.id !== getUserData().id)
                    .map((user) => (
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
              dataSource={selectedUser?.map((e, index) => {
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
  users: state.user.fetchAll,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchMeeting: (action: any) => dispatch(fetchAllMeeting(action)),
  fetchAllUser: () => dispatch(fetchAllUser()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShareMeetingComponent);
