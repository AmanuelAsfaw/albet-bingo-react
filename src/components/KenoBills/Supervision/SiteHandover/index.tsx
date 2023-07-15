import { Button, Popconfirm, Table } from "antd";
import moment from "moment";
import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { NotificationType } from "../../../../constants/Constants";
import { fetchAllSiteHandover } from "../../../../redux/SiteHandover/SiteHandover.action";
import { ErrorHandler, getUserData } from "../../../../utilities/utilities";
import { OpenNotification } from "../../../common/Notification/Notification.component";
import { deleteData, SiteHandoverPropType } from "./utils/SiteHandover.util";
import { CloudDownloadOutlined, DeleteOutlined } from "@ant-design/icons";
import AddSiteHandoverComponent from "./components/Add/AddSiteHandover.component";

import DocumentViewerComponent from "../../../common/DocumentViewer/DocumentViewer.component";
import { DownloadFile } from "../../../Document/MyDocument/index.util";
import { fetchAllUser } from "../../../../redux/User/User.action";
import ShareSiteHandoverComponent from "./components/Share/ShareSiteHandover.component";
import ReloadButtonComponent from "../../../common/ReloadButton/ReloadButton.component";
import AuthenticationComponent from "../../../common/Auth/Authentication.component";

const SiteHandoverComponent: FC<SiteHandoverPropType> = ({
  fetchSiteHandovers,
  project,
  site_handovers,
  fetchUser,
  users,
}) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    fetchSiteHandovers({ project_id: project.payload?.id });
  }, [fetchSiteHandovers, project]);

  const onDelete = (id: any) => {
    setLoading(true);
    deleteData(id)
      .then(() => {
        setLoading(false);
        fetchSiteHandovers({ project_id: project.payload?.id });
        OpenNotification(
          NotificationType.SUCCESS,
          "Site Handover Deleted Successfully",
          ""
        );
      })
      .catch((error) => {
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            "Failed to Delete Site Handover ",
            e.message
          )
        );
      });
  };

  return (
    <>
      <div className="row hidden-print">
        <div className="col-md-12 mb-2 hidden-print">
          <ReloadButtonComponent
            onClick={() =>
              fetchSiteHandovers({ project_id: project.payload?.id })
            }
          />
          <AuthenticationComponent type="WRITE">
            <AddSiteHandoverComponent />
          </AuthenticationComponent>
        </div>
      </div>
      <div className="row hidden-print mt-2">
        <div className="col-md-12 hidden-print">
          <Table
            loading={site_handovers.isPending}
            columns={[
              {
                title: "No",
                dataIndex: "no",
                key: "no",
                render: (text, record, index) => index + 1,
              },
              {
                title: "Date",
                dataIndex: "date",
                key: "date",
                render: (text, record) =>
                  moment(record.date).format("DD/MM/YYYY"),
              },
              {
                title: "Location",
                dataIndex: "location",
                key: "location",
              },
              {
                title: "File",
                dataIndex: "document",
                key: "document",
                render: (date, record) => (
                  <>
                    {" "}
                    <Button
                      type="link"
                      icon={<CloudDownloadOutlined />}
                      onClick={() =>
                        record.document ? DownloadFile(record.document) : ""
                      }
                    ></Button>
                    {record.document ? (
                      <DocumentViewerComponent document={record.document} />
                    ) : null}
                  </>
                ),
              },
              {
                title: "Action",
                align: "center",
                width: "80px",
                render: (value, record) => (
                  <div className="d-inline-flex">
                    <ShareSiteHandoverComponent
                      site_handover_id={record.id}
                      users={users.payload}
                      project={project.payload}
                    />
                    {record.user_id === getUserData().id ? (
                      <>
                        <Popconfirm
                          placement="leftTop"
                          title="Are you sure you want to remove this Site Handover?"
                          onConfirm={() => onDelete(record.id)}
                          okText="Yes"
                          cancelText="No"
                        >
                          <Button
                            loading={loading}
                            className="btn-outline-danger"
                            icon={<DeleteOutlined />}
                          >
                            Delete
                          </Button>
                        </Popconfirm>
                      </>
                    ) : null}
                  </div>
                ),
              },
            ]}
            dataSource={site_handovers.payload}
            rowKey="id"
          />
        </div>
      </div>
    </>
  );
};

/**
 * Map State to Props
 *
 * @param state
 */
const mapStateToProps = (state: any) => ({
  site_handovers: state.site_handover.fetchAll,
  project: state.project.fetchOne,
  users: state.user.fetchAll,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchSiteHandovers: (action: any) => dispatch(fetchAllSiteHandover(action)),
  fetchUser: (action: any) => dispatch(fetchAllUser(action)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SiteHandoverComponent);
