import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  fetchAllMemo,
  fetchCountMemo,
} from "../../../../redux/Memo/Memo.action";
import { MemoPropType, parseData } from "./util/Memo.util";
import { Button, Popover, Table } from "antd";
import ReloadButtonComponent from "../../../common/ReloadButton/ReloadButton.component";
import { Memo } from "../../../../redux/Memo/Memo.type";
import { ColumnsType } from "antd/lib/table";
import moment from "moment";
import AddMemoComponent from "./components/Add/AddMemo.component";
import { fetchAllUser } from "../../../../redux/User/User.action";
import DetailComponent from "./components/Detail/Detail.component";
import PrintComponent from "./components/Print/Print.component";
import { MoreOutlined, PrinterOutlined } from "@ant-design/icons";
const MemoComponent: FC<MemoPropType> = ({
  fetchMemo,
  memos,
  fetchUser,
  fetchMemoCount,
}) => {
  const [selected, setSelected] = useState<any>(null);
  const [is_visible, setVisibility] = useState(false);

  useEffect(() => {
    fetchMemo();
    fetchUser();
    fetchMemoCount();
  }, [fetchMemo, fetchUser, fetchMemoCount]);

  const column: ColumnsType<Memo> = [
    {
      title: "Date",
      key: "date",
      render: (value, record) => moment(record.date).format("DD/MM/YYYY"),
      defaultSortOrder: "ascend",
      sortDirections: ["descend", "ascend"],
      sorter: (a, b) => (moment(a.date).isBefore(moment(b.date)) ? -1 : 1),
    },
    {
      title: "Type",
      key: "type",
      dataIndex: "reference_id",
      render: (value) => (value ? "Response" : "Primary"),
    },
    {
      title: "Reference No",
      key: "reference_no",
      dataIndex: "reference_number",
    },
    {
      title: "Subject",
      dataIndex: "subject",
      key: "subject",
      className: "memo-subject",
    },
    {
      title: "From",
      key: "from",
      render: (value, record) => record.memo_from.full_name,
    },
    {
      title: "To",
      key: "from",
      render: (value, record) => record.memo_to.full_name,
    },
    {
      title: "Action",
      dataIndex: "id",
      width: "20%",
      render: (value, record, index) => (
        <>
          <Popover
            placement="rightTop"
            overlayClassName="action-popover"
            trigger="focus"
            content={
              <div className="d-flex flex-column">
                <DetailComponent memo={record} />
                <Button
                  type="text"
                  onClick={() => {
                    setSelected(record);
                    setVisibility(true);
                  }}
                >
                  Print
                </Button>
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
    <>
      <div className="row hidden-print">
        <div className="col-md-12 mb-2">
          <ReloadButtonComponent onClick={() => fetchMemo()} />
          <AddMemoComponent />
        </div>
        <div className="col-md-12 hidden-print">
          <Table
            columns={column}
            dataSource={parseData(
              memos.payload.map((e, index) => ({ ...e, key: index }))
            )}
            loading={memos.isPending}
          />
        </div>
      </div>
      <PrintComponent
        dataAction={[selected, setSelected]}
        visibilityAction={[is_visible, setVisibility]}
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
  memos: state.memo.fetchAll,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchMemo: (action: any) => dispatch(fetchAllMemo(action)),
  fetchUser: (action: any) => dispatch(fetchAllUser(action)),
  fetchMemoCount: (action: any) => dispatch(fetchCountMemo(action)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MemoComponent);
