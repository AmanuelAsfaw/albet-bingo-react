import {
    FC,
    ReactChild,
    ReactFragment,
    ReactPortal,
    useEffect,
    useState,
  } from "react";
  import { connect } from "react-redux";

import { FcComboChart } from "react-icons/fc";
import { ImCart } from "react-icons/im";
import { FaBowlingBall } from "react-icons/fa";
import { MdOutlinePointOfSale } from "react-icons/md";
import { ArrayRange, BingoPlayPropType, DashboardPropType } from "../../util/BingoGames.util";
import { BsFillPlayCircleFill } from "react-icons/bs";
import { MdPlayCircle } from "react-icons/md";
import { FaPauseCircle, FaPlayCircle } from "react-icons/fa";
import Logo from "../../ethbingo.png";
import axios from "axios";
import { MainUrl } from "../../../../constants/Url";
import { Button, Modal } from "antd";
import './dashboard.css'
import { IoReloadCircle } from "react-icons/io5";
import { FcServices } from "react-icons/fc";

const DashboardComponent: FC<DashboardPropType> = ({
    setCashier,
  }) => {
    const [casher, setCasher] = useState("");
    const [wallet, setWallet] = useState("");
    const [profit, setProfit] = useState("");
    const [company_profit, setCompanyProfit] = useState("");
    const [games, setGames] = useState("");
    const [totalSales, setToalSales] = useState("");
    
    const [weeklyProfit, setWeeklyProfit] = useState("");
    const [weekly_company_profit, setWeeklyCompanyProfit] = useState("");
    const [weeklyGames, setWeeklyGames] = useState("");
    const [weeklyTotalSales, setWeeklyToalSales] = useState("");
    
    const get_data = () => {
        axios.get(MainUrl+'/bingo/get_dashboard_data')
        .then((response) => {
            console.log(response.data)
            if(response.data && response.data.status === 200){
                setCasher(response?.data?.casher?.user?.username)
                setCashier(response?.data?.casher)
                setWallet(response?.data?.casher?.deposit)
                setProfit(response?.data?.today_summary?.total_cut_value)
                setCompanyProfit(response?.data?.today_summary?.total_company_cut_value)
                setGames(response?.data?.today_summary?.sales_count)
                setToalSales(response?.data?.today_summary?.toal_sales_value)
                
                setWeeklyProfit(response?.data?.weekly_summary?.total_cut_value)
                setWeeklyCompanyProfit(response?.data?.weekly_summary?.total_company_cut_value)
                setWeeklyGames(response?.data?.weekly_summary?.sales_count)
                setWeeklyToalSales(response?.data?.weekly_summary?.toal_sales_value)
            }
        })
    }
    
    useEffect(()=>{
        get_data()
    }, [])
    return (
        <div className="bingo-dashboard-main-page">
            <div className="container pt-5">
                <div className="d-flex-space-between" style={{alignItems: 'center'}}>
                    <div className="bingo-dashboard-title">Today</div>
                    <IoReloadCircle className="bingo-dashboard-main-page-reload-icon" size={50} onClick={() => get_data()}/>
                </div>
                <div className="row align-items-stretch">
                <div className="c-dashboardInfo col-lg-3 col-md-6">
                    <div className="wrap">
                    <h4 className="heading heading5 hind-font medium-font-weight c-dashboardInfo__title">{casher}<svg
                        className="MuiSvgIcon-root-19" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation">
                        <path fill="none" d="M0 0h24v24H0z"></path>
                        <path
                            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z">
                        </path>
                        </svg></h4><span className="hind-font caption-12 c-dashboardInfo__count">Cashier</span>
                    </div>
                </div>
                <div className="c-dashboardInfo col-lg-3 col-md-6">
                    <div className="wrap">
                    <h4 className="heading heading5 hind-font medium-font-weight c-dashboardInfo__title">Profit<svg
                        className="MuiSvgIcon-root-19" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation">
                        <path fill="none" d="M0 0h24v24H0z"></path>
                        <path
                            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z">
                        </path>
                        </svg></h4><span className="hind-font caption-12 c-dashboardInfo__count"> {parseFloat(profit).toFixed(2)} ብር</span><span
                        className="hind-font caption-12 c-dashboardInfo__subInfo"><FcServices /> : {parseFloat(company_profit).toFixed(2)} ብር</span>
                    </div>
                </div>
                <div className="c-dashboardInfo col-lg-3 col-md-6">
                    <div className="wrap">
                    <h4 className="heading heading5 hind-font medium-font-weight c-dashboardInfo__title">Total Sales<svg
                        className="MuiSvgIcon-root-19" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation">
                        <path fill="none" d="M0 0h24v24H0z"></path>
                        <path
                            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z">
                        </path>
                        </svg></h4><span className="hind-font caption-12 c-dashboardInfo__count"> {parseFloat(totalSales).toFixed(2)} ብር</span>
                    </div>
                </div>
                <div className="c-dashboardInfo col-lg-3 col-md-6">
                    <div className="wrap">
                    <h4 className="heading heading5 hind-font medium-font-weight c-dashboardInfo__title">Wallet<svg
                        className="MuiSvgIcon-root-19" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation">
                        <path fill="none" d="M0 0h24v24H0z"></path>
                        <path
                            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z">
                        </path>
                        </svg></h4>
                        <span className="hind-font caption-12 c-dashboardInfo__count">{parseFloat(wallet).toFixed(2)} ብር</span>
                        <span className="hind-font caption-12 c-dashboardInfo__count" style={{
                            backgroundColor: parseFloat(wallet) >= 5000?'green':parseFloat(wallet) >= 2000?'yellow':'red',
                            color: parseFloat(wallet) >= 2000 && parseFloat(wallet) < 5000?'black':'white',
                        }}>{parseFloat(wallet) < 2000?'Low Deposit':parseFloat(wallet) < 5000?'Warnning':'Excellent'  }</span>
                    </div>
                </div>
                <div className="c-dashboardInfo col-lg-3 col-md-6">
                    <div className="wrap">
                    <h4 className="heading heading5 hind-font medium-font-weight c-dashboardInfo__title">Games<svg
                        className="MuiSvgIcon-root-19" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation">
                        <path fill="none" d="M0 0h24v24H0z"></path>
                        <path
                            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z">
                        </path>
                        </svg></h4><span className="hind-font caption-12 c-dashboardInfo__count">{games}</span>
                    </div>
                </div>
                </div>
            </div>
            <div className="container pt-5">
                <div className="d-flex-space-between" style={{alignItems: 'center'}}>
                    <div className="bingo-dashboard-title">Weekly</div>
                </div>
                <div className="row align-items-stretch">
                <div className="c-dashboardInfo col-lg-3 col-md-6">
                    <div className="wrap">
                    <h4 className="heading heading5 hind-font medium-font-weight c-dashboardInfo__title">Profit<svg
                        className="MuiSvgIcon-root-19" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation">
                        <path fill="none" d="M0 0h24v24H0z"></path>
                        <path
                            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z">
                        </path>
                        </svg></h4><span className="hind-font caption-12 c-dashboardInfo__count"> {parseFloat(weeklyProfit).toFixed(2)} ብር</span><span
                        className="hind-font caption-12 c-dashboardInfo__subInfo"><FcServices /> : {parseFloat(weekly_company_profit).toFixed(2)} ብር</span>
                    </div>
                </div>
                <div className="c-dashboardInfo col-lg-3 col-md-6">
                    <div className="wrap">
                    <h4 className="heading heading5 hind-font medium-font-weight c-dashboardInfo__title">Total Sales<svg
                        className="MuiSvgIcon-root-19" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation">
                        <path fill="none" d="M0 0h24v24H0z"></path>
                        <path
                            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z">
                        </path>
                        </svg></h4><span className="hind-font caption-12 c-dashboardInfo__count"> {parseFloat(weeklyTotalSales).toFixed(2)} ብር</span>
                    </div>
                </div>
                
                <div className="c-dashboardInfo col-lg-3 col-md-6">
                    <div className="wrap">
                    <h4 className="heading heading5 hind-font medium-font-weight c-dashboardInfo__title">Games<svg
                        className="MuiSvgIcon-root-19" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation">
                        <path fill="none" d="M0 0h24v24H0z"></path>
                        <path
                            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z">
                        </path>
                        </svg></h4><span className="hind-font caption-12 c-dashboardInfo__count">{weeklyGames}</span>
                    </div>
                </div>
                </div>
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
  )(DashboardComponent);
  