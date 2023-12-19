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
  } from "./util/KenoScanner.util";
  import Table, { ColumnsType } from "antd/lib/table";
  import { Alert, Button, Input, Popconfirm, Popover, Space, Switch } from "antd";
  import { ClearOutlined, DeleteOutlined, MoreOutlined, PrinterOutlined, RightOutlined } from "@ant-design/icons";
  import { fetchOneProjects } from "../../redux/Project/Project.action";
  import { eachRight, isEmpty } from "lodash";
  
  import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
  import { fetchAllRole } from "../../redux/Role/Role.action";
  import { fetchAllStatusBoard } from "../../redux/StatusBoard/StatusBoard/StatusBoard.action";
  import { BoardProject } from "../../redux/StatusBoard/BoardProject/BoardProject.type";

import axios from "axios";
import { MainUrl } from "../../constants/Url";
  
import video_ from "../../video/Sequence 02.mp4"
import { Video, VideoDatabase, clearAllVideos, getVideoByName, retriveAllVideos, saveAllVideos, saveVideoByName } from "./util/IndexedDB.util";
import ReloadButtonComponent from "../common/ReloadButton/ReloadButton.component";

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
    const [casher, setCasher] = useState("")
    const [branch, setBranch] = useState("")
    const [date, setDate] = useState(Date.now().toString())
    const [stake, setStake] = useState(0);
    const [hotReload, setHotReload] = useState(false);
    const [videoList, setSetVideoList] = useState<Video[]>([]);
    
    const getScannedBill = (key:string) => {
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
        axios.get(MainUrl+'/casher/get_scanned_bill/'+key)
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
        // saveAllVideos() 
        retriveAllVideos(setSetVideoList)
        const hot_reload = localStorage.getItem('hot_reload')
        if(hot_reload == 'true'){
          setHotReload(true)
        }
    },[])
    
    const renderVideo = (record: Video) => {
        return  <video width="10" height="10">
        <source src={URL.createObjectURL(record.videoData)} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    }
    const columns = [
        {
          title: 'Id',
          dataIndex: 'id',
          key: 'id',
        },
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Size',
          dataIndex: 'size',
          key: 'size',
          render: (_: any, record: Video) => (
            <>
            {record.videoData.size}
            </>
          ),
        },
        {
          title: 'Video',
          dataIndex: 'videoData',
          key: 'videoData',
          render: (_: any, record: Video) => (
            <>
            {renderVideo(record)}
            </>
          ),
        },
      ];
      
    return (
        <div className="col-md-12">
            Resources List
            
            <div className="d-flex justify-content-between">
                <div className="d-flex justify-content-end">
                
                    <Button style={{paddingBottom: '35px', marginLeft: '10px'}}
                    onClick={() =>
                        saveAllVideos(setSetVideoList)
                    }>Add All</Button>
                    <Button style={{paddingBottom: '35px', marginLeft: '10px'}}
                    onClick={() =>
                        clearAllVideos(setSetVideoList)
                    }>Clear</Button>

                    <Switch
                      style={{paddingTop: '0px', marginLeft: '10px', marginTop: '10px'}}
                      checked={localStorage.getItem('hot_reload') == 'true'}
                      checkedChildren="Hot Reload"
                      unCheckedChildren="Hot Reload Disable"
                      onChange={() => {
                        localStorage.setItem('hot_reload',!hotReload?'true':'')
                        setHotReload(!hotReload)
                      }}
                    />
                </div>
                <div className="d-flex justify-content-end">
                <ReloadButtonComponent
                    onClick={() =>
                        retriveAllVideos(setSetVideoList)
                    }
                /> 
                </div>
            </div>
            <Table dataSource={videoList} columns={columns} />
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
  