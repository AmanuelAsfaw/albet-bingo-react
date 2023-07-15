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
} from "./util/Ticketing.util";
import Table, { ColumnsType } from "antd/lib/table";
import { Button, Popconfirm, Popover } from "antd";
import { ClearOutlined, DeleteOutlined, MoreOutlined, PrinterOutlined } from "@ant-design/icons";
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
import { AddToBetSlip, TableDisplay, addToSelectedNumbers, getMaximumPayout, getMinimumPayout, removeFromSelectedNumbers } from "./util/Tecketing.UI.util";
import { useBarcode } from "next-barcode";

import "./ticketing.css"

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

  
  async function sample_printer(event: { preventDefault: () => void; }) {
        
    event.preventDefault()
    var url_ = "albetprt:game="+gameNumber+"&ticket="+ticketNumber+"&stack="+stake
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
          <div className="clearbtn" onClick={()=> {
              setSelectedNumbers([])
          }}>
              <span className="cleartxt" style={{'display': 'flex', 'justifyContent' : 'center', 'alignItems': 'center', 'fontSize': 17}}>CLEAR
                  {/* <box-icon name="trash" color="white" style={{'marginLeft':5}} size={'20px'}></box-icon> */}
                  <ClearOutlined />
              </span>
          </div>
          <table>
              <tr aria-colspan={2}>
                  <th>HIGHEST PAYOUT 5,000 OUT of 10</th>
              </tr>
              <TableDisplay length={selectedNumbers.length}/>
              <th>HITS</th>
              <th><span className="pnts">POINTS</span></th>
          </table>
          <div className="addbetbtn" onClick={()=> {AddToBetSlip(setBetSlip, selectedNumbers)}}>
              <span className="cleartxt" style={{'display': 'flex', 'justifyContent' : 'center', 'fontSize': 17}}>ADD TO BET SLIP
                  {/* <box-icon name="printer" color="white" style={{'marginLeft':5}} size={'20px'}></box-icon> */}
                  <PrinterOutlined />
              </span>
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
              <p className="numbers">{
                  selectedNumbers.map((item) => item + ' ') + '   X'+odd
              }</p>
              <p className="price"><span className="pricedescrp">STAKE</span> {stake} ETB</p>
              <p className="price"><span className="pricedescrp">MIN PAYOUT</span>  {getMinimumPayout(stake,selectedNumbers.length)} ETB</p>
              <p className="price"><span className="pricedescrp">MAX PAYOUT</span>  {getMaximumPayout(stake,selectedNumbers.length)} ETB</p>
              <svg ref={inputRef} className="barcode"/>
              </div>
              <label htmlFor="currency-field">Enter Amount</label>
              <input type="number" name="currency-field" id="currency-field" pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$"
                  value={stake} data-type="currency" placeholder="$10" onChange={(e) => {setStake(Number(e.target.value))}}/>
              <p><button style={{'display': 'flex', 'justifyContent' : 'center'}} onClick={(event) => {
                  //thermalPrinter()
                  sample_printer(event)
                  }}>
                  PRINT
                  {/* <box-icon name="printer" color="white" style={{'marginLeft':10}}></box-icon> */}
                  <PrinterOutlined />
              </button></p>
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
