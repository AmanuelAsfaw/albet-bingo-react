import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchAllLetter } from "../../../redux/Letter/Letter.action";
import {
  LetterPropType,
  deleteData,
  parsePayloadOutgoingData,
} from "../util/Letter.util";
import { Letter } from "../../../redux/Letter/Letter.type";
import Table, { ColumnsType } from "antd/lib/table";
import moment from "moment";
import { Button, Form, Input, Popconfirm } from "antd";
import { DeleteOutlined, DownloadOutlined } from "@ant-design/icons";
import { DownloadFile } from "../../Document/MyDocument/index.util";
import AddLetterComponent from "./components/Add/AddLetter.component";
import { NotificationType } from "../../../constants/Constants";
import { OpenNotification } from "../../common/Notification/Notification.component";
import { ErrorHandler, getUserData } from "../../../utilities/utilities";

import ReloadButtonComponent from "../../common/ReloadButton/ReloadButton.component";
import ShareLetterComponent from "../IncomingLetter/components/ShareLetter/ShareLetter.component";
import RemarkComponent from "../Remark/Remark.component";
import DocumentViewerComponent from "../../common/DocumentViewer/DocumentViewer.component";

const OutgoingLetterComponent: FC<LetterPropType> = ({
  fetchLetter,
  letters,
  tab,
}) => {
  const [outgoingData, setOutgoingData] = useState<any>([]);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchLetter();
  }, [fetchLetter, tab]);

  useEffect(() => {
    if (letters.payload.length > 0) {
      setOutgoingData(
        parsePayloadOutgoingData(letters.payload, getUserData().id).map(
          (item: any, index: any) => ({
            key: index,
            ...item,
          })
        )
      );
    } else {
      setOutgoingData([]);
    }
  }, [letters, tab]);

  const OnDelete = (id: any) => {
    deleteData(id)
      .then(() => {
        fetchLetter();
        OpenNotification(NotificationType.SUCCESS, "Letter delete!", "");
      })
      .catch((error) => {
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            "Failed to delete letter",
            e.message
          )
        );
      });
  };

  const column: ColumnsType<Letter> = [
    {
      title: "Date",
      key: "date",
      width: "100px",
      render: (value, record) => moment(record.date).format("DD/MM/YYYY"),
      defaultSortOrder: "ascend",
      sortDirections: ["descend", "ascend"],
      sorter: (a, b) => (moment(a.date).isBefore(moment(b.date)) ? -1 : 1),
    },
    {
      title: "Reference No",
      key: "reference_no",
      width: "100px",
      dataIndex: "reference_number",
    },
    {
      title: "Project",
      key: "project_id",
      dataIndex: "project_id",
      width: "100px",
      render: (record, data) => data.project?.name ?? "-",
    },
    {
      title: "Subject",
      dataIndex: "subject",
      key: "subject",
      width: "300px",
    },
    {
      title: "To",
      key: "to",
      width: "200px",
      render: (value, record) => record.to,
    },
    {
      title: "Document",
      key: "document",
      width: "120px",
      className: "px-1",
      render: (value, record) => (
        <div className="d-flex">
          <Button
            type="link"
            icon={<DownloadOutlined />}
            className="mr-2"
            onClick={() => DownloadFile(record.document)}
          ></Button>
          {record.document ? (
            <DocumentViewerComponent document={record.document} />
          ) : null}
        </div>
      ),
    },
    {
      title: "Remark",
      width: "80px",
      render: (value, record) => <RemarkComponent remarkData={record} />,
    },
    {
      title: "Action",
      align: "center",
      width: "80px",
      render: (value, record) => (
        <div className="d-inline-flex">
          <ShareLetterComponent letter={record} />
          {record.user_id === getUserData().id ? (
            <>
              <Popconfirm
                placement="leftTop"
                title="Are you sure you want to remove this letter?"
                onConfirm={() => OnDelete(record.id)}
                okText="Yes"
                cancelText="No"
              >
                <Button
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
  ];

  const onSearch = (value: any) => {
    let query = value.target.value.toLowerCase();
    let arr = letters.payload.filter(
      (e) =>
        e.reference_number.toLowerCase().includes(query) ||
        e.to.toLowerCase().includes(query) ||
        e.subject?.toLowerCase().includes(query)
    );
    setOutgoingData(parsePayloadOutgoingData(arr, getUserData().id));
  };

  return (
    <div className="row">
      <div className="col-md-3">
        <Form form={form} layout="vertical" onChange={onSearch}>
          <Form.Item label="Search Letters" name="query">
            <Input.Search placeholder="search....    reference no, to ,subject" />
          </Form.Item>
        </Form>
      </div>
      <div className="col-md-12 mb-2">
        <ReloadButtonComponent onClick={() => fetchLetter()} />
        <AddLetterComponent />
      </div>
      <div className="col-md-12 hidden-print">
        <Table
          columns={column}
          dataSource={outgoingData}
          loading={letters.isPending}
        />
      </div>
    </div>
  );
};

/**
 * Map State to Props
 *
 * @param state
 */
const mapStateToProps = (state: any) => ({
  letters: state.letter.fetchAll,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchLetter: (action: any) => dispatch(fetchAllLetter(action)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OutgoingLetterComponent);
