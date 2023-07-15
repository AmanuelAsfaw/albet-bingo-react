import { Button, Table } from "antd";
import { FC, useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ProjectMenuTabs } from "../../constants/Constants";
import { fetchAllProjects } from "../../redux/Project/Project.action";
import { format, getUserData, zeroPad } from "../../utilities/utilities";
import AddProjectComponent from "./components/Add/AddProject.component";
import { displaySize, ProjectPropType } from "./utils/Project.util";

const ProjectComponent: FC<ProjectPropType> = ({ fetchProjects, projects }) => {
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const onRowClick = (record: any) => {
    navigate(
      `/project/${record.id}/${ProjectMenuTabs.SUPERVISION.toLowerCase()}`
    );
  };

  return (
    <>
      <div className="row">
        <div className="col-md-12">
          {getUserData().is_super_user ? <AddProjectComponent /> : <></>}
        </div>
      </div>
      <div className="row mt-2">
        <div className="col-md-12">
          <Table
            dataSource={projects.payload}
            columns={[
              {
                title: "Project No.",
                dataIndex: "project_no",
                key: "1",
                render: (value) => `P-${zeroPad(value)}`,
                onCell: (record, rowIndex) => {
                  return {
                    onClick: (event) => onRowClick(record),
                  };
                },
              },
              {
                title: "Name",
                dataIndex: "name",
                key: "2",
                onCell: (record, rowIndex) => {
                  return {
                    onClick: (event) => onRowClick(record),
                  };
                },
              },
              {
                title: "Type",
                dataIndex: "type",
                key: "3",
                onCell: (record, rowIndex) => {
                  return {
                    onClick: (event) => onRowClick(record),
                  };
                },
              },
              // {
              //   title: "Size",
              //   dataIndex: "size",
              //   key: "4",
              //   className: "mobile-hidden",
              //   render: (value, record) => displaySize(record),
              //   onCell: (record, rowIndex) => {
              //     return {
              //       onClick: (event) => onRowClick(record),
              //     };
              //   },
              // },
              // {
              //   title: "Client",
              //   dataIndex: "client_name",
              //   render: (value, record) => record.client?.name,
              //   key: "5",
              //   onCell: (record, rowIndex) => {
              //     return {
              //       onClick: (event) => onRowClick(record),
              //     };
              //   },
              // },
              // {
              //   title: "Contractor",
              //   dataIndex: "contractor_name",
              //   key: "6",
              //   render: (value, record) => record.contractor?.name,
              //   onCell: (record, rowIndex) => {
              //     return {
              //       onClick: (event) => onRowClick(record),
              //     };
              //   },
              // },

              // {
              //   title: "Con. Date",
              //   dataIndex: "commencement_date",
              //   key: "8",
              //   onCell: (record, rowIndex) => {
              //     return {
              //       onClick: (event) => onRowClick(record),
              //     };
              //   },
              // },
              {
                title: "Budget",
                dataIndex: "budget",
                render: (value) => format(value),
                key: "9",
                onCell: (record, rowIndex) => {
                  return {
                    onClick: (event) => onRowClick(record),
                  };
                },
              },

              // {
              //   title: "Action",
              //   key: "11",
              //   dataIndex: "status",
              //   render: (text: number) => (
              //     <Button className="btn-outline-secondary">View</Button>
              //   ),
              //   onCell: (record, rowIndex) => {
              //     return {
              //       onClick: (event) => onRowClick(record),
              //     };
              //   },
              // },
            ]}
            loading={projects.isPending}
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
  projects: state.project.fetchAll,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchProjects: (action: any) => dispatch(fetchAllProjects(action)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectComponent);
