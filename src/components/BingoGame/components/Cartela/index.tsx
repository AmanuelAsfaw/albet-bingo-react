import {
    FC,
    useEffect,
    useState,
  } from "react";
  import { connect } from "react-redux";

import { ArrayRange, CartelaPropType, SalesPropType } from "../../util/BingoGames.util";
import './cartela.css';
import { DatePicker, Form, Input, Switch, Table } from "antd";
import moment from "moment";
import { FaSearch } from "react-icons/fa";
import { MdClear } from "react-icons/md";
import { Cartela } from "../../../../redux/Cartelas/TodayBill.type";
import { FaEdit } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { BiSolidShow } from "react-icons/bi";
import { FaTrash } from "react-icons/fa";
import { fetchAllCartela } from "../../../../redux/Cartelas/TodayBill.action";
import axios from "axios";
import { MainUrl } from "../../../../constants/Url";

const CartelaComponent: FC<CartelaPropType> = ({
    showNavBar,fetchCartelas, checkedCartelas,cartelas, drawNumbers, callIndex, currentCartela, setCurrentCartela, selectedCartelas,bingoGame, setCheckedCartelas,
    countHowmanyChecks, 
  }) => {
    const [isEdit, setIsEdit] = useState(false);
    const [updateWinnerText, setUpdateWinnerText] = useState('');
    const [allCartela, setAllCartela] = useState(false);
    const cartela_list = ArrayRange(1,100,1).filter((e) => !bingoGame|| (bingoGame && selectedCartelas.includes(e) && !checkedCartelas.includes(e)) || allCartela)
    useEffect(()=>{
      fetchCartelas()
    },[])

    const updateCartelaNumber = (num: string, field_name: 'b_row'| 'i_row'|'n_row'| 'g_row'|'o_row', index: number) => {
      const id = currentCartela?.id ? currentCartela?.id: null;
      let cartela_cpy = {
        id, cartela_number: currentCartela?.cartela_number? currentCartela?.cartela_number: "",
        b_row: currentCartela?.b_row? currentCartela?.b_row: "",
        i_row: currentCartela?.i_row? currentCartela?.i_row: "",
        n_row: currentCartela?.n_row? currentCartela?.n_row: "",
        g_row: currentCartela?.g_row? currentCartela?.g_row: "",
        o_row: currentCartela?.o_row? currentCartela?.o_row: "",
      }
      let update_field = cartela_cpy[field_name]?.split(',')
      if (update_field){
        update_field[index] = num;
        cartela_cpy[field_name] = update_field.join(',')
      }
      
      setCurrentCartela(cartela_cpy);
    }
    
    const updateCurrentCartela = (num: string) => {
      let cartela = cartelas.payload.find((e) => e.cartela_number == num)
      console.log(cartelas);
      
      if(cartela){
        console.log(cartela);
        setCurrentCartela(cartela)
      }
    }
    const updateCartelaDB = () => {
      console.log('updateCartelaDB');     
      axios.post(MainUrl+"/bingo/update_cartela",{
        id: currentCartela?.id,
        b_row: currentCartela?.b_row,
        i_row: currentCartela?.i_row,
        n_row: currentCartela?.n_row,
        g_row: currentCartela?.g_row,
        o_row: currentCartela?.o_row,
      })
      .then((response) => {
          console.log(response.data)
          if(response.data && response.data.status === 200){
            fetchCartelas()
          }
      })   
    }
    console.log(currentCartela);
    const checkCurrentCartelaWin = () =>{
      if(currentCartela){
        // check verticaly 
        const array_vertical = [
          currentCartela.b_row,
          currentCartela.i_row,
          currentCartela.n_row,
          currentCartela.g_row,
          currentCartela.o_row,
        ]
        for (let index = 0; index < 5; index++) {
          const row = array_vertical[index].split(',').map((e)=>parseInt(e))
          const rwo_intersection = row.filter((e)=> drawNumbers.includes(e))
          if(rwo_intersection.length == 5 || (rwo_intersection.length == 4 && index == 2)) return true;
        }
        // check horizontally
        function getRows(index:number) {
          return [
            parseInt(array_vertical[0].split(',')[index]), parseInt(array_vertical[1].split(',')[index]), parseInt(array_vertical[2].split(',')[index]), parseInt(array_vertical[3].split(',')[index]), parseInt(array_vertical[4].split(',')[index]),
          ]
        }
        const array_horizontal = [
          getRows(0), getRows(1), getRows(2), getRows(3), getRows(4),
        ]
        for (let index = 0; index < 5; index++) {
          const row = array_horizontal[index]
          const rwo_intersection = row.filter((e)=> drawNumbers.includes(e))
          if(rwo_intersection.length == 5 || (rwo_intersection.length == 4 && index == 2)) return true;
        }

        // check b-1 to o-5 diagonal
        const diagonal_b_o = [
          array_horizontal[0][0],
          array_horizontal[1][1],
          array_horizontal[2][2],
          array_horizontal[3][3],
          array_horizontal[4][4],
        ]
        const diagonal_b_o_intersection = diagonal_b_o.filter((e)=> drawNumbers.includes(e))
        if(diagonal_b_o_intersection.length == 4) return true;
        console.log(diagonal_b_o);

        // check b-5 to o-1 diagonal
        const diagonal_o_b = [
          array_horizontal[4][0],
          array_horizontal[3][1],
          array_horizontal[2][2],
          array_horizontal[1][3],
          array_horizontal[0][4],
        ]
        const diagonal_o_b_intersection = diagonal_o_b.filter((e)=> drawNumbers.includes(e))
        if(diagonal_o_b_intersection.length == 4) return true;
        console.log(diagonal_o_b);
        console.log(drawNumbers.length);
        
      }
      return false
    }
    const checkCurrentCartelaMultipleWin = () =>{
      const count_multiple_win = parseInt(countHowmanyChecks?countHowmanyChecks:'1')
      const multiple_win_list = []
      if(currentCartela){
        // check verticaly 
        const array_vertical = [
          currentCartela.b_row,
          currentCartela.i_row,
          currentCartela.n_row,
          currentCartela.g_row,
          currentCartela.o_row,
        ]
        for (let index = 0; index < 5; index++) {
          const row = array_vertical[index].split(',').map((e)=>parseInt(e))
          const rwo_intersection = row.filter((e)=> drawNumbers.includes(e))
          if(rwo_intersection.length == 5 || (rwo_intersection.length == 4 && index == 2)) {
            // return true
            const start_str = index == 0? 'b1': index == 1?'i1': index == 2? 'n1':index == 3?'g1':'o1';
            const end_str = index == 0? 'b5': index == 1?'i5': index == 2? 'n5':index == 3?'g5':'o5';
            multiple_win_list.push(start_str+end_str)
          }
        }
        // check horizontally
        function getRows(index:number) {
          return [
            parseInt(array_vertical[0].split(',')[index]), parseInt(array_vertical[1].split(',')[index]), parseInt(array_vertical[2].split(',')[index]), parseInt(array_vertical[3].split(',')[index]), parseInt(array_vertical[4].split(',')[index]),
          ]
        }
        const array_horizontal = [
          getRows(0), getRows(1), getRows(2), getRows(3), getRows(4),
        ]
        for (let index = 0; index < 5; index++) {
          const row = array_horizontal[index]
          const rwo_intersection = row.filter((e)=> drawNumbers.includes(e))
          if(rwo_intersection.length == 5 || (rwo_intersection.length == 4 && index == 2)){
            const start_str = index == 0? 'b1': index == 1?'b2': index == 2? 'b3':index == 3?'b4':'b5';
            const end_str = index == 0? 'o1': index == 1?'o2': index == 2? 'o3':index == 3?'o4':'o5';
            multiple_win_list.push(start_str+end_str)
          }
        }

        // check b-1 to o-5 diagonal
        const diagonal_b_o = [
          array_horizontal[0][0],
          array_horizontal[1][1],
          array_horizontal[2][2],
          array_horizontal[3][3],
          array_horizontal[4][4],
        ]
        const diagonal_b_o_intersection = diagonal_b_o.filter((e)=> drawNumbers.includes(e))
        if(diagonal_b_o_intersection.length == 4) {          
          multiple_win_list.push('b1o5')
        }
        console.log(diagonal_b_o);

        // check b-5 to o-1 diagonal
        const diagonal_o_b = [
          array_horizontal[4][0],
          array_horizontal[3][1],
          array_horizontal[2][2],
          array_horizontal[1][3],
          array_horizontal[0][4],
        ]
        const diagonal_o_b_intersection = diagonal_o_b.filter((e)=> drawNumbers.includes(e))
        if(diagonal_o_b_intersection.length == 4) {        
          multiple_win_list.push('b5o1')
        }
        console.log(diagonal_o_b);
        console.log(drawNumbers.length);
        
      }
      console.log(multiple_win_list);
      
      if(count_multiple_win <= multiple_win_list.length){
        return true
      }
      return false
    }
    const updateGameWinner = () =>{
      if(checkCurrentCartelaMultipleWin()){
        axios.post(MainUrl+'/bingo/update_game_winner',{
          id: bingoGame.id,
          winner: currentCartela?.cartela_number,
        })
        .then((response) => {
            console.log(response.data)
            if(response.data && response.data.status === 200){
              if(response.data.game.winner){
                setUpdateWinnerText(`Cartela ${response.data.game.winner} is Winner`)
              }
            }
        })
      }
    }
    console.log(checkCurrentCartelaMultipleWin())
    console.log(currentCartela)
    const onChange = (checked: boolean) => {
      console.log(`switch to ${checked}`);
      setAllCartela(checked)
    };
    const addToCheckedCartelas= () => {
      const cpy_checked_cartelas = [...checkedCartelas]
      if(currentCartela)
        cpy_checked_cartelas.push(parseInt(currentCartela.cartela_number))
      setCheckedCartelas(cpy_checked_cartelas)
      setCurrentCartela(null)
    }
    return (
        <div className="bingo-cartela-main-page" style={showNavBar? {width: '85vw'}:{ width: '100vw'}}>
            <div className="bingo-sales-title">Cartela <Switch defaultChecked={allCartela} onChange={onChange} /></div>
            <div className="d-flex">
                <div className="bingo-cartela-nums-main">
                    <div className="bingo-cartela-nums">
                        {cartela_list.map((e)=> <div
                        className={ currentCartela?.cartela_number == e.toString()?'bingo-cartela-nums-item-select':"bingo-cartela-nums-item"}
                        onClick={() => {
                          updateCurrentCartela(e.toString())
                        }}
                        >{e}</div>)}
                    </div>
                </div>
                <div className="current-cartela-main">
                  <div className=" d-flex-space-between">
                    <div className="d-flex">{isEdit?'Edit':'Show'} <div className="bingo-cartela-nums-item" style={{marginLeft: '10px'}}>{currentCartela?.cartela_number}</div></div>
                    <div className="d-flex">
                      <FaTrash className="bingo-cartela-icon-btn" style={{marginRight: '20px'}} onClick={()=> addToCheckedCartelas()}/>
                      {!isEdit && callIndex < 0 && (<FaEdit className="bingo-cartela-icon-btn" onClick={()=> setIsEdit(true)}/>)}
                      {isEdit && (<BiSolidShow  className="bingo-cartela-icon-btn" onClick={()=> setIsEdit(false)}/>)}
                      
                    </div>
                  </div>
                  {checkCurrentCartelaMultipleWin() && true && <div className="winner-notify-text"> Cartela {currentCartela?.cartela_number} is Winner!!!</div>}
                  <div>
                    <div className="bingo-single-cartela-nums-vertical">
                      <div className="bingo-single-cartela-nums-title" style={{ color: 'blue'}}>B</div>
                      <div className="bingo-single-cartela-nums-title" style={{ color: 'red'}}>I</div>
                      <div className="bingo-single-cartela-nums-title" style={{ color: 'purple'}}>N</div>
                      <div className="bingo-single-cartela-nums-title" style={{ color: 'green'}}>G</div>
                      <div className="bingo-single-cartela-nums-title" style={{ color: 'goldenrod'}}>O</div>
                      <div>
                        {currentCartela?.b_row.split(',').map((num, index)=>{
                          if (isEdit)
                            return <div className="bingo-single-cartela-nums-item">
                              <Input defaultValue={num} maxLength={2} width={50} className="bingo-single-cartela-nums-item-input"
                              onChange={(event) => {
                                event.preventDefault();
                                updateCartelaNumber(event.target.value, 'b_row', index)
                              }}
                              />
                            </div>
                          if(drawNumbers.includes(parseInt(num)))
                            return <div className="bingo-single-cartela-nums-item-called">{num}</div>
                          return <div className="bingo-single-cartela-nums-item">{num}</div>
                        })}
                      </div>
                      <div>
                        {currentCartela?.i_row.split(',').map((num, index)=>{
                          if (isEdit)
                            return <div className="bingo-single-cartela-nums-item">
                              <Input value={num} maxLength={2} width={50} className="bingo-single-cartela-nums-item-input"
                              onChange={(event) => {
                                event.preventDefault();
                                updateCartelaNumber(event.target.value, 'i_row', index)
                              }}
                              />
                            </div>
                          if(drawNumbers.includes(parseInt(num)))
                            return <div className="bingo-single-cartela-nums-item-called">{num}</div>
                          return <div className="bingo-single-cartela-nums-item">{num}</div>
                        })}
                      </div>
                      <div>
                        {currentCartela?.n_row.split(',').map((num, index)=>{
                          if(parseInt(num) < 1){
                            return <div className="bingo-single-cartela-nums-item"><FaStar size={30} style={{color: 'goldenrod'}}/></div>
                          }
                          if (isEdit)
                            return <div className="bingo-single-cartela-nums-item">
                              <Input value={num} maxLength={2} width={50} className="bingo-single-cartela-nums-item-input"
                              onChange={(event) => {
                                event.preventDefault();
                                updateCartelaNumber(event.target.value, 'n_row', index)
                              }}
                              />
                            </div>
                          if(drawNumbers.includes(parseInt(num)))
                            return <div className="bingo-single-cartela-nums-item-called">{num}</div>
                          return <div className="bingo-single-cartela-nums-item">{num}</div>
                        })}
                      </div>
                      <div>
                        {currentCartela?.g_row.split(',').map((num, index)=>{
                          if (isEdit)
                            return <div className="bingo-single-cartela-nums-item">
                              <Input value={num} maxLength={2} width={50} className="bingo-single-cartela-nums-item-input"
                              onChange={(event) => {
                                event.preventDefault();
                                updateCartelaNumber(event.target.value, 'g_row', index)
                              }}
                              />
                            </div>
                          if(drawNumbers.includes(parseInt(num)))
                            return <div className="bingo-single-cartela-nums-item-called">{num}</div>
                          return <div className="bingo-single-cartela-nums-item">{num}</div>
                        })}
                      </div>
                      <div>
                        {currentCartela?.o_row.split(',').map((num, index)=>{
                          if (isEdit)
                            return <div className="bingo-single-cartela-nums-item">
                              <Input value={num} maxLength={2} width={50} className="bingo-single-cartela-nums-item-input"
                              onChange={(event) => {
                                event.preventDefault();
                                updateCartelaNumber(event.target.value, 'o_row', index)
                              }}
                              />
                            </div>
                          if(drawNumbers.includes(parseInt(num)))
                            return <div className="bingo-single-cartela-nums-item-called">{num}</div>
                          return <div className="bingo-single-cartela-nums-item">{num}</div>
                        })}
                      </div>
                    </div>
                  </div>
                  <div className=" d-flex-space-between">      
                    <div></div>                     
                    {isEdit && (<div className="bingo-cartela-btn" onClick={() => updateCartelaDB()}>Save</div>  )}
                    {!isEdit && checkCurrentCartelaMultipleWin() && (<div className="bingo-cartela-btn" style={{backgroundColor: 'green'}} onClick={() => updateGameWinner()}>Win</div>)}                
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
    cartelas: state.cartelas.fetchAll,
    // status_board: state.status_board.fetchAll,
  });
  
  /**
   * Map Dispatch to Props
   *
   * @param dispatch
   */
  const mapDispatchToProps = (dispatch: any) => ({
    fetchCartelas: (action: any) => dispatch(fetchAllCartela(action)),
    // fetchProjects: (action: any) => dispatch(fetchAllProjects(action)),
    // fetchStatusBoards: (action: any) => dispatch(fetchAllStatusBoard(action)),
    // fetchOneProject: (action: any) => dispatch(fetchOneProjects(action)),
    // fetchRoles: (action: any) => dispatch(fetchAllRole(action)),
  });
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(CartelaComponent);
  