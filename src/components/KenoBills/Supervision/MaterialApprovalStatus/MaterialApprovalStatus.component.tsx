import React, { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  MaterialApprovalStatusPropType,
  deleteMaterialApprovalStatus,
} from "./utils/MaterialApprovalStatus.utils";
import ReloadButtonComponent from "../../../common/ReloadButton/ReloadButton.component";
import {
  Button,
  DatePicker,
  Popconfirm,
  Popover,
  Row,
  Select,
  Table,
} from "antd";
import moment from "moment";
import { DeleteOutlined, MoreOutlined } from "@ant-design/icons";
import AddMaterialApprovalStatusComponent from "./components/Add/AddMaterialApprovalStatus.component";
import { fetchAllMaterialApprovalStatus } from "../../../../redux/MaterialApprovalStatus/MaterialApprovalStatus.action";
import EditMaterialApprovalStatusComponent from "./components/Edit/EditMaterialApprovalStatus.component";
import { OpenNotification } from "../../../common/Notification/Notification.component";
import { Message, NotificationType } from "../../../../constants/Constants";
import { ErrorHandler } from "../../../../utilities/utilities";
import { useParams } from "react-router-dom";

const MaterialApprovalStatus: FC<MaterialApprovalStatusPropType> = ({
  fetchAll,
  material_approval_status,
}) => {
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState("");
  const [month, setMonth] = useState<any>(moment().format("YYYY-MM-DD"));
  const { id } = useParams();

  useEffect(() => {
    CustomFetchAll();
  }, [type, month]);

  const RemoveReport = (record: any) => {
    setLoading(true);
    deleteMaterialApprovalStatus(record.id)
      .then(() => {
        setLoading(false);
        CustomFetchAll();
        OpenNotification(
          NotificationType.SUCCESS,
          Message.MATERIAL_APPROVAL_STATUS_DELETE_SUCCESS,
          ""
        );
      })
      .catch((error: any) => {
        setLoading(false);
        ErrorHandler(error)?.map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            Message.MATERIAL_APPROVAL_STATUS_DELETE_FAIL,
            e.message
          )
        );
      });
  };
  const CustomFetchAll = () => {
    let payload: any = {};
    type ? (payload.type = type) : null;
    month ? (payload.date = moment(month).format("YYYY-MM-DD")) : null;
    payload.project_id = id;
    fetchAll(payload);
  };
  const renderPopOverContent = (record: any) => {
    return (
      <div className="d-flex flex-column">
        <EditMaterialApprovalStatusComponent id={record.id} />
        <Popconfirm
          title="Are you sure to delete this?"
          onConfirm={() => RemoveReport(record)}
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
      <div className="d-flex w-100  justify-content-between">
        <div className="d-flex justify-content-between">
          <div className="w-45">
            <Select
              style={{ width: 200 }}
              allowClear={false}
              showSearch
              onChange={(e) => setType(e)}
              options={[
                { label: "Architectural", value: "architectural" },
                { label: "MEP Electrical", value: "MEP Electrical" },
                { label: "MEP Mechanical", value: "MEP Mechanical" },
                { label: "MEP Sanitary", value: "MEP Sanitary" },
              ]}
              filterOption={(inputValue, option) =>
                option!.value
                  .toUpperCase()
                  .indexOf(inputValue.toUpperCase()) !== -1
              }
            />
          </div>
          <div className="w-45 ml-2">
            <DatePicker
              picker="month"
              allowClear={false}
              defaultValue={moment()}
              onChange={(e) => setMonth(e)}
            />
          </div>
        </div>
        <div className="d-flex justify-content-end">
          <AddMaterialApprovalStatusComponent type={type} />
          <ReloadButtonComponent onClick={() => CustomFetchAll()} />
        </div>
      </div>

      <div className="row mt-2">
        <div className="col-md-12">
          <Table
            columns={[
              {
                title: "No.",
                dataIndex: "no",
                width: "50px",
                render: (record: any, value: any, index: any) => index + 1,
              },
              {
                title: "Submittal Date",
                dataIndex: "date",
                width: "250px",
                render: (value: any) => moment(value).format("YYYY-MM-DD"),
              },
              {
                title: "Ref.No",
                dataIndex: "ref_no",
                width: "250px",
                render: (value: any) => value,
              },
              {
                title: "Description",
                dataIndex: "description",
                width: "250px",
                render: (value: any) => value,
              },
              {
                title: "Manufacture /Brand Name",
                dataIndex: "manufacturer",
                width: "250px",
                render: (value: any) => value,
              },
              {
                title: "Supplier /Remark",
                dataIndex: "supplier",
                width: "250px",
                render: (value: any) => value,
              },
              {
                title: "Consultant receiving date",
                dataIndex: "consultant_receiving_date",
                width: "250px",
                render: (value: any) => moment(value).format("YYYY-MM-DD"),
              },
              {
                title: "Return date",
                dataIndex: "return_date",
                width: "250px",
                render: (value: any) => moment(value).format("YYYY-MM-DD"),
              },
              {
                title: "Status",
                dataIndex: "status",
                width: "250px",
                render: (value: any) => value,
              },
              {
                title: "Comments",
                dataIndex: "comments",
                width: "250px",
                render: (value: any) => value,
              },

              {
                title: "Action",
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
            dataSource={material_approval_status.payload}
            loading={material_approval_status.isPending}
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
  material_approval_status: state.material_approval_status.fetchAll,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchAll: (action: any) => dispatch(fetchAllMaterialApprovalStatus(action)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MaterialApprovalStatus);
