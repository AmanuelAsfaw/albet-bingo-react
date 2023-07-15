import { Button, DatePicker, Popconfirm, Popover, Table, Tabs } from "antd";
import React, { FC, Suspense, useEffect, useState } from "react";
import { connect } from "react-redux";
import LoadingIndicator from "../../common/Loading";
import {
  DeliverablesTabs,
  Message,
  NotificationType,
} from "../../../constants/Constants";
import ReloadButtonComponent from "../../common/ReloadButton/ReloadButton.component";
import AddPreConcept from "./Component/AddPreConcept/AddPreConcept.component";
import { ErrorHandler, getUserData } from "../../../utilities/utilities";
import {
  DeleteOutlined,
  FolderOpenOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import { DeletePreConcept, PreConceptPropType } from "./utils/PreConcept.util";
import { fetchAllPreConcept } from "../../../redux/PreConcept/PreConcept.action";
import moment from "moment";
import { EditPreConcept } from "./Component/EditPreConcept";
import { OpenNotification } from "../../common/Notification/Notification.component";
import { BASE_URI } from "../../../redux/ApiCall";
import { useParams } from "react-router-dom";
import { fetchAllUser } from "../../../redux/User/User.action";

const index: FC<PreConceptPropType> = ({
  pre_concept,
  fetchAll,
  fetchUser,
  users,
}) => {
  const user = getUserData();
  const [loading, setLoading] = useState(false);
  const { id, header } = useParams();
  const { error, isPending, payload } = pre_concept;
  const newHeader = header?.split("-").join("");

  useEffect(() => {
    fetchAll({ project_id: id, concept_type: newHeader });
    fetchUser();
  }, [header]);

  const RemovePreConcept = (record: any) => {
    setLoading(true);
    DeletePreConcept(record.id)
      .then(() => {
        setLoading(false);
        fetchAll({ project_id: id, concept_type: newHeader });
        OpenNotification(
          NotificationType.SUCCESS,
          Message.CONCEPT_DELETE_SUCCESS,
          ""
        );
      })
      .catch((error) => {
        setLoading(false);
        ErrorHandler(error)?.map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            Message.CONCEPT_DELETE_FAIL,
            e.message
          )
        );
      });
  };

  const fetchAllPreConcept = () => {
    fetchAll({ project_id: id, concept_type: newHeader });
  };

  const renderPopOverContent = (record: any) => {
    return (
      <div className="d-flex flex-column">
        <EditPreConcept
          fetchAll={fetchAllPreConcept}
          id={record.id}
          users={users}
        />
        <Popconfirm
          title="Are you sure to delete this?"
          onConfirm={() => RemovePreConcept(record)}
          okText="Yes"
          cancelText="No"
        >
          <Button
            danger
            loading={loading}
            type="text"
            icon={<DeleteOutlined />}
          >
            Delete
          </Button>
        </Popconfirm>
      </div>
    );
  };
  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <ReloadButtonComponent
            onClick={() =>
              fetchAll({ project_id: id, concept_type: newHeader })
            }
          />
          <AddPreConcept fetchAll={fetchAllPreConcept} user={user} />
        </div>
      </div>
      <div className="row mt-2">
        <div className="col-md-12">
          <Table
            columns={[
              {
                title: "No.",
                dataIndex: "no",
                key: 1,
                width: "50px",
                render: (record: any, value: any, index: any) => index + 1,
              },
              {
                title: "Date",
                dataIndex: "date",
                key: 2,
                width: "250px",
                render: (value: any) => moment(value).format("YYYY-MM-DD"),
              },
              {
                title: "Type",
                dataIndex: "type",
                key: 3,
                width: "250px",
                render: (value: any) => value,
              },
              {
                title: "Description",
                dataIndex: "description",
                key: 4,
                width: "250px",
                render: (value: any) => value,
              },
              {
                title: "File",
                dataIndex: "file",
                key: 5,
                width: "150px",
                render: (value: any) => {
                  return value ? (
                    <Button
                      icon={<FolderOpenOutlined />}
                      onClick={() =>
                        window.open(`${BASE_URI}/${value}`, "_blank")
                      }
                    ></Button>
                  ) : (
                    "-"
                  );
                },
              },
              {
                title: "Uploaded By",
                dataIndex: "uploaded_by",
                key: 6,
                width: "250px",
                render: (value: any) => (
                  <span>
                    {users.payload.find((e: any) => e.id === value)?.full_name}
                  </span>
                ),
              },
              {
                title: "Action",
                key: "action",
                fixed: "right",
                render: (record: any) => (
                  <Popover
                    placement="top"
                    overlayClassName="action-popover"
                    trigger="focus"
                    zIndex={2000}
                    content={() => renderPopOverContent(record)}
                  >
                    <Button
                      icon={<MoreOutlined />}
                      className="btn-outline-secondary border-0"
                    ></Button>
                  </Popover>
                ),
              },
            ]}
            dataSource={payload}
            loading={isPending}
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
  pre_concept: state.pre_concept.fetchAll,
  users: state.user.fetchAll,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchAll: (action: any) => dispatch(fetchAllPreConcept(action)),
  fetchUser: (action: any) => dispatch(fetchAllUser(action)),
});

export default connect(mapStateToProps, mapDispatchToProps)(index);
