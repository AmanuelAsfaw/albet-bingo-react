import {
    FC,
    useEffect,
    useRef,
    useState,
  } from "react";
  import { connect } from "react-redux";

import { SalesPropType } from "../../util/BingoGames.util";
import './report.css';
import { DatePicker, Form, Table } from "antd";
import moment from "moment";
import { FaSearch } from "react-icons/fa";
import { MdClear } from "react-icons/md";
import { BsFillPrinterFill } from "react-icons/bs";
import { MainUrl } from "../../../../constants/Url";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
const isAdmin = localStorage.getItem('isAdmin')

const ReportComponent: FC<SalesPropType> = ({
    showNavBar
  }) => {
    const [previousCalls, setPreviousCalls] = useState([
      {latter: 'B', number: 10},{latter: 'I', number: 20},{latter: 'N', number: 40},{latter: 'G', number: 50},{latter: 'O', number: 70},
    ])
    const [startDate,setStartDate] = useState((moment().month()+1)+'-'+moment().date()+'-'+moment().year())
    const [endDate,setEndDate] = useState((moment().month()+1)+'-'+moment().date()+'-'+moment().year())
    
    const [sales_bills,setSalesBills] = useState([])
    const [reports, setReports] = useState<any[]>([])
    const [isLoading,setIsLoading] = useState(false)
    const [cashier,setCashier] = useState<any>(null)
    const [summary,setSummary] = useState<any>(null)
    
    const componentRef = useRef(null);

    const SetDatePickerValue = (date_:string) => {
        const date_split = date_.split('-')
        return date_split[2]+'-'+date_split[0]+'-'+date_split[1]
    }
    function onlyUnique(value:any, index:any, array:any) {
      return array.indexOf(value) === index;
    }
    const getSales = () => {
      
      axios.post(MainUrl+'/bingo/get_games_by_dates', {
        start_date : startDate,
        end_date : endDate,
        is_admin: isAdmin? isAdmin: false,
      })
        .then((response:any) => {
            console.log(response.data)
            if(response.data && response.data.status === 200){
              let cashier_ = response.data.casher
              let list_of_date = response.data.sales.filter((value: any, index: any, array: any) => array.indexOf(value) === index).map((e:any)=>{
                return e.local_date
              })
              list_of_date = [...new Set(list_of_date)]
              const report_list = []
              let total_sales_value = 0;
              let total_company_cut_value = 0;
              let total_cut_value = 0;
              let total_games_value = 0;
              console.log(cashier_);
              
              for (let index = 0; index < list_of_date.length; index++) {
                const element = list_of_date[index];
                const date_sales = response.data.sales.filter((e:any)=> e.local_date == element)
                let total_bet = 0;
                let total_cut = 0;
                let commission = 0;
                date_sales.forEach((element_:any )=> {
                  total_bet = total_bet + element_.stake * element_.cartelas.split(',').length
                  total_cut = total_cut + (element_.stake * element_.cartelas.split(',').length*cashier_.commission_rate)
                  commission = commission + (element_.stake * element_.cartelas.split(',').length*cashier_.commission_rate*cashier_.campany_commission_rate)
                });
                total_sales_value = total_sales_value + total_bet
                total_company_cut_value = total_company_cut_value + commission
                total_cut_value = total_cut_value + total_cut
                total_games_value = total_games_value + date_sales.length

                report_list.push({
                  date: element,
                  games: date_sales.length,
                  total_bet,
                  total_cut,
                  commission,
                })
              }
              setSalesBills(response.data.sales)
              setReports(report_list)
              setCashier(response.data.casher)
              setSummary({
                total_sales_value,
                total_company_cut_value,
                total_games_value,
                total_cut_value,
              })
            }
        })      
    }
    
    const  PrintPdf = useReactToPrint({
      content: () => componentRef?.current ? componentRef?.current : null,
      documentTitle: cashier?.user?.username+'_'+moment(startDate).format('MMM Do')+'_to_'+moment(endDate).format('MMM Do'),
      // documentTitle: cashier.user.username+'_'+moment(startDate).format('MMM Do')+'_to_'+moment(endDate).format('MMM Do'),
      onAfterPrint: () => console.log('Printed PDF successfully!'),
    });
    return (
        <div className="bingo-sales-main-page" style={showNavBar? {width: '85vw'}:{ width: '100vw'}}>
            <div className="bingo-sales-title">Report</div>
            
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
                <div className="bingo-sales-btn" style={{marginLeft: '10px'}} onClick={()=> PrintPdf()}>Print <BsFillPrinterFill style={{marginLeft: '10px'}}/></div>
            </div>
            <div ref={componentRef}>
              <div className="bingo-sales-summary">
                  <div className="bingo-sales-summary-item">Total Bet <div>{summary?.total_sales_value?.toFixed(2)}</div></div>
                  <div className="bingo-sales-summary-item">Total Cut <div>{summary?.total_cut_value?.toFixed(2)}</div></div>
                  <div className="bingo-sales-summary-item">Service Fee <div>{summary?.total_company_cut_value.toFixed(2)}</div></div>
                  <div className="bingo-sales-summary-item">Toal Games <div>{sales_bills.length}</div></div>
                  <div className="bingo-sales-summary-item">Cashier <div>{cashier?.user?.username}</div></div>
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
                      dataIndex: "date",
                      render: (value: any) => value,
                  },
                  {
                      title: "Game",
                      dataIndex: "games",
                      render: (value: any, record) => value,
                  },
                  {
                      title: "Bet",
                      dataIndex: "total_bet",
                      render: (value: any, record) => {
                        return value?.toFixed(2)
                      },
                  },
                  {
                      title: "Cut",
                      dataIndex: "total_cut",
                      render: (value: any, record) => {
                        return value?.toFixed(2)
                      },
                  },
                  {
                      title: "Service Fee",
                      dataIndex: "commission",
                      render: (value: any, record) => {
                        return value?.toFixed(2)
                      },
                  },
                  {
                      title: "Game Type",
                      dataIndex: "game_type",
                      render: (value: any) => 'bingo-75',
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
              dataSource={reports}
              loading={isLoading}
            />
          </div>
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
  )(ReportComponent);
  