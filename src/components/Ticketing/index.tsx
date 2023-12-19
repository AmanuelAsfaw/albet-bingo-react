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
  SubBillType,
} from "./util/Ticketing.util";
import Table, { ColumnsType } from "antd/lib/table";
import { Button, Popconfirm, Popover } from "antd";
import { ClearOutlined, CloseCircleFilled, DeleteOutlined, LoadingOutlined, MoreOutlined, PrinterOutlined } from "@ant-design/icons";
import { fetchOneProjects } from "../../redux/Project/Project.action";
import { isEmpty } from "lodash";

import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import { fetchAllRole } from "../../redux/Role/Role.action";
import TaskCard from "./components/ProjectCard";
import styled from "@emotion/styled";
import AddStatusBoardComponent from "./components/AddStatusBoard";
import AddProjectBoardComponent from "./components/AddProjectBoard";
import { fetchAllStatusBoard } from "../../redux/StatusBoard/StatusBoard/StatusBoard.action";
import { BoardProject } from "../../redux/StatusBoard/BoardProject/BoardProject.type";
import axios from "axios";
import { AddToBetSlip, TableDisplay, addToSelectedNumbers, getMaximumPayout, getMaximumPayoutForList, getMinimumPayout, getMinimumPayoutForList, removeFromSelectedNumbers } from "./util/Tecketing.UI.util";
import { useBarcode } from "next-barcode";

import "./ticketing.css"
import { Link } from "react-router-dom";

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
    const [betSlip, setBetSlip] = useState<any>(null);
    const [stake, setStake] = useState(10);
    const [ticketNumber, setTicketNumber] = useState("")
    const [gameNumber, setGameNumber] = useState("")
    const [minPayOut, setMinPayOut] = useState("")
    const [maxPayOut, setMaxPayOut] = useState("")
    const [date, setDate] = useState(Date.now().toString())
    const [casher, setCasher] = useState("")
    const [branch, setBranch] = useState("")
    const [odd, setOdd] = useState(3.5)
    const [PrinterUrl, setPrinterUrl] = useState("")
    const [subBillList, setSubBillList] = useState<SubBillType[]>([]);
    const [disableBetSlip, setDisableBetSlip] = useState<boolean>(false);
     
    const printRef = useRef<HTMLAnchorElement | null>(null);

    var print_url = "albet://type=1&game="+gameNumber+"&ticket="+ticketNumber+"&stack="+stake
    +"&minpay="+getMinimumPayout(stake, selectedNumbers.length)+"&maxpay="+getMaximumPayout(stake,selectedNumbers.length)+"&date="+date+"&casher="+casher
    +"&branch="+branch+"&odd="+odd+"?"+ selectedNumbers.join("&");

    useEffect(()=>{
        console.log(betSlip);        
        if(betSlip && betSlip.status == 200){
            setTicketNumber(betSlip?.bill?.unique_key)
            setGameNumber(betSlip?.bill?.game?.game_number)
            setCasher(betSlip?.casher?.user?.username)
            setBranch(betSlip?.casher?.branch?.title)
        }
    },[betSlip])

    useEffect(() => {
        if(ticketNumber && printRef){
            console.log('ticketNumber && printRef');
            // axios.get(GetPrintUrl())
            if(printRef.current)
                printRef.current.click()
        }
    }, [ticketNumber])
  
    async function sample_printer(event: { preventDefault: () => void; }) {
            
        event.preventDefault()
        var url_ = "albet://type=1&game="+gameNumber+"&ticket="+ticketNumber+"&stack="+stake
            +"&minpay="+getMinimumPayout(stake, selectedNumbers.length)+"&maxpay="+getMaximumPayout(stake,selectedNumbers.length)+"&date="+date+"&casher="+casher
            +"&branch="+branch+"&odd="+odd+"?"+ selectedNumbers.join("&");
        console.log(url_);
        event.preventDefault()
        
    }
    const { inputRef } = useBarcode({
        value: ticketNumber !== null && ticketNumber.length > 0 ? ticketNumber:'Al-Betting',
        options: {
            background: '#ffffff',
        }
    })

    const AddToBills = () => {
        const bills: SubBillType[] = [...subBillList]
        bills.push({
            selected_numbers: selectedNumbers,
            stake: stake
        })
        console.log(bills);
        
        setSubBillList(bills)
    }

    const getTotalStake = () => {
        let total_stake = 0;
        for (let index = 0; index < subBillList.length; index++) {
            const element = subBillList[index];
            total_stake = total_stake + element.stake
        }
        return total_stake
    }

    const GetPrintUrl = () => {
    if(subBillList.length > 0){
      console.log(subBillList);
      var str_sub_bills = ''
      for (let index = 0; index < subBillList.length; index++) {
        const element = subBillList[index];
        const length_ = element.selected_numbers.toString().split(',').length
        str_sub_bills = str_sub_bills +'?len='+length_+'&stake='+element.stake+'&'+element.selected_numbers.toString().split(',').join('&')
      }
      return "albet://type=5&game="+gameNumber+"&ticket="+ticketNumber+"&stack="+stake
      +"&minpay="+getMinimumPayoutForList(subBillList)+"&maxpay="+getMaximumPayoutForList(subBillList)+"&date="+date+"&casher="+casher
      +"&branch="+branch+"&odd="+3.5+str_sub_bills
    }
    else{
        return "albet://type=1&game="+gameNumber+"&ticket="+ticketNumber+"&stack="+stake
        +"&minpay="+getMinimumPayout(stake, selectedNumbers.length)+"&maxpay="+getMaximumPayout(stake,selectedNumbers.length)+"&date="+date+"&casher="+casher
        +"&branch="+branch+"&odd="+odd+"?"+ selectedNumbers.join("&");
    }
    }
    

  return (
    
    <section className="parent">
      <section className="child">
          <div className="wrapper" style={{ 'fontSize': 24}}>
              {numbers_list.map( (item) => {
                  if(selectedNumbers.includes(item)){
                      return(
                          <div className="selected_number animate_start" onClick={()=> {removeFromSelectedNumbers(selectedNumbers,item,setSelectedNumbers)}}>{item}</div>
                      )
                  }
                  return(
                      <div className="box animate_start" onClick={() => {addToSelectedNumbers(selectedNumbers,item, setSelectedNumbers)}}>{item}</div>
                  )
              })}
          </div>
      </section>
      <section className="table_view">
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <div className="clearbtn" onClick={()=> {
              setSelectedNumbers([])
              setTicketNumber("")
              setGameNumber("")
              setCasher("")
              setBranch("")
          }}>
              <span className="cleartxt" style={{'display': 'flex', 'justifyContent' : 'center', 'alignItems': 'center', 'fontSize': 17}}>CLEAR
                  {/* <box-icon name="trash" color="white" style={{'marginLeft':5}} size={'20px'}></box-icon> */}
                  <ClearOutlined />
              </span>
          </div>
          <div className="clearbtn" style={{width:'50px'}}onClick={()=> {
              setSelectedNumbers([])
              setSubBillList([])
              setTicketNumber("")
              setGameNumber("")
              setCasher("")
              setBranch("")
          }}>
              <span className="cleartxt" style={{'display': 'flex', 'justifyContent' : 'center', 'alignItems': 'center', 'fontSize': 17, width:'50px'}}>
                  {/* <box-icon name="trash" color="white" style={{'marginLeft':5}} size={'20px'}></box-icon> */}
                  <ClearOutlined />
              </span>
          </div>
        </div>
          <table>
              <tr aria-colspan={2}>
                  <th>HIGHEST PAYOUT 5,000 OUT of 10</th>
              </tr>
              <TableDisplay length={selectedNumbers.length}/>
              <th>HITS</th>
              <th><span className="pnts">POINTS</span></th>
          </table>
          <button className="addbetbtn" onClick={()=> {AddToBills()}}>
                <span className="cleartxt" style={{'display': 'flex', 'justifyContent' : 'center', 'fontSize': 17}}>ADD
                  {/* <box-icon name="printer" color="white" style={{'marginLeft':5}} size={'20px'}></box-icon> */}
                  <PrinterOutlined />
                </span>
          </button>   
          <button disabled={disableBetSlip} className="addbetbtn" onClick={()=> {AddToBetSlip(setDisableBetSlip, setBetSlip, selectedNumbers, subBillList, stake)}}>
                <span className="cleartxt" style={{'display': 'flex', 'justifyContent' : 'center', 'fontSize': 17}}>BET SLIP
                  {/* <box-icon name="printer" color="white" style={{'marginLeft':5}} size={'20px'}></box-icon> */}
                  {!disableBetSlip && <PrinterOutlined />}
                  {disableBetSlip && <LoadingOutlined />}
                </span>
          </button>   
          <div style={{ display: "flex"}}>
            <Button onClick={()=> {
                setStake(stake > 0? stake-10:0)
            }}>-</Button>    
            <input style={{width: '100px'}} value={stake} onChange={(e) => setStake(Number(e.target.value))}/>
            <Button onClick={()=> {
                setStake(stake+10)
            }}>+</Button>  
          </div>  
          <div>
            <Button onClick={()=> {
                setStake(10)
            }}>10</Button>    
            <Button onClick={()=> {
                setStake(20)
            }}>20</Button>    
            <Button onClick={()=> {
                setStake(30)
            }}>30</Button>    
            <Button onClick={()=> {
                setStake(40)
            }}>40</Button>    
            <Button onClick={()=> {
                setStake(50)
            }}>50</Button>     
          </div>
      </section>
      <section className="slip_view">
          <div className="card">
              <div className="printcard">
              <p id="date"></p>
              <p className="branch">{branch}</p>
              <p className="cashier_name">{casher}</p>
              <p className="gamenumber">GAME NUMBER : <span className="spacetxt"> {gameNumber}</span></p>
              <p className="ticket_number">TICKET NUMBER :{ticketNumber}</p>
              <p className="ticket_number">SELECTED NUMBERS</p>
              <p className="numbers">{subBillList.length == 0 &&selectedNumbers.map((item) => item + ' ') + '      Stake '+stake}</p>
              {subBillList.length && subBillList.map((item_, index) => {
                return <div style={{
                    border: "1px solid",
                    borderRadius: '5px',
                    borderColor: 'black',
                    marginTop: '2px',
                    display:'flex',
                    justifyContent: 'space-between',
                    paddingLeft: '10px',
                    paddingRight: '5px',
                    paddingTop: '3px'
                    }}>
                    <p className="numbers" style={{ display: 'flex', justifyContent: 'space-between', minWidth: '90%', marginRight: '5px', color: 'black'}}>
                        <div>{item_.selected_numbers.map((item) => item + ' ')}</div>
                        <div style={{ display: "flex"}}>
                            <Button style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                maxHeight: '30px',
                                width: '20px'
                            }} onClick={()=> {
                                // setStake(stake > 0? stake-1:0)
                                const subBillList_copy = subBillList.map((element, ind)=> {
                                    if(ind == index){
                                        return {
                                            selected_numbers :element.selected_numbers,
                                            stake: item_.stake > 0? item_.stake-10:0
                                        }
                                    }
                                    return element
                                })
                                console.log(subBillList_copy);
                                
                                setSubBillList(subBillList_copy)
                            }}>-</Button>    
                            <input style={{width: '40px', maxHeight: '30px'}} value={item_.stake} 
                            onChange={(e) => {
                                setStake(Number(e.target.value))
                                const subBillList_copy = subBillList.map((element, ind)=> {
                                    if(ind == index){
                                        return {
                                            selected_numbers :element.selected_numbers,
                                            stake: Number(e.target.value)
                                        }
                                    }
                                    return element
                                })
                                console.log(subBillList_copy);
                                
                                setSubBillList(subBillList_copy)
                                }}/>
                            <Button style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                maxHeight: '30px',
                                width: '20px'
                            }} onClick={()=> {
                                const subBillList_copy = subBillList.map((element, ind)=> {
                                    if(ind == index){
                                        return {
                                            selected_numbers :element.selected_numbers,
                                            stake: item_.stake +10
                                        }
                                    }
                                    return element
                                })
                                console.log(subBillList_copy);
                                
                                setSubBillList(subBillList_copy)
                            }}>+</Button>  
                        </div>
                    </p>
                    <div><CloseCircleFilled onClick={() => {
                        const subBillList_copy = [...subBillList]
                        console.log(subBillList_copy.splice(index,1));
                        console.log(subBillList_copy);
                        setSubBillList(subBillList_copy);
                        
                    }} style={{color: 'red'}}/></div>
                </div>
                return 
              }) }
              <p className="price"><span className="pricedescrp">STAKE</span> {subBillList.length == 0 ?stake : getTotalStake()} ETB</p>
              <p className="price"><span className="pricedescrp">MIN PAYOUT</span>  {subBillList.length == 0 ?getMinimumPayout(stake,selectedNumbers.length):getMinimumPayoutForList(subBillList)} ETB</p>
              <p className="price"><span className="pricedescrp">MAX PAYOUT</span>  {subBillList.length == 0 ?getMaximumPayout(stake,selectedNumbers.length):getMaximumPayoutForList(subBillList)} ETB</p>
              <svg ref={inputRef} className="barcode"/>
              </div>         
              { ticketNumber && (<p>
                <div style={{'backgroundColor':'green'}}>
                    <Link ref={printRef} to={GetPrintUrl()} style={{'backgroundColor':'green', 'color': 'white'}} target="_blank">
                        <div style={{'display': 'flex', 'justifyContent' : 'center', 'alignItems': 'center'}}>
                            PRINT  &nbsp;
                            {/* <box-icon name="printer" color="white" style={{'marginLeft':10}}></box-icon> */}
                            <PrinterOutlined />
                        </div>
                    </Link>
                </div>
              </p>)}  
          </div>

      </section>
  </section>
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
