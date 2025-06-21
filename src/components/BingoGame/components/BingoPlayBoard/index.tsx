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

import { FcComboChart } from "react-icons/fc";
import { ImCart } from "react-icons/im";
import { FaBowlingBall } from "react-icons/fa";
import { MdOutlinePointOfSale } from "react-icons/md";
import { ArrayRange, BingoPlayPropType, PlayAudioEfficiently } from "../../util/BingoGames.util";
import { BsFillPlayCircleFill } from "react-icons/bs";
import { MdPlayCircle } from "react-icons/md";
import { FaPauseCircle, FaPlayCircle } from "react-icons/fa";
import { AiOutlineClear } from "react-icons/ai";
import Logo from "../../ethbingo.png";
import axios from "axios";
import { MainUrl } from "../../../../constants/Url";
import { Button, Modal, Select } from "antd";
import { call } from "redux-saga/effects";
import audio1 from "../../../../audios/1.mp3";


const BingoPlayBoardComponent: FC<BingoPlayPropType> = ({
    boardNumberList,
    calledNumbers,
    playGame,
    showNavBar,
    previousCalls,
    shuffleNumbers,
    drawNumbers,
    bingoGame,
    automatic,
    callIndex,
    showModal,
    selectedCartelas,
    stake, audio_refs, cashier,callTimeInSeconds, audioCallStr, countHowmanyChecks, language,
    setPlayGame,
    setPreviousCalls,
    setShuffleNumbers,
    setDrawNumbers,
    setBingoGame,
    setAutomatic,
    setCallIndex,
    setShowModal,
    setSelectedCartelas,
    setStake,setCalledDrawNumbers,setCheckedCartelas,setCashier, setAudioCallStr, setCountHowmanyChecks,
    audio_shuffle_balls_ref,
  }) => {
    const [isLowDeposit, setIsLowDeposit] = useState(false);
    const [lowDeposit, setLowDeposit] = useState('');

    const shuffle = async() => {
      let shuffle_list = [...shuffleNumbers];
      let isShuffling = true;
    
      // Create Audio
      const playShuffleAudioFun = async() => {
        // Call again after ~500ms (adjustable for speed of shuffle)
        // setTimeout(addRandomNumber, 500);

        var audio_:any = audio_shuffle_balls_ref?.current
        audio_.play()

        // Set timeout to stop everything after 4 seconds
        const interval_ = await setTimeout(() => {
          audio_.pause();         // Stop audio
          // isShuffling = false;    // Disable further actions
          console.log("Shuffle stopped after 4 seconds");
        }, 4000);
        return () => clearTimeout(interval_);
      }
      await playShuffleAudioFun()
          
      // Loop to keep adding random numbers while shuffling
      const addRandomNumber = async () => {
        console.log('set time out ======= start',shuffleNumbers.length);
    
        const element = Math.floor(Math.random() * 75) + 1;
        shuffle_list.push(element);
        
        setShuffleNumbers([...shuffle_list]); // Trigger re-render
        if (!isShuffling || shuffle_list.length > 5) {
          return;
        }
    
        // Call again after ~10ms (adjustable for speed of shuffle)
        await setTimeout(addRandomNumber, 10);
        console.log('set time out =======end');
        
      };
    
      // Start adding numbers
      await addRandomNumber();
      setShuffleNumbers([])
      console.log('end of shuffle', shuffleNumbers);
    
    };

    const shuffle_ = async() => {
      let shuffle_list = [...shuffleNumbers]
      const element = Math.floor(Math.random() * 75) + 1;
      
      const timeOut = setTimeout(() => {
        shuffle_list.push(element)
        setShuffleNumbers(shuffle_list)
      }, 1000)
      return () => clearTimeout(timeOut);
    }

    useEffect(() => {
      if(shuffleNumbers.length < 75 && shuffleNumbers.length > 0){
        if (shuffleNumbers.length > 15){
          setShuffleNumbers([])
        } else{
          shuffle_()
        }
      }
      else if(shuffleNumbers.length == 75){
        setShuffleNumbers([])
      }
    }, [shuffleNumbers])
    console.log(shuffleNumbers);
    
    useEffect(()=> {
      console.log('calledNumbers');
      console.log(calledNumbers);
      
      if(!automatic && !calledNumbers.includes(drawNumbers[callIndex])){
        if(callIndex<0){
          setPreviousCalls([])
          return;
        }

        if(callIndex == 0){
          async function StartPlayAudio() {
            const interval_ = setTimeout(async () => {
              // var audio_ = new Audio("../../../../../src/audios/"+elmnt+".mp3")
              // console.log(audio_);
              // audio_.play()
              var new_index = ourLatter=='B'?75:ourLatter=='I'?76:ourLatter=='N'?77:ourLatter=='G'?78:ourLatter=='O'?79:79
              var audio:any = audio_refs[new_index]?.current
              
              if (audio){
                try {
                  var audio_ = new Audio("../../../../../src/audios/amharic/game-start.mp3")
                  await PlayAudioEfficiently(audio, drawNumbers, 80, "/src/audios/amharic/game-start.mp3", audio_, language)
                } catch (error) {
                  console.log(error);

                  var audio_ = new Audio("../../../../../src/audios/amharic/game-start.mp3")
                  audio_.play()
                }
              }
            }, 1000);
            return () => clearTimeout(interval_);
          }
          StartPlayAudio()
        }
  
        let cpy = [...previousCalls]
        const elmnt = drawNumbers[callIndex]
        cpy.unshift({
          latter: elmnt< 16?'B': elmnt<31? 'I': elmnt<46?'N':elmnt<61?'G': 'O',
          number: elmnt
        })
        
        // const synth = window.speechSynthesis
        let ourLatter = elmnt< 16?'B': elmnt<31? 'I': elmnt<46?'N':elmnt<61?'G': 'O'
        // let ourNumber = elmnt
        // const utterThis = new SpeechSynthesisUtterance(ourLatter)
        // synth.speak(utterThis)
        
        function latterPlayAudio() {
          const interval_ = setTimeout(async () => {
            // var audio_ = new Audio("../../../../../src/audios/"+elmnt+".mp3")
            // console.log(audio_);
            // audio_.play()
            var new_index = ourLatter=='B'?75:ourLatter=='I'?76:ourLatter=='N'?77:ourLatter=='G'?78:ourLatter=='O'?79:79
            var audio:any = audio_refs[new_index]?.current
            
            if (audio){
              try {
                var audio_ = new Audio("../../../../../src/audios/amharic/"+ourLatter+".mp3")
                await PlayAudioEfficiently(audio, drawNumbers, new_index, `/src/audios/amharic/${ourLatter}.mp3`, audio_, language)
              } catch (error) {
                console.log(error);
                
                var audio_ = new Audio("../../../../../src/audios/amharic/"+ourLatter+".mp3")
                audio_.play()
              }
            }
          }, 0);
          return () => clearTimeout(interval_);
        }
        if(language == "amharic-default")
          latterPlayAudio()
        
        
        // const speechSynth = window.speechSynthesis;
        // const utterance = new SpeechSynthesisUtterance(ourNumber.toString());
        // utterance.lang = "am-ET"; // Set the language to Amharic
  
        // Speak the entered number
        // speechSynth.speak(utterance)
          const audio:any = audio_refs[elmnt-1]
          
        // console.log(utterance);
  
        setPreviousCalls(cpy.length > 5? cpy.slice(0,5): cpy)  
        console.log(cpy);
        
        let called_nums_cpy = [...calledNumbers]
        called_nums_cpy.push(drawNumbers[callIndex])
        setCalledDrawNumbers(called_nums_cpy)
        
        if(audio?.current){
          console.log(audio);
          console.log(audio?.current);
          // audio?.current.play();
          
          const interval = setTimeout(async () => {
            
            // var audio_ = new Audio("../../../../../src/audios/"+elmnt+".mp3")
            // audio_.play()
            var audio:any = audio_refs[drawNumbers[callIndex]-1]?.current
            if (audio){
              try {
                var audio_ = new Audio("../../../../../src/audios/amharic/"+elmnt+".mp3")
                await PlayAudioEfficiently(audio, drawNumbers, elmnt-1, `/src/audios/amharic/${elmnt}.mp3`, audio_, language)
              } catch (error) {
                console.log(error);
                
                var audio_ = new Audio("../../../../../src/audios/amharic/"+elmnt+".mp3")
                audio_.play()
              }
            }
          }, 2500);
          return () => clearTimeout(interval);
        }
      }
      else if (playGame && !calledNumbers.includes(drawNumbers[callIndex])){
        if(callIndex<0){
          setPreviousCalls([])
          return;
        }
        
        console.log('callIndex');
        console.log(callIndex );
        console.log(callIndex == 0);
        
        let cpy = [...previousCalls]
        const elmnt = drawNumbers[callIndex]
        cpy.unshift({
          latter: elmnt< 16?'B': elmnt<31? 'I': elmnt<46?'N':elmnt<61?'G': 'O',
          number: elmnt
        })
        
        // const synth = window.speechSynthesis
        let ourLatter = elmnt< 16?'B': elmnt<31? 'I': elmnt<46?'N':elmnt<61?'G': 'O'
        
        function latterPlayAudio() {
          const interval_ = setTimeout(async () => {
            // var audio_ = new Audio("../../../../../src/audios/"+elmnt+".mp3")
            // console.log(audio_);
            // audio_.play()
            var new_index = ourLatter=='B'?75:ourLatter=='I'?76:ourLatter=='N'?77:ourLatter=='G'?78:ourLatter=='O'?79:79
            var audio:any = audio_refs[new_index]?.current
            
            if (audio){
              try {
                var audio_ = new Audio("../../../../../src/audios/amharic/"+ourLatter+".mp3")
                await PlayAudioEfficiently(audio, drawNumbers, new_index, `/src/audios/amharic/${ourLatter}.mp3`, audio_, language)
              } catch (error) {
                console.log(error);
                
                var audio_ = new Audio("../../../../../src/audios/amharic/"+ourLatter+".mp3")
                audio_.play()
              }
            }
          }, 0);
          return () => clearTimeout(interval_);
        }
        
        if(language == "amharic-default")
          latterPlayAudio()
        // let ourNumber = elmnt? elmnt: ''
        // const utterThis = new SpeechSynthesisUtterance(ourLatter)
        // synth.speak(utterThis)
        
        
        
        // const speechSynth = window.speechSynthesis;
        // const utterance = new SpeechSynthesisUtterance(ourNumber.toString());
        // utterance.lang = "am-ET"; // Set the language to Amharic
  
        // Speak the entered number
        // speechSynth.speak(utterance)
        // console.log(utterance);
  
        setPreviousCalls(cpy.length > 5? cpy.slice(0,5): cpy)
        
        let called_nums_cpy = [...calledNumbers]
        called_nums_cpy.push(drawNumbers[callIndex])
        setCalledDrawNumbers(called_nums_cpy)
        console.log('setTimeout');
        
        function playAudio() {
          const interval_ = setTimeout(async () => {
            // var audio_ = new Audio("../../../../../src/audios/"+elmnt+".mp3")
            // console.log(audio_);
            // audio_.play()
            var audio:any = audio_refs[drawNumbers[callIndex]-1]?.current
            
            if (audio){
              try {
                var audio_ = new Audio("../../../../../src/audios/amharic/"+elmnt+".mp3")
                await PlayAudioEfficiently(audio, drawNumbers, elmnt-1,`/src/audios/amharic/${elmnt}.mp3` , audio_, language)
              } catch (error) {
                console.log(error);
                
                var audio_ = new Audio("../../../../../src/audios/amharic/"+elmnt+".mp3")
                audio_.play()
              }
            }
          }, 1500);
          return () => clearTimeout(interval_);
        }
        
        playAudio()
        const interval = setTimeout(() => {
          if(callIndex == 74){
            
            async function FinishedPlayAudio() {
              console.log('StartPlayAudio');
              if(automatic && playGame){
                setAudioCallStr('start')
              }
              var audio:any = audio_refs[81]?.current
              
              if (audio){
                try {
                  var audio_ = new Audio("../../../../../src/audios/game-finished.mp3")
                  await PlayAudioEfficiently(audio, drawNumbers, 81, `/src/audios/game-finished.mp3`, audio_, language)
                } catch (error) {
                  console.log(error);
                  var audio_ = new Audio("../../../../../src/audios/game-finished.mp3")
                  audio_.play()
                }
              }
            }
            FinishedPlayAudio()
  
          }
          else if(playGame){
            setCallIndex(callIndex+1)
          }
          
        }, callTimeInSeconds*1000);
        return () => clearTimeout(interval);
        
      }
      
    },[callIndex])
    
    useEffect(() => {
      if(automatic && bingoGame && playGame && callIndex< 75){
        const interval = setTimeout(() => {
          setCallIndex(callIndex+2)
        }, 1000);
        return () => clearTimeout(interval);
      }
    }, [automatic, playGame])

    useEffect(() => {
      if(automatic && bingoGame && callIndex< 75){
        if(playGame){
          if(audioCallStr !== 'start'){
            setAudioCallStr('start')
            
            async function StartPlayAudio() {
              console.log('StartPlayAudio');
              var audio:any = audio_refs[80]?.current
              
              if (audio){
                try {
                  var audio_ = new Audio("../../../../../src/audios/amharic/game-start.mp3")
                  await PlayAudioEfficiently(audio, drawNumbers, 80, `/src/audios/amharic/game-start.mp3`, audio_, language)
                } catch (error) {
                  console.log(error);
                  var audio_ = new Audio("../../../../../src/audios/amharic/game-start.mp3")
                  audio_.play()
                }
              }
            }
            StartPlayAudio()
          }
        }
        else{
          if(audioCallStr !== 'pause'){
            setAudioCallStr('pause')
            
            async function PausePlayAudio() {
              console.log('pausePlayAudio');
              var audio:any = audio_refs[82]?.current
              
              if (audio){
                try {
                  var audio_ = new Audio("../../../../../src/audios/amharic/game-pause.mp3")
                  await PlayAudioEfficiently(audio, drawNumbers, 82, `/src/audios/amharic/game-pause.mp3`, audio_, language)
                } catch (error) {
                  console.log(error);
                  var audio_ = new Audio("../../../../../src/audios/amharic/game-pause.mp3")
                  audio_.play()
                }
              }
            }
            PausePlayAudio()
          }
        }
      }
      if( automatic && bingoGame &&!playGame){
        
        setCallIndex(callIndex -1)
        
        // let called_nums_cpy = [...calledNumbers]
        // called_nums_cpy.pop()
        // setCalledDrawNumbers(called_nums_cpy)
        
        // let cpy = [...previousCalls]
        // const elmnt = drawNumbers[callIndex]
        // cpy.shift()
        // setPreviousCalls(cpy)
        // const interval = setTimeout(() => {
        //   // setCallIndex(callIndex+1)
        // }, 50);
        // return () => clearTimeout(interval);
        
        
      }
      if( automatic && bingoGame && playGame){
        
      }
    }, [playGame])

    useEffect(() => {
      if(bingoGame){
        const interval = setTimeout(() => {
          setCallIndex(callIndex+1)
        }, 3000);
        return () => clearTimeout(interval);
      }
    }, [bingoGame])

    const startNewGame = async() => {
      console.log('startNewGame');     
      setDrawNumbers([])   
      setBingoGame(null)
      setCallIndex(-1)
      setShuffleNumbers([])
      setPreviousCalls([])
      setShowModal(false)
      setCheckedCartelas([])
      setAudioCallStr('')
      setCalledDrawNumbers([])
      if(automatic){
        setPlayGame(true)
      }
      axios.post(MainUrl+"/bingo/create_new_game",{
        cartelas: selectedCartelas.join(','),
        stake: stake,
      })
      .then(async(response) => {
          console.log(response.data)
          if(response.data && response.data.status === 200){

            await shuffle()
            async function StartPlayAudio() {
              console.log('StartPlayAudio');
              if(automatic && playGame){
                setAudioCallStr('start')
              }
              var audio:any = audio_refs[80]?.current
              
              if (audio){
                try {
                  var audio_ = new Audio("../../../../../src/audios/amharic/game-start.mp3")
                  await PlayAudioEfficiently(audio, drawNumbers, 80, "/src/audios/amharic/game-start.mp3", audio_, language)
                } catch (error) {
                  console.log(error);
                  var audio_ = new Audio("../../../../../src/audios/amharic/game-start.mp3")
                  audio_.play()
                }
              }
            }
            await StartPlayAudio()
  
            const interval_ = await setTimeout(() => {
              setBingoGame(response.data.current_game)
              setDrawNumbers(
                response.data.current_game.draw_numbers.split(',').map((item:string) => parseInt(item))
              )
              setCashier(response.data.casher)
            }, 1000);
            return () => clearTimeout(interval_);

          }
          if(response.data && response.data.status === 402){
            setIsLowDeposit(true)
            setLowDeposit(response.data.message)
          }
      })   
    }

    useEffect(() => {
      if(countHowmanyChecks)
        localStorage.setItem("countHowmanyChecks", countHowmanyChecks.toString());
    }, [countHowmanyChecks])
    console.log(shuffleNumbers);
    
    console.log(countHowmanyChecks);
    console.log(drawNumbers);
    
    const PreviousCallBall = (className: string, latter:string, number_:number) => {
      return (
        // <div className="bingo-board-bottom-current-call bingo-board-bottom-current-call-small">
          <div className={`bingo-ball-display-${className}-box bingo-ball-display-box-small`}>
            <div className={`bingo-ball-display-box-${className == 'white'?'red':'white'}-circle bingo-ball-display-box-white-circle-small`}>
              <div className="bingo-ball-display-box-white-box bingo-ball-display-box-white-box-small">
                {latter} <div className="bingo-display-ball-number-small">{number_}</div></div>
            </div>
          </div>
        // </div>
      )
    }
    const currentCallBallLatter = () => {
      const currentCall = drawNumbers[callIndex];
      const currentLatter = previousCalls[0]?.latter || (currentCall < 16? 'B': 
        currentCall < 31 ? 'I':
        currentCall < 46 ? 'N':
        currentCall < 61 ? 'G': 'O'
      );
      const currentNumber = previousCalls[0]?.number || currentCall;
      return { currentLatter, currentNumber };
    }
    const convertToNumberLatter = (num: number) => {
      return {
        latter: num < 16? 'B': 
          num<31?'I':num<46?'N':num<60?'G':'O',
        number: num,
      }
    }
    const addCartela= (num: number, isAdd: boolean) =>{
      let cpy = [...selectedCartelas]
      if(isAdd){
        cpy.push(num)
        setSelectedCartelas(cpy)
      }
      else{
        setSelectedCartelas(cpy.filter((e)=> e !== num))
      }
    }
    const callIndexNew = () => {
      return playGame? calledNumbers.length - 1 == callIndex? callIndex:   callIndex + 1: callIndex+1
    }
    console.log(calledNumbers.length+'calledNumbers.length'+callIndex);
    
    return (
        <div className="bingo-main-page">
          <div className="bingo-menu">
            {isLowDeposit && <div style={{width: '15vw', height: '30vh', backgroundColor: 'red', color: 'white', display:'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px'}}>{lowDeposit}</div>}
            <img src={Logo} className="bingo-board-logo"/>
            <div className="bingo-time-div">
              <div className="bingo-time-munite">{calledNumbers.length}</div>
              <div className="bingo-time-second">75</div>
            </div>
            {bingoGame && <div className="bingo-time-div" style={{color: 'white', fontSize: '34px'}}>
              ደራሽ {stake * selectedCartelas.length  *(1 - cashier?.commission_rate)} ብር
            </div>}
            {
              automatic && (<>{playGame? <FaPauseCircle className="bingo-pause-play-icon"  size={'150px'} onClick={()=>setPlayGame(false)}/>:<FaPlayCircle  className="bingo-pause-play-icon" size={'150px'} onClick={()=> setPlayGame(true)}/>}</>)
            }
            
            {bingoGame && !automatic && drawNumbers.length && callIndex < 74 && <div className="bingo-dotted-border-btn" style={{marginTop: '20px'}} onClick={() => {
              if(drawNumbers.length && callIndex+1 < drawNumbers.length) setCallIndex(callIndex+1);
            }}>NEXT NUMBER</div>}
            {bingoGame && <div className="bingo-dotted-border-btn bingo-borderless" style={{marginTop: '20px'}} onClick={()=> setShowModal(true)}>NEXT GAME</div>}
            {!automatic && <div className="bingo-dotted-border-btn bingo-borderless" style={{marginTop: '20px'}} onClick={() => setAutomatic(true)}>AUTOMATIC</div>}
            {automatic && <div className="bingo-dotted-border-btn bingo-borderless" style={{marginTop: '20px'}} onClick={() => setAutomatic(false)}>MANUAL</div>}
            {bingoGame  && <div className="bingo-dotted-border-btn bingo-borderless" style={{marginTop: '20px'}} onClick={()=> {
              setDrawNumbers([]);
              setShuffleNumbers([]);
              setPreviousCalls([]);
              setSelectedCartelas([]);
              }}>RESET BOARD</div>}
            <div className="bingo-dotted-border-btn bingo-borderless bingo-bg-btn" style={{marginTop: '20px'}} onClick={()=> setShowModal(true)}>START GAME</div>
            {bingoGame && callIndexNew() == -1 && <div className="bingo-dotted-border-btn bingo-borderless bingo-bg-btn" style={{marginTop: '20px'}} onClick={() => shuffle()} >SHUFFLE</div>}
          </div>
          <div className="bingo-board" style={showNavBar? {width: '69vw'}:{ width: '84vw'}}>
            <div className="bingo-board-nums">
              <>
              <div className="bingo-board-nums-item bingo-board-nums-item-latter">B</div>
              {
                ArrayRange(1,75,1).filter((a) => a < 16).map((e: any) => {
                  if (drawNumbers.slice(0, callIndexNew()).includes(e) && callIndexNew() > -1)
                    return <div className="bingo-board-nums-item-white-color">{e}</div>
                  return <div className={ (shuffleNumbers.includes(e) && callIndexNew() < 1) || (callIndexNew() > -1 && drawNumbers[callIndexNew()] == e)?"bingo-board-nums-item blink_me":"bingo-board-nums-item"}>{e}</div>
                })
              }
              </>
              <>
              <div className="bingo-board-nums-item bingo-board-nums-item-latter">I</div>
              {
                ArrayRange(1,75,1).filter((a) => a < 31 && a > 15).map((e: any) => {
                  if (drawNumbers.slice(0,callIndexNew()).includes(e) && callIndexNew() > -1)
                    return <div className="bingo-board-nums-item-white-color">{e}</div>
                  return <div className={ (shuffleNumbers.includes(e) && callIndexNew() < 1) || (callIndexNew() > -1 && drawNumbers[callIndexNew()] == e)?"bingo-board-nums-item blink_me":"bingo-board-nums-item"}>{e}</div>
                })
              }
              </>
              <>
              <div className="bingo-board-nums-item bingo-board-nums-item-latter">N</div>
              {
                ArrayRange(1,75,1).filter((a) => a < 46 && a > 30).map((e: any) => {
                  if (drawNumbers.slice(0,callIndexNew()).includes(e) && callIndexNew() > -1)
                    return <div className="bingo-board-nums-item-white-color">{e}</div>
                  return <div className={ (shuffleNumbers.includes(e) && callIndexNew() < 1) || (callIndexNew() > -1 && drawNumbers[callIndexNew()] == e)?"bingo-board-nums-item blink_me":"bingo-board-nums-item"}>{e}</div>
                })
              }
              </>
              <>
              <div className="bingo-board-nums-item bingo-board-nums-item-latter">G</div>
              {
                ArrayRange(1,75,1).filter((a) => a < 61 && a > 45).map((e: number) => {
                  if (drawNumbers.slice(0,callIndexNew()).includes(e) && callIndexNew() > -1)
                    return <div className="bingo-board-nums-item-white-color">{e}</div>
                  return <div className={ (shuffleNumbers.includes(e) && callIndexNew() < 1) || (callIndexNew() > -1 && drawNumbers[callIndexNew()] == e)?"bingo-board-nums-item blink_me":"bingo-board-nums-item"}>{e}</div>
                })
              }
              </>
              <>
              <div className="bingo-board-nums-item bingo-board-nums-item-latter">O</div>
              {
                ArrayRange(1,75,1).filter((a) => a < 76 && a > 60).map((e: any) => {
                  if (drawNumbers.slice(0,callIndexNew()).includes(e) && callIndexNew() > -1)
                    return <div className="bingo-board-nums-item-white-color">{e}</div>
                  return <div className={ (shuffleNumbers.includes(e) && callIndexNew() < 1) || (callIndexNew() > -1 && drawNumbers[callIndexNew()] == e)?"bingo-board-nums-item blink_me":"bingo-board-nums-item"}>{e}</div>
                })
              }
              </>
            </div>
            <div className="bingo-board-bottom"  style={showNavBar? {width: '69vw'}:{ width: '84vw'}}>
                <div className="bingo-board-bottom-current-call">
                  {bingoGame && !calledNumbers.slice(0,-1).includes(drawNumbers[callIndexNew()]) && drawNumbers.length && <>{ drawNumbers.length && drawNumbers[callIndexNew()] && drawNumbers[callIndexNew()] < 16 &&
                  (
                    <div className="bingo-ball-display-blue-box">
                      <div className="bingo-ball-display-box-white-circle">
                        <div className="bingo-ball-display-box-white-box">{convertToNumberLatter(drawNumbers[callIndexNew()]).latter}<div className="bingo-display-ball-number">{drawNumbers[callIndexNew()]}</div></div>
                      </div>
                    </div>
                  )
                  }
                  {bingoGame && !calledNumbers.slice(0,-1).includes(drawNumbers[callIndexNew()]) && drawNumbers.length && drawNumbers[callIndexNew()] && drawNumbers[callIndexNew()] > 15 && drawNumbers[callIndexNew()] < 31 &&
                  (
                    <div className="bingo-ball-display-red-box">
                      <div className="bingo-ball-display-box-white-circle">
                        <div className="bingo-ball-display-box-white-box">{convertToNumberLatter(drawNumbers[callIndexNew()]).latter}<div className="bingo-display-ball-number">{drawNumbers[callIndexNew()]}</div></div>
                      </div>
                    </div>
                  )
                  }
                  {bingoGame && !calledNumbers.slice(0,-1).includes(drawNumbers[callIndexNew()]) && drawNumbers.length && drawNumbers[callIndexNew()] && drawNumbers[callIndexNew()] > 30 && drawNumbers[callIndexNew()] < 46 &&
                  (
                    <div className="bingo-ball-display-white-box">
                      <div className="bingo-ball-display-box-red-circle">
                        <div className="bingo-ball-display-box-white-box">{convertToNumberLatter(drawNumbers[callIndexNew()]).latter}<div className="bingo-display-ball-number">{drawNumbers[callIndexNew()]}</div></div>
                      </div>
                    </div>
                  )
                  }
                  { bingoGame && !calledNumbers.slice(0,-1).includes(drawNumbers[callIndexNew()]) && drawNumbers.length && drawNumbers[callIndexNew()] && drawNumbers[callIndexNew()] > 45 && drawNumbers[callIndexNew()] < 61 &&
                  (
                    <div className="bingo-ball-display-green-box">
                      <div className="bingo-ball-display-box-white-circle">
                        <div className="bingo-ball-display-box-white-box">{convertToNumberLatter(drawNumbers[callIndexNew()]).latter}<div className="bingo-display-ball-number">{drawNumbers[callIndexNew()]}</div></div>
                      </div>
                    </div>
                  )
                  }
                  { bingoGame && !calledNumbers.slice(0,-1).includes(drawNumbers[callIndexNew()]) && drawNumbers.length && drawNumbers[callIndexNew()] && drawNumbers[callIndexNew()] > 60 && drawNumbers[callIndexNew()] < 76 &&
                  (
                    <div className="bingo-ball-display-yellow-box">
                      <div className="bingo-ball-display-box-white-circle">
                        {/* <div className="bingo-ball-display-box-white-box">{convertToNumberLatter(drawNumbers[callIndexNew()]).latter}<div className="bingo-display-ball-number">{drawNumbers[callIndexNew()]}</div></div> */}
                        <div className="bingo-ball-display-box-white-box">{currentCallBallLatter()?.currentLatter}<div className="bingo-display-ball-number">{currentCallBallLatter()?.currentNumber}</div></div>
                      </div>
                    </div>
                  )
                  }</>}
                  <div>CURRENT CALL</div>
                </div>
                <div className="bingo-board-bottom-previous-calls">
                  <div className="d-flex-center">
                    {
                      previousCalls.map((e: { latter: string; number: number; }) => {
                        const element = e.latter == 'B'? PreviousCallBall('blue', 'B', e.number):
                          e.latter == 'I'? PreviousCallBall('red', 'I', e.number):
                          e.latter == 'N'? PreviousCallBall('white', 'N', e.number):
                          e.latter == 'G'? PreviousCallBall('green', 'G', e.number):
                          e.latter == 'O'? PreviousCallBall('yellow', 'O', e.number): PreviousCallBall('yellow', 'G', e.number)

                          return element;
                      })
                    }
                  </div>

                  <div className="bingo-board-previous-calls-bottom-text">
                  PREVIOUS {previousCalls.length} CALLS <span>SHOW HISTORY</span>
                  </div>
                </div>
            </div>
          </div>
          <Modal width={'80vw'} visible={showModal} onCancel={() => setShowModal(false)} footer title={(
          <div style={{display: 'flex', justifyContent: 'space-between', marginRight: '100px'}}> <div>{selectedCartelas.length} Cartel</div> 
            <div  style={{display: 'flex'}}>
              <div style={{width: '80px', marginRight: '50px', display: 'flex'}}>
                ዝግ &nbsp; &nbsp;
                <Select
                  value={countHowmanyChecks}
                  style={{ width: 70 }}
                  onChange={(e)=> setCountHowmanyChecks(e)}
                  options={[
                    { value: '1', label: '1' },
                    { value: '2', label: '2' },
                    { value: '3', label: '3' },
                    { value: '4', label: '4' },
                    { value: '5', label: '5' },
                    { value: '6', label: '6' },
                    { value: '7', label: '7' },
                  ]}
                />
              </div>
              <div style={{backgroundColor: 'red', padding: '5px', borderRadius: '5px'}} onClick={()=> setSelectedCartelas([])}><AiOutlineClear  color="white" size={25} /></div></div> </div>)}>
            <div className="bingo-board-cartela-nums">
              {ArrayRange(1,100,1).map((e)=>{
                if (selectedCartelas.includes(e))
                  return <div className="bingo-board-cartela-nums-item-active" onClick={()=> {
                    addCartela(e, false)
                  }}>{e}</div>
                return <div className="bingo-board-cartela-nums-item" onClick={()=> {
                  addCartela(e, true)
                }}>{e}</div>
              })}
            </div>
            <div className="bingo-board-modal-footer d-flex-space-between">
              <div style={{ display: "flex", alignItems: 'center'}}>
              <Button onClick={()=> {
                  setStake(stake > 10? stake-10:10)
              }}>-</Button>    
              <input style={{width: '100px'}} value={stake} onChange={(e) => setStake(Number(e.target.value))}/>
              <Button onClick={()=> {
                  setStake(stake+10)
              }}>+</Button>  
            </div>  
              <div className="bingo-dotted-border-btn" onClick={()=> {
                if(stake > 0 && selectedCartelas.length > 1){
                  startNewGame()
                }
              }}>START</div>
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
  )(BingoPlayBoardComponent);
  