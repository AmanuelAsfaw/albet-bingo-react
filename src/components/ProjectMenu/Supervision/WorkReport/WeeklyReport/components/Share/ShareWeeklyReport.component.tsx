import { Button, Form, Modal, Select, Table } from "antd";
import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  CloseOutlined,
  ShareAltOutlined,
  UsergroupAddOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import { OpenNotification } from "../../../../../../common/Notification/Notification.component";
import { NotificationType } from "../../../../../../../constants/Constants";
import {
  ErrorHandler,
  getUserData,
} from "../../../../../../../utilities/utilities";
import { ShareWeeklyReportPropType, PUT } from "../../util/WeeklyReport.util";
import { setWeekReport } from "../../../../../../../redux/WeekReport/WeekReport.action";
import { WeekReport } from "../../../../../../../redux/WeekReport/WeekReport.type";
const ShareWeeklyReportComponent: FC<ShareWeeklyReportPropType> = ({
  project,
  setWeeklyReport,
  weekly_report,
  weekly_reports,
  users,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    let temp = weekly_report.shared_users.map((id) => {
      let found = users.payload.find((user) => user.id === id);

      if (found) return found;
      else return null;
    });
    if (temp) {
      setData(temp.filter((e) => e));
    }
  }, [weekly_report, users]);

  const onUnshare = (user_id: number) => {
    let temp = [...weekly_reports.payload];
    let index = temp.findIndex((e) => e.id === weekly_report.id);
    if (index !== -1) {
      let item = temp[index];
      item = {
        ...item,
        shared_users: item.shared_users.filter((e) => e !== user_id),
      };
      temp.splice(index, 1, item);

      setWeeklyReport(temp);
      setLoading(true);
      PUT({ id: weekly_report.id, shared_users: item.shared_users })
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

  const renderOwnerOption = () =>
    users.payload.map((e, index) =>
      e.id !== getUserData().id && e.is_super_user ? (
        <Select.Option key={Date.now() + index} value={e.id}>
          {e.full_name}
        </Select.Option>
      ) : null
    );

  const Submit = (value: any) => {
    let temp = [...weekly_reports.payload];
    let index = temp.findIndex((e) => e.id === weekly_report.id);
    if (index !== -1) {
      let item = temp[index];
      item = {
        ...item,
        shared_users: [...item.shared_users, ...value.user_ids],
      };
      temp.splice(index, 1, item);

      setWeeklyReport(temp);
      setLoading(true);
      PUT({ id: weekly_report.id, shared_users: item.shared_users })
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
        className="btn-outline-small"
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
              <Form.Item name="user_ids" label="Shared Users">
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
  weekly_reports: state.week_report.fetchAll,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  setWeeklyReport: (action: WeekReport[]) => dispatch(setWeekReport(action)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShareWeeklyReportComponent);
