import { ColumnsType } from "antd/lib/table";
import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { MoreOutlined, DeleteOutlined } from "@ant-design/icons";
import { SiteBookPropType, deleteData } from "./util/SiteBook.util";
import { CloudDownloadOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Popover, Table } from "antd";
import { DownloadFile } from "../../../Document/MyDocument/index.util";
import { fetchAllSiteBook } from "../../../../redux/SiteBook/SiteBook.action";
import AddSiteBookComponent from "./components/Add/AddSiteBook.component";
import moment from "moment";
import { ErrorHandler, getUserData } from "../../../../utilities/utilities";
import { OpenNotification } from "../../../common/Notification/Notification.component";
import { Message, NotificationType } from "../../../../constants/Constants";
import EditSiteBook from "./components/Edit/Edit.component";
import DocumentViewerComponent from "../../../common/DocumentViewer/DocumentViewer.component";
import AuthenticationComponent from "../../../common/Auth/Authentication.component";
const SiteBookComponent: FC<SiteBookPropType> = ({
  site_books,
  project,
  fetchSiteBook,
}) => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchSiteBook({ project_id: project.payload?.id });
  }, [fetchSiteBook, project]);

  const OnDelete = (id: number) => {
    setLoading(true);
    deleteData(id)
      .then(() => {
        fetchSiteBook({ project_id: project.payload?.id });

        setLoading(false);
        OpenNotification(NotificationType.SUCCESS, Message.REMOVE_SUCCESS, "");
      })
      .catch((error) => {
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            Message.REMOVE_FAILED,
            e.message
          )
        );
      });
  };

  const column: ColumnsType<any> = [
    {
      title: "Order No",
      key: "no",
      render: (value, record, index) => record.no,
    },
    {
      title: "Date",
      key: "date",
      render: (value, record, index) =>
        moment(record.date).format("DD/MM/YYYY"),
    },
    {
      title: "Type",
      key: "type",
      render: (value, record, index) => record.type,
    },
    {
      title: "File",
      key: "file",
      render: (value, record) => (
        <>
          <Button
            type="link"
            icon={<CloudDownloadOutlined />}
            onClick={() => DownloadFile(record.document)}
          ></Button>
          {record.document ? (
            <DocumentViewerComponent document={record.document} />
          ) : null}
        </>
      ),
    },
    {
      title: "Action",
      dataIndex: "id",
      width: "20%",
      render: (value, record, index) => (
        <>
          <Popover
            placement="rightTop"
            overlayClassName="action-popover"
            trigger="focus"
            content={
              <div className="d-flex flex-column">
                {record.user_id === getUserData().id ? (
                  <>
                    <EditSiteBook
                      site_book={{ ...record, date: moment(record.date) }}
                    />
                    <Popconfirm
                      placement="leftTop"
                      title="Are you sure you want to remove"
                      onConfirm={() => OnDelete(record.id)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button
                        type="text"
                        loading={loading}
                        className="mr-1"
                        danger
                      >
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
        </>
      ),
    },
  ];

  return (
    <>
      <div className="row">
        <div className="col-md-12 mb-2">
          <AuthenticationComponent type="WRITE">
            <AddSiteBookComponent />
          </AuthenticationComponent>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <Table
            columns={column}
            dataSource={site_books.payload.map((e, index) => ({
              ...e,
              key: index + 1,
            }))}
            loading={site_books.isPending}
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
  site_books: state.site_book.fetchAll,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchSiteBook: (action: any) => dispatch(fetchAllSiteBook(action)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SiteBookComponent);
