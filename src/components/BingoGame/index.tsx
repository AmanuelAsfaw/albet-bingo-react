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
  import { ErrorHandler, logout } from "../../utilities/utilities";
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
    ArrayRange,
    get_cashier_data,
  } from "./util/BingoGames.util";
import Table, { ColumnsType } from "antd/lib/table";
import { Alert, Button, ConfigProvider, Input, Modal, Popconfirm, Popover, Segmented, Select, Slider, Space, Switch } from "antd";
import { ClearOutlined, DeleteOutlined, MoreOutlined, PrinterOutlined, RightOutlined } from "@ant-design/icons";
import { fetchOneProjects } from "../../redux/Project/Project.action";
import { eachRight, isEmpty } from "lodash";

import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import { fetchAllRole } from "../../redux/Role/Role.action";
import { fetchAllStatusBoard } from "../../redux/StatusBoard/StatusBoard/StatusBoard.action";
import { BoardProject } from "../../redux/StatusBoard/BoardProject/BoardProject.type";

import axios from "axios";
import { MainUrl } from "../../constants/Url";
  
import { Link, useNavigate } from "react-router-dom";

import { FcComboChart } from "react-icons/fc";
import { ImCart } from "react-icons/im";
import { FaBowlingBall } from "react-icons/fa";
import { MdOutlinePointOfSale } from "react-icons/md";
import { BsFillMenuButtonFill } from "react-icons/bs";
import { IoSettings } from "react-icons/io5";
import BingoPlayBoardComponent from './components/BingoPlayBoard';
import Cartela from './components/Cartela';
import Sales from './components/Sales';
import Report from './components/Report';
import Dashboard from './components/Dashboard';

import './bingo.css';
import Logo from "./ethbingo.png";
import { Cartela as CartelaType } from "../../redux/Cartelas/TodayBill.type";
import { RouteConstants } from "../../router/Constants";
import { cacheAudioFiles, getAudioUrls } from "./components/BingoPlayBoard/components/audioCatch";
import { cacheAudioFile } from "../../audioCache";
import { saveAudioFile } from "../../utils/AudioDatabase";
// import { useAudioCache } from "./components/BingoPlayBoard/components/useAudioCache";

const BingoGameComponent = () => {
    
    const audio_refs = ArrayRange(1,83,1).map((e)=>useRef(null))
    const audio_shuffle_balls_ref = useRef(null);
    const game_start_ref = useRef()
    const game_finnished_ref = useRef()
    const game_pause_ref = useRef()
    
    // const { cachedAudios } = useAudioCache(audioPaths);

    const [playGame, setPlayGame] = useState(true);
    const [showNavBar, setShowNavBar] = useState(false);
    const [navItem, setNavItem] = useState('bingo-play');
    const boardNumberList = [
      [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], //B
      [16,17,18,19,20,21,22,23,24,25,26,27,28,29,30], //I
      [31,32,33,34,35,36,37,38,39,40,41,42,43,44,45], //N
      [46,47,48,49,50,51,52,53,54,55,56,57,58,59,60], //G
      [61,62,63,64,65,66,67,68,69,70,71,72,73,74,75]  //O
    ]
    


    const [currentCartela, setCurrentCartela] = useState<CartelaType| null>()
    const [previousCalls, setPreviousCalls] = useState<any>([])
    const [shuffleNumbers, setShuffleNumbers] = useState<number[]>([])
    const [drawNumbers, setDrawNumbers] = useState<number[]>([])
    const [calledNumbers, setCalledDrawNumbers] = useState<number[]>([])
    const [bingoGame, setBingoGame] = useState<any>(null);
    const [automatic, setAutomatic] = useState<any>(true);
    const [callIndex, setCallIndex] = useState<number>(-1);
    const [showModal, setShowModal] = useState<any>(false);
    const [language, setLanguage] = useState('amharic-default');
    const [cashier, setCashier] = useState<any>(null);
    const [callTimeInSeconds, setCallTimeInSeconds] = useState(9);
    const [showSettingsModal, setSettingsShowModal] = useState<any>(false);
    const [selectedCartelas, setSelectedCartelas] = useState<Number[]>([]);
    const [checkedCartelas, setCheckedCartelas] = useState<Number[]>([]);
    const [audioCallStr, setAudioCallStr] = useState('');
    const [countHowmanyChecks, setCountHowmanyChecks] = useState<string|null>(null);
    const [stake, setStake] = useState(20);
    const navigate = useNavigate();

    const is_admin = localStorage.getItem('isAdmin')

    const getSettingsData = () => {
      const lang = localStorage.getItem("language");
      const auto = localStorage.getItem("automatic");
      const callTime = localStorage.getItem("callTimeInSeconds");
      const countChecks = localStorage.getItem("countHowmanyChecks");

      setLanguage(lang? lang:'amharic-default')
      setAutomatic(auto == 'manual'? false:true)
      setCallTimeInSeconds(callTime? parseInt(callTime):8)
      setCountHowmanyChecks(countChecks? countChecks:'1')
    }
    const updateSettingsData = () => {
      localStorage.setItem("language", language);
      localStorage.setItem("automatic", automatic? 'automatic': 'manual');
      localStorage.setItem("callTimeInSeconds", callTimeInSeconds.toString());
      setSettingsShowModal(false);
    }
    useEffect(()=>{
      const auto = localStorage.getItem("automatic");
      if(!auto)
        localStorage.setItem("automatic", 'automatic')
      getSettingsData()
    },[])
    
    useEffect(()=>{
      get_cashier_data(setCashier)
    }, [])

    useEffect(()=>{
      if (bingoGame){
        localStorage.setItem('previousCalls', JSON.stringify(previousCalls))
      }
    }, [previousCalls])
    
    useEffect(()=>{
      if (bingoGame){
        localStorage.setItem('drawNumbers', JSON.stringify(drawNumbers))
      }
    }, [drawNumbers])

    useEffect(()=>{
      if (bingoGame){
        localStorage.setItem('calledNumbers', JSON.stringify(calledNumbers))
      }
    }, [calledNumbers])
    
    useEffect(()=>{
      if (bingoGame){
        localStorage.setItem('bingoGame', JSON.stringify(bingoGame))
      }
    }, [bingoGame])
    
    useEffect(()=>{
      if (bingoGame){
        localStorage.setItem('automatic', JSON.stringify(automatic))
      }
    }, [automatic])

    useEffect(()=>{
      if (bingoGame){
        localStorage.setItem('callIndex', callIndex.toString())
      }
    }, [callIndex])
    
    useEffect(()=>{
      if (bingoGame){
        localStorage.setItem('callTimeInSeconds', callTimeInSeconds.toString())
      }
    }, [callTimeInSeconds])
     
    useEffect(()=>{
      if (bingoGame){
        localStorage.setItem('selectedCartelas', JSON.stringify(selectedCartelas))
      }
    }, [selectedCartelas])
    
    useEffect(()=>{
      if (bingoGame){
        localStorage.setItem('checkedCartelas', JSON.stringify(checkedCartelas))
      }
    }, [checkedCartelas])
    
    useEffect(() => {
      if (audio_refs.length > 0) {
        audio_refs.forEach((ref: any) => {
          const audio = ref?.current;
          if (audio && audio.readyState < 4) {
            audio.load();
          }
        });
      }
    }, [audio_refs]);

    const preloadAudios = async(urls: string[]) => {
      urls.forEach(async (url) => {
        // await cacheAudioFile(url);
        await saveAudioFile(url, url);
        // const audio = new Audio(url);
        // audio.preload = 'auto';
        // audio.load();
      });
    };
    useEffect(() => {
      const urls = getAudioUrls(language);

      // Optionally cache them
      // cacheAudioFiles(urls); // From earlier example
      preloadAudios(urls);
    }, [language]);

    const SegmentedItem = (item:string) => {
      const is_active = item == 'Fast' && callTimeInSeconds < 3? true:
        item == 'Normal' && callTimeInSeconds < 8? true:
        item == 'Slow' && callTimeInSeconds >8? true: false;
      if(is_active){
        return <div style={{color:'white', backgroundColor: '#1890ff', minWidth: '100%', paddingLeft: '10px', paddingRight: '10px', marginTop: '5px', marginBottom: '5px', borderRadius: '2px'}}>
          {item}
        </div>
      }
      return <div style={{color: 'black', backgroundColor: 'white', minWidth: '100%', paddingLeft: '10px', paddingRight: '10px', marginTop: '5px', marginBottom: '5px', borderRadius: '2px'}}>
        {item}
      </div>
    }

    const getLastGame = () => {
      console.log('getLastGame');
      const bingoGame_local = localStorage.getItem('bingoGame')
      const calledNumbers_local = localStorage.getItem('calledNumbers')
      const previousCalls_local = localStorage.getItem('previousCalls')
      const drawNumbers_local = localStorage.getItem('drawNumbers')
      const automatic_local = localStorage.getItem('automatic')
      const callIndex_local = localStorage.getItem('callIndex')
      const callTimeInSeconds_local = localStorage.getItem('callTimeInSeconds')
      const selectedCartelas_local = localStorage.getItem('selectedCartelas')
      const checkedCartelas_local = localStorage.getItem('checkedCartelas')
      if(bingoGame_local){
        console.log(JSON.parse(bingoGame_local));
        setBingoGame(JSON.parse(bingoGame_local));
      }
      if(calledNumbers_local){
        console.log(JSON.parse(calledNumbers_local));
        setCalledDrawNumbers(JSON.parse(calledNumbers_local));
      }
      if(previousCalls_local){
        console.log(JSON.parse(previousCalls_local));
        setPreviousCalls(JSON.parse(previousCalls_local));
      }
      if(drawNumbers_local){
        console.log(JSON.parse(drawNumbers_local));
        setDrawNumbers(JSON.parse(drawNumbers_local));
      }
      if(automatic_local){
        console.log(automatic_local?automatic_local:'');
        setAutomatic(automatic_local?automatic_local:'');
      }
      if(callIndex_local){
        console.log(parseInt(callIndex_local));
        setCallIndex(parseInt(callIndex_local));
      }
      if(callTimeInSeconds_local){
        console.log(parseInt(callTimeInSeconds_local));
        setCallTimeInSeconds(parseInt(callTimeInSeconds_local));
      }
      if(selectedCartelas_local){
        console.log(JSON.parse(selectedCartelas_local));
        setSelectedCartelas(JSON.parse(selectedCartelas_local));
      }
      if(checkedCartelas_local){
        console.log(JSON.parse(checkedCartelas_local));
        setCheckedCartelas(JSON.parse(checkedCartelas_local));
      }
      
      
    }
    return (
      <div className="bingo-main-page">
        {showNavBar && (<div className="bingo-navigation">
          
          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '50px',}}><img src={Logo} style={{width: '100px'}}/></div>
          <div className="bingo-nav-items">
            <div className={navItem == 'dashboard'?"bingo-nav-item-active":"bingo-nav-item"} onClick={()=> {setNavItem('dashboard'); setCurrentCartela(null)}}><FcComboChart/> Dashboard</div>
            <div className={navItem == 'sales'?"bingo-nav-item-active":"bingo-nav-item"} onClick={()=> {setNavItem('sales'); setCurrentCartela(null)}}><ImCart /> Sales</div>
            { is_admin && <div className={navItem == 'report'?"bingo-nav-item-active":"bingo-nav-item"} onClick={()=> {setNavItem('report'); setCurrentCartela(null)}}><ImCart /> Report</div>}
            <div className={navItem == 'bingo-play'?"bingo-nav-item-active":"bingo-nav-item"} onClick={()=> {setNavItem('bingo-play'); setCurrentCartela(null)}}><FaBowlingBall /> BingoPlay</div>
            <div className={navItem == 'cartela'?"bingo-nav-item-active":"bingo-nav-item"} onClick={()=> {setNavItem('cartela'); setCurrentCartela(null)}}><MdOutlinePointOfSale /> Cartel</div>
            <div className="bingo-nav-item-active" style={{marginTop: "300px", boxShadow: '2px 2px 7px 2px gray', cursor: 'pointer'}} 
                    onClick={() => {
                      logout();
                      navigate(RouteConstants.LOGIN);
                    }}><MdOutlinePointOfSale /> Sign Out</div>
          </div>
        </div>)}
        <div>
          <div style={{display: 'flex', justifyContent: 'space-between', margin: '3px'}}>
            <BsFillMenuButtonFill className="icon-hover" size={30} onClick={()=> setShowNavBar(!showNavBar)} style={{marginLeft: '10px'}}/>
            <div>
            {cashier?.user.username}
            <IoSettings className="icon-hover" size={30} style={{marginLeft: '10px', marginRight: '10px'}} onClick={()=> setSettingsShowModal(true)}/>
            
            </div>
          </div>

          {
          navItem == 'bingo-play'?(<BingoPlayBoardComponent language={language} countHowmanyChecks={countHowmanyChecks} setCountHowmanyChecks={setCountHowmanyChecks} audioCallStr={audioCallStr} setAudioCallStr={setAudioCallStr} callTimeInSeconds={callTimeInSeconds} cashier={cashier} setCashier={setCashier} audio_refs={audio_refs} setCheckedCartelas={setCheckedCartelas} calledNumbers={calledNumbers} setCalledDrawNumbers={setCalledDrawNumbers} boardNumberList={boardNumberList} showNavBar={showNavBar} playGame={playGame} setPlayGame={setPlayGame} previousCalls={previousCalls} shuffleNumbers={shuffleNumbers} drawNumbers={drawNumbers} bingoGame={bingoGame} automatic={automatic} callIndex={callIndex} showModal={showModal} selectedCartelas={selectedCartelas} stake={stake} setPreviousCalls={setPreviousCalls} setShuffleNumbers={setShuffleNumbers} setDrawNumbers={setDrawNumbers} setBingoGame={setBingoGame} setAutomatic={setAutomatic} setCallIndex={setCallIndex} setShowModal={setShowModal} setSelectedCartelas={setSelectedCartelas} setStake={setStake} audio_shuffle_balls_ref={audio_shuffle_balls_ref}></BingoPlayBoardComponent>):
          navItem == 'sales'?<Sales showNavBar={showNavBar}></Sales>:
          navItem == 'report'?<Report showNavBar={showNavBar}></Report>:
          navItem == 'cartela'?<Cartela countHowmanyChecks={countHowmanyChecks} setCheckedCartelas={setCheckedCartelas} checkedCartelas={checkedCartelas} bingoGame={bingoGame} selectedCartelas={selectedCartelas} currentCartela={currentCartela ? currentCartela : null} setCurrentCartela={setCurrentCartela} drawNumbers={drawNumbers.slice(0, callIndex >=0?callIndex+2:callIndex+1)} callIndex={callIndex >=0?callIndex+1:callIndex} showNavBar={showNavBar}></Cartela>: 
          <Dashboard setCashier={setCashier} />
          }
          
        </div>
        <div>
            {
               language == 'amharic-default' && audio_refs.map((e, index)=>{
                if(index == 75){
                  return <audio ref={e} preload="auto" src={"../../../../src/audios/amharic/B.mp3"}></audio>
                }
                else if(index == 76){
                  return <audio ref={e} preload="auto" src={"../../../../src/audios/amharic/I.mp3"}></audio>
                }
                else if(index == 77){
                  return <audio ref={e} preload="auto" src={"../../../../src/audios/amharic/N.mp3"}></audio>
                }
                else if(index == 78){
                  return <audio ref={e} preload="auto" src={"../../../../src/audios/amharic/G.mp3"}></audio>
                }
                else if(index == 79){
                  return <audio ref={e} preload="auto" src={"../../../../src/audios/amharic/O.mp3"}></audio>
                }
                else if(index == 80){
                  // return <audio ref={e} preload="auto" src={"../../../../src/audios/amharic/game-start.mp3"}></audio>
                  return <audio ref={e} preload="auto" src={"../../../../src/audios/amharic/game-start.mp3"}></audio>
                }
                else if(index == 81){
                  return <audio ref={e} preload="auto" src={"../../../../src/audios/amharic/game-finished.mp3"}></audio>
                }
                else if(index == 82){
                  // return <audio ref={e} preload="auto" src={"../../../../src/audios/amharic/game-pause.mp3"}></audio>
                  return <audio ref={e} preload="auto" src={"../../../../src/audios/amharic/game-pause.mp3"}></audio>
                }
                return <audio ref={e} preload="auto" src={"../../../../src/audios/amharic/"+(index+1)+".mp3"}></audio>
              })
            }
            
            {
               language == 'amharic' && audio_refs.map((e, index)=>{
                if(index == 75){
                  return <audio ref={e} preload="auto" src={"../../../../src/audios/amharic/B.mp3"}></audio>
                }
                else if(index == 76){
                  return <audio ref={e} preload="auto" src={"../../../../src/audios/amharic/I.mp3"}></audio>
                }
                else if(index == 77){
                  return <audio ref={e} preload="auto" src={"../../../../src/audios/amharic/N.mp3"}></audio>
                }
                else if(index == 78){
                  return <audio ref={e} preload="auto" src={"../../../../src/audios/amharic/G.mp3"}></audio>
                }
                else if(index == 79){
                  return <audio ref={e} preload="auto" src={"../../../../src/audios/amharic/O.mp3"}></audio>
                }
                else if(index == 80){
                  // return <audio ref={e} preload="auto" src={"../../../../src/audios/amharic/game-start.mp3"}></audio>
                  return <audio ref={e} preload="auto" src={"../../../../src/audios/BINGO-EN/bingo.mp3"}></audio>
                }
                else if(index == 81){
                  return <audio ref={e} preload="auto" src={"../../../../src/audios/amharic/game-finished.mp3"}></audio>
                }
                else if(index == 82){
                  // return <audio ref={e} preload="auto" src={"../../../../src/audios/amharic/game-pause.mp3"}></audio>
                  return <audio ref={e} preload="auto" src={"../../../../src/audios/BINGO-EN/stop.mp3"}></audio>
                }
                else if(index < 15){
                  return <audio ref={e} preload="auto" src={"../../../../src/audios/BINGO-EN/B"+(index+1)+".mp3"}></audio>
                }
                else if(index < 30){
                  return <audio ref={e} preload="auto" src={"../../../../src/audios/BINGO-EN/I"+(index+1)+".mp3"}></audio>
                }
                else if(index < 45){
                  return <audio ref={e} preload="auto" src={"../../../../src/audios/BINGO-EN/N"+(index+1)+".mp3"}></audio>
                }
                else if(index < 60){
                  return <audio ref={e} preload="auto" src={"../../../../src/audios/BINGO-EN/G"+(index+1)+".mp3"}></audio>
                }
                else if(index < 75){
                  return <audio ref={e} preload="auto" src={"../../../../src/audios/BINGO-EN/O"+(index+1)+".mp3"}></audio>
                }
                return <audio ref={e} preload="auto" src={"../../../../src/audios/amharic/"+(index+1)+".mp3"}></audio>
              })
            }
            
            {
               language == 'amharic-female' && audio_refs.map((e, index)=>{
                if(index == 75){
                  return <audio ref={e} preload="auto" src={"../../../../src/audios/amharic/B.mp3"}></audio>
                }
                else if(index == 76){
                  return <audio ref={e} preload="auto" src={"../../../../src/audios/amharic/I.mp3"}></audio>
                }
                else if(index == 77){
                  return <audio ref={e} preload="auto" src={"../../../../src/audios/amharic/N.mp3"}></audio>
                }
                else if(index == 78){
                  return <audio ref={e} preload="auto" src={"../../../../src/audios/amharic/G.mp3"}></audio>
                }
                else if(index == 79){
                  return <audio ref={e} preload="auto" src={"../../../../src/audios/amharic/O.mp3"}></audio>
                }
                else if(index == 80){
                  // return <audio ref={e} preload="auto" src={"../../../../src/audios/amharic/game-start.mp3"}></audio>
                  return <audio ref={e} preload="auto" src={"../../../../src/audios/bingo-female/bingo.mp3"}></audio>
                }
                else if(index == 81){
                  return <audio ref={e} preload="auto" src={"../../../../src/audios/amharic/game-finished.mp3"}></audio>
                }
                else if(index == 82){
                  // return <audio ref={e} preload="auto" src={"../../../../src/audios/amharic/game-pause.mp3"}></audio>
                  return <audio ref={e} preload="auto" src={"../../../../src/audios/bingo-female/stop.mp3"}></audio>
                }
                else if(index < 15){
                  return <audio ref={e} preload="auto" src={"../../../../src/audios/bingo-female/B"+(index+1)+".mp3"}></audio>
                }
                else if(index < 30){
                  return <audio ref={e} preload="auto" src={"../../../../src/audios/bingo-female/I"+(index+1)+".mp3"}></audio>
                }
                else if(index < 45){
                  return <audio ref={e} preload="auto" src={"../../../../src/audios/bingo-female/N"+(index+1)+".mp3"}></audio>
                }
                else if(index < 60){
                  return <audio ref={e} preload="auto" src={"../../../../src/audios/bingo-female/G"+(index+1)+".mp3"}></audio>
                }
                else if(index < 75){
                  return <audio ref={e} preload="auto" src={"../../../../src/audios/bingo-female/O"+(index+1)+".mp3"}></audio>
                }
                return <audio ref={e} preload="auto" src={"../../../../src/audios/amharic/"+(index+1)+".mp3"}></audio>
              })
            }
            <audio ref={audio_shuffle_balls_ref} src={"../../../../src/audios/shuffleBalls/017578485-plastic-fast-flapping-mechanis.m4a"}></audio>
        </div>
        <Modal width={800} title={<div style={{textAlign: 'center'}}>Settings</div>} 
        visible={showSettingsModal} onCancel={()=> setSettingsShowModal(false)}
        onOk={()=> updateSettingsData()}>
          <div style={{display: 'grid',  gridTemplateColumns: 'auto auto auto'}}>
            <div style={{marginRight: '20px'}}>
              Call Time In Seconds
              <div style={{width: '50px'}}>
                <Input type="number" value={callTimeInSeconds} onChange={(e)=> setCallTimeInSeconds(parseInt(e.target.value))}/>
              </div>
            </div>
            <div style={{marginRight: '20px'}}>
              <div>
                <Switch checkedChildren="Automatic" unCheckedChildren="Manual" checked={automatic} onChange={(e)=> setAutomatic(e)} />
              </div>
            </div>
            <div style={{marginRight: '20px'}}>
              Language
              <div style={{width: '50px'}}>
                <Select
                  value={language}
                  style={{ width: 120 }}
                  onChange={(e)=> setLanguage(e)}
                  options={[
                    { value: 'amharic-default', label: 'Default' },
                    { value: 'amharic', label: 'አማርኛ ወንድ' },
                    { value: 'amharic-female', label: 'አማርኛ ሴት' },
                    { value: 'amharic-default', label: 'English' },
                  ]}
                />
              </div>
            </div>
            <div style={{marginRight: '20px', marginTop: '10px'}}>
              <div style={{width: '80%'}}>
                <Slider value={callTimeInSeconds} min={2} max={15} disabled={false} onChange={(e)=> setCallTimeInSeconds(e)} />
              </div>
            </div>
            <div></div><div></div>
            <div>
              <Segmented
                defaultValue={callTimeInSeconds<3?'Fast':callTimeInSeconds<8?'Normal':'Slow'}
                value={callTimeInSeconds<3?'Fast':callTimeInSeconds<8?'Normal':'Slow'}
                style={{ margin: 0, paddingTop: 10, }}
                
                onChange={(value) => {
                  console.log(value);
                  
                  if(value == 'Fast'){
                    setCallTimeInSeconds(2)
                  }
                  else if(value == 'Normal'){
                    setCallTimeInSeconds(4)
                  }
                  else if(value == 'Slow'){
                    setCallTimeInSeconds(9)
                  }
                }}
                options={[{value:'Slow', label: SegmentedItem('Slow')}, {value: 'Normal', label: SegmentedItem('Normal')}, {value: 'Fast', label: SegmentedItem('Fast')}]}
              />
            </div>
            <div>
              <Popconfirm
                title="የቀድሞ ጌም"
                // description="የቀድሞውን ጌም ላጫውት?"
                onConfirm={getLastGame}
                onOpenChange={() => console.log('open change')}
                
              >
                <Button type="primary">የቀድሞ ጌም</Button>
              </Popconfirm>
            </div>
          </div>
        </Modal>
      </div>
    );
  };
  
  /**
   * Map State to Props
   *
   * @param state
   */
  const mapStateToProps = (state: any) => ({
    // projects: state.project.fetchAll,
    // status_board: state.status_board.fetchAll,
  });
  
  /**
   * Map Dispatch to Props
   *
   * @param dispatch
   */
  const mapDispatchToProps = (dispatch: any) => ({
    // fetchUser: (action: any) => dispatch(fetchAllUser(action)),
    // fetchProjects: (action: any) => dispatch(fetchAllProjects(action)),
    // fetchStatusBoards: (action: any) => dispatch(fetchAllStatusBoard(action)),
    // fetchOneProject: (action: any) => dispatch(fetchOneProjects(action)),
    // fetchRoles: (action: any) => dispatch(fetchAllRole(action)),
  });
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(BingoGameComponent);
  