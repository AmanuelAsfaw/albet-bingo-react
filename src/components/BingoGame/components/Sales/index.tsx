import {
    FC,
    useEffect,
    useState,
  } from "react";
  import { connect } from "react-redux";

import { SalesPropType } from "../../util/BingoGames.util";
import './sales.css';
import { DatePicker, Form, Table } from "antd";
import moment from "moment";
import { FaSearch } from "react-icons/fa";
import { MdClear } from "react-icons/md";
import { MainUrl } from "../../../../constants/Url";
import axios from "axios";
const isAdmin = localStorage.getItem('isAdmin')

const SalesComponent: FC<SalesPropType> = ({
    showNavBar
  }) => {
    const [previousCalls, setPreviousCalls] = useState([
      {latter: 'B', number: 10},{latter: 'I', number: 20},{latter: 'N', number: 40},{latter: 'G', number: 50},{latter: 'O', number: 70},
    ])
    const [startDate,setStartDate] = useState((moment().month()+1)+'-'+moment().date()+'-'+moment().year())
    const [endDate,setEndDate] = useState((moment().month()+1)+'-'+moment().date()+'-'+moment().year())
    
    const [sales_bills,setSalesBills] = useState([])
    const [isLoading,setIsLoading] = useState(false)
    const [cashier,setCashier] = useState<any>(null)
    const [summary,setSummary] = useState<any>(null)
    
    const SetDatePickerValue = (date_:string) => {
        const date_split = date_.split('-')
        return date_split[2]+'-'+date_split[0]+'-'+date_split[1]
    }
    
    const getSales = () => {
      axios.post(MainUrl+'/bingo/get_games_by_dates', {
        start_date : startDate,
        end_date : endDate,
        is_admin: isAdmin? isAdmin: false,
      })
        .then((response) => {
            console.log(response.data)
            if(response.data && response.data.status === 200){
              setSalesBills(response.data.sales)
              setCashier(response.data.casher)
              setSummary(response.data.summary)
            }
        })      
    }
    
    return (
        <div className="bingo-sales-main-page" style={showNavBar? {width: '85vw'}:{ width: '100vw'}}>
            <div className="bingo-sales-title">Sales</div>
            
            <div className="d-flex">
                <div className="bingo-sales-date-picker">
                    <div>Start Date</div>
                    <DatePicker value={moment(startDate)} onChange={(e) => {
                        if (e)
                            setStartDate((e.month()+1)+'-'+e.date()+'-'+e.year())
                    }} />
                </div>
                <div className="bingo-sales-date-picker">
                    <div>End Date</div>
                    <DatePicker value={moment(endDate)} onChange={(e) => {
                        if (e)
                            setEndDate((e.month()+1)+'-'+e.date()+'-'+e.year())
                    }} />
                </div>
                <div className="bingo-sales-btn" onClick={() => getSales()}>Find <FaSearch style={{marginLeft: '10px'}}/></div>
                <div className="bingo-sales-btn" style={{marginLeft: '10px'}}>Clear <MdClear style={{marginLeft: '10px'}}/></div>
            </div>
            <div className="bingo-sales-summary">
                <div className="bingo-sales-summary-item">Toal Bet <div>{summary?.toal_sales_value}</div></div>
                <div className="bingo-sales-summary-item">Toal Cut <div>{summary?.total_cut_value.toFixed(2)}</div></div>
                <div className="bingo-sales-summary-item">Service Fee <div>{summary?.total_company_cut_value.toFixed(2)}</div></div>
                <div className="bingo-sales-summary-item">Toal Games <div>{sales_bills.length}</div></div>
            </div>
            <Table
            columns={[
                {
                  title: <input type="checkbox"/>,
                //   dataIndex: "no",
                  width: "50px",
                  render: (record: any) => (
                    <input type="checkbox"/>
                  ),
                },
                {
                  title: "No.",
                  dataIndex: "no",
                  width: "50px",
                  render: (record: any, value: any, index: any) => index + 1,
                },
                {
                    title: "Date",
                    dataIndex: "local_date",
                    render: (value: any) => value,
                },
                {
                    title: "Game",
                    dataIndex: "game_number",
                    render: (value: any, record) => value,
                },
                {
                    title: "Bet",
                    dataIndex: "stake",
                    render: (value: any, record) => {
                      return value
                    },
                },
                {
                    title: "Players",
                    dataIndex: "cartelas",
                    render: (value: any, record) => {
                      return <div style ={{display: 'flex', maxWidth: '150px'}} className="bingo-display-when-hover">
                            <div style={{backgroundColor: '#1898d5', color: 'white', width: 'max-content', padding: '3px'}}>{value.toString().split(',').length}</div>
                             {value.slice(0,13)}
                            </div>
                    },
                },
                {
                    title: "Total Winning",
                    dataIndex: "cartelas",
                    // render: (value: any, record) => (value? value.length: 0)*record['stake'],
                    render: (value: any, record) => {
                      return <div style={{display: 'flex'}}>{value.toString().split(',').length * record.stake}<div style={{backgroundColor: '#1898d5', color: 'white', width: 'max-content'}}></div></div>
                    },
                },
                {
                    title: "Game Type",
                    dataIndex: "game_type",
                    render: (value: any) => 'bingo-75',
                },
                {
                    title: "Cut",
                    dataIndex: "cartelas",
                    render: (value: any, record) => {
                      return <div style={{display: 'flex'}}>{value.toString().split(',').length * record.stake * cashier?.commission_rate }<div style={{backgroundColor: '#1898d5', color: 'white', width: 'max-content'}}></div></div>
                    },
                },
                {
                    title: "Player Winning",
                    dataIndex: "cartelas",
                    render: (value: any, record) => {
                      return <div style={{display: 'flex'}}>{value.toString().split(',').length * record.stake * (1- cashier?.commission_rate) }<div style={{backgroundColor: '#1898d5', color: 'white', width: 'max-content'}}></div></div>
                    },
                },
                {
                    title: "Branch",
                    dataIndex: "branch",
                    render: (value: any) => cashier?.branch?.title,
                },
                {
                    title: "Cashier",
                    dataIndex: "cashier",
                    render: (value: any) => cashier?.user?.username,
                },
            ]}
            dataSource={sales_bills}
            loading={isLoading}
          />
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
  )(SalesComponent);
  