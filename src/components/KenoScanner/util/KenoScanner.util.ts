import axios from "axios";
import { API_BASE_URI } from "../../../redux/ApiCall";
import { Project } from "../../../redux/Project/Project.type";
import { Role } from "../../../redux/Role/Role.type";
import { User } from "../../../redux/User/User.type";
import { ApiCallState } from "../../../redux/Utils";
import { StatusBoard } from "../../../redux/StatusBoard/StatusBoard/StatusBoard.type";
import { BoardProject } from "../../../redux/StatusBoard/BoardProject/BoardProject.type";
import { MainUrl } from "../../../constants/Url";



export const max_selectedNumbers = 6;
export const numbers_list = [
    1,2,3,4,5,6,7,8,9,10,
    11,12,13,14,15,16,17,18,19,20,
    21,22,23,24,25,26,27,28,29,30,
    31,32,33,34,35,36,37,38,39,40,
    41,42,43,44,45,46,47,48,49,50,
    51,52,53,54,55,56,57,58,59,60,
    61,62,63,64,65,66,67,68,69,70,
    71,72,73,74,75,76,77,78,79,80
];

export const numberWithOdd: {
  [x: number]: number 
} = {
  1:3.5,
  2:15,
  3:35,
  4:100,
  5:300,
  6:1800,
  7:2150,
  8:3000,
  9:4200,
  10:5000
};


export type StatusBoardPropType = {
  projects: ApiCallState<Project[]>;
  status_board: ApiCallState<StatusBoard[]>;
  fetchProjects: Function;
  fetchStatusBoards: Function;
  fetchOneProject: Function;
  fetchUser: Function;
  // users: ApiCallState<User[]>;
  fetchRoles: Function;
};

export type LoadingScreenPropType = {
  
}
export const InitialColumns : BoardPropType = {
  ['Projects']: {
    id: 0,
    title: 'Projects',
    items: [],
    priority: 0
  }
};
export interface TaskInterface {
  id: string;
  Task: string;
  Due_Date: string;
}

export type TaskCardPropType = {
  key: string;
  title : string;
  priority: number;
  updatedAt : string;
  id: number;
  index: number;
};

export type BoardProjectPropType = {
  key: string;
  board_id : number;
  project_id: number;
  priority: number;
  id: number;
  index: number;
};

export type BoardPropType = {
  [x: string]:{
    priority: number;
    id: number;
    title: string;
    items: BoardProject[];
  }
};

export type AddUserControlPropType = {
  project: ApiCallState<Project>;
  fetchOneProject: Function;
  users: ApiCallState<User[]>;
  roles: ApiCallState<Role[]>;
};

export type FileType = {
  uid: string;
  lastModified: Date;
  lastModifiedDate: Date;
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
};

export type ConceptType = {
  date: Date;
  type: string;
  concept_type: string;
  description: string;
  file: FileType | string;
  project_id: number;
  uploaded_by: number;
  [key: string]: string | number | Date | FileType;
};

export type CurrentGameType = {
    bonus: string;
    draw_numbers: number[];
    game_number: number;
    heads: number;
    id: number;
    is_finished: boolean;
    local_date: string;
    local_started_at: string;
    result: string;
    started_at: string;
    state: string;
    status: string;
    tails: number;
}

export type NextGameType = {
    bonus: string;
    draw_numbers: string;
    game_number: number;
    heads: number;
    id: number;
    is_finished: boolean;
    local_date: string;
    local_started_at: string;
    result: string;
    started_at: string;
    state: string;
    status: string;
    tails: number;
}

export const Roles = [{ value: "Resident Engineer" }, { value: "RU" }];

export const sendData = (data: any) =>
  axios.post(API_BASE_URI + "/project/user-control", data);

export const DeleteData = (id: any) =>
  axios.delete(API_BASE_URI + `/status-board/${id}`);

  
export const CreateBoard = (data: any) =>
  axios.post(API_BASE_URI + `/status-board`, data);

export const CreateProjectBoard = (data: any) =>
  axios.post(API_BASE_URI + `/project-status-board`, data);

export const UpdateBoard = (data: any) =>
axios.post(API_BASE_URI + `/project-status-board/update-board`, data);


export function fetch_keno_game_data(setCurrentGame: Function, setIsReady: Function, setNextGame: Function, setLoadingScreen: Function) {
    axios.get(MainUrl+'/casher/live_draw')
    .then((response) => {
        console.log(response.data)
        if(response.data.status === 200 && response.data.current_game){
            console.log(typeof(response.data.current_game.started_at).toString().split("T"));
            setCurrentGame(response.data.current_game)
            setIsReady(false)
        }
        if(response.data.status === 200 && response.data.next_game){
            setNextGame(response.data.next_game)
            setLoadingScreen(false)
        }
    })
}