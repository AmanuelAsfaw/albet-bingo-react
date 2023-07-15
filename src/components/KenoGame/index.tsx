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
  } from "./util/KenoGame.util";
  import Table, { ColumnsType } from "antd/lib/table";
  import { Button, Popconfirm, Popover } from "antd";
  import { ClearOutlined, DeleteOutlined, MoreOutlined, PrinterOutlined, RightOutlined } from "@ant-design/icons";
  import { fetchOneProjects } from "../../redux/Project/Project.action";
  import { isEmpty } from "lodash";
  
  import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
  import { fetchAllRole } from "../../redux/Role/Role.action";
  import { fetchAllStatusBoard } from "../../redux/StatusBoard/StatusBoard/StatusBoard.action";
  import { BoardProject } from "../../redux/StatusBoard/BoardProject/BoardProject.type";
  import { AddToBetSlip, LoadingScreen, TableDisplay, addToSelectedNumbers, getMaximumPayout, getMinimumPayout, removeFromSelectedNumbers } from "./util/KenoGame.UI.util";
//   import { useBarcode } from "next-barcode";
import axios from "axios";
import { MainUrl } from "../../constants/Url";
import KenoDrawAnimation from "./components/KenoDrawAnimation";
  
  import "./KenoGame.css"
import { child_anim_style, drawsNum_style, patent_style, reSizefontSize, wrapper_style } from "./keno.style";
import { useNavigate } from "react-router-dom";
  
  const TicketingComponent: FC<StatusBoardPropType> = ({
    projects,
    status_board,
    fetchUser,
    fetchProjects,
    fetchStatusBoards,
    fetchOneProject,
    fetchRoles,
  }) => {
    const [assignData, setAssignData] = useState<any>([]);
    const [columns, setColumns] = useState<BoardPropType>(InitialColumns);
    const [boardOnchange, setBoardOnchange] = useState<number>(0);
    const [allBoardProjects, setAllBoardProjects] = useState<number[]>([]);
  
    const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
    const [betSlip, setBetSlip] = useState(null);
    const [stake, setStake] = useState(10);
    const [ticketNumber, setTicketNumber] = useState("12347686397486389")
    const [gameNumber, setGameNumber] = useState("123")
    const [minPayOut, setMinPayOut] = useState("")
    const [maxPayOut, setMaxPayOut] = useState("")
    const [date, setDate] = useState(Date.now().toString())
    const [casher, setCasher] = useState("USER1")
    const [branch, setBranch] = useState("JEMO1")
    const [odd, setOdd] = useState(3.5)
    const [PrinterUrl, setPrinterUrl] = useState("")
  
    
    
    const [currentGame, setCurrentGame] = useState<CurrentGameType|null>(null);
    const [current_game_start_at, setCurrentGameStartAt] = useState<Date|null>(null);
    const [next_game_start_at, setNextGameStartAt] = useState<number|null>(null);
    const [nextGame, setNextGame] = useState<NextGameType|null>(null);
    const [isReady, setIsReady] = useState(true);
    const [isFirst, setIsFirst] = useState(true);
    const [drawedNumber, setDrawedNumber] = useState<number| null>(null);
    const [currentDrawNumber, setCurrentDrawNumber] = useState<number|null>(null);
    const [nextGameTime, setNextGameTime] = useState<number|null>(null);
    const [nextGameTimeStart, setNextGameTimeStart] = useState<number|null>(null);
    const [currentGameDrawsList,setCurrentGameDrawsList] = useState<number[]>([]);
    const [loading_screen, setLoadingScreen] = useState(true);    

    const navigate = useNavigate();
    
    function fetch_keno_game_data() {
        axios.get(MainUrl+'casher/live_draw')
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
    useEffect(()=>{
        console.log('==== isFirst ===');
        if(isFirst && nextGame === null ){
            console.log("useEffect"+isFirst)
            setIsFirst(false)
            fetch_keno_game_data()
        }
    },[isFirst])

    useEffect(()=>{
        console.log('=== currentGame ===');
        if(currentGame && currentGame.started_at){
            console.log('current game');
            const utcTimestamp = new Date()
            const time_array = currentGame.started_at.split('Z')[0].split("T")
            
            const current_datetime = new Date(time_array[0]+" "+time_array[1]);
            setCurrentGameStartAt(current_datetime);
            setCurrentGameDrawsList(currentGame.draw_numbers);
        }
    },[currentGame])

    useEffect(() => {
        console.info('=== next game ===');
        if(nextGame){
            const time_array = nextGame.started_at.split('Z')[0].split("T")
            const next_datetime = new Date(time_array[0]+" "+time_array[1])
            
            const utcTimestamp = new Date()
            const gmtTimestamp = utcTimestamp.setHours(utcTimestamp.getHours() - 3)

            let timeObject = new Date(next_datetime.getTime() + 10*1000)
            var miliseconds = Math.abs(timeObject.getTime() - gmtTimestamp)
            const minutes = Math.floor((miliseconds/1000)/60)
            setNextGameStartAt(miliseconds)
            setNextGameTime(miliseconds/1000)
        }        
    }, [nextGame])

    useEffect(() => {
        console.log('=== current_game_start_at isReady currentGame ===');
        console.log(isReady);
        console.log(current_game_start_at);
        if(current_game_start_at !== null && isReady){
            const utcTimestamp = new Date()
            const gmtTimestamp = utcTimestamp.setHours(utcTimestamp.getHours() - 3)
            let timeObject = new Date(current_game_start_at.getTime() + 10*1000)
            console.log(timeObject);
            if (timeObject.getTime() > gmtTimestamp){
                console.log('is ready ...')
                var miliseconds = (current_game_start_at.getTime() - gmtTimestamp);
                const timeOut = setTimeout(() => {
                    setIsReady(false)
                }, miliseconds)
                return () => clearTimeout(timeOut);
            } else{
                setIsReady(false)
            }
        }
        if(current_game_start_at !== null && !isReady){
            const utcTimestamp = new Date()
            const gmtTimestamp = utcTimestamp.setHours(utcTimestamp.getHours() - 3)
            let timeObject = new Date(current_game_start_at.getTime() + 10*1000)
            console.log('timeObject '+ timeObject);
            console.log('timeObject '+ gmtTimestamp.toString());
            console.log(timeObject.getTime() <= gmtTimestamp);
            if(timeObject.getTime() <= gmtTimestamp){
                console.log('Animation start...')
                let seconds = (gmtTimestamp - current_game_start_at.getTime())/ 1000 - 10
                let past_draw = Math.floor(seconds/3)
                console.log(seconds);
                console.log(past_draw);
                if(past_draw < 20){
                    setDrawedNumber(past_draw)
                    const first_draw = setTimeout(() => {
                        console.log('past_draw..............')
                        setDrawedNumber(past_draw)
                    }, (seconds%3)*1000 )
                    
                    return () => clearTimeout(first_draw)
                }
            }
        }
    }, [current_game_start_at, isReady])

    useEffect(() => {
        console.log('=== next_game_start_at ===')
        console.log(next_game_start_at);
        if(next_game_start_at !==null){
            console.log('miliseconds '+next_game_start_at);
            // console.log('Next game start affter '+miliseconds/1000);    
            if(next_game_start_at > 6){  
                console.log('next_game_start_at > 6');
                const timeOutFirst = setTimeout(() => {
                    console.log('set loadding screen ....');
                    setLoadingScreen(true)
                    const timeOut = setTimeout(async () => {
                        console.log('Fetch Next game ......'+next_game_start_at)
                        console.log('Fetch Next game ...')
                        console.log(next_game_start_at/1000)
                        fetch_keno_game_data()
                        setLoadingScreen(false)
                    }, 7000)
                    return () => clearTimeout(timeOut)
                }, next_game_start_at - 6000) 
                return () => clearTimeout(timeOutFirst)
                
            }
            else {
                console.log('next_game_start_at <=> 6');
                setLoadingScreen(true)
                console.log('loading_screen' + loading_screen);
                const timeOut = setTimeout(() => {
                    fetch_keno_game_data()
                    setLoadingScreen(false)
                }, next_game_start_at + 2000)
                return () => clearTimeout(timeOut);
            }   
        }

    }, [next_game_start_at])

    useEffect(() => {
        console.log('=== nextGameTimeStart ===');
        if(nextGameTimeStart !== null && nextGameTimeStart > 4)
        {        
            const interval = setTimeout(() => {
                setNextGameTime(Math.floor(nextGameTimeStart) -1)
            }, 1000);
        
            return () => clearTimeout(interval);
        }
        if (nextGameTimeStart !== null && nextGameTimeStart <= 4){
            // setLoadingScreen(true)
            const interval = setTimeout(() => {
                // setLoadingScreen(false)
            }, nextGameTimeStart*1000);
            return () => clearTimeout(interval);
        }
        
    },[nextGameTimeStart])

    useEffect(() => {
        console.log('=== nextGameTime ===');
        console.log(nextGameTime);
        if(nextGameTime !== null && nextGameTime > 8){
            const interval = setTimeout(() => {
                if(nextGameTime > 0)
                {
                    var time = nextGameTime -1;
                    setNextGameTime(time);
                }
                else if(nextGameTime < 0){
                    var time = nextGameTime +1;
                    setNextGameTime(time);
                }
            }, 1000);
            return () => clearTimeout(interval);
        }
        else if (nextGameTime !== null && nextGameTime <= 8){            
            setLoadingScreen(true)
            console.log('loading_screen');
            console.log(loading_screen);
            const interval = setTimeout(() => {
                setLoadingScreen(true)
            }, nextGameTime);
            return () => clearTimeout(interval);
        }
    }, [nextGameTime])

    useEffect(() => {
        console.log('=== drawedNumber ===');
        // console.log(drawedNumber);
        if(drawedNumber !==null && drawedNumber < 20){
            const interval = setTimeout(() => {
                if(currentGameDrawsList.length >= drawedNumber){
                    setCurrentDrawNumber(currentGameDrawsList[drawedNumber])
                }
                var draw = drawedNumber +1;
                setDrawedNumber(draw)
            }, 2000);
            return () => clearTimeout(interval);
        }
    }, [drawedNumber])

    return (
        <div>
            {!loading_screen && (
        <section className="parent" style={patent_style}>
            <section className="child_anim" style={child_anim_style}>
                <div className="rnd">
                    
                    {/* <div className="logo">AL-Betting<button onClick={() =>{
                    }}>Get</button></div> */}
                    {/* {
                        isReady && (
                            <div style={{color: 'white', fontSize: 50}}>Is Ready ....</div>
                        )
                    } */}
            
                    <div className="drawsNum" style={drawsNum_style}>{drawedNumber !==null &&(
                        drawedNumber + '/20'
                    )}</div>
                    <div className="cube">
                        <div className="top"></div>
                        <div className="top2"></div>
                        <div>
                            {/* <span style={{"--i":0}}>{currentDrawNumber}</span>
                            <span style={{"--i":1}}>{currentDrawNumber}</span>
                            <span style={{"--i":2}}>{currentDrawNumber}</span>
                            <span style={{"--i":3}}>{currentDrawNumber}</span> */}
                            
                            {/* <span style={{}}>{currentDrawNumber}</span>
                            <span style={{}}>{currentDrawNumber}</span>
                            <span style={{}}>{currentDrawNumber}</span>
                            <span style={{}}>{currentDrawNumber}</span> */}
                        </div>
                    </div>
                    <KenoDrawAnimation isPlaying={true} drawNumber={currentDrawNumber? currentDrawNumber: 0}/>
                    <div className="gamenumber" >
                        <div className="title" style={reSizefontSize}>DRAWING GAME  &nbsp;</div>
                        <h1 className="cntdwn" style={reSizefontSize}>{currentGame? currentGame.game_number: null}</h1>
                    </div>
                    <div className="nextgame">
                        <div className="title"  style={reSizefontSize}>NEXT GAME <b style={reSizefontSize}>{nextGame? nextGame.game_number: null}</b> <RightOutlined onClick={() => {navigate('/keno-bills')}}/></div>
                        <div className="cntdwn" style={reSizefontSize}>
                            {Math.floor(nextGameTime?nextGameTime/60:0)}:{ Math.floor(nextGameTime? nextGameTime%60: 0)}
                        </div>
                    </div>
                </div>
            </section>
            <section className="child" style={{paddingLeft: '90px'}}>
                <div className="wrapper" style={wrapper_style}>
                    {
                        
                        numbers_list.map((item ) => {
                            if (currentGameDrawsList.length < 20){
                                return (<div key={'numbox'+item} className="box_keno animate_start">{item}</div>)
                            }
                            if(item <= 10 && currentGameDrawsList.slice(0,drawedNumber? drawedNumber: 0).includes(item)){
                                return (
                                    <div key={'numbox'+item} className="box1 animate_start">{item}</div>
                                )
                            }
                            else if(item <= 20 && currentGameDrawsList.slice(0,drawedNumber? drawedNumber: 0).includes(item)){
                                return (
                                    <div key={'numbox'+item} className="box2 animate_start">{item}</div>
                                )
                            }
                            else if(item <= 30 && currentGameDrawsList.slice(0,drawedNumber? drawedNumber: 0).includes(item)){
                                return (
                                    <div key={'numbox'+item} className="box3 animate_start">{item}</div>
                                )
                            }
                            else if(item <= 40 && currentGameDrawsList.slice(0,drawedNumber? drawedNumber: 0).includes(item)){
                                return (
                                    <div key={'numbox'+item} className="box4 animate_start">{item}</div>
                                )
                            }
                            else if(item <= 50 && currentGameDrawsList.slice(0,drawedNumber? drawedNumber: 0).includes(item)){
                                return (
                                    <div key={'numbox'+item} className="box5 animate_start">{item}</div>
                                )
                            }
                            else if(item <= 60 && currentGameDrawsList.slice(0,drawedNumber? drawedNumber: 0).includes(item)){
                                return (
                                    <div key={'numbox'+item} className="box6 animate_start">{item}</div>
                                )
                            }
                            else if(item <= 70 && currentGameDrawsList.slice(0,drawedNumber? drawedNumber: 0).includes(item)){
                                return (
                                    <div key={'numbox'+item} className="box7 animate_start">{item}</div>
                                )
                            }
                            else if(item <= 80 && currentGameDrawsList.slice(0,drawedNumber? drawedNumber: 0).includes(item)){
                                return (
                                    <div key={'numbox'+item} className="box8 animate_start">{item}</div>
                                )
                            }
                            return (
                                <div key={'numbox'+item} className="box_keno animate_start">{item}</div>
                            )
                        })
                    }
                </div>
            </section>
        </section>
        )}
        {loading_screen && (<LoadingScreen/>)}
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
  )(TicketingComponent);
  