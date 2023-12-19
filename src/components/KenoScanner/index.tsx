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
  } from "./util/KenoScanner.util";
  import Table, { ColumnsType } from "antd/lib/table";
  import { Alert, Button, Input, Popconfirm, Popover, Space } from "antd";
  import { ClearOutlined, DeleteOutlined, MoreOutlined, PrinterOutlined, RightOutlined } from "@ant-design/icons";
  import { fetchOneProjects } from "../../redux/Project/Project.action";
  import { eachRight, isEmpty } from "lodash";
  
  import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
  import { fetchAllRole } from "../../redux/Role/Role.action";
  import { fetchAllStatusBoard } from "../../redux/StatusBoard/StatusBoard/StatusBoard.action";
  import { BoardProject } from "../../redux/StatusBoard/BoardProject/BoardProject.type";
//   import { useBarcode } from "next-barcode";
import axios from "axios";
import { MainUrl } from "../../constants/Url";
  
import useScanDetection from 'use-scan-detection';
import { Link, useNavigate } from "react-router-dom";
import { getMaximumPayout, getMaximumPayoutForList, getMinimumPayout, getMinimumPayoutForList } from "../Ticketing/util/Tecketing.UI.util";
import { SubBill, TodayKenoBill } from "../../redux/KenoBills/Today/Today.type";
import { KenoTodayBill } from "../../redux/Keno/TodayBills/TodayBill.type";
import { KenoBill } from "../../redux/KenoBills/KenoBill.type";
  
const KenoScannerComponent: FC<StatusBoardPropType> = ({
    projects,
    status_board,
    fetchUser,
    fetchProjects,
    fetchStatusBoards,
    fetchOneProject,
    fetchRoles,
  }) => {
    
    const [uniqueKey, setUniqueKey] = useState("");
    const [isWinner, setIsWinner] = useState(false);
    const [isRedeemed, setIsIsRedeemed] = useState(false);
    const [isCanceled, setIsCanceled] = useState(false);
    const [totalWin, setTotalWin] = useState(0);
    const [gameNumber, setGameNumber] = useState(0);
    const [draws, setDraws] = useState<number[]>([]);
    const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
    const [matched, setMatched] = useState<number[]>([]);
    const [billData, setBillData] = useState<TodayKenoBill |null>(null);
    const [casher, setCasher] = useState("")
    const [branch, setBranch] = useState("")
    const [date, setDate] = useState(Date.now().toString())
    const [stake, setStake] = useState(0);
    const [subBills, setSubBills] = useState<SubBill[]>([]);
    const [matchNumbers, setMatchNumbers] = useState<any[]>([]);
    
    const printRef = useRef<HTMLAnchorElement | null>(null);
    const [redeemedPrint, setRedeemedPrint] = useState(0);
    
    useEffect(() => {
        if(isWinner && !isCanceled && isRedeemed && printRef && redeemedPrint){
            console.log('isWinner && !isCanceled && isRedeemed && printRef && redeemedPrint');
            if(printRef.current)
                printRef.current.click()
        }
    }, [redeemedPrint])
  
    const getScannedBill = (key:string) => {
        setBillData(null)
        setIsWinner(false)
        setTotalWin(0)
        setGameNumber(0)
        setIsWinner(false)
        setIsIsRedeemed(false)
        setIsCanceled(false)
        setCasher("")
        setBranch("")
        setStake(0)
        axios.get(MainUrl+'/casher/get_scanned_bill/'+key)
        .then((response) => {
            console.log(response.data)
            if(response.data && response.data.status === 200){
                setMatched(response.data.match_numbers)
                setSelectedNumbers(response.data.selected_numbers)
                setDraws(response.data.draws)
                setBillData(response.data.data)
                setGameNumber(response.data.game.game_number)
                setTotalWin(response.data.total_win)
                setIsWinner(response.data.isWinner? true:false)
                setIsIsRedeemed(response.data.data.is_redeemed)
                setIsCanceled(response.data.data.is_canceled)
                setCasher(response?.data?.data?.casher?.user?.username)
                setBranch(response?.data?.data?.casher?.branch?.title)
                setStake(response?.data?.data?.stake)
                setMatchNumbers(response?.data?.match_numbers)
            }
        })
    }
    
    const redeemBill = (key:string) => {
        setBillData(null)
        setIsWinner(false)
        setTotalWin(0)
        setGameNumber(0)
        setIsWinner(false)
        setIsIsRedeemed(false)
        setIsCanceled(false)
        setCasher("")
        setBranch("")
        setStake(0)
        axios.post(MainUrl+'/casher/redeeme_bill/'+key)
        .then((response) => {
            console.log(response.data)
            if(response.data && response.data.status === 200){
                setMatched(response.data.match_numbers)
                setSelectedNumbers(response.data.selected_numbers)
                setDraws(response.data.draws)
                setBillData(response.data.data)
                setGameNumber(response.data.game.game_number)
                setTotalWin(response.data.total_win)
                setIsWinner(response.data.isWinner? true:false)
                setIsIsRedeemed(response.data.data.is_redeemed)
                setIsCanceled(response.data.data.is_canceled)
                setCasher(response?.data?.data?.casher?.user?.username)
                setBranch(response?.data?.data?.casher?.branch?.title)
                setStake(response?.data?.data?.stake)
                if(response.data.data.is_redeemed){
                    setRedeemedPrint(redeemedPrint + 1)
                }
            }
        })
    }
    
    const cancelBill = (key:string) => {
        setBillData(null)
        setIsWinner(false)
        setTotalWin(0)
        setGameNumber(0)
        setIsWinner(false)
        setIsIsRedeemed(false)
        setIsCanceled(false)
        setCasher("")
        setBranch("")
        setStake(0)
        axios.post(MainUrl+'/casher/cancel_bill/'+key)
        .then((response) => {
            console.log(response.data)
            if(response.data && response.data.status === 200){
                setMatched(response.data.match_numbers)
                setSelectedNumbers(response.data.selected_numbers)
                setDraws(response.data.draws)
                setBillData(response.data.data)
                setGameNumber(response.data.game.game_number)
                setTotalWin(response.data.total_win)
                setIsWinner(response.data.isWinner? true:false)
                setIsIsRedeemed(response.data.data.is_redeemed)
                setIsCanceled(response.data.data.is_canceled)
                setCasher(response?.data?.data?.casher?.user?.username)
                setBranch(response?.data?.data?.casher?.branch?.title)
                setStake(response?.data?.data?.stake)
            }
        })
    }

    function  convertCode128ScannedResult(scannedResult : string){
        let expectedResult = "";
        for (let i=0; i<scannedResult.length; i +=2){
           expectedResult   += String.fromCharCode(parseInt(scannedResult.substr(i,2)));
        }
        return expectedResult;
    }
     
    useScanDetection({
        onComplete: (code) => {
            console.log(" ====== useScanDetection ======");
            console.log(code);
            console.log(code.toString().replace(/\D/g, ''));
            
            if(code.toString().replace(/\D/g, '').length > 22){
                const result = convertCode128ScannedResult(code.toString().replace(/\D/g, ''))
                setUniqueKey(result)
                getScannedBill(result)
            }
            else{
                setUniqueKey(code.toString().replace(/\D/g, ''))
                getScannedBill(code.toString().replace(/\D/g, ''))
            }
        },
        minLength:3
    })
    var print_url = "albet://type=2&casher="+casher+"&branch="+branch+"&date="+date+"&game="+gameNumber+"&ticket="+uniqueKey+"&stake="+parseInt(billData?.stake.toString()?billData?.stake.toString():'0')+"&max="+getMaximumPayout(stake,selectedNumbers.length)+"&min="+getMinimumPayout(stake, selectedNumbers.length)+"&win="+totalWin+"?"+ selectedNumbers.join("&");
    const getPrintUrl = () => {
        let selected_numbers = ''
        if(billData && billData.has_multiple){
            selected_numbers = selectedNumbers.join("&")
            var str_sub_bills = ''
            for (let index = 0; index < matchNumbers.length; index++) {
                const element = matchNumbers[index];
                const length_ = element.match_numbers.toString().split(',').length
                if(element.win)
                str_sub_bills = str_sub_bills +'?len='+length_+'&stake='+element.stake+'&win='+element.win+'&'+element.match_numbers.toString().split(',').join('&')
            }
            selected_numbers = str_sub_bills
            return "albet://type=4&casher="+casher+"&branch="+branch+"&date="+date+"&game="+gameNumber+"&ticket="+uniqueKey+"&stake="+parseInt(billData?.stake.toString()?billData?.stake.toString():'0')+"&max="+getMaximumPayoutForList(billData.sub_bills)+"&min="+getMinimumPayoutForList(billData.sub_bills)+"&win="+totalWin+ selected_numbers;
        }
        else{
            selected_numbers = selectedNumbers.join("&")
            return "albet://type=2&casher="+casher+"&branch="+branch+"&date="+date+"&game="+gameNumber+"&ticket="+uniqueKey+"&stake="+parseInt(billData?.stake.toString()?billData?.stake.toString():'0')+"&max="+getMaximumPayout(stake,selectedNumbers.length)+"&min="+getMinimumPayout(stake, selectedNumbers.length)+"&win="+totalWin+"?"+ selected_numbers;
        }

    }
    return (
        <div className="col-md-6">
            <Space direction="vertical" style={{ width: '100%' }}>
                <div>
                    <Input id="uniquekeyinput12345" value={uniqueKey}
                    onChange={(e)=> setUniqueKey(e?.target?.value)}
                    ></Input>
                </div>
                { billData &&(<>
                    {!isWinner&&(<>
                    <Alert
                        message="Not Winner"
                        type="error"
                        showIcon />
                </>)}
                {isWinner&&(<>
                    <Alert
                        message="Winner"
                        type="success"
                        showIcon />
                    <Alert
                        message={"Total Win = "+totalWin+ ' ETB'}
                        type="success"
                        showIcon />
                    {isRedeemed&&(<>
                        <Alert
                            message="Redeemed"
                            type="success"
                            showIcon />
                    </>)}
                </>)}
                {isCanceled&&(<>
                    <Alert
                        message="Canceled"
                        type="info"
                        showIcon />
                </>)}
                <Alert
                    message="Draws"
                    description={draws.join(', ')}
                    type="info"
                    showIcon />
                {billData && (
                    <Alert
                        message={"Game "+billData.game.game_number}
                        type="info"
                        showIcon />
                )}
                {billData && !billData.has_multiple && (
                    <Alert
                        message={"Selected Numbers"}
                        description={selectedNumbers.join(', ')}
                        type="warning"
                        showIcon />
                )}
                {billData && billData.has_multiple && (<>
                    {billData.sub_bills.map((element) => {
                    console.log(element);
                    const selected_nums = element.selected_numbers.toString()
                    console.log(selected_nums);
                    
                    return <Alert
                                message="Selected Numbers"
                                description={selected_nums+'  => '+element.stake +' ETB'}
                                type="warning"
                                showIcon />
                })}
                </>)}
                
                {billData && !billData.has_multiple && (
                    <Alert
                        message="Matched"
                        description={matched.join(', ')}
                        type="success"
                        showIcon />
                )}
                
                {billData && billData.has_multiple && (<>
                    {matchNumbers.map((element) => {
                    console.log(element);
                    const match_numbers = element.match_numbers.toString()
                    console.log(match_numbers);
                    
                    return match_numbers && (<Alert
                                message="Matched"
                                description={match_numbers+'  => stake '+element.stake +' ETB and Win '+ element.win+ ' ETB'}
                                type="success"
                                showIcon />)
                })}
                </>)}
                <Alert
                    type="info"
                    action={
                        <Space>
                            <Button size="middle" type="primary" onClick={()=>{
                                console.log('getScannedBill');
                                
                                getScannedBill(uniqueKey)
                            }}>
                                Get
                            </Button>
                            {isWinner && !isCanceled && (<>
                                {!isRedeemed &&(<Button size="middle" type="primary" onClick={()=>{
                                    console.log('redeemBill(uniqueKey)');
                                    redeemBill(uniqueKey)
                                }}>
                                    Redeem
                                </Button>)}
                                
                                <Link ref={printRef} to={getPrintUrl()} style={{
                                backgroundColor: "#0033a1",
                                color: "white",
                                paddingLeft: '12px',
                                paddingRight: '12px',
                                paddingTop: '7px',
                                paddingBottom: '7px',
                                borderRadius: '10px',
                                }}>Print</Link>
                            </>)}
                            {!isCanceled && (
                            <Button size="middle" danger type="primary" onClick={() => {
                                console.log('cancelBill(uniqueKey)');
                                cancelBill(uniqueKey)
                            }}>
                                Cancel
                            </Button>)}
                        </Space>
                    }
                    />
                </>)}
                {!billData && uniqueKey &&(
                    <Alert
                    type="info"
                    action={
                        <Space>
                            <Button size="middle" type="primary" onClick={()=>{
                                console.log('getScannedBill');
                                
                                getScannedBill(uniqueKey)
                            }}>
                                Get
                            </Button>
                        </Space>
                    }
                    />
                )}
            </Space>
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
  )(KenoScannerComponent);
  