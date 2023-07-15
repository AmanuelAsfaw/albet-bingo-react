import { Button, DatePicker, Popconfirm, Popover, Table, Tabs } from "antd";
import React, { FC, Suspense, useEffect, useState } from "react";
import { connect } from "react-redux";
import moment from "moment";

import {
  DeliverablesTabs,
  Message,
  NotificationType,
} from "../../../constants/Constants";
import ReloadButtonComponent from "../../common/ReloadButton/ReloadButton.component";
import AddConcept from "./Component/AddConcept/AddConcept.component";
import { ErrorHandler, getUserData } from "../../../utilities/utilities";
import {
  DeleteOutlined,
  FolderOpenOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import { DeleteConcept, ConceptPropType } from "./utils/Concept.util";

import { OpenNotification } from "../../common/Notification/Notification.component";
import { BASE_URI } from "../../../redux/ApiCall";
import { useParams } from "react-router-dom";
import { EditConceptComponent } from "./Component/EditConcept";
import { fetchAllConcepts } from "../../../redux/Concept/Concept.action";
import { fetchAllUser } from "../../../redux/User/User.action";

const index: FC<ConceptPropType> = ({
  concept,
  fetchAll,
  fetchUser,
  users,
}) => {
  const user = getUserData();
  const { id, header } = useParams();
  const [loading, setLoading] = useState(false);

  const newHeader = header?.split("-").join("");
  const { error, isPending, payload } = concept;

  useEffect(() => {
    fetchAllConcept();
    fetchUser();
  }, [header]);

  const fetchAllConcept = async () => {
    await fetchAll({ project_id: id, concept_type: newHeader });
  };

  const RemoveConcept = (record: any) => {
    setLoading(true);
    DeleteConcept(record.id)
      .then(() => {
        setLoading(false);
        fetchAll({ project_id: id, concept_type: newHeader });
        OpenNotification(
          NotificationType.SUCCESS,
          Message.CONCEPT_DELETE_SUCCESS,
          ""
        );
      })
      .catch((error: any) => {
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

  const renderPopOverContent = (record: any) => {
    return (
      <div className="d-flex flex-column">
        <EditConceptComponent
          fetchAll={fetchAllConcept}
          id={record.id}
          users={users}
        />
        <Popconfirm
          title="Are you sure to delete this?"
          onConfirm={() => RemoveConcept(record)}
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
          <AddConcept fetchAll={fetchAllConcept} user={user} />
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
  concept: state.concept.fetchAll,
  users: state.user.fetchAll,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchAll: (action: any) => dispatch(fetchAllConcepts(action)),
  fetchUser: (action: any) => dispatch(fetchAllUser(action)),
  // fetchOne: (action: any) => dispatch(fetchAllPreConcept(action)),
});

export default connect(mapStateToProps, mapDispatchToProps)(index);
