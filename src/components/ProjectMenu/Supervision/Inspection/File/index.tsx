import { DownloadOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Table } from "antd";
import moment from "moment";
import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { NotificationType, Message } from "../../../../../constants/Constants";
import { fetchAllDocuments } from "../../../../../redux/Document/Document.action";
import { fetchAllUser } from "../../../../../redux/User/User.action";
import { ErrorHandler, getUserData } from "../../../../../utilities/utilities";
import AuthenticationComponent from "../../../../common/Auth/Authentication.component";
import DocumentViewerComponent from "../../../../common/DocumentViewer/DocumentViewer.component";
import { OpenNotification } from "../../../../common/Notification/Notification.component";
import { DownloadFile } from "../../../../Document/MyDocument/index.util";
import AddInspectionFileComponent from "./components/AddFile/AddInspectionFile.component";
import ShareInspectionComponent from "./components/Share/ShareInspection.component";
import { DELETE, InspectionFilePropType } from "./utils/Inspection.util";

const InspectionFileComponent: FC<InspectionFilePropType> = ({
  documents,
  fetchDocuments,
  fetchUsers,
  project,
}) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDocuments({ project_id: project.payload?.id, type: "Inspection" });
  }, [fetchDocuments, project]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const onDelete = (id: number) => {
    setLoading(true);
    DELETE(id)
      .then(() => {
        setLoading(false);
        fetchDocuments({ type: "Site Diary", project_id: project.payload?.id });
        OpenNotification(
          NotificationType.SUCCESS,
          Message.DOCUMENT_REMOVE_SUCCESS,
          ""
        );
      })
      .catch((error) => {
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            Message.DOCUMENT_REMOVE_FAILED,
            e.message
          )
        );
      });
  };

  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <AuthenticationComponent type="WRITE">
            <AddInspectionFileComponent />
          </AuthenticationComponent>
        </div>
      </div>
      <div className="row mt-2">
        <div className="col-md-12">
          <Table
            columns={[
              {
                title: "No",
                key: "no",
                dataIndex: "key",
              },

              {
                title: "Date",
                key: "date",
                render: (value, record) =>
                  moment(record.date).format("DD-MM-YYYY"),
              },
              {
                title: "Location",
                key: "name",
                dataIndex: "name",
              },
              {
                title: "Inspection Type",
                key: "detail_type",
                dataIndex: "detail_type",
              },
              {
                title: "Uploaded By",
                key: "uploader",
                render: (value, record) => record.user?.full_name,
              },
              {
                title: "File",
                key: "file",
                width: "120px",
                className: "px-1",
                render: (value, record) => (
                  <div className="d-flex">
                    <Button
                      type="link"
                      icon={<DownloadOutlined />}
                      className="mr-2"
                      onClick={() => DownloadFile(record)}
                    ></Button>

                    <DocumentViewerComponent document={record} />
                  </div>
                ),
              },
              {
                title: "Action",
                key: "action",
                width: "120px",
                className: "px-1",
                render: (value, record) => (
                  <div className="d-flex">
                    {record.user_id === getUserData().id ? (
                      <div className="d-flex">
                        <ShareInspectionComponent document_id={record.id} />
                        <Popconfirm
                          placement="leftTop"
                          title="Are you sure you want to remove this File?"
                          onConfirm={() => onDelete(record.id)}
                          okText="Yes"
                          cancelText="No"
                        >
                          <Button danger type="text" loading={loading}>
                            Delete
                          </Button>
                        </Popconfirm>
                      </div>
                    ) : null}
                  </div>
                ),
              },
            ]}
            dataSource={documents.payload.map((e, index) => ({
              ...e,
              key: index + 1,
            }))}
            loading={documents.isPending}
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
  project: state.project.fetchOne,
  documents: state.document.fetchAll,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchUsers: (action: any) => dispatch(fetchAllUser(action)),
  fetchDocuments: (action: any) => dispatch(fetchAllDocuments(action)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InspectionFileComponent);
