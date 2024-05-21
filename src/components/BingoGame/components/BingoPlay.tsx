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
import { BingoPlayPropType } from "../util/BingoGames.util";
import { BsFillPlayCircleFill } from "react-icons/bs";
import { FaPauseCircle } from "react-icons/fa";

const BingoPlayComponent: FC<BingoPlayPropType> = ({
    boardNumberList,
    playGame,
    setPlayGame,
    showNavBar,
  }) => {
    
    return (
      <div className="bingo-main" style={showNavBar?{}:{width: '100vw'}}>
        <div className="bingo-main-div">
          <div className="bingo-main-div-row">
            <div className="bingo-main-div-animation">
              <div className="bingo-time-div">
                <div className="bingo-time-minute-div">01</div>
                <div className="bingo-time-second-div">25</div>
              </div>
              <div className="bingo-animation-ball-view">
                <div className="bingo-animation-ball">
                  16
                </div>
              </div>
              <div className="bingo-animation-35">3/35</div>
            </div>
            <div className="bingo-grid-container">
              {
                boardNumberList.map((row, index)=> {
                  return <>
                  {
                    index == 0?(<div className="bingo-grid-item-b">B</div>):
                    index == 1?(<div className="bingo-grid-item-i">I</div>):
                    index == 2?(<div className="bingo-grid-item-n">N</div>):
                    index == 3?(<div className="bingo-grid-item-g">G</div>):
                    index == 4?(<div className="bingo-grid-item-o">O</div>): (<div></div>)

                  }
                  {
                    row.map((ele)=> {
                      if(ele % 2) return <div className="bingo-grid-item">{ele}</div>
                      return <div className="bingo-grid-item-light">{ele}</div>
                    
                  })
                  }
                  </>
                })
              }
            </div>

          </div>

        </div>
        <div className="bingo-play-footer">
            <div className="bingo-play-footer-others">
                <div className="bingo-play-footer-others-row">
                    <div className="bingo-play-footer-btn">Select Cartela</div>
                    <div className="bingo-play-footer-btn">Reset Game</div>
                </div>
                <div className="bingo-play-footer-others-row">
                    <div className="bingo-play-footer-btn">Start New Game</div>
                    <div className="bingo-play-footer-btn">Restart Game</div>
                </div>
                <div className="bingo-play-footer-others-row">
                    <div className="bingo-play-footer-btn">Start Autoplay</div>
                    <div className="bingo-play-footer-btn">Shufle Board</div>
                </div>
            </div>
            <div className="bingo-play-footer-pause">
                {playGame? <FaPauseCircle  size={'150px'} onClick={()=>setPlayGame(false)}/>:<BsFillPlayCircleFill  size={'150px'} onClick={()=> setPlayGame(true)}/>}
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
  )(BingoPlayComponent);
  