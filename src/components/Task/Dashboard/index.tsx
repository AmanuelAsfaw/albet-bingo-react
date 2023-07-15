import { Card, Result, Select, Skeleton, Statistic } from "antd";
import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchAllListProjects } from "../../../redux/Project/Project.action";
import { fetchTaskReport } from "../../../redux/Task/Task.action";
import CardsComponent from "./components/Cards.component";
import CompletionOverTime from "./components/CompletionOverTime.component";
import CompletionStatus from "./components/CompletionStatus.component";
import { DashboardProp } from "./util/dashboard.util";

const DashboardComponent: FC<DashboardProp> = ({
  fetchTaskReport,
  task_report,
  projects,
  fetchProjects,
}) => {
  const [project_id, setProjectId] = useState<null | number>(null);

  useEffect(() => {
    if (project_id) fetchTaskReport({ project_id });
  }, [project_id]);

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    if (project_id && !task_report.isPending && !task_report.isSuccessful) {
      setTimeout(() => {
        fetchTaskReport({ project_id });
      }, 3000);
    }
  }, [task_report]);

  const Loading = () => {
    return (
      <div className="row">
        <div className="col-md-3">
          <Card>
            <Skeleton active />
          </Card>
        </div>

        <div className="col-md-3">
          <Card>
            <Skeleton active />
          </Card>
        </div>

        <div className="col-md-3">
          <Card>
            <Skeleton active />
          </Card>
        </div>

        <div className="col-md-3">
          <Card>
            <Skeleton active />
          </Card>
        </div>

        <div className="col-md-12">
          <Card>
            <Skeleton active />
          </Card>
        </div>

        <div className="col-md-12">
          <Card>
            <Skeleton active />
          </Card>
        </div>

        <div className="col-md-3">
          <Card>
            <Skeleton active />
          </Card>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="row">
        <div className="col-md-3">
          <Select
            placeholder="select project"
            value={project_id}
            onSelect={(value) => setProjectId(value)}
            style={{
              width: "100%",
            }}
            showSearch
            filterOption={(inputValue, option) => {
              return (
                (option?.label?.toString() ?? "")
                  .toLowerCase()
                  .indexOf(inputValue.toLowerCase()) !== -1
              );
            }}
            loading={projects.isPending || task_report.isPending}
            options={projects.payload.map((e) => ({
              label: e.name,
              value: e.id,
            }))}
          />
        </div>
      </div>

      {project_id ? (
        task_report.isPending ? (
          <Loading />
        ) : (
          <div className="row mt-4">
            <div className="col-12">
              <CardsComponent />
            </div>

            <div className="col-md-6">
              <CompletionStatus />
            </div>

            <div className="col-md-6">
              <CompletionOverTime />
            </div>

            <div className="col-md-3 text-center">
              <Card>
                <Statistic
                  title="Sum of Progress"
                  value={task_report?.payload?.completion_percentage?.toFixed(
                    0
                  )}
                  valueStyle={{ fontSize: 16, fontFamily: "Campton-Medium" }}
                  suffix="%"
                />
              </Card>
            </div>
          </div>
        )
      ) : (
        <Result status={"info"} title="Select Project" />
      )}
    </>
  );
};

/**
 * Map State to Props
 *
 * @param state
 */
const mapStateToProps = (state: any) => ({
  task_report: state.task.fetchReport,
  projects: state.project.fetchList,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchTaskReport: (action: any) => dispatch(fetchTaskReport(action)),
  fetchProjects: (action: any) => dispatch(fetchAllListProjects(action)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardComponent);
