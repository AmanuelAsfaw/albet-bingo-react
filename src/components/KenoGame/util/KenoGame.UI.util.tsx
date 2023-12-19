import { FC, Fragment } from "react"
import { LoadingScreenPropType, max_selectedNumbers, numberWithOdd } from "./KenoGame.util"
import axios from "axios"
import { RightOutlined } from "@ant-design/icons"
import { useNavigate } from "react-router-dom";
import { MainUrl } from "../../../constants/Url";

export function TableDisplay({length}: {['length']: number}){
    if(length === 1){
        return (
            <tr>
                <td>{length}</td>
                <td>{numberWithOdd[length]}</td>
            </tr>
        )
    }
    else if(length === 2){
        return (
            <tr>
                <td>{length}</td>
                <td>{numberWithOdd[length]}</td>
            </tr>
        )
    }
    else if(length === 3){
        return (
            <Fragment>
                <tr>
                    <td>2</td>
                    <td>{numberWithOdd[2]}</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>{numberWithOdd[3]}</td>
                </tr>
            </Fragment>
        )
    }
    else if(length === 4){
        return (
            <Fragment>
                <tr>
                    <td>2</td>
                    <td>{numberWithOdd[2]}</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>{numberWithOdd[3]}</td>
                </tr>
                <tr>
                    <td>4</td>
                    <td>{numberWithOdd[4]}</td>
                </tr>
            </Fragment>
        )
    }
    else if(length === 5){
        return (
            <Fragment>
                <tr>
                    <td>2</td>
                    <td>{numberWithOdd[2]}</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>{numberWithOdd[3]}</td>
                </tr>
                <tr>
                    <td>4</td>
                    <td>{numberWithOdd[4]}</td>
                </tr>
                <tr>
                    <td>5</td>
                    <td>{numberWithOdd[5]}</td>
                </tr>
            </Fragment>
        )
    }
    else if(length === 6){
        return (
            <Fragment>
                <tr>
                    <td>3</td>
                    <td>{numberWithOdd[3]}</td>
                </tr>
                <tr>
                    <td>4</td>
                    <td>{numberWithOdd[4]}</td>
                </tr>
                <tr>
                    <td>5</td>
                    <td>{numberWithOdd[5]}</td>
                </tr>
                <tr>
                    <td>6</td>
                    <td>{numberWithOdd[6]}</td>
                </tr>
            </Fragment>
        )
    }
    else if(length === 7){
        return (
            <Fragment>
                <tr>
                    <td>3</td>
                    <td>{numberWithOdd[3]}</td>
                </tr>
                <tr>
                    <td>4</td>
                    <td>{numberWithOdd[4]}</td>
                </tr>
                <tr>
                    <td>5</td>
                    <td>{numberWithOdd[5]}</td>
                </tr>
                <tr>
                    <td>6</td>
                    <td>{numberWithOdd[6]}</td>
                </tr>
                <tr>
                    <td>7</td>
                    <td>{numberWithOdd[7]}</td>
                </tr>
            </Fragment>
        )
    }
    else if(length === 8){
        return (
            <Fragment>
                <tr>
                    <td>4</td>
                    <td>{numberWithOdd[4]}</td>
                </tr>
                <tr>
                    <td>5</td>
                    <td>{numberWithOdd[5]}</td>
                </tr>
                <tr>
                    <td>6</td>
                    <td>{numberWithOdd[6]}</td>
                </tr>
                <tr>
                    <td>7</td>
                    <td>{numberWithOdd[7]}</td>
                </tr>
                <tr>
                    <td>8</td>
                    <td>{numberWithOdd[8]}</td>
                </tr>
            </Fragment>
        )
    }
    else if(length === 9){
        return (
            <Fragment>
                <tr>
                    <td>4</td>
                    <td>{numberWithOdd[4]}</td>
                </tr>
                <tr>
                    <td>5</td>
                    <td>{numberWithOdd[5]}</td>
                </tr>
                <tr>
                    <td>6</td>
                    <td>{numberWithOdd[6]}</td>
                </tr>
                <tr>
                    <td>7</td>
                    <td>{numberWithOdd[7]}</td>
                </tr>
                <tr>
                    <td>8</td>
                    <td>{numberWithOdd[8]}</td>
                </tr>
                <tr>
                    <td>9</td>
                    <td>{numberWithOdd[9]}</td>
                </tr>
            </Fragment>
        )
    }
    else if(length === 10){
        return (
            <Fragment>
                <tr>
                    <td>5</td>
                    <td>{numberWithOdd[5]}</td>
                </tr>
                <tr>
                    <td>6</td>
                    <td>{numberWithOdd[6]}</td>
                </tr>
                <tr>
                    <td>7</td>
                    <td>{numberWithOdd[7]}</td>
                </tr>
                <tr>
                    <td>8</td>
                    <td>{numberWithOdd[8]}</td>
                </tr>
                <tr>
                    <td>9</td>
                    <td>{numberWithOdd[9]}</td>
                </tr>
                <tr>
                    <td>10</td>
                    <td>{numberWithOdd[10]}</td>
                </tr>
            </Fragment>
        )
    }
    else{
        return (
            <Fragment>
                <tr>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                </tr>
                <tr>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                </tr>
            </Fragment>
        )
    }
}

export const LoadingScreen: FC<LoadingScreenPropType> = () => {
    
    const navigate = useNavigate();

    return(
    <div className="loading_screen_body">
        <div className="logo">
            AL-Betting <RightOutlined onClick={() => {navigate('/keno-bills')}}/>
        </div>
        <div className="loadingwrapper">
            <div className="playtext">Let's play</div>
            <span style={{}} className="upperspan i1">
                <span className="loadingbubble"></span>
            </span>
            <span style={{}} className="upperspan i2">
                <span className="loadingbubble"></span>
            </span>
            <span style={{}} className="upperspan i3">
                <span className="loadingbubble"></span>
            </span>
            <span style={{}} className="upperspan i4">
                <span className="loadingbubble"></span>
            </span>
            <span style={{}} className="upperspan i5">
                <span className="loadingbubble"></span>
            </span>
            <span style={{}} className="upperspan i6">
                <span className="loadingbubble"></span>
            </span>
            <span style={{}} className="upperspan i7">
                <span className="loadingbubble"></span>
            </span>
            <span style={{}} className="upperspan i8">
                <span className="loadingbubble"></span>
            </span>
            <span style={{}} className="upperspan i9">
                <span className="loadingbubble"></span>
            </span>
            <span style={{}} className="upperspan i10">
                <span className="loadingbubble"></span>
            </span>
        </div>
    </div>
    )
}

export function getMaximumPayout( stake: number,length: number){
    if(length > 0){
        // setMaxPayOut(stake * numberWithOdd[length])
        const max_odd = numberWithOdd[length]
        return stake * max_odd
    }
    return 0
}

export function getMinimumPayout( stake: number,length: number){
    if(length === 1 || length === 2){
        // setMinPayOut(stake * numberWithOdd[length])
        return stake * numberWithOdd[length]
    }
    else if(length === 3 || length === 4 || length === 4){
        // setMinPayOut(stake * numberWithOdd[2])
        return stake * numberWithOdd[2]
    }
    else if(length === 6){
        // setMinPayOut(stake * numberWithOdd[3])
        return stake * numberWithOdd[3]
    }
    return 0
}


export function AddToBetSlip( setBetSlip: Function, selectedNumbers: number[]){
    setBetSlip(null)
    if(selectedNumbers.length > 0){            
        axios.post(MainUrl+'/casher/add_bill',
            {
                "game_id": 200,
                "selected_numbers" : selectedNumbers
            }
        )
        .then((response) => {
            setBetSlip(response.data)
        })
        .catch(error => {
            console.log('AddToBetSlip error catch');
            console.error(error);
        })
    }
}


export function addToSelectedNumbers( selectedNumbers: number[], item:number, setSelectedNumbers: Function){
    if(!selectedNumbers.includes(item) && selectedNumbers.length < max_selectedNumbers){
        let newArray = selectedNumbers.slice()
        newArray.push(item)
        setSelectedNumbers(newArray)
    }
}


export function removeFromSelectedNumbers( selectedNumbers: number[], item:number, setSelectedNumbers: Function){
    if(selectedNumbers.includes(item)){
        let newArray = selectedNumbers.slice()
        const index = newArray.indexOf(item)
        if(index > -1){
            newArray.splice(index, 1)
            setSelectedNumbers(newArray)
        }
    }
}

export type PickPropType = {
    nextGameTime: number;
    nextGame : any;
  };
  
export const Pick3Display: FC<PickPropType> = ({nextGameTime, nextGame}) => {
    
    return(
        <div className="right-window-next">
                <div className="next-head-next">
                    <div className="next-head-next-game">DRAW &nbsp;<div className="next-head-next-game-number">{nextGame !== null ? nextGame.game_number: null}</div></div>
                </div>
                <div className="next-head-time">
                    <div className="next-head-time">0{Math.floor(nextGameTime != null ?nextGameTime/60:0)}:{ Math.floor(nextGameTime? nextGameTime%60: 0).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}</div>
                </div>
                <div className="next-pick">
                    <div className="next-pick">Pick 3</div>
                </div>
                <div className="next-hits-win">
                    <div className="next-hits">
                        <div className="next-hits-title">HITS</div>
                        <div>
                            <div className="next-hits-num">3</div>
                            <div className="next-hits-num">2</div>
                        </div>
                    </div>
                    <div className="next-hits">
                        <div className="next-hits-title">WIN</div>
                        <div>
                            <div className="next-hits-num">35</div>
                            <div className="next-hits-num">3</div>
                        </div>
                    </div>
                </div>
            </div>
    )
}
  
export const Pick2Display: FC<PickPropType> = ({nextGameTime, nextGame}) => {
    
    return(
        <div className="right-window-next">
                <div className="next-head-next">
                    <div className="next-head-next-game">DRAW &nbsp;<div className="next-head-next-game-number">{nextGame !== null ? nextGame.game_number: null}</div></div>
                </div>
                <div className="next-head-time">
                    <div className="next-head-time">0{Math.floor(nextGameTime != null ?nextGameTime/60:0)}:{ Math.floor(nextGameTime? nextGameTime%60: 0).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}</div>
                </div>
                <div className="next-pick">
                    <div className="next-pick">Pick 2</div>
                </div>
                <div className="next-hits-win">
                    <div className="next-hits">
                        <div className="next-hits-title">HITS</div>
                        <div>
                            <div className="next-hits-num">2</div>
                        </div>
                    </div>
                    <div className="next-hits">
                        <div className="next-hits-title">WIN</div>
                        <div>
                            <div className="next-hits-num">15</div>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export const Pick1Display: FC<PickPropType> = ({nextGameTime, nextGame}) => {
    
    return(
        <div className="right-window-next">
                <div className="next-head-next">
                    <div className="next-head-next-game">DRAW &nbsp;<div className="next-head-next-game-number">{nextGame !== null ? nextGame.game_number: null}</div></div>
                </div>
                <div className="next-head-time">
                    <div className="next-head-time">0{Math.floor(nextGameTime != null ?nextGameTime/60:0)}:{ Math.floor(nextGameTime? nextGameTime%60: 0).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}</div>
                </div>
                <div className="next-pick">
                    <div className="next-pick">Pick 1</div>
                </div>
                <div className="next-hits-win">
                    <div className="next-hits">
                        <div className="next-hits-title">HITS</div>
                        <div>
                            <div className="next-hits-num">1</div>
                        </div>
                    </div>
                    <div className="next-hits">
                        <div className="next-hits-title">WIN</div>
                        <div>
                            <div className="next-hits-num">3.80</div>
                        </div>
                    </div>
                </div>
            </div>
    )
} 

export const Pick4Display: FC<PickPropType> = ({nextGameTime, nextGame}) => {
    
    return(
        <div className="right-window-next">
                <div className="next-head-next">
                    <div className="next-head-next-game">DRAW &nbsp;<div className="next-head-next-game-number">{nextGame !== null ? nextGame.game_number: null}</div></div>
                </div>
                <div className="next-head-time">
                    <div className="next-head-time">0{Math.floor(nextGameTime != null ?nextGameTime/60:0)}:{ Math.floor(nextGameTime? nextGameTime%60: 0).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}</div>
                </div>
                <div className="next-pick">
                    <div className="next-pick">Pick 4</div>
                </div>
                <div className="next-hits-win">
                    <div className="next-hits">
                        <div className="next-hits-title">HITS</div>
                        <div>
                            <div className="next-hits-num">4</div>
                            <div className="next-hits-num">3</div>
                            <div className="next-hits-num">2</div>
                        </div>
                    </div>
                    <div className="next-hits">
                        <div className="next-hits-title">WIN</div>
                        <div>
                            <div className="next-hits-num">100</div>
                            <div className="next-hits-num">8</div>
                            <div className="next-hits-num">1</div>
                        </div>
                    </div>
                </div>
            </div>
    )
}
  
export const Pick5Display: FC<PickPropType> = ({nextGameTime, nextGame}) => {
    
    return(
        <div className="right-window-next">
                <div className="next-head-next">
                    <div className="next-head-next-game">DRAW &nbsp;<div className="next-head-next-game-number">{nextGame !== null ? nextGame.game_number: null}</div></div>
                </div>
                <div className="next-head-time">
                    <div className="next-head-time">0{Math.floor(nextGameTime != null ?nextGameTime/60:0)}:{ Math.floor(nextGameTime? nextGameTime%60: 0).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}</div>
                </div>
                <div className="next-pick">
                    <div className="next-pick">Pick 5</div>
                </div>
                <div className="next-hits-win">
                    <div className="next-hits">
                        <div className="next-hits-title">HITS</div>
                        <div>
                            <div className="next-hits-num">5</div>
                            <div className="next-hits-num">4</div>
                            <div className="next-hits-num">3</div>
                            <div className="next-hits-num">2</div>
                        </div>
                    </div>
                    <div className="next-hits">
                        <div className="next-hits-title">WIN</div>
                        <div>
                            <div className="next-hits-num">300</div>
                            <div className="next-hits-num">15</div>
                            <div className="next-hits-num">3</div>
                            <div className="next-hits-num">1</div>
                        </div>
                    </div>
                </div>
            </div>
    )
}
    
export const Pick6Display: FC<PickPropType> = ({nextGameTime, nextGame}) => {
    
    return(
        <div className="right-window-next">
                <div className="next-head-next">
                    <div className="next-head-next-game">DRAW &nbsp;<div className="next-head-next-game-number">{nextGame !== null ? nextGame.game_number: null}</div></div>
                </div>
                <div className="next-head-time">
                    <div className="next-head-time">0{Math.floor(nextGameTime != null ?nextGameTime/60:0)}:{ Math.floor(nextGameTime? nextGameTime%60: 0).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}</div>
                </div>
                <div className="next-pick">
                    <div className="next-pick">Pick 6</div>
                </div>
                <div className="next-hits-win">
                    <div className="next-hits">
                        <div className="next-hits-title">HITS</div>
                        <div>
                            <div className="next-hits-num">6</div>
                            <div className="next-hits-num">5</div>
                            <div className="next-hits-num">4</div>
                            <div className="next-hits-num">3</div>
                        </div>
                    </div>
                    <div className="next-hits">
                        <div className="next-hits-title">WIN</div>
                        <div>
                            <div className="next-hits-num">1,800</div>
                            <div className="next-hits-num">70</div>
                            <div className="next-hits-num">10</div>
                            <div className="next-hits-num">1</div>
                        </div>
                    </div>
                </div>
            </div>
    )
}
    
export const Pick7Display: FC<PickPropType> = ({nextGameTime, nextGame}) => {
    
    return(
        <div className="right-window-next">
                <div className="next-head-next">
                    <div className="next-head-next-game">DRAW &nbsp;<div className="next-head-next-game-number">{nextGame !== null ? nextGame.game_number: null}</div></div>
                </div>
                <div className="next-head-time">
                    <div className="next-head-time">0{Math.floor(nextGameTime != null ?nextGameTime/60:0)}:{ Math.floor(nextGameTime? nextGameTime%60: 0).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}</div>
                </div>
                <div className="next-pick">
                    <div className="next-pick">Pick 7</div>
                </div>
                <div className="next-hits-win">
                    <div className="next-hits">
                        <div className="next-hits-title">HITS</div>
                        <div>
                            <div className="next-hits-num">7</div>
                            <div className="next-hits-num">6</div>
                            <div className="next-hits-num">5</div>
                            <div className="next-hits-num">4</div>
                            <div className="next-hits-num">3</div>
                        </div>
                    </div>
                    <div className="next-hits">
                        <div className="next-hits-title">WIN</div>
                        <div>
                            <div className="next-hits-num">2150</div>
                            <div className="next-hits-num">120</div>
                            <div className="next-hits-num">12</div>
                            <div className="next-hits-num">6</div>
                            <div className="next-hits-num">1</div>
                        </div>
                    </div>
                </div>
            </div>
    )
}
    
export const Pick8Display: FC<PickPropType> = ({nextGameTime, nextGame}) => {
    
    return(
        <div className="right-window-next">
                <div className="next-head-next">
                    <div className="next-head-next-game">DRAW &nbsp;<div className="next-head-next-game-number">{nextGame !== null ? nextGame.game_number: null}</div></div>
                </div>
                <div className="next-head-time">
                    <div className="next-head-time">0{Math.floor(nextGameTime != null ?nextGameTime/60:0)}:{ Math.floor(nextGameTime? nextGameTime%60: 0).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}</div>
                </div>
                <div className="next-pick">
                    <div className="next-pick">Pick 8</div>
                </div>
                <div className="next-hits-win">
                    <div className="next-hits">
                        <div className="next-hits-title">HITS</div>
                        <div>
                            <div className="next-hits-num">8</div>
                            <div className="next-hits-num">7</div>
                            <div className="next-hits-num">6</div>
                            <div className="next-hits-num">5</div>
                            <div className="next-hits-num">4</div>
                        </div>
                    </div>
                    <div className="next-hits">
                        <div className="next-hits-title">WIN</div>
                        <div>
                            <div className="next-hits-num">3000</div>
                            <div className="next-hits-num">600</div>
                            <div className="next-hits-num">68</div>
                            <div className="next-hits-num">8</div>
                            <div className="next-hits-num">4</div>
                        </div>
                    </div>
                </div>
            </div>
    )
}
     
export const Pick9Display: FC<PickPropType> = ({nextGameTime, nextGame}) => {
    
    return(
        <div className="right-window-next">
                <div className="next-head-next">
                    <div className="next-head-next-game">DRAW &nbsp;<div className="next-head-next-game-number">{nextGame !== null ? nextGame.game_number: null}</div></div>
                </div>
                <div className="next-head-time">
                    <div className="next-head-time">0{Math.floor(nextGameTime != null ?nextGameTime/60:0)}:{ Math.floor(nextGameTime? nextGameTime%60: 0).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}</div>
                </div>
                <div className="next-pick">
                    <div className="next-pick">Pick 9</div>
                </div>
                <div className="next-hits-win">
                    <div className="next-hits">
                        <div className="next-hits-title">HITS</div>
                        <div>
                            <div className="next-hits-num">9</div>
                            <div className="next-hits-num">8</div>
                            <div className="next-hits-num">7</div>
                            <div className="next-hits-num">6</div>
                            <div className="next-hits-num">5</div>
                            <div className="next-hits-num">4</div>
                        </div>
                    </div>
                    <div className="next-hits">
                        <div className="next-hits-title">WIN</div>
                        <div>
                            <div className="next-hits-num">4200</div>
                            <div className="next-hits-num">1800</div>
                            <div className="next-hits-num">120</div>
                            <div className="next-hits-num">18</div>
                            <div className="next-hits-num">6</div>
                            <div className="next-hits-num">3</div>
                        </div>
                    </div>
                </div>
            </div>
    )
}
      
export const Pick10Display: FC<PickPropType> = ({nextGameTime, nextGame}) => {
    
    return(
        <div className="right-window-next">
                <div className="next-head-next">
                    <div className="next-head-next-game">DRAW &nbsp;<div className="next-head-next-game-number">{nextGame !== null ? nextGame.game_number: null}</div></div>
                </div>
                <div className="next-head-time">
                    <div className="next-head-time">0{Math.floor(nextGameTime != null ?nextGameTime/60:0)}:{ Math.floor(nextGameTime? nextGameTime%60: 0).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}</div>
                </div>
                <div className="next-pick">
                    <div className="next-pick">Pick 10</div>
                </div>
                <div className="next-hits-win">
                    <div className="next-hits">
                        <div className="next-hits-title">HITS</div>
                        <div>
                            <div className="next-hits-num">10</div>
                            <div className="next-hits-num">9</div>
                            <div className="next-hits-num">8</div>
                            <div className="next-hits-num">7</div>
                            <div className="next-hits-num">6</div>
                            <div className="next-hits-num">5</div>
                            <div className="next-hits-num">4</div>
                        </div>
                    </div>
                    <div className="next-hits">
                        <div className="next-hits-title">WIN</div>
                        <div>
                            <div className="next-hits-num">5000</div>
                            <div className="next-hits-num">2500</div>
                            <div className="next-hits-num">400</div>
                            <div className="next-hits-num">40</div>
                            <div className="next-hits-num">12</div>
                            <div className="next-hits-num">4</div>
                            <div className="next-hits-num">2</div>
                        </div>
                    </div>
                </div>
            </div>
    )
}
       
export const x1Display: FC<PickPropType> = ({nextGameTime, nextGame}) => {
    
    return(
        <div className="right-window-next">
                <div className="next-head-next">
                    <div className="next-head-next-game">DRAW &nbsp;<div className="next-head-next-game-number">{nextGame !== null ? nextGame.game_number: null}</div></div>
                </div>
                <div className="next-head-time">
                    <div className="next-head-time">0{Math.floor(nextGameTime != null ?nextGameTime/60:0)}:{ Math.floor(nextGameTime? nextGameTime%60: 0).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}</div>
                </div>
                <div className="next-pick">
                    <div className="next-pick-white">Pick <div className="next-pick">&nbsp;1&nbsp;</div> to <div className="next-pick">&nbsp;10</div></div>
                    <div className="next-pick-white">NUMBERS</div>
                    <div className="next-pick-white">FROM <div className="redText">&nbsp;80</div></div>
                </div>
            </div>
    )
}
         
export const x2Display: FC<PickPropType> = ({nextGameTime, nextGame}) => {
    
    return(
        <div className="right-window-next">
                <div className="next-head-next">
                    <div className="next-head-next-game">DRAW &nbsp;<div className="next-head-next-game-number">{nextGame !== null ? nextGame.game_number: null}</div></div>
                </div>
                <div className="next-head-time">
                    <div className="next-head-time">0{Math.floor(nextGameTime != null ?nextGameTime/60:0)}:{ Math.floor(nextGameTime? nextGameTime%60: 0).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}</div>
                </div>
                <div className="next-pick">
                    <div className="next-pick-white"><div className="next-pick">&nbsp;20&nbsp;</div> Balls</div>
                    <div className="next-pick-white">Drawn</div>
                    <div className="next-pick-white">FROM <div className="redText">&nbsp;80</div></div>
                </div>
            </div>
    )
}
          
export const x3Display: FC<PickPropType> = ({nextGameTime, nextGame}) => {
    
    return(
        <div className="right-window-next">
                <div className="next-head-next">
                    <div className="next-head-next-game">DRAW &nbsp;<div className="next-head-next-game-number">{nextGame !== null ? nextGame.game_number: null}</div></div>
                </div>
                <div className="next-head-time">
                    <div className="next-head-time">0{Math.floor(nextGameTime != null ?nextGameTime/60:0)}:{ Math.floor(nextGameTime? nextGameTime%60: 0).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}</div>
                </div>
                <div className="next-pick">
                    <div className="next-pick-white" style={{fontSize: '3vw', fontFamily: 'sans-serif'}}>play</div>
                    <div className="next-pick-white" style={{fontSize: '3vw', fontFamily: 'sans-serif'}}>The<div className="next-pick" style={{fontSize: '3vw'}}>&nbsp;Pick 10 &nbsp;</div> Game</div>
                    <div className="next-pick-white" style={{fontSize: '3vw'}}>Get<div className="next-pick" style={{fontSize: '3vw'}}>&nbsp; 10 &nbsp;</div> Numbers</div>
                    <div className="next-pick-white">correct, and</div>
                    <div className="next-pick-white">win the</div>
                    <div className="next-pick-white"><div className="redText">Pick&nbsp;10&nbsp;</div> JACKPOT</div>
                </div>
            </div>
    )
}
           
export const x4Display: FC<PickPropType> = ({nextGameTime, nextGame}) => {
    
    return(
        <div className="right-window-next">
                <div className="next-head-next">
                    <div className="next-head-next-game">DRAW &nbsp;<div className="next-head-next-game-number">{nextGame !== null ? nextGame.game_number: null}</div></div>
                </div>
                <div className="next-head-time">
                    <div className="next-head-time">0{Math.floor(nextGameTime != null ?nextGameTime/60:0)}:{ Math.floor(nextGameTime? nextGameTime%60: 0).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}</div>
                </div>
                <div className="next-pick">
                    <div className="next-pick-white" style={{fontSize: '3vw', fontFamily: 'sans-serif'}}><div className="next-pick">&nbsp;Pick 3 &nbsp;</div></div>
                    <div className="next-pick-white" style={{fontSize: '3vw', fontFamily: 'sans-serif'}}>TO</div>
                    <div className="next-pick-white" style={{fontSize: '3vw', fontFamily: 'sans-serif'}}><div className="next-pick">&nbsp;Pick 10 &nbsp;</div></div>
                    <div className="next-pick-white" style={{fontSize: '3vw', fontFamily: 'sans-serif'}}>games have</div>
                    <div className="next-pick-white" style={{fontSize: '3vw', fontFamily: 'sans-serif'}}><div className="next-pick" style={{color: 'yellow'}}>&nbsp;Multiple &nbsp;</div></div>
                    <div className="next-pick-white" style={{fontSize: '3vw', fontFamily: 'sans-serif'}}><div className="next-pick" style={{color: 'yellow'}}>&nbsp;Play Levels &nbsp;</div></div>
                    <div className="next-pick-white">on other spots</div>
                </div>
            </div>
    )
}
            
export const closeDisplay: FC<PickPropType> = ({nextGameTime, nextGame}) => {
    
    return(
        <div className="right-window-next">
                <div className="next-head-next">
                    <div className="next-head-next-game">DRAW &nbsp;<div className="next-head-next-game-number">{nextGame !== null ? nextGame.game_number: null}</div></div>
                </div>
                <div className="next-head-time">
                    <div className="next-head-time" style={{fontSize: '5vw', fontFamily: 'Rohn Medium'}}>BETS CLOSED</div>
                </div>
                
                <div className="next-pick">
                    <div className="next-pick">Pick 4</div>
                </div>
                <div className="next-hits-win">
                    <div className="next-hits">
                        <div className="next-hits-title">HITS</div>
                        <div>
                            <div className="next-hits-num">4</div>
                            <div className="next-hits-num">3</div>
                            <div className="next-hits-num">2</div>
                        </div>
                    </div>
                    <div className="next-hits">
                        <div className="next-hits-title">WIN</div>
                        <div>
                            <div className="next-hits-num">100</div>
                            <div className="next-hits-num">8</div>
                            <div className="next-hits-num">1</div>
                        </div>
                    </div>
                </div>
            </div>
    )
}
       
  
