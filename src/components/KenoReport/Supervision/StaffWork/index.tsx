import { FC, useEffect } from "react";
import { connect } from "react-redux";
import { fetchAllStaffWork } from "../../../../redux/StaffWork/StaffWork.action";
import { parseForTable, StaffWorkPropType } from "./util/StaffWork.util";
import { Table, Tooltip } from "antd";
import { ColumnsType } from "antd/lib/table";
import AddStaffWorkComponent from "./components/Add/AddStaffWork.component";
import moment from "moment";
import AuthenticationComponent from "../../../common/Auth/Authentication.component";
const StaffWorkComponent: FC<StaffWorkPropType> = ({
  fetchStaffWorks,
  staff_works,
  project,
}) => {
  const columns: ColumnsType<any> = [
    {
      title: "Date",
      key: "date",
      dataIndex: "date",
      sortDirections: ["descend", "ascend"],
      defaultSortOrder: "ascend",
      sorter: (a, b) => (moment(a.date).isAfter(moment(b.date), "d") ? 1 : -1),
      width: "10%",
      render: (value: any) => moment(value).format("DD/MM/YYYY"),
    },
    {
      title: "Management",
      key: "management",
      children: [
        {
          title: "QC",
          dataIndex: "quality_control_managers",
          key: "quality_control_managers",
          render: (value) => (
            <Tooltip placement="topLeft" title="Quality Control Manager">
              {value}
            </Tooltip>
          ),
        },
        {
          title: "SF",
          dataIndex: "safety_managers",
          key: "safety_managers",
          render: (value) => (
            <Tooltip placement="topLeft" title="Safety Manager">
              {value}
            </Tooltip>
          ),
        },
        {
          title: "PM",
          dataIndex: "project_managers",

          key: "project_managers",
          render: (value) => (
            <Tooltip placement="topLeft" title="Project Manager">
              {value}
            </Tooltip>
          ),
        },
      ],
    },
    {
      title: "Engineers",
      key: "engineers",
      children: [
        {
          title: "OE",
          key: "office_engineers",
          dataIndex: "office_engineers",
          render: (value) => (
            <Tooltip placement="topLeft" title="Office Engineer">
              {value}
            </Tooltip>
          ),
        },
        {
          title: "CE",
          key: "construction_engineers",
          dataIndex: "construction_engineers",
          render: (value) => (
            <Tooltip placement="topLeft" title="Construction Engineer">
              {value}
            </Tooltip>
          ),
        },
        {
          title: "SE",
          key: "site_engineers",
          dataIndex: "site_engineers",
          render: (value) => (
            <Tooltip placement="topLeft" title="Site Engineer">
              {value}
            </Tooltip>
          ),
        },
      ],
    },
    {
      title: "S.Labour",
      key: "skilled",
      children: [
        {
          title: "S",
          key: "superintendent",
          dataIndex: "superintendents",
          render: (value) => (
            <Tooltip placement="topLeft" title="Superintendent">
              {value}
            </Tooltip>
          ),
        },
        {
          title: "F",
          key: "forman",
          dataIndex: "formans",
          render: (value) => (
            <Tooltip placement="topLeft" title="Forman">
              {value}
            </Tooltip>
          ),
        },
        {
          title: "SL",
          key: "skilled_labours",
          dataIndex: "skilled_labours",
          render: (value) => (
            <Tooltip placement="topLeft" title="Skilled Labours">
              {value}
            </Tooltip>
          ),
        },
      ],
    },
    {
      title: "U.Labour",
      key: "unskilled",
      children: [
        {
          title: "D",
          key: "daily_labours",
          dataIndex: "daily_labours",
          render: (value) => (
            <Tooltip placement="topLeft" title="Daily Labour">
              {value}
            </Tooltip>
          ),
        },
      ],
    },
    {
      title: "Other",
      key: "other",
      children: [
        {
          title: "G",
          key: "guard",
          dataIndex: "guards",
          render: (value) => (
            <Tooltip placement="topLeft" title="Guard">
              {value}
            </Tooltip>
          ),
        },
        {
          title: "J",
          key: "janitor",
          dataIndex: "janitors",
          render: (value) => (
            <Tooltip placement="topLeft" title="Janitor">
              {value}
            </Tooltip>
          ),
        },
        {
          title: "S",
          key: "surveyor",
          dataIndex: "surveyors",
          render: (value) => (
            <Tooltip placement="topLeft" title="Surveyor">
              {value}
            </Tooltip>
          ),
        },
        {
          title: "SA",
          key: "surveyor_assistant",
          dataIndex: "surveyor_assistants",
          render: (value) => (
            <Tooltip placement="topLeft" title="Surveyor Assistants">
              {value}
            </Tooltip>
          ),
        },
        {
          title: "W",
          key: "welders",
          dataIndex: "welders",
          render: (value) => (
            <Tooltip placement="topLeft" title="Welder">
              {value}
            </Tooltip>
          ),
        },
      ],
    },
    {
      title: "Man-days",
      key: "man_days",
      children: [
        {
          title: "TM",
          key: "total_managements",
          dataIndex: "total_managements",
          render: (value) => (
            <Tooltip placement="topLeft" title="Total Management">
              {value}
            </Tooltip>
          ),
        },
        {
          title: "TE",
          key: "total_engineers",
          dataIndex: "total_engineers",
          render: (value) => (
            <Tooltip placement="topLeft" title="Total Engineers">
              {value}
            </Tooltip>
          ),
        },
        {
          title: "TS",
          key: "total_skilled",
          dataIndex: "total_skilled",
          render: (value) => (
            <Tooltip placement="topLeft" title="Total Skilled">
              {value}
            </Tooltip>
          ),
        },
        {
          title: "TU",
          key: "total_unskilled",
          dataIndex: "total_unskilled",
          render: (value) => (
            <Tooltip placement="topLeft" title="Total Unskilled">
              {value}
            </Tooltip>
          ),
        },
        {
          title: "TO",
          key: "total_other",
          dataIndex: "total_other",
          render: (value) => (
            <Tooltip placement="topLeft" title="Total Other">
              {value}
            </Tooltip>
          ),
        },
        {
          title: "Total",
          key: "total",
          dataIndex: "total",
          render: (value) => (
            <Tooltip placement="topLeft" title="Total">
              {value}
            </Tooltip>
          ),
        },
      ],
    },
  ];

  useEffect(() => {
    fetchStaffWorks({ project_id: project.payload?.id });
  }, [fetchStaffWorks, project]);

  return (
    <div className="row">
      <div className="col-md-12 mb-2">
        <AuthenticationComponent type="WRITE">
          <AddStaffWorkComponent />
        </AuthenticationComponent>
      </div>
      <div className="col-md-12  ">
        <Table
          bordered
          columns={columns}
          dataSource={parseForTable(staff_works.payload)}
          loading={staff_works.isPending}
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
  staff_works: state.staff_work.fetchAll,
  project: state.project.fetchOne,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchStaffWorks: (action: any) => dispatch(fetchAllStaffWork(action)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StaffWorkComponent);
