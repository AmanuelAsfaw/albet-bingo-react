import { MoreOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Popover, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import moment from "moment";
import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Message, NotificationType } from "../../../../../constants/Constants";
import { fetchMaterial } from "../../../../../redux/Material/Material.action";
import { fetchAllSiteDiary } from "../../../../../redux/SiteDiary/SiteDiary.action";
import { SiteDiary } from "../../../../../redux/SiteDiary/SiteDiary.type";
import { fetchAllUser } from "../../../../../redux/User/User.action";
import { zeroPad } from "../../../../../utilities/utilities";
import { OpenNotification } from "../../../../common/Notification/Notification.component";
import ReloadButtonComponent from "../../../../common/ReloadButton/ReloadButton.component";
import UserApprovalComponent from "../../../../common/UserApproval/UserApproval.component";
import AddSiteSalary from "./components/AddSiteDiary/AddSiteDiary";
import EditSiteDiary from "./components/EditSiteDiary/EditSiteDiary";
import PrintSiteDiaryPrint from "./components/PrintSiteDiary/PrintSiteDiary";
import {
  deleteSiteDiary,
  pendingSiteDiary,
  SiteDiaryPropType,
} from "./util/SiteDiary.util";
import ViewSiteDiary from "./components/ViewSiteDiary/ViewSiteDiary";
import AuthenticationComponent from "../../../../common/Auth/Authentication.component";

const SiteDiaryComponent: FC<SiteDiaryPropType> = ({
  site_diary,
  project,
  fetchSiteDiaries,
  fetchUsers,
  fetchMaterial,
}) => {
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState();
  const [is_visible, setVisible] = useState(false);

  useEffect(() => {
    fetchSiteDiaries({ project_id: project?.payload?.id });
  }, [fetchSiteDiaries, project]);
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);
  useEffect(() => {
    fetchMaterial();
  }, [fetchMaterial]);

  const onDeleteSiteReport = (id: any) => {
    setLoading(true);
    deleteSiteDiary(id)
      .then(() => {
        setLoading(false);
        fetchSiteDiaries({ project_id: project?.payload.id });
        OpenNotification(
          NotificationType.SUCCESS,
          Message.SITE_DIARY_DELETE_SUCCESS,
          ""
        );
      })
      .catch((error) => {
        setLoading(false);
        OpenNotification(
          NotificationType.ERROR,
          Message.SITE_DIARY_DELETE_FAILURE,
          "Error occurred"
        );
      });
  };

  const PendingSiteReport = (id: any) => {
    pendingSiteDiary(id)
      .then(() => {
        fetchSiteDiaries({ project_id: project?.payload.id });
        OpenNotification(
          NotificationType.SUCCESS,
          Message.SITE_DIARY_PENDING_SUCCESS,
          ""
        );
      })
      .catch((error) => {
        console.log(error);
        OpenNotification(
          NotificationType.ERROR,
          Message.SITE_DIARY_PENDING_FAILURE,
          "Error occurred"
        );
      });
  };

  const columns: ColumnsType<SiteDiary> = [
    {
      title: "Report NO",
      render: (record, data, index) => zeroPad(index + 1),
    },
    {
      title: "Report Period",
      dataIndex: "date",
      render: (record, data, index) => moment(record).format("DD/MM/YYYY"),

      sorter: (a, b) => (moment(a.date).isBefore(b.date) ? 1 : -1),
      sortOrder: "descend",
    },
    {
      title: "Approval",
      render: (record, data, index) => (
        <UserApprovalComponent
          type="site-diary"
          item_id={data.id}
          approve_only={true}
          has_revision={true}
          approved_by={data.sd_approved_by}
          checked_by={data.sd_checked_by}
          is_approved={data.is_approved}
          is_checked={data.is_checked}
          on_revision={data.on_revision}
        />
      ),
    },
    {
      title: "Action",
      render: (record, data, index) => (
        <div className="row">
          <Popover
            placement="rightTop"
            overlayClassName="action-popover"
            trigger="focus"
            content={
              <div className="d-flex flex-column">
                <ViewSiteDiary site_diary={data} index={index + 1} />
                <Button
                  type="text"
                  onClick={() => {
                    setSelected(record);
                    setVisible(true);
                  }}
                >
                  Print
                </Button>
                {data?.is_approved ? (
                  <Popconfirm
                    placement="leftTop"
                    title="Are you sure you want to update weekly report to pending?"
                    onConfirm={() => PendingSiteReport(data.id)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button type="text">Reverse Approval</Button>
                  </Popconfirm>
                ) : (
                  <></>
                )}
                {!data.is_approved ? (
                  <>
                    <EditSiteDiary site_diary={data} index={index + 1} />
                    <Popconfirm
                      placement="leftTop"
                      title="Are you sure you want to remove the site report"
                      onConfirm={() => onDeleteSiteReport(data.id)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button danger type="text" loading={loading}>
                        Delete
                      </Button>
                    </Popconfirm>
                  </>
                ) : null}
              </div>
            }
          >
            <Button
              icon={<MoreOutlined />}
              className="btn-outline-secondary border-0"
            ></Button>
          </Popover>
        </div>
      ),
    },
  ];

  return (
    <div className="row">
      <div className="col-md-12">
        <ReloadButtonComponent onClick={() => fetchSiteDiaries()} />
        <AuthenticationComponent type="WRITE">
          <AddSiteSalary index={site_diary.payload.length + 1} />
        </AuthenticationComponent>
      </div>
      <div className="col-md-12 mt-2 hidden-print">
        <Table
          pagination={false}
          columns={columns}
          dataSource={site_diary.payload.map((e, index) => ({
            ...e,
            key: Date.now() + index,
          }))}
          loading={site_diary.isPending}
        />
      </div>
      <PrintSiteDiaryPrint
        dataAction={[selected, setSelected]}
        visibilityAction={[is_visible, setVisible]}
        project={project.payload}
      />
    </div>
  );
};

/**
 * Map State to Props
 *
 * @param state
 */
const mapStateToProps = (state: any) => ({
  project: state.project.fetchOne,
  site_diary: state.site_diary.fetchAll,
  users: state.user.fetchAll,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchSiteDiaries: (action: any) => dispatch(fetchAllSiteDiary(action)),
  fetchUsers: () => dispatch(fetchAllUser()),
  fetchMaterial: () => dispatch(fetchMaterial()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SiteDiaryComponent);
