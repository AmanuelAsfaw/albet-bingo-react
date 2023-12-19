import {
    FC,
    ReactChild,
    ReactFragment,
    ReactPortal,
    useEffect,
    useState,
  } from "react";
  import { connect } from "react-redux";
  import { Message, NotificationType } from "../../constants/Constants";
  import { fetchAllUser } from "../../redux/User/User.action";
  import { fetchAllProjects } from "../../redux/Project/Project.action";
  import { ErrorHandler } from "../../utilities/utilities";
  import { OpenNotification } from "../common/Notification/Notification.component";
  import {
    BoardProjectPropType,
    BoardPropType,
    InitialColumns,
    StatusBoardPropType,
    UpdateBoard,
    DeleteData,
    numberWithOdd,
    numbers_list,
    CurrentGameType,
    NextGameType,
    KenoGame,
  } from "./util/KenoGames.util";
import Table, { ColumnsType } from "antd/lib/table";
import { Alert, Button, Input, Popconfirm, Popover, Space } from "antd";
import { ClearOutlined, DeleteOutlined, MoreOutlined, PrinterOutlined, RightOutlined } from "@ant-design/icons";
import { fetchOneProjects } from "../../redux/Project/Project.action";
import { eachRight, isEmpty } from "lodash";

import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import { fetchAllRole } from "../../redux/Role/Role.action";
import { fetchAllStatusBoard } from "../../redux/StatusBoard/StatusBoard/StatusBoard.action";
import { BoardProject } from "../../redux/StatusBoard/BoardProject/BoardProject.type";

import axios from "axios";
import { MainUrl } from "../../constants/Url";
  
import { Video, VideoDatabase, clearAllVideos, getVideoByName, retriveAllVideos, saveAllVideos, saveVideoByName } from "./util/IndexedDB.util";
import ReloadButtonComponent from "../common/ReloadButton/ReloadButton.component";
import { Link } from "react-router-dom";

const KenoResourceComponent: FC<StatusBoardPropType> = ({
    projects,
    status_board,
    fetchUser,
    fetchProjects,
    fetchStatusBoards,
    fetchOneProject,
    fetchRoles,
  }) => {
    
    const [uniqueKey, setUniqueKey] = useState("");
    const [isWinner, setIsWinner] = useState(false);
    const [isRedeemed, setIsIsRedeemed] = useState(false);
    const [isCanceled, setIsCanceled] = useState(false);
    const [totalWin, setTotalWin] = useState(0);
    const [gameNumber, setGameNumber] = useState(0);
    const [draws, setDraws] = useState<number[]>([]);
    const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
    const [matched, setMatched] = useState<number[]>([]);
    const [billData, setBillData] = useState<any>(null);
    const [casher, setCasher] = useState("");
    const [branch, setBranch] = useState("");
    const [date, setDate] = useState(Date.now().toString())
    const [stake, setStake] = useState(0);
    const [videoList, setSetVideoList] = useState<Video[]>([]);
    const [gameList, setGameList] = useState<KenoGame[]>([]);
    
    const getGameByNumber = (key:any) => {
      if (key){
        axios.get(MainUrl+'/casher/get_all_games_draw_result_by_key/'+key.toString())
        .then((response) => {
            console.log(response.data)
            if(response.data && response.data.status === 200){
              setGameList(response.data.games)
              setCasher(response.data.casher.user.username)
              setBranch(response.data.casher.branch.title)
            }
        })
      }
    }
    
    const getAllGames = () => {
        axios.get(MainUrl+'/casher/get_all_games_draw_result')
        .then((response) => {
            console.log(response.data)
            if(response.data && response.data.status === 200){
              setGameList(response.data.games)
              setCasher(response.data.casher.user.username)
              setBranch(response.data.casher.branch.title)
            }
        })
    }
    
    const redeemBill = (key:string) => {
        setBillData(null)
        setIsWinner(false)
        setTotalWin(0)
        setGameNumber(0)
        setIsWinner(false)
        setTotalWin(0)
        setIsIsRedeemed(false)
        setIsCanceled(false)
        setCasher("")
        setBranch("")
        setStake(0)
        axios.post(MainUrl+'/casher/redeeme_bill/'+key)
        .then((response) => {
            console.log(response.data)
            if(response.data && response.data.status === 200){
                setMatched(response.data.match_numbers)
                setSelectedNumbers(response.data.selected_numbers)
                setDraws(response.data.draws)
                setBillData(response.data.data)
                setGameNumber(response.data.game.game_number)
                setBillData(response.data.game.game_number)
                setTotalWin(response.data.total_win)
                setIsWinner(response.data.isWinner? true:false)
                setIsIsRedeemed(response.data.data.is_redeemed)
                setIsCanceled(response.data.data.is_canceled)
                setCasher(response?.data?.data?.casher?.user?.username)
                setBranch(response?.data?.data?.casher?.branch?.title)
                setStake(response?.data?.data?.stake)
            }
        })
    }
    
    const cancelBill = (key:string) => {
        setBillData(null)
        setIsWinner(false)
        setTotalWin(0)
        setGameNumber(0)
        setIsWinner(false)
        setTotalWin(0)
        setIsIsRedeemed(false)
        setIsCanceled(false)
        setCasher("")
        setBranch("")
        setStake(0)
        axios.post(MainUrl+'/casher/cancel_bill/'+key)
        .then((response) => {
            console.log(response.data)
            if(response.data && response.data.status === 200){
                setMatched(response.data.match_numbers)
                setSelectedNumbers(response.data.selected_numbers)
                setDraws(response.data.draws)
                setBillData(response.data.data)
                setGameNumber(response.data.game.game_number)
                setBillData(response.data.game.game_number)
                setTotalWin(response.data.total_win)
                setIsWinner(response.data.isWinner? true:false)
                setIsIsRedeemed(response.data.data.is_redeemed)
                setIsCanceled(response.data.data.is_canceled)
                setCasher(response?.data?.data?.casher?.user?.username)
                setBranch(response?.data?.data?.casher?.branch?.title)
                setStake(response?.data?.data?.stake)
            }
        })
    }
    
    useEffect(()=>{
        console.log('check resources');  
        getAllGames() 
    },[])
    const returnPrintUrl = (game:KenoGame) => {
      const time = new Date(game.started_at);
      
      return "albet://type=6&game="+game.game_number+"&date="+date+"&casher="+casher+"&branch="+branch+"&time="+time.getTime()+"?"+game.draw_numbers.toString().split(',').join("&")      
    }
    
    const columns = [
        {
          title: 'Date',
          dataIndex: 'started_at',
          key: 'started_at',
          render: (_: any, record: KenoGame) => (
            <>
            {record.started_at.toString().split('T')[0]}
            </>
          ),
        },
        {
          title: 'Game Number',
          dataIndex: 'game_number',
          key: 'game_number',
        },
        {
          title: 'Draws',
          dataIndex: 'draw_numbers',
          key: 'draw_numbers',
          render: (_: any, record: KenoGame) => (
            <>
            {record.draw_numbers}
            </>
          ),
        },
        {
          title: 'Actions',
          dataIndex: 'draw_numbers',
          key: 'draw_numbers',
          render: (_: any, record: KenoGame) => (
            <>
            <Link to={returnPrintUrl(record)}><PrinterOutlined /></Link>
            </>
          ),
        },
      ];
      
    return (
        <div className="col-md-12">
            
            <div className="d-flex justify-content-between">
                <div className="d-flex justify-content-end">
                  <div>
                      <Input id="uniquekeyinput12345" value={uniqueKey} placeholder="Game Number"
                      onChange={(e)=> setUniqueKey(e?.target?.value)}
                      ></Input>
                  </div>
                    <Button style={{paddingBottom: '35px', marginLeft: '10px'}}
                    onClick={() =>
                      getGameByNumber(uniqueKey) 
                    }>Get</Button>
                </div>
                <div className="d-flex justify-content-end">
                <ReloadButtonComponent
                    onClick={() =>
                      getAllGames()
                    }
                /> 
                </div>
            </div>
            <Table dataSource={gameList.sort((a,b)=> b.started_at.toString().localeCompare(a.started_at.toString()))} columns={columns} />
        </div>
    );
  };
  
  /**
   * Map State to Props
   *
   * @param state
   */
  const mapStateToProps = (state: any) => ({
    projects: state.project.fetchAll,
    status_board: state.status_board.fetchAll,
  });
  
  /**
   * Map Dispatch to Props
   *
   * @param dispatch
   */
  const mapDispatchToProps = (dispatch: any) => ({
    fetchUser: (action: any) => dispatch(fetchAllUser(action)),
    fetchProjects: (action: any) => dispatch(fetchAllProjects(action)),
    fetchStatusBoards: (action: any) => dispatch(fetchAllStatusBoard(action)),
    fetchOneProject: (action: any) => dispatch(fetchOneProjects(action)),
    fetchRoles: (action: any) => dispatch(fetchAllRole(action)),
  });
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(KenoResourceComponent);
  