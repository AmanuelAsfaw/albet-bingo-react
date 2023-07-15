import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { NotificationType } from "../../../../constants/Constants";
import { fetchAllUser } from "../../../../redux/User/User.action";
import { ErrorHandler, getUserData, zeroPad } from "../../../../utilities/utilities";
import { OpenNotification } from "../../../common/Notification/Notification.component";
import {
  deleteData,
  POST_STATUS,
  DELETE_STATUS,
  ExternalDocumentPropType,
} from "./util/ExternalDocument.util";
import { DownloadFile } from "../../../Document/MyDocument/index.util";
import { Table, Button, Popconfirm } from "antd";
import { CloudDownloadOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/lib/table";
import DocumentViewerComponent from "../../../common/DocumentViewer/DocumentViewer.component";
import ReloadButtonComponent from "../../../common/ReloadButton/ReloadButton.component";
import AuthenticationComponent from "../../../common/Auth/Authentication.component";
import ShareComponent from "../../../common/ShareComponent/Share.component";
import { toNumber } from "lodash";
import { fetchAllExternalDocuments } from "../../../../redux/ExternalDocument/ExternalDocument.action";
import AddExternalDocumentComponent from "./components/AddExternalDocument/AddExternalDocument.component";

const ExternalDocumentComponent: FC<ExternalDocumentPropType> = ({
  project,
  users,
  fetchUser,
  external_document,
  fetchExternalDocument,
}) => {
  const [datas, setDatas] = useState<any>([]);

  useEffect(() => {
    fetchExternalDocument({ project_id: project.payload?.id });
    fetchUser();
  }, [fetchExternalDocument, project, fetchUser]);

  useEffect(() => {
    if (external_document.payload.length) {
      let arr = [];
      arr = external_document.payload.map((item: any, index: any) => ({
        key: index,
        ...item,
      }));
      setDatas(arr);
    }
  }, [external_document]);

  const OnDelete = (id: any) => {
    deleteData(id)
      .then(() => {
        fetchExternalDocument({ project_id: project.payload?.id });
        OpenNotification(
          NotificationType.SUCCESS,
          "External Document delete!",
          ""
        );
      })
      .catch((error) => {
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            "Failed to delete external document",
            e.message
          )
        );
      });
  };

  const [loading, setLoading] = useState(false);
  const onCreateStatus = (data: any) => {
    setLoading(true);
    POST_STATUS(data)
      .then(() => {
        setLoading(false);
        fetchExternalDocument();
        OpenNotification(NotificationType.SUCCESS, "User Assigned", "");
      })
      .catch((error) => {
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            "Failed to Assign User",
            e.message
          )
        );
      });
  };

  const onStatusRemove = (id: number) => {
    setLoading(true);
    DELETE_STATUS(id)
      .then(() => {
        setLoading(false);
        fetchExternalDocument();
        OpenNotification(NotificationType.SUCCESS, "Assigned User Removed", "");
      })
      .catch((error) => {
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            "Failed to Remove Assigned User",
            e.message
          )
        );
      });
  };


  const column: ColumnsType<any> = [
    {
      title: "No",
      key: "no",
      render: (value, record, index) => <span>{index + 1}</span>,
    },
    {
      title: "Date",
      key: "date",
      dataIndex: "date",
      render: (value, record) => <span>{record.date}</span>,
    },
    {
      title: "Type",
      key: "type",
      dataIndex: "type",
      render: (date, record) => <span>{record.type}</span>,
    },
    {
      title: "Description",
      key: "description",
      dataIndex: "description",
      render: (date, record) => <span>{record.description}</span>,
    },
    {
      title: "File",
      className: "pl-0-td pr-0-td",
      render: (date, record) => (
        <>
          {record.document ? (
            <>
              <Button
                type="link"
                icon={<CloudDownloadOutlined />}
                onClick={() => DownloadFile(record.document)}
              />
              <DocumentViewerComponent document={record.document} />
            </>
          ) : null}
        </>
      ),
    },

    {
      title: "Share",
      render: (value, record) => (
        <ShareComponent
          feature="Variation"
          project_id={toNumber(project.payload?.id)}
          loading={loading}
          onRemove={(id: number) => onStatusRemove(id)
          }
          onShare={(data: { type: string; user_id: number }) =>
            onCreateStatus({
              ...data,
              external_document_id: record.id,
              identification: `V-${zeroPad(record.id)}`,
            })
          }
          payload={record.external_document_statuses ? record.external_document_statuses : []}
        />
      ),
    },
    {
      title: "Action",
      className: "pl-0-td pr-0-td",
      render: (data, record) => (
        <AuthenticationComponent type="DELETE">
          <Popconfirm
            placement="leftTop"
            title="Are you sure you want to remove this variation?"
            onConfirm={() => OnDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger type="text">
              Delete
            </Button>
          </Popconfirm>
        </AuthenticationComponent>
      ),
    },
  ];

  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <AuthenticationComponent type="WRITE">
            <AddExternalDocumentComponent />
          </AuthenticationComponent>

          <ReloadButtonComponent
            onClick={() =>
              fetchExternalDocument({ project_id: project.payload?.id })
            }
          />
        </div>
        <div className="col-md-12 mt-2 hidden-print">
          <Table
            loading={external_document.isPending}
            columns={column}
            dataSource={datas}
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
  users: state.user.fetchAll,
  external_document: state.external_document.fetchAll,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchUser: (action: any) => dispatch(fetchAllUser(action)),
  fetchExternalDocument: (action: any) =>
    dispatch(fetchAllExternalDocuments(action)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExternalDocumentComponent);
