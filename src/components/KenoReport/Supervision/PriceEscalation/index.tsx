import { Button, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { FC, useEffect } from "react";
import { connect } from "react-redux";
import { PriceEscalationFile } from "../../../../redux/PriceEscalationFile/PriceEscalationFile.type";
import { DownloadFile } from "../../../Document/MyDocument/index.util";
import { PriceEscalationPropType } from "./util/PriceEscalation.util";
import { CloudDownloadOutlined } from "@ant-design/icons";
import { fetchAllPriceEscalationFile } from "../../../../redux/PriceEscalationFile/PriceEscalationFile.action";
import { fetchAllUser } from "../../../../redux/User/User.action";
import { fetchAllPaymentFile } from "../../../../redux/PaymentFile/PaymentFile.action";
import AddPriceEscalationComponent from "./components/Add/AddPriceEscalation.component";
import { format } from "../../../../utilities/utilities";
import UserApprovalComponent from "../../../common/UserApproval/UserApproval.component";
import DocumentViewerComponent from "../../../common/DocumentViewer/DocumentViewer.component";

const PriceEscalation: FC<PriceEscalationPropType> = ({
  fetchPriceEscalationFile,
  fetchUser,
  price_escalations,
  project,
  fetchPayment,
}) => {
  console.log(
    "🚀 ~ file: index.tsx ~ line 21 ~ price_escalations",
    price_escalations
  );
  const column: ColumnsType<PriceEscalationFile> = [
    {
      title: "Price Escalation No",
      key: "price_escalation",
      render: (value, record, index) => index + 1,
    },
    {
      title: "Description",
      key: "description",
      dataIndex: "description",
    },

    {
      title: "Total Amount",
      key: "total_amount",
      render: (value, record) => format(record.total_amount),
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
      title: "Status",
      key: "status",
      render: (value, record) => (
        <UserApprovalComponent
          approved_by={record.price_escalation_approved_by}
          checked_by={record.price_escalation_checked_by}
          is_approved={record.is_approved}
          is_checked={record.is_checked}
          type="price-escalation-file"
          item_id={record.id}
        />
      ),
    },
  ];

  useEffect(() => {
    fetchPriceEscalationFile({ project_id: project.payload?.id });
    fetchUser();
    fetchPayment({ project_id: project.payload?.id });
  }, [fetchPriceEscalationFile, fetchUser, project, fetchPayment]);

  return (
    <div className="row">
      <div className="col-md-12 mb-2">
        <AddPriceEscalationComponent />
      </div>
      <div className="col-md-12">
        <Table
          columns={column}
          loading={price_escalations.isPending}
          dataSource={price_escalations.payload}
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
  price_escalations: state.price_escalation_file.fetchAll,
  project: state.project.fetchOne,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchPriceEscalationFile: (action: any) =>
    dispatch(fetchAllPriceEscalationFile(action)),
  fetchUser: (action: any) => dispatch(fetchAllUser(action)),
  fetchPayment: (action: any) => dispatch(fetchAllPaymentFile(action)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PriceEscalation);
