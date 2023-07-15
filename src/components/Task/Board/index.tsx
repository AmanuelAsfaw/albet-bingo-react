import { Result, Select, Tag } from "antd";
import moment from "moment";
import { FC, useEffect, useState } from "react";
import {
  DragDropContext,
  Draggable,
  DraggableLocation,
  DropResult,
  Droppable,
  ResponderProvided,
} from "react-beautiful-dnd";
import { connect } from "react-redux";
import {
  Message,
  NotificationType,
  TaskPriority,
  TaskStage,
} from "../../../constants/Constants";
import { fetchAllListProjects } from "../../../redux/Project/Project.action";
import { Task } from "../../../redux/Task/Task.type";
import { fetchAllDetailedTaskCategory } from "../../../redux/TaskCategory/TaskCategory.action";
import { fetchAllUser } from "../../../redux/User/User.action";
import { DUE_DATE_FORMAT, PUT_TASK } from "../Task/util/task.util";
import { BoardProp } from "./util/board.util";
import { TaskCategory } from "../../../redux/TaskCategory/TaskCategory.type";
import { ErrorHandler } from "../../../utilities/utilities";
import { OpenNotification } from "../../common/Notification/Notification.component";

const grid = 5;

const BoardComponent: FC<BoardProp> = ({
  fetchTaskCategories,
  fetchUsers,
  task_categories,
  users,
  projects,
  fetchProjects,
}) => {
  const [state, setState] = useState<TaskCategory[]>([]);
  const [project_id, setProjectId] = useState<null | number>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (project_id) fetchTaskCategories({ project_id });
  }, [project_id]);

  useEffect(() => {
    if (
      project_id &&
      !task_categories.isPending &&
      !task_categories.isSuccessful
    ) {
      setTimeout(() => {
        fetchTaskCategories({ project_id });
      }, 3000);
    }

    if (!task_categories.isPending && task_categories.isSuccessful) {
      setState(task_categories.payload);
    }
  }, [task_categories]);

  const displayPriority = (record: Task) => {
    let color = "gray";

    if (record.priority === TaskPriority.LOW) color = "gray";
    else if (record.priority === TaskPriority.MEDIUM) color = "yellow";
    else if (record.priority === TaskPriority.HIGH) color = "red";

    return <Tag color={color}>{record.priority}</Tag>;
  };

  const displayStage = (record: Task) => {
    let color = "gray";

    if (record.stage === TaskStage.NOT_STARTED) color = "blue";
    else if (record.stage === TaskStage.IN_PROGRESS) color = "yellow";
    else if (record.stage === TaskStage.WAITING) color = "gray";
    else if (record.stage === TaskStage.COMPLETED) color = "green";

    return <Tag color={color}>{record.stage}</Tag>;
  };

  const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? "lightgreen" : "white",

    // styles we need to apply on draggables
    ...draggableStyle,
  });

  const getListStyle = (isDraggingOver: any) => ({
    background: isDraggingOver ? "lightblue" : "#f3f3f3",
    padding: grid,
    width: 250,
    minWidth: "341px",
    borderRadius: "5px",
  });

  const reorder = (list: Task[], startIndex: any, endIndex: any) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const move = (
    source: Task[],
    destination: Task[],
    droppableSource: DraggableLocation,
    droppableDestination: DraggableLocation
  ) => {
    const sInd = +droppableSource.droppableId;
    const dInd = +droppableDestination.droppableId;

    const sIndex = state.findIndex((e) => e.id === sInd);
    const dIndex = state.findIndex((e) => e.id === dInd);

    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result: any = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    const newState = [...state];

    newState[sIndex].tasks = result[sInd];
    newState[dIndex].tasks = result[dInd];

    setState(newState);
  };

  function onDragEnd(result: DropResult, provided: ResponderProvided) {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;
    const id = +result.draggableId;

    // sorting
    if (sInd === dInd) {
      const index = state.findIndex((e) => e.id === sInd);

      const items = reorder(
        state[index].tasks,
        source.index,
        destination.index
      );
      const newState: any = [...state];
      newState[index].tasks = items;
      setState(newState);
    }
    // move
    else {
      const sIndex = state.findIndex((e) => e.id === sInd);
      const dIndex = state.findIndex((e) => e.id === dInd);

      if (sIndex === -1 || dIndex === -1) return;

      move(state[sIndex].tasks, state[dIndex].tasks, source, destination);

      PUT_TASK({
        id,
        task_category_id: dInd,
      })
        .then(() => {})
        .catch((error) => {
          move(state[dIndex].tasks, state[sIndex].tasks, destination, source);

          ErrorHandler(error).map((e: any) =>
            OpenNotification(
              NotificationType.ERROR,
              Message.UPDATE_FAILED,
              e.message
            )
          );
        });
    }
  }

  return (
    <>
      <div className="row mb-3">
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
            loading={task_categories.isPending}
            options={projects.payload.map((e) => ({
              label: e.name,
              value: e.id,
            }))}
          />
        </div>
      </div>

      {project_id ? (
        <div className="d-flex" style={{}}>
          <DragDropContext onDragEnd={onDragEnd}>
            <div
              style={{
                margin: "8px",
                display: "flex",
                width: "100%",
                minHeight: "50vh",
              }}
            >
              {state.map((task_category, idx) => (
                <Droppable key={idx} droppableId={`${task_category.id}`}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      style={getListStyle(snapshot.isDraggingOver)}
                      {...provided.droppableProps}
                    >
                      <div className="text-center mb-2">
                        <span
                          style={{
                            fontSize: 16,
                          }}
                        >
                          {task_category.name}
                        </span>
                      </div>

                      {task_category.tasks.map((task, index) => (
                        <Draggable
                          key={task.id}
                          draggableId={`${task.id}`}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={getItemStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style
                              )}
                            >
                              <div className="d-flex flex-column">
                                <span style={{}}>{task.description}</span>

                                <div className="d-flex flex-row mt-2 mb-2">
                                  {displayPriority(task)}
                                  {displayStage(task)}
                                </div>

                                <span
                                  style={{
                                    fontSize: 12,
                                    color: "GrayText",
                                  }}
                                >
                                  {moment(
                                    task.due_date,
                                    DUE_DATE_FORMAT
                                  ).format("MMM DD")}
                                </span>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              ))}
            </div>
          </DragDropContext>
        </div>
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
  task_categories: state.task_category.fetchAllDetailed,
  users: state.user.fetchAll,
  projects: state.project.fetchList,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchTaskCategories: (action: any) =>
    dispatch(fetchAllDetailedTaskCategory(action)),
  fetchUsers: (action: any) => dispatch(fetchAllUser(action)),
  fetchProjects: (action: any) => dispatch(fetchAllListProjects(action)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BoardComponent);
