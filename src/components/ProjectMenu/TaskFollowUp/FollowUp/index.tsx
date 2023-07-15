import { FC, ReactChild, ReactFragment, ReactPortal, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Message, NotificationType } from "../../../../constants/Constants";
import { fetchAllUser } from "../../../../redux/User/User.action";
import { fetchAllProjects } from "../../../../redux/Project/Project.action";
import { ErrorHandler } from "../../../../utilities/utilities";
import { OpenNotification } from "../../../common/Notification/Notification.component";
import { BoardPropType, InitialColumns, ProjectTaskBoardPropType, UpdateBoard, DeleteData,  } from "./utils/FollowUp.util";
import Table, { ColumnsType } from "antd/lib/table";
import { Button, Popconfirm, Popover, Select } from "antd";
import { DeleteOutlined, MoreOutlined } from "@ant-design/icons";
import { fetchOneProjects } from "../../../../redux/Project/Project.action";
import { isEmpty } from "lodash";

import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';
import { fetchAllRole } from "../../../../redux/Role/Role.action";
import TaskCard from "./components/ProjectCard";
import styled from '@emotion/styled';
import AddStatusBoardComponent from "./components/AddProjectTaskBoard";
import AddTaskBoardComponent from "./components/AddProjectTaskItem";
import { fetchAllProjectCategoryBoard } from "../../../../redux/TaskFollowUp/ProjectCategoryBoard/ProjectCategoryBoard.action";
import { BoardProject } from "../../../../redux/StatusBoard/BoardProject/BoardProject.type";
import { ProjectTaskCategory } from "../../../../redux/TaskFollowUp/ProjectTaskCategory/ProjectTaskCategory.type";
import { ProjectBoardTask } from "../../../../redux/TaskFollowUp/ProjectBoardTask/ProjectBoardTask.type";

const ProjectTaskBoardComponent: FC<ProjectTaskBoardPropType> = ({
  categorys,
  project_category_board,
  fetchUser,
  fetchProjectTaskBoards,
  fetchOneProject,
  fetchRoles,
}) => {
  const [assignData, setAssignData] = useState<any>([]);
  const [columns, setColumns] = useState<BoardPropType>(InitialColumns);
  const [boardOnchange, setBoardOnchange] = useState<number>(0);
  const [allBoardProjects, setAllBoardProjects] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number|undefined>(undefined);

  useEffect(() => {
    console.log('fetchProjectTaskBoards');
    console.log(selectedCategory);
    if(selectedCategory)
      fetchProjectTaskBoards({
        category_id: selectedCategory
      });
  }, [selectedCategory]);

  useEffect(()=>{
    console.log('useEffect project_category_board');
    
    if(project_category_board.payload.length){
      let columns_list:  BoardPropType = {}

      if(!project_category_board.payload.find((x)=> x.title == 'Item-Board')){
        columns_list['Item-Board'] = {
          id: 0,
          title: 'Item-Board',
          items: [],
          priority:0
        }
      }
      
      project_category_board.payload.sort((a,b)=>
        (a.priority < b.priority)?1:  
          (a.priority === b.priority)? 0:-1 ).forEach(element => {
        columns_list[element.title] = {
          id: element.id,
          title: element.title,
          priority: element.priority,
          items: element.board_tasks
        }
        
      });
      setColumns(columns_list)
      
    } else{
      setColumns(InitialColumns)
    }
  },[project_category_board])

  useEffect(() => {
    if(boardOnchange){
      console.log(columns);   
      let changed_board : ProjectBoardTask[] = [] ;
      Object.entries(columns).map(([columnId, column],index)=>{
        column.items.forEach(element => {
        changed_board.push({...element, board_id: column.id})
        });
      });
      console.log(changed_board);
      
      UpdateBoard({
        status_board: changed_board,
        category_id: selectedCategory
      })
        .then(() => {
          setTimeout(() => {
            fetchProjectTaskBoards({
              category_id: selectedCategory
            });
            OpenNotification(
              NotificationType.SUCCESS,
              Message.STATUS_BOARD_UPDATE_SUCCESS,
              ""
            );

          }, 1000);
        })
        .catch((error: any) => {
          ErrorHandler(error).map((e: any) =>
            OpenNotification(
              NotificationType.ERROR,
              Message.STATUS_BOARD_REGISTERED_FAIL,
              e.message
            )
          );
        });
    }
    
  }, [boardOnchange])
  
  const OnDelete = (id: any) => {
    let board_list = {...columns}
    if(columns.hasOwnProperty(id)){
      console.log(columns[id]);
      delete board_list[id]
    }
    setColumns(board_list);
    
    DeleteData(id)
      .then(() => {
        fetchProjectTaskBoards({
          category_id: selectedCategory
        });
        OpenNotification(
          NotificationType.SUCCESS,
          "Board removed!",
          ""
        );
      })
      .catch((error) => {
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            "Failed to remove Board",
            e.message
          )
        );
      });
  };

  
  const onDragEnd = (result: DropResult, columns: { [x: string]: any; }, setColumns: (arg0: any) => void) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
      setBoardOnchange(boardOnchange+1)
      
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };
  
  const Container = styled.div`
    display: flex;
    background-color: #84d4cb61;
    `;

  const TaskList = styled.div`
    min-height: 100px;
    display: flex;
    flex-direction: column;
    background: #f3f3f3;
    min-width: 341px;
    border-radius: 5px;
    padding: 15px 15px;
    margin-right: 45px;
    `;

  const TaskColumnStyles = styled.div`
    margin: 8px;
    display: flex;
    width: 100%;
    min-height: 80vh;
    `;

  const Title = styled.span`
    color: #10957d;
    background: rgba(16, 149, 125, 0.15);
    padding: 2px 10px;
    border-radius: 5px;
    align-self: flex-start;
    `;

  
    const fetchAllConcept = async () => {
    };
    
    const addBoardTracker = async (title: string) => {
      const board = {
          id: 0,
          title: title,
          items : [],
          priority: 0
        }
      let columns_copy: BoardPropType
      =  {...columns, [title]: board}
      setColumns(columns_copy)
    };

    const renderPopOverContent = () => {
      return (
        <div className="d-flex flex-column">
          <AddStatusBoardComponent category_id={selectedCategory} fetchStatusBoards={fetchProjectTaskBoards}/>
          <AddTaskBoardComponent category_id={selectedCategory}
                  fetchStatusBoardAll={fetchProjectTaskBoards} />
        </div>
      );
    };

    const getProjectNameByid = (item: any) => {
    //   const project = projects.payload.find((x)=> x.id == item.project_id)?.name
    //   return  project? project: 'Unknown'
        return ''
    }

  return (
    <div>
        <Select placeholder="Select Category" style={{margin: '10px'}} onChange={(x)=> setSelectedCategory(x)}>
            {categorys.payload.map((category) => {
                return (
                    <option value={category.id}>{category.description}</option>
                )
            })}
        </Select>
        {selectedCategory && 
        (<DragDropContext onDragEnd={(result) => onDragEnd(result, columns, setColumns)}>
            <Container>
                <TaskColumnStyles>
                {Object.entries(columns).map(([columnId, column],index)=>{
                    return(
                        <Droppable key={columnId} droppableId={columnId}>
                        {(provided, snapshot) => (
                            <TaskList ref={provided.innerRef} {...provided.droppableProps}>
                            <div style={{display:"flex", justifyContent: "space-between"}}>
                            <Title>{column.title}</Title>
                                {column.title == 'Item-Board' &&(<Popover
                                placement="top"
                                overlayClassName="action-popover"
                                trigger="focus"
                                zIndex={2000}
                                content={() => renderPopOverContent()}
                                >
                                <Button
                                    icon={<MoreOutlined />}
                                    className="btn-outline-secondary border-0"
                                ></Button>
                                </Popover>)}
                                
                                {column.title !== 'Item-Board' &&(
                                <Popconfirm
                                placement="leftTop"
                                title="Are you sure you want to remove this Board?"
                                onConfirm={() => OnDelete(column.id)}
                                okText="Yes"
                                cancelText="No"
                                >
                                <Button
                                    icon={<DeleteOutlined />}
                                    className="btn-outline-secondary border-0"
                                    ></Button>
                                </Popconfirm>
                                )}
                            </div>
                            
                            {column.items.map((item, index) => (
                                <TaskCard key={index.toString()}
                              title={item.title}
                              index={index} priority={item.priority} id={item.id} updatedAt={item.updatedAt} 
                              fetchStatusBoardAll={fetchProjectTaskBoards} category_id={selectedCategory}/>
                            ))}
                            </TaskList>
                        )}
                        </Droppable>
                    )
                    })}
                </TaskColumnStyles>
            </Container>
        </DragDropContext>
        )}
    </div>    
  );
};

/**
 * Map State to Props
 *
 * @param state
 */
const mapStateToProps = (state: any) => ({
  categorys: state.project_task_category.fetchAll,
  project_category_board: state.project_category_board.fetchAll,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchUser: (action: any) => dispatch(fetchAllUser(action)),
  fetchProjectTaskBoards: (action: any) => dispatch(fetchAllProjectCategoryBoard(action)),
  fetchOneProject: (action: any) => dispatch(fetchOneProjects(action)),
  fetchRoles: (action: any) => dispatch(fetchAllRole(action)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectTaskBoardComponent);
