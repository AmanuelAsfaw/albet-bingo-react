import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { BankAccountComponentPropType, deleteData } from "./BankAccount.util";
import { Button, Popconfirm, Popover, Table } from "antd";
import { fetchAllBankAccount } from "../../redux/BankAccount/BankAccount.action";
import AddBankAccountComponent from "./components/Add/AddBankAccount.component";
import { ErrorHandler, format } from "../../utilities/utilities";
import ReloadButtonComponent from "../common/ReloadButton/ReloadButton.component";
import { MoreOutlined, DeleteOutlined } from "@ant-design/icons";
import { OpenNotification } from "../common/Notification/Notification.component";
import { NotificationType } from "../../constants/Constants";
import EditBankAccountComponent from "./components/Edit/EditBankAccount.component";

const BankAccountComponent: FC<BankAccountComponentPropType> = ({
  is_private,
  fetchAllBankAccount,
  fetchAll,
}) => {
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const onDelete = (id: any) => {
    deleteData(id)
      .then(() => {
        setDeleteLoading(false);
        fetchAllBankAccount({ is_private: is_private ? 1 : 0 });
        OpenNotification(
          NotificationType.SUCCESS,
          "Bank Account deleted successfully!",
          ""
        );
      })
      .catch((error) => {
        setDeleteLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            "Failed to delete Bank Account",
            e.message
          )
        );
      });
  };

  const fetchData = () => {
    fetchAllBankAccount({ is_private: is_private ? 1 : 0 });
  };

  return (
    <>
      <div className="col-12 float-right mb-3">
        <ReloadButtonComponent onClick={() => fetchData()} />
        <AddBankAccountComponent is_private={is_private} />
      </div>
      <Table
        dataSource={fetchAll.payload.map((item, index) => {
          return {
            ...item,
            key: index + 1,
          };
        })}
        loading={fetchAll.isPending}
        columns={[
          {
            title: "No.",
            render: (value, record, index) => index + 1,
          },
          {
            title: "Account Number",
            dataIndex: "account_number",
          },
          {
            title: "Bank Name",
            dataIndex: "bank_name",
          },
          {
            title: "Account Type",
            dataIndex: "account_type",
          },
          {
            title: "Country",
            dataIndex: "country",
          },
          {
            title: "Currency",
            dataIndex: "currency",
          },
          {
            title: "Starting Balance",
            render: (value, record, index) =>
              format(record.starting_balance, true),
          },
          {
            title: "Current Balance",
            render: (value, record, index) =>
              format(record.current_balance, true),
          },
          {
            title: "Action",
            dataIndex: "id",
            render: (value, record, index) => (
              <>
                <Popover
                  placement="rightTop"
                  overlayClassName="action-popover"
                  trigger="focus"
                  content={
                    <div className="d-flex flex-column">
                      <EditBankAccountComponent data={record} />
                      <Popconfirm
                        title="Are you sure to delete bank account?"
                        onConfirm={() => onDelete(value)}
                        okText="Yes"
                        cancelText="No!"
                      >
                        <Button
                          type="text"
                          icon={<DeleteOutlined />}
                          loading={deleteLoading}
                          style={{ color: "red" }}
                        >
                          Delete
                        </Button>
                      </Popconfirm>
                    </div>
                  }
                >
                  <Button
                    icon={<MoreOutlined />}
                    className="btn-outline-secondary border-0"
                  />
                </Popover>
              </>
            ),
          },
        ]}
      />
    </>
  );
};

/**
 * Map State to Props
 *
 * @param state
 */
const mapStateToProps = (state: any) => ({
  fetchAll: state.bank_account.fetchAll,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchAllBankAccount: (payload: any) => dispatch(fetchAllBankAccount(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BankAccountComponent);
