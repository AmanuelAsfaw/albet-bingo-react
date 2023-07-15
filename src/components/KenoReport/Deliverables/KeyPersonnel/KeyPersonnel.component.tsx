import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import Table, { ColumnsType } from "antd/lib/table";
import moment from "moment/moment";
import { Button, Input, Popconfirm, Popover } from "antd";
import {
  DeleteOutlined,
  MoreOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { KeyPersonnel } from "../../../../redux/KeyPersonnel/KeyPersonnel.type";
import ReloadButtonComponent from "../../../common/ReloadButton/ReloadButton.component";
import {
  DELETE,
  KeyPersonnelPropType,
  DELETE_STATUS,
  POST_STATUS,
} from "./util/utils";
import { fetchKeyPersonnel } from "../../../../redux/KeyPersonnel/KeyPersonnel.action";
import KeyPersonnelFormComponent from "./components/KeyPersonnel.form.component";
import { OpenNotification } from "../../../common/Notification/Notification.component";
import { Message, NotificationType } from "../../../../constants/Constants";
import { ErrorHandler, zeroPad } from "../../../../utilities/utilities";
import ShareComponent from "../../../common/ShareComponent/Share.component";
import { toNumber } from "lodash";

const KeyPersonnelComponent: FC<KeyPersonnelPropType> = ({
  key_personnel,
  fetchKeyPersonnel,
  project,
}) => {
  const [searchParam, setSearchParam] = useState("");

  const OnDelete = (id: any) => {
    DELETE(id)
      .then(() => {
        fetchKeyPersonnel();
        OpenNotification(
          NotificationType.SUCCESS,
          Message.KEY_PERSONNEL_DELETE_SUCCESS,
          ""
        );
      })
      .catch((error) => {
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            Message.KEY_PERSONNEL_DELETE_FAIL,
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
        fetchKeyPersonnel();
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
        fetchKeyPersonnel();
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

  const column: ColumnsType<KeyPersonnel> = [
    {
      title: "No",
      key: "no",
      width: "40px",
      render: (value, record, index) => <span>{index + 1}</span>,
    },
    {
      title: "Date",
      key: "date",
      width: "200px",
      render: (value, record) => moment(record.date).format("DD/MM/YYYY"),
      defaultSortOrder: "ascend",
      sortDirections: ["descend", "ascend"],
      sorter: (a, b) => (moment(a.date).isBefore(moment(b.date)) ? -1 : 1),
    },
    {
      title: "Personnel",
      key: "name",
      dataIndex: "name",
      width: "200px",
    },
    {
      title: "Share",
      width: "150px",
      render: (value, record) => (
        <ShareComponent
          project_id={toNumber(record?.project_id)}
          loading={loading}
          onRemove={(id: number) => onStatusRemove(id)}
          onShare={(data: { type: string; user_id: number }) =>
            onCreateStatus({
              ...data,
              key_personnel_id: record.id,
              identification: `KP-${zeroPad(record.id)}`,
            })
          }
          payload={
            record.key_personnel_statuses ? record.key_personnel_statuses : []
          }
        />
      ),
    },
    {
      title: "Action",
      width: "150px",
      fixed: "right",
      render: (value, record) => (
        <>
          <Popover
            placement="rightTop"
            overlayClassName="action-popover"
            trigger="focus"
            content={
              <div className="d-flex flex-column">
                <KeyPersonnelFormComponent
                  project={project}
                  keyPersonnel={record}
                  viewMode={"View"}
                />
                <KeyPersonnelFormComponent
                  project={project}
                  keyPersonnel={record}
                  viewMode={"Edit"}
                />
                <Popconfirm
                  placement="leftTop"
                  title="Are you sure you want to remove this item"
                  onConfirm={() => OnDelete(record.id)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button danger type="text" icon={<DeleteOutlined />}>
                    Delete
                  </Button>
                </Popconfirm>
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

  useEffect(() => {
    fetchKeyPersonnel({ project_id: project?.id ?? -1 });
  }, []);

  return (
    <div className="row">
      <div className="col-md-12 mb-2">
        <div className="col-md-5 d-flex flex-row align-items-center">
          <Input
            placeholder="Search"
            onChange={(value) =>
              setSearchParam(value.currentTarget.value ?? "")
            }
          />
          <Button
            className="btn-outline-secondary ml-2 p-2"
            icon={<SearchOutlined />}
            onClick={() => fetchKeyPersonnel({ search: searchParam })}
          />
        </div>
        <div className={""}>
          <KeyPersonnelFormComponent project={project} viewMode={"New"} />
          <ReloadButtonComponent onClick={() => fetchKeyPersonnel()} />
        </div>
      </div>
      <div className="col-md-12 hidden-print">
        <Table
          columns={column}
          dataSource={key_personnel.payload}
          loading={key_personnel.isPending}
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
  key_personnel: state.key_personnel.fetchAll,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchKeyPersonnel: (action: any) => dispatch(fetchKeyPersonnel(action)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(KeyPersonnelComponent);
