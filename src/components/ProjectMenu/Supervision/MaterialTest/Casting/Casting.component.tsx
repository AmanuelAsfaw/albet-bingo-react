import Table from "antd/lib/table";
import React, { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { CastingPropType, deleteData } from "./Casting.util";
import AddCastingComponent from "./component/Add/AddCasting.component";
import {
  fetchAllCasting,
  fetchAllCastingReset,
} from "../../../../../redux/Casting/Casting.action";
import ReloadButtonComponent from "../../../../common/ReloadButton/ReloadButton.component";
import { Button, Popconfirm, Popover } from "antd";
import ViewCastingComponent from "./component/View/ViewCasting.component";
import MoreOutlined from "@ant-design/icons/lib/icons/MoreOutlined";
import moment from "moment";
import EditCastingComponent from "./component/Edit/EditCasting.component";
import { OpenNotification } from "../../../../common/Notification/Notification.component";
import { ErrorHandler } from "../../../../../utilities/utilities";
import { Message, NotificationType } from "../../../../../constants/Constants";
import { DeleteOutlined } from "@ant-design/icons";
import EditCastingStatusComponent from "./component/EditStatus/EditStatus.component";
import AuthenticationComponent from "../../../../common/Auth/Authentication.component";

const CastingComponent: FC<CastingPropType> = ({
  project,
  fetchAllCasting,
  fetchAllCastingReset,
  fetchAllCastingData,
}) => {
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    fetchAllCasting();
  }, [fetchAllCasting]);

  const onDelete = (id: any) => {
    setDeleteLoading(true);
    deleteData(id)
      .then(() => {
        setDeleteLoading(false);
        fetchAllCasting();
        OpenNotification(
          NotificationType.SUCCESS,
          Message.CASTING_DELETE_SUCCESS,
          ""
        );
      })
      .catch((error) => {
        setDeleteLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            Message.CASTING_DELETE_FAILED,
            e.message
          )
        );
      });
  };

  const columns: any[] = [
    {
      title: "No",
      render: (value: any, record: any, index: number) => index + 1,
    },
    {
      title: "Date",
      dataIndex: "date",
      render: (value: any) => moment(value).format("DD/MM/YYYY"),
    },
    {
      title: "Concrete Grade",
      dataIndex: "concrete_grade",
    },
    {
      title: "Structure",
      dataIndex: "structure_type",
    },
    {
      title: "Source of Concrete",
      dataIndex: "source_of_concrete",
    },
    {
      title: "Test Dates",
      render: (value: any, record: any) => (
        <EditCastingStatusComponent casting={record} />
      ),
    },
    {
      title: "Action",
      dataIndex: "id",
      width: "20%",
      render: (value: any, record: any) => (
        <>
          <Popover
            placement="rightTop"
            overlayClassName="action-popover"
            trigger="focus"
            content={
              <div className="d-flex flex-column">
                <ViewCastingComponent data={record} key={Date.now()} />
                <EditCastingComponent data={record} />
                <Popconfirm
                  title="Are you sure to delete this Casting?"
                  onConfirm={() => onDelete(record.id)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button type="text" danger loading={deleteLoading}>
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

  return (
    <div className="row">
      <div className="col-md-12">
        <ReloadButtonComponent onClick={() => fetchAllCasting()} />
        <AuthenticationComponent type="WRITE">
          <AddCastingComponent />
        </AuthenticationComponent>
      </div>
      <div className="col-md-12 mt-2">
        <Table
          columns={columns}
          loading={fetchAllCastingData.isPending}
          dataSource={fetchAllCastingData.payload.map((e, index) => ({
            ...e,
            key: Date.now() + index,
          }))}
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
  project: state.project.fetchOne,
  fetchAllCastingData: state.casting.fetchAll,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchAllCasting: (data: any) => dispatch(fetchAllCasting(data)),
  fetchAllCastingReset: () => dispatch(fetchAllCastingReset()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CastingComponent);
