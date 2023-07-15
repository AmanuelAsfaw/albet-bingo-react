import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { WorkPermitPropType, deleteData } from "./util/WorkPermit.util";
import { Button, Popconfirm, Popover } from "antd";
import { MoreOutlined, DeleteColumnOutlined } from "@ant-design/icons";
import Table, { ColumnsType } from "antd/lib/table";
import { OpenNotification } from "../../../../common/Notification/Notification.component";
import { NotificationType } from "../../../../../constants/Constants";
import { ErrorHandler } from "../../../../../utilities/utilities";
import { fetchAllWorkPermit } from "../../../../../redux/WorkPermit/WorkPermit.action";
import ViewWorkPermitComponent from "./components/View/ViewWorkPermit.component";
import EditWorkPermitComponent from "./components/Edit/EditWorkPermit.component";
import AddWorkPermitComponent from "./components/Add/AddWorkPermit.component";
import PrintWorkPermitComponent from "./components/Print/PrintWorkPermit.component";
import AuthenticationComponent from "../../../../common/Auth/Authentication.component";

const WorkPermitComponent: FC<WorkPermitPropType> = ({
  project,
  work_permit,
  fetchAllWorkPermit,
}) => {
  const [workPermitData, setWorkPermitData] = useState<any>([]);

  useEffect(() => {
    fetchAllWorkPermit({
      project_id: project.payload?.id,
    });
  }, [fetchAllWorkPermit, project]);

  useEffect(() => {
    if (work_permit.payload.length) {
      setWorkPermitData(
        work_permit.payload.map((item: any, index: any) => ({
          key: index,
          ...item,
        }))
      );
    }
  }, [work_permit]);

  const OnDelete = (id: any) => {
    deleteData(id)
      .then(() => {
        fetchAllWorkPermit({
          project_id: project.payload?.id,
        });
        OpenNotification(NotificationType.SUCCESS, "Work Permit delete!", "");
      })
      .catch((error) => {
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            "Failed to delete work permit",
            e.message
          )
        );
      });
  };

  const columns: ColumnsType<any> = [
    {
      title: "No",
      key: "no",
      width: "80px",
      render: (value, record, index) => <span>{index + 1}</span>,
    },
    {
      title: "Date",
      key: "date",
      dataIndex: "date",
      width: "100px",
      render: (value, record) => <span>{record.date}</span>,
    },
    {
      title: "Work Permit No",
      key: "work_permit_no",
      dataIndex: "work_permit_no",
      width: "100px",
      render: (value, record) => <span>{record.work_permit_no}</span>,
    },
    {
      title: "Block",
      key: "block",
      dataIndex: "block",
      width: "100px",
      render: (value, record) => <span>{record.block}</span>,
    },
    {
      title: "Status",
      key: "block",
      width: "100px",
      render: (value, record) =>
        record.allowed_to_proceed === true ? (
          <span>{"Allowed to Proceed"}</span>
        ) : record.refused_to_proceed === true ? (
          <span>{"Refused To Proceed"}</span>
        ) : (
          <span>{"Pending"}</span>
        ),
    },
    {
      title: "Action",
      width: "10%",
      fixed: "right",
      render: (value, record) => (
        <>
          <Popover
            placement="rightTop"
            overlayClassName="action-popover"
            trigger="focus"
            content={
              <div className="d-flex flex-column">
                <ViewWorkPermitComponent id={record.id} />
                <AuthenticationComponent type="EDIT">
                  <EditWorkPermitComponent id={record.id} />
                </AuthenticationComponent>
                <AuthenticationComponent type="DELETE">
                  <Popconfirm
                    placement="leftTop"
                    title="Are you sure you want to remove this work permit?"
                    onConfirm={() => OnDelete(record.id)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button danger type="text">
                      Delete
                    </Button>
                  </Popconfirm>
                </AuthenticationComponent>

                <PrintWorkPermitComponent work_permit={record} />
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
        <AuthenticationComponent type="WRITE">
          <AddWorkPermitComponent />
        </AuthenticationComponent>
      </div>
      <div className="col-md-12 mt-2">
        <Table
          columns={columns}
          dataSource={workPermitData}
          loading={work_permit.isPending}
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
  work_permit: state.work_permit.fetchAll,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchAllWorkPermit: (action: any) => dispatch(fetchAllWorkPermit(action)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkPermitComponent);
