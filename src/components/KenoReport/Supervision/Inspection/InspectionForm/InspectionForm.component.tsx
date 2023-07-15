import Table from "antd/lib/table";
import React, { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchAllInspectionForm } from "../../../../../redux/InspectionForm/InspectionForm.action";
import { InspectionFormPropType, deleteData } from "./InspectionForm.util";
import AddInspectionFormComponent from "./AddInspectionForm/AddInspectionForm.component";
import ViewInspectionFormComponent from "./ViewInspectionForm/ViewInspectionForm.component";
import ReloadButtonComponent from "../../../../common/ReloadButton/ReloadButton.component";
import EditInspectionFormComponent from "./EditInspectionForm/EditInspectionForm.component";
import { Button, Popover } from "antd";
import { MoreOutlined, DeleteOutlined } from "@ant-design/icons";
import { Message, NotificationType } from "../../../../../constants/Constants";
import { OpenNotification } from "../../../../common/Notification/Notification.component";
import AuthenticationComponent from "../../../../common/Auth/Authentication.component";

const InspectionFormComponent: FC<InspectionFormPropType> = ({
  inspection_form,
  fetchAllInspectionForm,
}) => {
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    fetchAllInspectionForm();
  }, [fetchAllInspectionForm]);

  const onDelete = (id: any) => {
    setDeleteLoading(true);
    deleteData(id)
      .then(() => {
        setDeleteLoading(false);
        fetchAllInspectionForm();
        OpenNotification(
          NotificationType.SUCCESS,
          Message.INSPECTION_FORM_DELETE_SUCCESS,
          ""
        );
      })
      .catch((error) => {
        setDeleteLoading(false);
        error.response.data.errors.map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            Message.INSPECTION_FORM_DELETE_FAILED,
            e.message
          )
        );
      });
  };

  const columns = [
    {
      title: "No",
      render: (value: any, record: any, index: number) => index + 1,
    },
    {
      title: "Inspection name",
      dataIndex: "name",
    },
    {
      title: "Action",
      render: (value: any, record: any) => (
        <Popover
          placement="rightTop"
          overlayClassName="action-popover"
          trigger="focus"
          content={
            <div className="d-flex flex-column">
              <ViewInspectionFormComponent {...record} />
              <AuthenticationComponent type="EDIT">
                <EditInspectionFormComponent inspection_form={record} />
              </AuthenticationComponent>
              <AuthenticationComponent type="DELETE">
                <Button
                  type="text"
                  danger
                  onClick={() => onDelete(record.id)}
                  loading={deleteLoading}
                >
                  Delete
                </Button>
              </AuthenticationComponent>
            </div>
          }
        >
          <Button
            icon={<MoreOutlined />}
            className="btn-outline-secondary border-0"
          ></Button>
        </Popover>
      ),
    },
  ];

  return (
    <div className="row">
      <div className="col-md-12">
        <ReloadButtonComponent onClick={() => fetchAllInspectionForm()} />
        <AuthenticationComponent type="WRITE">
          <AddInspectionFormComponent />
        </AuthenticationComponent>
      </div>
      <div className="col-md-12 mt-2">
        <Table
          columns={columns}
          loading={inspection_form.isPending}
          dataSource={inspection_form.payload.map((e, index) => ({
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
  inspection_form: state.inspection_form.fetchAll,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchAllInspectionForm: () => dispatch(fetchAllInspectionForm()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InspectionFormComponent);
