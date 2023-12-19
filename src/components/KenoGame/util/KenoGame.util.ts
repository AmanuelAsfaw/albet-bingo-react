import axios from "axios";
import { API_BASE_URI } from "../../../redux/ApiCall";
import { Project } from "../../../redux/Project/Project.type";
import { Role } from "../../../redux/Role/Role.type";
import { User } from "../../../redux/User/User.type";
import { ApiCallState } from "../../../redux/Utils";
import { StatusBoard } from "../../../redux/StatusBoard/StatusBoard/StatusBoard.type";
import { BoardProject } from "../../../redux/StatusBoard/BoardProject/BoardProject.type";
import { MainUrl } from "../../../constants/Url";
import { Pick10Display, Pick1Display, Pick2Display, Pick3Display, Pick4Display, Pick5Display, Pick6Display, Pick7Display, Pick8Display, Pick9Display, closeDisplay, x1Display, x2Display, x3Display, x4Display } from "./KenoGame.UI.util";



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
// return drawIndex
export const drawIndex = (nextGameTime:any, updateSate: Function) => {
  if (nextGameTime == null){
    updateSate(-1)
    return -1}

  const remainTime = 234 - nextGameTime 
  if(nextGameTime > 235){
    updateSate(-1)
    return -1
  }
  else if (nextGameTime > 231){ // 171.5
    updateSate(0)
    return 0 }
  else if (nextGameTime > 228){ // 169
    updateSate(1)
    return 1}
  else if (nextGameTime > 225){ // 166.5
    updateSate(2)
    return 2 }
  else if (nextGameTime > 222){ // 164
    updateSate(3)
    return 3}
  else if (nextGameTime > 219) {// 161.5
    updateSate(4)
    return 4 }
  else if (nextGameTime > 216) {// 159
    updateSate(5)
    return 5}
  else if (nextGameTime > 213){ // 156.5
    updateSate(6)
    return 6 }
  else if (nextGameTime > 210){ // 154
    updateSate(7)
    return 7}
  else if (nextGameTime > 207){ // 151.5
    updateSate(8)
    return 8 }
  else if (nextGameTime > 204){ // 149
    updateSate(9)
    return 9}
  else if (nextGameTime > 201){ // 146.5
    updateSate(10)
    return 10 }
  else if (nextGameTime > 198) {// 144
    updateSate(11)
    return 11}
  else if (nextGameTime > 195) {// 141.5
    updateSate(12)
    return 12 }
  else if (nextGameTime > 192){ // 139
    updateSate(13)
    return 13}
  else if (nextGameTime > 189){ // 136.5
    updateSate(14)
    return 14}
  else if (nextGameTime > 186){ // 134
    updateSate(15)
    return 15}
  else if (nextGameTime > 183){ // 131.5
    updateSate(16)
    return 16 }
  else if (nextGameTime > 180) {// 129
    updateSate(17)
    return 17}
  else if (nextGameTime > 177) {// 126.5
    updateSate(18)
    return 18}
  else if (nextGameTime < 177){ // 124
    updateSate(19)
    return 19}
  else if (nextGameTime < 171) {// less than 124
    updateSate(19)
    return 19}
  
  updateSate(-1)
  return -1
}
// the first 6 seconds
export const checkToPlayVideo = (nextGameTime:any) => {
  if (nextGameTime){
      if(nextGameTime > 234 && nextGameTime < 242)
          return true
  }
  return false
}
// the second 50 seconds
export const checkToDrawingGame = (nextGameTime:any) => {
  if (nextGameTime){
    console.log('checkToDrawingGame '+nextGameTime);
    console.log(nextGameTime < 234 && nextGameTime > 169);
    
      if(nextGameTime < 234 && nextGameTime > 169)
          return true
  }
  return false
}

// the thrid 25 seconds 
export const checkTop10DisplayTime = (nextGameTime:any) => {
  if (nextGameTime){
      if(nextGameTime >  159 && nextGameTime < 170)
          return true
  }
  return false
}

// the forth 56 seconds and 24 seconds and 9 seconds
export const checkToDisplayPick1to10 = (nextGameTime:any, nextGame:any) => {  
  // pick 3
  if((nextGameTime < 99 && nextGameTime > 95) || (nextGameTime < 159 && nextGameTime > 155)){
    return Pick3Display({
      nextGameTime: nextGameTime,
      nextGame: nextGame,
    });
  }
  // pick 2
  else if((nextGameTime < 95 && nextGameTime > 91) || (nextGameTime < 155 && nextGameTime > 151)){
    return Pick2Display({
      nextGameTime: nextGameTime,
      nextGame: nextGame,
    });
  }
  // pick 1
  else if((nextGameTime < 91 && nextGameTime > 87) || (nextGameTime < 151 && nextGameTime > 147)){
    return Pick1Display({
      nextGameTime: nextGameTime,
      nextGame: nextGame,
    });
  }
  // x1
  else if((nextGameTime < 87 && nextGameTime > 83) || (nextGameTime < 147 && nextGameTime > 143)){
    return x1Display({
      nextGameTime: nextGameTime,
      nextGame: nextGame,
    });
  }
  // x2
  else if((nextGameTime < 83 && nextGameTime > 79) || (nextGameTime < 143 && nextGameTime > 139)){
    return x2Display({
      nextGameTime: nextGameTime,
      nextGame: nextGame,
    });
  }
  // x3
  else if((nextGameTime < 79 && nextGameTime > 75) || (nextGameTime < 139 && nextGameTime > 135)){
    return x3Display({
      nextGameTime: nextGameTime,
      nextGame: nextGame,
    });
  }
  // x4
  else if((nextGameTime < 75 && nextGameTime > 71) || (nextGameTime < 135 && nextGameTime > 131)){
    return x4Display({
      nextGameTime: nextGameTime,
      nextGame: nextGame,
    });
  }
  // pick10
  else if((nextGameTime < 71 && nextGameTime > 67) || (nextGameTime < 131 && nextGameTime > 107)){
    return Pick10Display({
      nextGameTime: nextGameTime,
      nextGame: nextGame,
    });
  }
  // pick9
  else if((nextGameTime < 67 && nextGameTime > 63) || (nextGameTime < 107 && nextGameTime > 103)){
    return Pick9Display({
      nextGameTime: nextGameTime,
      nextGame: nextGame,
    });
  }
  // pick8
  else if((nextGameTime < 63 && nextGameTime > 59) || (nextGameTime < 103 && nextGameTime > 99)){
    return Pick8Display({
      nextGameTime: nextGameTime,
      nextGame: nextGame,
    });
  }
  // pick7
  else if(nextGameTime < 59 && nextGameTime > 55){
    return Pick7Display({
      nextGameTime: nextGameTime,
      nextGame: nextGame,
    });
  }
  // pick6
  else if(nextGameTime < 55 && nextGameTime > 51){
    return Pick6Display({
      nextGameTime: nextGameTime,
      nextGame: nextGame,
    });
  }
  // pick5
  else if(nextGameTime < 51 && nextGameTime > 47){
    return Pick5Display({
      nextGameTime: nextGameTime,
      nextGame: nextGame,
    });
  }
  // pick4
  else if(nextGameTime < 47 && nextGameTime > 43){
    return Pick4Display({
      nextGameTime: nextGameTime,
      nextGame: nextGame,
    });
  }
  // x3
  else if(nextGameTime < 43 && nextGameTime > 39){
    return x3Display({
      nextGameTime: nextGameTime,
      nextGame: nextGame,
    });
  }
  // x4
  else if(nextGameTime < 39 && nextGameTime > 35){
    return x1Display({
      nextGameTime: nextGameTime,
      nextGame: nextGame,
    });

  }
  // pick9
  else if(nextGameTime < 35 && nextGameTime > 31){
    return Pick9Display({
      nextGameTime: nextGameTime,
      nextGame: nextGame,
    });
  }
  // pick10
  else if(nextGameTime < 31 && nextGameTime > 27){
    return Pick10Display({
      nextGameTime: nextGameTime,
      nextGame: nextGame,
    });
  }
  // x1
  else if(nextGameTime < 27 && nextGameTime > 23){
    return x1Display({
      nextGameTime: nextGameTime,
      nextGame: nextGame,
    });

  }
  // x2
  else if(nextGameTime < 23 && nextGameTime > 19){
    return x2Display({
      nextGameTime: nextGameTime,
      nextGame: nextGame,
    });
  }
  // x3
  else if(nextGameTime < 19 && nextGameTime > 15){
    return x3Display({
      nextGameTime: nextGameTime,
      nextGame: nextGame,
    });
  }
  // x4
  else if(nextGameTime < 15 && nextGameTime > 11){
    return x4Display({
      nextGameTime: nextGameTime,
      nextGame: nextGame,
    });
  }
  // pick8
  else if(nextGameTime < 11 && nextGameTime > 7){
    return Pick8Display({
      nextGameTime: nextGameTime,
      nextGame: nextGame,
    });
  }
  // for closed
  else if(nextGameTime < 7 && nextGameTime > 0){
    return closeDisplay({
      nextGameTime: nextGameTime,
      nextGame: nextGame,
    });
  }
  else{
    return null;
  }
}

export const getDifferenceInMiliseconds = (str_time: string):number =>  {
  const serverTimeStr: string = str_time;
  const serverTime: Date = new Date(serverTimeStr); // Parse server time string into Date object

  const clientTime: Date = new Date(); // Current client time

  // Calculate the time difference in milliseconds
  const miliseconds: number = Math.abs(clientTime.getTime() - serverTime.getTime());

  console.log(`Time difference in milliseconds: ${miliseconds}`);
  return miliseconds
}

import video_anima1 from "../../../video/outputs/anima_1.mp4"
import video_anima2 from "../../../video/outputs/anima_2.mp4"
import video_anima3 from "../../../video/outputs/anima_3.mp4"
import video_anima4 from "../../../video/outputs/anima_4.mp4"
import video_anima5 from "../../../video/outputs/anima_5.mp4"
import video_anima6 from "../../../video/outputs/anima_6.mp4"
import video_anima7 from "../../../video/outputs/anima_7.mp4"
import video_anima8 from "../../../video/outputs/anima_8.mp4"
import video_anima9 from "../../../video/outputs/anima_9.mp4"
import video_anima10 from "../../../video/outputs/anima_10.mp4"

import video_anima11 from "../../../video/outputs/anima_11.mp4"
import video_anima12 from "../../../video/outputs/anima_12.mp4"
import video_anima13 from "../../../video/outputs/anima_13.mp4"
import video_anima14 from "../../../video/outputs/anima_14.mp4"
import video_anima15 from "../../../video/outputs/anima_15.mp4"
import video_anima16 from "../../../video/outputs/anima_16.mp4"
import video_anima17 from "../../../video/outputs/anima_17.mp4"
import video_anima18 from "../../../video/outputs/anima_18.mp4"
import video_anima19 from "../../../video/outputs/anima_19.mp4"
import video_anima20 from "../../../video/outputs/anima_20.mp4"

import video_anima21 from "../../../video/outputs/anima_21.mp4"
import video_anima22 from "../../../video/outputs/anima_22.mp4"
import video_anima23 from "../../../video/outputs/anima_23.mp4"
import video_anima24 from "../../../video/outputs/anima_24.mp4"
import video_anima25 from "../../../video/outputs/anima_25.mp4"
import video_anima26 from "../../../video/outputs/anima_26.mp4"
import video_anima27 from "../../../video/outputs/anima_27.mp4"
import video_anima28 from "../../../video/outputs/anima_28.mp4"
import video_anima29 from "../../../video/outputs/anima_29.mp4"
import video_anima30 from "../../../video/outputs/anima_30.mp4"

import video_anima31 from "../../../video/outputs/anima_31.mp4"
import video_anima32 from "../../../video/outputs/anima_32.mp4"
import video_anima33 from "../../../video/outputs/anima_33.mp4"
import video_anima34 from "../../../video/outputs/anima_34.mp4"
import video_anima35 from "../../../video/outputs/anima_35.mp4"
import video_anima36 from "../../../video/outputs/anima_36.mp4"
import video_anima37 from "../../../video/outputs/anima_37.mp4"
import video_anima38 from "../../../video/outputs/anima_38.mp4"
import video_anima39 from "../../../video/outputs/anima_39.mp4"
import video_anima40 from "../../../video/outputs/anima_40.mp4"

import video_anima41 from "../../../video/outputs/anima_41.mp4"
import video_anima42 from "../../../video/outputs/anima_42.mp4"
import video_anima43 from "../../../video/outputs/anima_43.mp4"
import video_anima44 from "../../../video/outputs/anima_44.mp4"
import video_anima45 from "../../../video/outputs/anima_45.mp4"
import video_anima46 from "../../../video/outputs/anima_46.mp4"
import video_anima47 from "../../../video/outputs/anima_47.mp4"
import video_anima48 from "../../../video/outputs/anima_48.mp4"
import video_anima49 from "../../../video/outputs/anima_49.mp4"
import video_anima50 from "../../../video/outputs/anima_50.mp4"


import video_anima51 from "../../../video/outputs/anima_51.mp4"
import video_anima52 from "../../../video/outputs/anima_52.mp4"
import video_anima53 from "../../../video/outputs/anima_53.mp4"
import video_anima54 from "../../../video/outputs/anima_54.mp4"
import video_anima55 from "../../../video/outputs/anima_55.mp4"
import video_anima56 from "../../../video/outputs/anima_56.mp4"
import video_anima57 from "../../../video/outputs/anima_57.mp4"
import video_anima58 from "../../../video/outputs/anima_58.mp4"
import video_anima59 from "../../../video/outputs/anima_59.mp4"
import video_anima60 from "../../../video/outputs/anima_60.mp4"


import video_anima61 from "../../../video/outputs/anima_61.mp4"
import video_anima62 from "../../../video/outputs/anima_62.mp4"
import video_anima63 from "../../../video/outputs/anima_63.mp4"
import video_anima64 from "../../../video/outputs/anima_64.mp4"
import video_anima65 from "../../../video/outputs/anima_65.mp4"
import video_anima66 from "../../../video/outputs/anima_66.mp4"
import video_anima67 from "../../../video/outputs/anima_67.mp4"
import video_anima68 from "../../../video/outputs/anima_68.mp4"
import video_anima69 from "../../../video/outputs/anima_69.mp4"
import video_anima70 from "../../../video/outputs/anima_70.mp4"


import video_anima71 from "../../../video/outputs/anima_71.mp4"
import video_anima72 from "../../../video/outputs/anima_72.mp4"
import video_anima73 from "../../../video/outputs/anima_73.mp4"
import video_anima74 from "../../../video/outputs/anima_74.mp4"
import video_anima75 from "../../../video/outputs/anima_75.mp4"
import video_anima76 from "../../../video/outputs/anima_76.mp4"
import video_anima77 from "../../../video/outputs/anima_77.mp4"
import video_anima78 from "../../../video/outputs/anima_78.mp4"
import video_anima79 from "../../../video/outputs/anima_79.mp4"
import video_anima80 from "../../../video/outputs/anima_80.mp4"


export const list_of_animation: any = {
  'animation_1': video_anima1,
  'animation_2': video_anima2,
  'animation_3': video_anima3,
  'animation_4': video_anima4,
  'animation_5': video_anima5,
  'animation_6': video_anima6,
  'animation_7': video_anima7,
  'animation_8': video_anima8,
  'animation_9': video_anima9,
  'animation_10': video_anima10,
  
  'animation_11': video_anima11,
  'animation_12': video_anima12,
  'animation_13': video_anima13,
  'animation_14': video_anima14,
  'animation_15': video_anima15,
  'animation_16': video_anima16,
  'animation_17': video_anima17,
  'animation_18': video_anima18,
  'animation_19': video_anima19,
  'animation_20': video_anima20,
  
  'animation_21': video_anima21,
  'animation_22': video_anima22,
  'animation_23': video_anima23,
  'animation_24': video_anima24,
  'animation_25': video_anima25,
  'animation_26': video_anima26,
  'animation_27': video_anima27,
  'animation_28': video_anima28,
  'animation_29': video_anima29,
  'animation_30': video_anima30,
  
  'animation_31': video_anima31,
  'animation_32': video_anima32,
  'animation_33': video_anima33,
  'animation_34': video_anima34,
  'animation_35': video_anima35,
  'animation_36': video_anima36,
  'animation_37': video_anima37,
  'animation_38': video_anima38,
  'animation_39': video_anima39,
  'animation_40': video_anima40,
  
  'animation_41': video_anima41,
  'animation_42': video_anima42,
  'animation_43': video_anima43,
  'animation_44': video_anima44,
  'animation_45': video_anima45,
  'animation_46': video_anima46,
  'animation_47': video_anima47,
  'animation_48': video_anima48,
  'animation_49': video_anima49,
  'animation_50': video_anima50,
  
  'animation_51': video_anima51,
  'animation_52': video_anima52,
  'animation_53': video_anima53,
  'animation_54': video_anima54,
  'animation_55': video_anima55,
  'animation_56': video_anima56,
  'animation_57': video_anima57,
  'animation_58': video_anima58,
  'animation_59': video_anima59,
  'animation_60': video_anima60,
  
  'animation_61': video_anima61,
  'animation_62': video_anima62,
  'animation_63': video_anima63,
  'animation_64': video_anima64,
  'animation_65': video_anima65,
  'animation_66': video_anima66,
  'animation_67': video_anima67,
  'animation_68': video_anima68,
  'animation_69': video_anima69,
  'animation_70': video_anima70,
  
  'animation_71': video_anima71,
  'animation_72': video_anima72,
  'animation_73': video_anima73,
  'animation_74': video_anima74,
  'animation_75': video_anima75,
  'animation_76': video_anima76,
  'animation_77': video_anima77,
  'animation_78': video_anima78,
  'animation_79': video_anima79,
  'animation_80': video_anima80,
}


export const preloadFunction = () => {
  preloadVideo('../../../../src/video/anima_1.mp4', 'animation_1')
  preloadVideo('../../../../src/video/anima_2.mp4', 'animation_2')
  preloadVideo('../../../../src/video/anima_3.mp4', 'animation_3')
  preloadVideo('../../../../src/video/anima_4.mp4', 'animation_4')
  preloadVideo('../../../../src/video/anima_5.mp4', 'animation_5')
  preloadVideo('../../../../src/video/anima_6.mp4', 'animation_6')
  preloadVideo('../../../../src/video/anima_7.mp4', 'animation_7')
  preloadVideo('../../../../src/video/anima_8.mp4', 'animation_8')
  preloadVideo('../../../../src/video/anima_9.mp4', 'animation_9')
  preloadVideo('../../../../src/video/anima_10.mp4', 'animation_10')
  preloadVideo('../../../../src/video/anima_11.mp4', 'animation_11')
  preloadVideo('../../../../src/video/anima_12.mp4', 'animation_12')
  preloadVideo('../../../../src/video/anima_13.mp4', 'animation_13')
  preloadVideo('../../../../src/video/anima_14.mp4', 'animation_14')
  preloadVideo('../../../../src/video/anima_15.mp4', 'animation_15')
  preloadVideo('../../../../src/video/anima_16.mp4', 'animation_16')
  preloadVideo('../../../../src/video/anima_17.mp4', 'animation_17')
  preloadVideo('../../../../src/video/anima_18.mp4', 'animation_18')
  preloadVideo('../../../../src/video/anima_19.mp4', 'animation_19')
  preloadVideo('../../../../src/video/anima_20.mp4', 'animation_20')
  preloadVideo('../../../../src/video/anima_21.mp4', 'animation_21')
  preloadVideo('../../../../src/video/anima_22.mp4', 'animation_22')
  preloadVideo('../../../../src/video/anima_23.mp4', 'animation_23')
  preloadVideo('../../../../src/video/anima_24.mp4', 'animation_24')
  preloadVideo('../../../../src/video/anima_25.mp4', 'animation_25')
  preloadVideo('../../../../src/video/anima_26.mp4', 'animation_26')
  preloadVideo('../../../../src/video/anima_27.mp4', 'animation_27')
  preloadVideo('../../../../src/video/anima_28.mp4', 'animation_28')
  preloadVideo('../../../../src/video/anima_29.mp4', 'animation_29')
  preloadVideo('../../../../src/video/anima_30.mp4', 'animation_30')
  preloadVideo('../../../../src/video/anima_31.mp4', 'animation_31')
  preloadVideo('../../../../src/video/anima_32.mp4', 'animation_32')
  preloadVideo('../../../../src/video/anima_33.mp4', 'animation_33')
  preloadVideo('../../../../src/video/anima_34.mp4', 'animation_34')
  preloadVideo('../../../../src/video/anima_35.mp4', 'animation_35')
  preloadVideo('../../../../src/video/anima_36.mp4', 'animation_36')
  preloadVideo('../../../../src/video/anima_37.mp4', 'animation_37')
  preloadVideo('../../../../src/video/anima_38.mp4', 'animation_38')
  preloadVideo('../../../../src/video/anima_39.mp4', 'animation_39')
  preloadVideo('../../../../src/video/anima_40.mp4', 'animation_40')
  preloadVideo('../../../../src/video/anima_41.mp4', 'animation_41')
  preloadVideo('../../../../src/video/anima_42.mp4', 'animation_42')
  preloadVideo('../../../../src/video/anima_43.mp4', 'animation_43')
  preloadVideo('../../../../src/video/anima_44.mp4', 'animation_44')
  preloadVideo('../../../../src/video/anima_45.mp4', 'animation_45')
  preloadVideo('../../../../src/video/anima_46.mp4', 'animation_46')
  preloadVideo('../../../../src/video/anima_47.mp4', 'animation_47')
  preloadVideo('../../../../src/video/anima_48.mp4', 'animation_48')
  preloadVideo('../../../../src/video/anima_49.mp4', 'animation_49')
  preloadVideo('../../../../src/video/anima_50.mp4', 'animation_50')
  preloadVideo('../../../../src/video/anima_51.mp4', 'animation_51')
  preloadVideo('../../../../src/video/anima_52.mp4', 'animation_52')
  preloadVideo('../../../../src/video/anima_53.mp4', 'animation_53')
  preloadVideo('../../../../src/video/anima_54.mp4', 'animation_54')
  preloadVideo('../../../../src/video/anima_55.mp4', 'animation_55')
  preloadVideo('../../../../src/video/anima_56.mp4', 'animation_56')
  preloadVideo('../../../../src/video/anima_57.mp4', 'animation_57')
  preloadVideo('../../../../src/video/anima_58.mp4', 'animation_58')
  preloadVideo('../../../../src/video/anima_59.mp4', 'animation_59')
  preloadVideo('../../../../src/video/anima_60.mp4', 'animation_60')
  preloadVideo('../../../../src/video/anima_61.mp4', 'animation_61')
  preloadVideo('../../../../src/video/anima_62.mp4', 'animation_62')
  preloadVideo('../../../../src/video/anima_63.mp4', 'animation_63')
  preloadVideo('../../../../src/video/anima_64.mp4', 'animation_64')
  preloadVideo('../../../../src/video/anima_65.mp4', 'animation_65')
  preloadVideo('../../../../src/video/anima_66.mp4', 'animation_66')
  preloadVideo('../../../../src/video/anima_67.mp4', 'animation_67')
  preloadVideo('../../../../src/video/anima_68.mp4', 'animation_68')
  preloadVideo('../../../../src/video/anima_69.mp4', 'animation_69')
  preloadVideo('../../../../src/video/anima_70.mp4', 'animation_70')
  preloadVideo('../../../../src/video/anima_1.mp4', 'animation_71')
  preloadVideo('../../../../src/video/anima_72.mp4', 'animation_72')
  preloadVideo('../../../../src/video/anima_73.mp4', 'animation_73')
  preloadVideo('../../../../src/video/anima_74.mp4', 'animation_74')
  preloadVideo('../../../../src/video/anima_75.mp4', 'animation_75')
  preloadVideo('../../../../src/video/anima_76.mp4', 'animation_76')
  preloadVideo('../../../../src/video/anima_77.mp4', 'animation_77')
  preloadVideo('../../../../src/video/anima_78.mp4', 'animation_78')
  preloadVideo('../../../../src/video/anima_79.mp4', 'animation_79')
  preloadVideo('../../../../src/video/anima_80.mp4', 'animation_80')
}

function preloadVideo(arg0: string, arg1: string) {
  throw new Error("Function not implemented.");
}

