import {
    FC,
    ReactChild,
    ReactFragment,
    ReactPortal,
    useEffect,
    useRef,
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
    checkTop10DisplayTime,
    checkToPlayVideo,
    checkToDrawingGame,
    checkToDisplayPick1to10,
    list_of_animation,
    drawIndex,
    getDifferenceInMiliseconds,
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
import axios, { AxiosError } from "axios";
import { MainUrl } from "../../constants/Url";
import KenoDrawAnimation from "./components/KenoDrawAnimation";
  
import video_ from "../../video/outputs/sequence2.mp4"

import "./KenoGame.css"
import "./albet.css"
import { child_anim_style, drawsNum_style, patent_style, reSizefontSize, wrapper_style } from "./keno.style";
import { useNavigate } from "react-router-dom";

import * as fs from 'fs';
import { Video, getVideoByNameUpdateState,getCarpeetImageUpdateState, getVideoListByName, ImageCustom } from "../KenoResource/util/IndexedDB.util";

const KenoGameComponent: FC<StatusBoardPropType> = ({
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
    const [animationList,setAnimationList] = useState<Video[]>([]);
    const [animation,setAnimation] = useState<Video | null>(null);
    const [top10Games,setTop10Games] = useState<any[]>([]);
    const [loading_screen, setLoadingScreen] = useState(true);  
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [drawedIndexState, setDrawedIndexState] = useState<number>(-1);
    const [carpeetImage,setCarpeetImage] = useState<ImageCustom | null>(null);
    // const [needRefetch, setNeedRefetch] = useState(false);
    // const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);

    const navigate = useNavigate();

    function fetch_keno_game_data() {
        // setNeedRefetch(false)
        axios.get(MainUrl+'/casher/live_draw')
        .then((response) => {
            console.log(response.data)
            if(response.data.status === 200 && response.data.current_game){
                console.log(typeof(response.data.current_game.started_at).toString().split("T"));
                setDrawedNumber(null)
                setAnimationList([])
                setCurrentGame(response.data.current_game)
                setTop10Games(response.data.top_10.reverse().map((e: any) => {
                    console.log('e ----------------');
                    console.log(e);
                    console.log(e.draw_numbers.split(',').map((e:any) => parseInt(e)).sort((a:any,b:any) => a -b));
                    return {
                        game_number : e.game_number,
                        draw_numbers : e.draw_numbers.split(',').map((e:any) => parseInt(e)).sort((a:any,b:any) => {
                            return a- b
                        })
                        }
                }))
                setIsReady(false)
            }
            if(response.data.status === 200 && response.data.next_game){
                setNextGame(response.data.next_game)
                setTop10Games(response.data.top_10.reverse().map((e: any) => {
                    console.log('e ----------------');
                    console.log(e);
                    console.log(e.draw_numbers.split(',').map((e:any) => parseInt(e)).sort((a:any,b:any) => a -b));
                    return {
                        game_number : e.game_number,
                        draw_numbers : e.draw_numbers.split(',').map((e:any) => parseInt(e)).sort((a:any,b:any) => a -b)
                        }
                }))
                setLoadingScreen(false)
            }
        })
        .catch((error) => {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError;
      
                if (!axiosError.response) {
                  // This is a network error (e.g., disconnection)
                    console.log('This is a network error (e.g., disconnection) :: '+error);
                    // setNeedRefetch(true);
                } else {
                  // Other HTTP errors (e.g., 404, 500)
                    console.log('Other HTTP errors (e.g., 404, 500) :: '+error);
                }
              } else {
                // Handle non-Axios errors
                console.log('Handle non-Axios errors :: '+error);
              }
        })
    }

    useEffect(()=>{
        console.log('=== useEffect useEffect useEffect ===');
        if(animation == null){
            getVideoByNameUpdateState('animation', setAnimation)
        }
        if(carpeetImage == null){
            console.log('getCarpeetImageUpdateState');
            
            getCarpeetImageUpdateState('animation', setCarpeetImage)
        }
        
        const hot_reload = localStorage.getItem('hot_reload');
        if(hot_reload == null){
            localStorage.setItem('hot_reload','')
        }
    },[])

    /*for to check network is on or off*/ 
    /*
    useEffect(() => {
        console.log('for to check network is on or off :: '+navigator.onLine);
        const updateOnlineStatus = () => {
            console.log('updateOnlineStatus :: '+navigator.onLine);
            setIsOnline(navigator.onLine);
        };
    
        window.addEventListener('online', updateOnlineStatus);
        window.addEventListener('offline', updateOnlineStatus);
    
        return () => {
          window.removeEventListener('online', updateOnlineStatus);
          window.removeEventListener('offline', updateOnlineStatus);
        };
    }, []);
    
    useEffect(() => {
        if(isOnline && !needRefetch){
            fetch_keno_game_data()
        }
    }, [isOnline]);
    */
    
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
            /** 
            const time_array = nextGame.started_at.split('Z')[0].split("T")
            const next_datetime = new Date(time_array[0]+" "+time_array[1])
            
            const utcTimestamp = new Date()
            // const gmtTimestamp = utcTimestamp.setHours(utcTimestamp.getHours() - 3) //for istanbul time zone
            const gmtTimestamp = utcTimestamp.setHours(utcTimestamp.getHours()) // for UTC 0 same with server

            let timeObject = new Date(next_datetime.getTime() + 10*1000)
            var miliseconds = Math.abs(timeObject.getTime() - gmtTimestamp)
            const minutes = Math.floor((miliseconds/1000)/60)
            */
           
            const miliseconds: number = getDifferenceInMiliseconds(nextGame.started_at)
            
            if(miliseconds >= 180000){
                setNextGameStartAt((miliseconds)%240000)            
                setNextGameTime((miliseconds/1000)%240)

            }
            else{
                setNextGameStartAt(miliseconds)            
                setNextGameTime(miliseconds/1000)
            }
        }        
    }, [nextGame])

    useEffect(() => {
        console.log('=== current_game_start_at isReady currentGame ===');
        console.log(isReady);
        console.log(current_game_start_at);
        if(current_game_start_at !== null && isReady){
            const utcTimestamp = new Date()
            // const gmtTimestamp = utcTimestamp.setHours(utcTimestamp.getHours() - 3) // for istanbul time zone
            const gmtTimestamp = utcTimestamp.setHours(utcTimestamp.getHours()) // for UTC time zone same with server
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
            // const gmtTimestamp = utcTimestamp.setHours(utcTimestamp.getHours() - 3) // for time istanbul zone 
            const gmtTimestamp = utcTimestamp.setHours(utcTimestamp.getHours()) // for time UTC zone same with server 
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
        if(next_game_start_at !==null && false){
            console.log('miliseconds '+next_game_start_at);
            // console.log('Next game start affter '+miliseconds/1000);    
            /*if(next_game_start_at < 8){  
                console.log('next_game_start_at > 6');
                const timeOutFirst = setTimeout(() => {
                    console.log('set loadding screen ....');
                    // setLoadingScreen(true)
                    const timeOut = setTimeout(async () => {
                        console.log('Fetch Next game ......'+next_game_start_at)
                        console.log('Fetch Next game ...')
                        console.log(next_game_start_at/1000)
                        fetch_keno_game_data()
                        setLoadingScreen(false)
                    }, 8000)
                    return () => clearTimeout(timeOut)
                }, next_game_start_at - 6000) 
                return () => clearTimeout(timeOutFirst)
                
            }
            else {
                console.log('next_game_start_at <=> 6');
                // setLoadingScreen(true)
                console.log('loading_screen' + loading_screen);
                const timeOut = setTimeout(() => {
                    fetch_keno_game_data()
                    setLoadingScreen(false)
                }, next_game_start_at + 3000)
                return () => clearTimeout(timeOut);
            }   */
        }

    }, [next_game_start_at])

    useEffect(() => {
        console.log('=== nextGameTimeStart ===');
        /*if(nextGameTimeStart !== null && nextGameTimeStart > 4 && false)
        {        
            const interval = setTimeout(() => {
                setNextGameTime(Math.floor(nextGameTimeStart) -1)
            }, 1000);
        
            return () => clearTimeout(interval);
        }*/
        if (nextGameTimeStart !== null && nextGameTimeStart <= 4 && nextGameTimeStart > 0 && false){
            // setLoadingScreen(true)
            const interval = setTimeout(() => {
                // setLoadingScreen(false)
            // }, nextGameTimeStart*1000);
            }, 1000);
            return () => clearTimeout(interval);
        }
        
    },[nextGameTimeStart])

    useEffect(() => {
        console.log('=== nextGameTime ===');
        console.log(nextGameTime);
        if (nextGameTime !== null) {
            const drawIdex_ = drawIndex(nextGameTime, console.log);
            setDrawedIndexState(drawIdex_)
        }
        if(nextGameTime !== null && nextGameTime > 0){
            const interval = setTimeout(() => {
                if(nextGameTime > 2)
                {
                    if(nextGame){
                        var time = getDifferenceInMiliseconds(nextGame.started_at)/1000
                        
                        if(time > nextGameTime){
                            setNextGameTime(nextGameTime -1);
                            // confirm('need reload for nextGameTime error')
                            // window.location.reload();
                            const hot_reload = localStorage.getItem('hot_reload');
                            if(hot_reload == 'true'){
                                window.location.reload();
                            }
                        } else{
                            setNextGameTime(time);
                        }
                        
                    } else{
                        var time = nextGameTime -1;
                        setNextGameTime(time);
                    }
                    if(nextGameTime < 234 && drawedNumber == null){                        
                        console.log('setDrawedNumber  setDrawedNumber  setDrawedNumber'+drawedNumber);
                        
                        setDrawedNumber(20)
                    }

                }
                else if(nextGameTime <= 2){
                        var time = nextGameTime -1;
                        setNextGameTime(time);
                }
            }, 1000);
            return () => clearTimeout(interval);
        }
        else if (nextGameTime !== null && nextGameTime <= 8 && nextGameTime >= 1){            
            // setLoadingScreen(true)
            console.log('loading_screen');
            console.log(nextGameTime);
            console.log(loading_screen);
            // const interval = setTimeout(() => {
            //     // setLoadingScreen(true)
            // }, nextGameTime);
            // return () => clearTimeout(interval);
        }
        else if (nextGameTime !== null && nextGameTime < 1){            
            // setLoadingScreen(true)
            console.log(loading_screen);
            const interval = setTimeout(() => {
                // setLoadingScreen(true)
                console.log('loading_screen fetch_keno_game_data()');
                
                fetch_keno_game_data()
            }, nextGameTime);
            return () => clearTimeout(interval);
        }
    }, [nextGameTime])

    useEffect(() => {
        console.log('=== drawedNumber ===');
        console.log(drawedNumber);
        if(drawedNumber !==null && drawedNumber < 20){
            
            if(nextGameTime && nextGameTime > 234){
                
                console.log('===> drawedNumber <==='+drawedNumber);
                console.log('===> gametime <==='+nextGameTime);
                console.log((nextGameTime - 234));
                const interval_ = setTimeout(() => {
                    if((nextGameTime - 234) <= 0){
                        if(currentGameDrawsList.length >= drawedNumber){
                            setCurrentDrawNumber(currentGameDrawsList[drawedNumber])
                        }
                        var draw = 0;
                        setDrawedNumber(draw)
                    }
                    else{
                        var draw = drawedNumber -1;
                        setDrawedNumber(draw)
                    }
                }, (nextGameTime - 234)*1000);
                return () => clearTimeout(interval_);
            }
            else{                
                console.log('=====-- drawedNumber ======='+drawedNumber);
                console.log('===> gametime <==='+nextGameTime);
                const interval = setTimeout(() => {
                    if(currentGameDrawsList.length >= drawedNumber){
                        setCurrentDrawNumber(currentGameDrawsList[drawedNumber])
                    }
                    var draw = drawedNumber +1;
                    setDrawedNumber(draw)
                }, 2500);
                return () => clearTimeout(interval);
            }
        }
    }, [drawedNumber])

    useEffect(()=>{
        if(currentGameDrawsList && currentGameDrawsList.length){
            console.log('currentGameDrawsList useEffect')
            console.log(currentGameDrawsList)
            const drawList:string[] = []
            for (let index = 0; index < currentGameDrawsList.length; index++) {
                const element = currentGameDrawsList[index];
                drawList.push('animation_'+element.toString())         
            }
            getVideoListByName(drawList,setAnimationList)

        }
    },[currentGameDrawsList])

    useEffect(()=>{
        console.log(' --===-- drawedIndexState ---'+drawedIndexState);
        console.log(videoRef);
        console.log(videoRef.current);
        
        const videoElement = videoRef.current;

        const playNextVideo = () => {
            console.log('inside playNextVideo = () => ');
        if (videoElement) {
            console.log('Video Element found by UseRef');
            
            const anima = animationList.find(a => a.name === 'animation_'+currentGameDrawsList[drawedIndexState?drawedIndexState:0].toString()+'.mp4')
        
            if(anima !== undefined){
                    console.log('animation found for '+currentGameDrawsList[drawedIndexState?drawedIndexState:0].toString());
                    videoElement.src = URL.createObjectURL(anima.videoData);
                    videoElement.play();
            }
        } else{
            console.log('Video Element found by getElementById');
            const element = document.getElementById('balldrawvideo') as HTMLVideoElement | null;
            const anima = animationList.find(a => a.name === 'animation_'+currentGameDrawsList[drawedIndexState?drawedIndexState:0].toString()+'.mp4')
        
            console.log('Element ');
            console.log(element);
            console.log('anima ');
            console.log(anima);
            if(anima !== undefined && element){
                console.log('Video Element get by getElementById');
                element.src = URL.createObjectURL(anima.videoData);
                element.play();
            }
        }
        };

        const handleEnded = () => {
            console.log('playNextVideo();');
            playNextVideo();
        };

        if (videoElement) {
            console.log('videoElement.addEventListener( ended, handleEnded)');
            
            playNextVideo();
            /*
            videoElement.addEventListener('ended', handleEnded);

            return () => {
                videoElement.removeEventListener('ended', handleEnded);
            };*/
        } else{
            console.log('videoElement not found');
        }
    },[drawedIndexState])

    const Top10GameDisplay = () => {
        return (
            <div  className="main-class-draw top10game">
                <div className="top10gamedraw" style={{width: '100%', paddingTop: '8vh'}}>
                    
                            {
                                top10Games.map((game,index) =>{
                                    return <>
                                    <div style={{width: '90%', border: 'solid 1px white', marginLeft: '5vw',height: '1px'}}></div>
                                    <div className="draw-number-rows-top10">
                                        <div className="draw-number-row-num" key={"game_num"+game.game_number} style={{color: 'white', background: 'transparent', fontWeight: 'bold'}}>{game.game_number}</div>
                                            
                                            {
                                                game.draw_numbers.slice(0,10).map((draw_: any)=>{
                                                    if(draw_ > 40)
                                                        return <div className="draw-number-row-num-active" style={{borderRadius: '50%', fontWeight:'bold', width: '4vw', height: '4vw' , fontSize: '2.6vw', background: '#e68513'}}>{draw_}</div>
                                            
                                                    return <div className="draw-number-row-num-active" style={{borderRadius: '50%', fontWeight:'bold', width: '4vw', height: '4vw' , fontSize: '2.6vw'}}>{draw_}</div>
                                                })
                                            }
                                            <div style={{height: '100%', border: 'solid 2px white', width: '1px'}}></div>
                                            {
                                                game.draw_numbers.slice(10,20).map((draw_: any)=>{
                                                    if(draw_ > 40)
                                                        return <div className="draw-number-row-num-active" style={{borderRadius: '50%', fontWeight:'bold', width: '4vw', height: '4vw' , fontSize: '2.6vw', background: '#e68513'}}>{draw_}</div>
                                            
                                                    return <div className="draw-number-row-num-active" style={{borderRadius: '50%', fontWeight:'bold', width: '4vw', height: '4vw' , fontSize: '2.6vw'}}>{draw_}</div>
                                                })
                                            }
                                        </div>
                                        {
                                            index+1 == top10Games.length && (<div style={{width: '90%', border: 'solid 1px white', marginLeft: '5vw',height: '1px'}}></div>)
                                        }
                                    </>
                                    
                                })
                            }
                         
                </div>
            </div>
        )
    }

    function get_animation (name :string) {  
        console.log('get_animation '+drawedIndexState);
        console.log(currentGameDrawsList[drawedIndexState?drawedIndexState:0]);
        
        const anima = animationList.find(a => a.name === 'animation_'+currentGameDrawsList[drawedIndexState?drawedIndexState:0].toString()+'.mp4')
        
        if(anima !== undefined){
            return URL.createObjectURL(anima.videoData)
        }
        if(name === 'animation')
            return video_
        return list_of_animation['animation_'+currentGameDrawsList[drawedIndexState?drawedIndexState:0]]
    }
    
    return (
        <div className="kenogamediv">
        {
            checkTop10DisplayTime(nextGameTime) && Top10GameDisplay()
        }
        {
            checkToPlayVideo(nextGameTime) && (
                // <video style={{width: "100%"}} loop autoPlay muted src={ animation?URL.createObjectURL(animation.videoData):video_} type="video/mp4"/>
                <video width="100%" height="100%" autoPlay muted loop controls={false}>
                    <source src={animation?URL.createObjectURL(animation.videoData):video_} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            )
        }
        {!loading_screen && !checkTop10DisplayTime(nextGameTime) &&  !checkToPlayVideo(nextGameTime) && (
        
        <div className="main-class-draw">
            <div className="left-window-draw">
                <div className="draw-head-title">
                    <div className="draw-head-title-left">DRAW<div className="draw-head-title-left-number">{currentGame? currentGame.game_number: null}</div></div>                    
                    <div className="draw-head-title-right">
                        {
                           currentGameDrawsList.slice(0,drawedIndexState? drawedIndexState: 0).filter(value => value >40).length > currentGameDrawsList.slice(0,drawedIndexState? drawedIndexState: 0).filter(value => value < 41 ).length? "TAILS": "HEADS"
                        }
                        </div>
                </div>
                <div className="draw-number-rows">
                        {
                        [0,10,20,30,40,50,60,70].map((item_)=> {
                             const row_response = [1,2,3,4,5,6,7,8,9,10].map((item)=> {
                                if(currentGameDrawsList.slice(0,drawedIndexState? nextGameTime && nextGameTime < 174?drawedIndexState+1:drawedIndexState: 0).includes(item+item_)){                          
                                    if (item+item_ < 10)                                     
                                        return <div className="draw-number-row-num-active"><div style={{color: "transparent", fontSize: '3vw'}}>0</div>{item+item_}</div>
                                    else if(item+item_ > 40)                               
                                        return <div className="draw-number-row-num-active" style={{backgroundColor: "#e68513", borderColor: "#fabd25", border: "solid 3px #fabd25"}}>{item+item_}</div>
                                    return <div className="draw-number-row-num-active">{item+item_}</div>
                                    }
                                if (item+item_ < 10)   
                                    return <div className="draw-number-row-num"><div style={{color: "transparent", fontSize: '3vw'}}>0</div>{item+item_}</div>
                                
                                return <div className="draw-number-row-num">{item+item_}</div>
                            })
                            return <div className="draw-number-row">{row_response}</div>
                        })
                        }
                </div>
                <div className="draw-footer-keno">KENO</div>
            </div>
            {
                checkToDrawingGame(nextGameTime) && drawedNumber !== null && (                
                    <div className="drawingCanvas">
                        <div className="top2020draws">{drawedIndexState < 20?drawedIndexState+1:drawedIndexState}/20</div>
                        {/* <video style={{width: "100%", height:'100%', backgroundColor: '#fb0008'}} autoPlay muted src={get_animation('animation_'+currentGameDrawsList[drawIndex(nextGameTime)])}/> */}
                        <video id="balldrawvideo" ref={videoRef} width="100%" height="100%" autoPlay={true} muted controls={false}>
                            <source src={get_animation('animation_'+currentGameDrawsList[drawedIndexState?drawedIndexState:0])} type="video/mp4" />
                        </video>
                    </div>
                )
            }
            {
                 checkToDisplayPick1to10(nextGameTime, nextGame)
            }
                
        </div>
        )}
        {loading_screen && false && !checkTop10DisplayTime(nextGameTime) &&  !checkToPlayVideo(nextGameTime) && (<LoadingScreen/>)}
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
  )(KenoGameComponent);

  