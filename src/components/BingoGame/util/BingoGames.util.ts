import axios from "axios";
import { API_BASE_URI } from "../../../redux/ApiCall";
import { Project } from "../../../redux/Project/Project.type";
import { Role } from "../../../redux/Role/Role.type";
import { User } from "../../../redux/User/User.type";
import { ApiCallState } from "../../../redux/Utils";
import { StatusBoard } from "../../../redux/StatusBoard/StatusBoard/StatusBoard.type";
import { BoardProject } from "../../../redux/StatusBoard/BoardProject/BoardProject.type";
import { MainUrl } from "../../../constants/Url";
import { Cartela } from "../../../redux/Cartelas/TodayBill.type";


import { Cartela as CartelaType } from "../../../redux/Cartelas/TodayBill.type";
import { getCachedAudio } from "../../../audioCache";
import { getAudioFileByName } from "../../../utils/AudioDatabase";
import { getAudioUrlForLanguage } from "../components/BingoPlayBoard/components/audioCatch";

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

export type DashboardPropType = {
  setCashier: Function;
  setCurrentCartela? : Function;
}

export type CartelaPropType = {
  showNavBar: boolean;
  fetchCartelas: Function;
  cartelas: ApiCallState<Cartela[]>;
  callIndex: number;
  drawNumbers: number[];
  currentCartela: CartelaType| null;
  setCurrentCartela: Function;
  setCheckedCartelas: Function;
  selectedCartelas: Number[];
  checkedCartelas: Number[];
  bingoGame: any|null;
  countHowmanyChecks: string|null;
};

export type SalesPropType = {
  showNavBar: boolean;
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

export type BingoPlayPropType = {
  boardNumberList: Array<Array<number>>;
  playGame: boolean;
  calledNumbers: number[];
  showNavBar: boolean;
  previousCalls: any[];
  shuffleNumbers:number[];
  drawNumbers: number[];
  bingoGame: any|null;
  automatic: boolean;
  callIndex: number;
  showModal: boolean;
  selectedCartelas: Number[];
  stake: number;
  audio_refs: any[];
  cashier: any;
  callTimeInSeconds: number;
  audioCallStr: string;
  countHowmanyChecks: string|null;
  language: string;
  setPlayGame: Function;
  setPreviousCalls: Function;
  setShuffleNumbers: Function;
  setDrawNumbers: Function;
  setBingoGame: Function;
  setAutomatic: Function;
  setCallIndex: Function;
  setShowModal: Function;
  setSelectedCartelas: Function;
  setCheckedCartelas: Function;
  setStake: Function;
  setCalledDrawNumbers: Function;
  setCashier: Function;
  setAudioCallStr: Function;
  setCountHowmanyChecks: Function;
  audio_shuffle_balls_ref: any;
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

export type KenoGame = {
  started_at: Date;
  game_number: number;
  draw_numbers: number[];
};
if ('caches' in window) {
  // Safe to use caches
  console.warn("Cache API is supported in this browser.");
} else {
  console.warn("Cache API not supported in this browser.");
}
export const makeUrlBasedOnLanguage = (url: string, language: string) => {
  const newUrl = language === 'amharic-default' ? '/src/audios/amharic/'+url: 
  language === 'amharic' ? '/src/audios/BINGO-EN/'+url :
  language === 'amharic-female'? '/src/audios/bingo-female/'+ url: '/src/audios/amharic/'+url
  return newUrl;
}
export const PlayAudioEfficiently = async (
  audio: HTMLAudioElement | null,
  drawNumbers: number[],
  callIndex: number,
  audioUrl: string,
  onFailAudio?: HTMLAudioElement | null,
  language?: string
) => {
  const num = drawNumbers[callIndex];
  const path = `/src/audios/amharic/${num}.mp3`;
  const newUrl = getAudioUrlForLanguage( language || 'amharic-default', callIndex) || path;
  console.log(`Audio data response for ${path}:`, audio, audio?.src );
  await getAudioFileByName(newUrl, newUrl).then(async (audioData) => {
    console.log(`Audio local-data for ${path}:`, audioData );
    
    if (audio){
      audio.src = URL.createObjectURL(audioData);
      audio.currentTime = 0;
      await audio?.play().catch(async (err) => {
        console.warn("Failed to play audio: ", err);
        if (onFailAudio) {
          await onFailAudio.play().catch(async () => {
            const fallback = new Audio(newUrl);
            await fallback.play();
          });
        } else {
          const fallback = new Audio(newUrl);
          await fallback.play();
        }   
      });
    }
  })

  // getCachedAudio(audioUrl).then((blobUrl) => {
  //     if (blobUrl && audio) {
  //       audio.src = blobUrl;
  //       // audio?.currentTime = 0;
  //       audio?.play().catch((err) => {
  //         console.warn("Failed to play audio: ", err);
  //         if (onFailAudio) {
  //           onFailAudio.play().catch(() => {
  //             const fallback = new Audio(`/src/audios/amharic/${num}.mp3`);
  //             fallback.play();
  //           });
  //         } else {
  //           const fallback = new Audio(`/src/audios/amharic/${num}.mp3`);
  //           fallback.play();
  //         }   
  //       });
  //     }
  //   });

  // if (audio) {
  //   try {
  //     const cache = await caches.open('audio-cache-v1');
  //     const cachedResponse = await cache.match(path);
  //     console.log(`Cached response for ${path}:`, cachedResponse );
      
  //     if (cachedResponse) {
  //       const blob = await cachedResponse.blob();
  //       const url = URL.createObjectURL(blob);
  //       audio.src = url;
  //       audio.currentTime = 0;
  //       await audio.play();
  //       URL.revokeObjectURL(url);
  //     } else {
  //       console.log(`Audio not cached: ${path}`);
        
  //       audio.src = path;
  //       audio.currentTime = 0;
  //       await audio.play();
  //     }
  //   } catch (err) {
  //     console.warn("Failed to play audio:", err);
  //     if (onFailAudio) {
  //       onFailAudio.play().catch(() => {
  //         const fallback = new Audio(`/src/audios/amharic/${num}.mp3`);
  //         fallback.play();
  //       });
  //     } else {
  //       const fallback = new Audio(`/src/audios/amharic/${num}.mp3`);
  //       fallback.play();
  //     }
  //   }
  // }
};

export const ArrayRange = (start: number, stop: number, step: number) => Array. from( { length: (stop - start) / step + 1 }, (value, index) => start + index * step );

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

export const get_cashier_data = (setCashier: Function) => {
  axios.get(MainUrl+'/bingo/get_dashboard_data')
  .then((response) => {
      console.log(response.data)
      if(response.data && response.data.status === 200){
          setCashier(response?.data?.casher)
      }
  })
}
