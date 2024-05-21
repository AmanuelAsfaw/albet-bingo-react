import {
    FC,
    useEffect,
    useState,
  } from "react";
  import { connect } from "react-redux";

import { SalesPropType } from "../../util/BingoGames.util";
import './sales.css';
import { DatePicker, Form } from "antd";
import moment from "moment";
import { FaSearch } from "react-icons/fa";
import { MdClear } from "react-icons/md";

const TableComponent: FC<SalesPropType> = ({
    showNavBar
  }) => {
    const [previousCalls, setPreviousCalls] = useState([
      {latter: 'B', number: 10},{latter: 'I', number: 20},{latter: 'N', number: 40},{latter: 'G', number: 50},{latter: 'O', number: 70},
    ])
    const [startDate,setStartDate] = useState((moment().month()+1)+'-'+moment().date()+'-'+moment().year())
    const [endDate,setEndDate] = useState((moment().month()+1)+'-'+moment().date()+'-'+moment().year())
    
    const SetDatePickerValue = (date_:string) => {
        const date_split = date_.split('-')
        return date_split[2]+'-'+date_split[0]+'-'+date_split[1]
    }
    
    return (
        <div>
            <table className="bingo-sales-table">
            <thead>
                <tr>
                <th><input type="checkbox"/></th>
                <th>No</th>
                <th>FIRST HEADER</th>
                <th>SECOND HEADER</th>
                <th>THIRD HEADER</th>
                <th>FOURTH HEADER</th>
                <th>FIFTH HEADER</th>
                </tr>
            </thead>
            <tbody>
                <tr className="bingo-sales-table-tr">
                    <td>
                        <input type="checkbox"/>
                    </td>
                    <td>1</td>
                    <td>This is Item number 1-1</td>
                    <td>This is Item number 2-1</td>
                    <td>This is Item number 3-1</td>
                    <td>This is Item number 4-1</td>
                    <td>This is Item number 5-1</td>
                </tr>
                <tr className="bingo-sales-table-tr">
                    <td>
                        <input type="checkbox"/>
                    </td>
                    <td>2</td>
                    <td>This is Item number 1-2</td>
                    <td>This is Item number 2-2</td>
                    <td>This is Item number 3-2</td>
                    <td>This is Item number 4-2</td>
                    <td>This is Item number 5-2</td>
                </tr>
                <tr className="bingo-sales-table-tr">
                    <td>
                        <input type="checkbox"/>
                    </td>
                    <td>3</td>
                    <td>This is Item number 1-3</td>
                    <td>This is Item number 2-3</td>
                    <td>This is Item number 3-3</td>
                    <td>This is Item number 4-3</td>
                    <td>This is Item number 5-3</td>
                </tr>
                <tr className="bingo-sales-table-tr">
                    <td>
                        <input type="checkbox"/>
                    </td>
                    <td>4</td>
                    <td>This is Item number 1-4</td>
                    <td>This is Item number 2-4</td>
                    <td>This is Item number 3-4</td>
                    <td>This is Item number 4-4</td>
                    <td>This is Item number 5-4</td>
                </tr>
                <tr className="bingo-sales-table-tr">
                    <td>
                        <input type="checkbox"/>
                    </td>
                    <td>5</td>
                    <td>This is Item number 1-5</td>
                    <td>This is Item number 2-5</td>
                    <td>This is Item number 3-5</td>
                    <td>This is Item number 4-5</td>
                    <td>This is Item number 5-5</td>
                </tr>
                <tr className="bingo-sales-table-tr">
                    <td>
                        <input type="checkbox"/>
                    </td>
                    <td>6</td>
                    <td>This is Item number 1-6</td>
                    <td>This is Item number 2-6</td>
                    <td>This is Item number 3-6</td>
                    <td>This is Item number 4-6</td>
                    <td>This is Item number 5-6</td>
                </tr>
                <tr className="bingo-sales-table-tr">
                    <td>
                        <input type="checkbox"/>
                    </td>
                    <td>7</td>
                    <td>This is Item number 1-7</td>
                    <td>This is Item number 2-7</td>
                    <td>This is Item number 3-7</td>
                    <td>This is Item number 4-7</td>
                    <td>This is Item number 5-7</td>
                </tr>
                <tr className="bingo-sales-table-tr">
                    <td>
                        <input type="checkbox"/>
                    </td>
                    <td>8</td>
                    <td>This is Item number 1-8</td>
                    <td>This is Item number 2-8</td>
                    <td>This is Item number 3-8</td>
                    <td>This is Item number 4-8</td>
                    <td>This is Item number 5-8</td>
                </tr>
                <tr className="bingo-sales-table-tr">
                    <td>
                        <input type="checkbox"/>
                    </td>
                    <td>9</td>
                    <td>This is Item number 1-9</td>
                    <td>This is Item number 2-9</td>
                    <td>This is Item number 3-9</td>
                    <td>This is Item number 4-9</td>
                    <td>This is Item number 5-9</td>
                </tr>
                <tr className="bingo-sales-table-tr">
                    <td>
                        <input type="checkbox"/>
                    </td>
                    <td>10</td>
                    <td>This is Item number 1-10</td>
                    <td>This is Item number 2-10</td>
                    <td>This is Item number 3-10</td>
                    <td>This is Item number 4-10</td>
                    <td>This is Item number 5-10</td>
                </tr>
                <tr className="bingo-sales-table-tr">
                    <td>
                        <input type="checkbox"/>
                    </td>
                    <td>11</td>
                    <td>This is Item number 1-11</td>
                    <td>This is Item number 2-11</td>
                    <td>This is Item number 3-11</td>
                    <td>This is Item number 4-11</td>
                    <td>This is Item number 5-11</td>
                </tr>
                <tr className="bingo-sales-table-tr">
                    <td>
                        <input type="checkbox"/>
                    </td>
                    <td>12</td>
                    <td>This is Item number 1-12</td>
                    <td>This is Item number 2-12</td>
                    <td>This is Item number 3-12</td>
                    <td>This is Item number 4-12</td>
                    <td>This is Item number 5-12</td>
                </tr>
                <tr className="bingo-sales-table-tr">
                    <td>
                        <input type="checkbox"/>
                    </td>
                    <td>13</td>
                    <td>This is Item number 1-13</td>
                    <td>This is Item number 2-13</td>
                    <td>This is Item number 3-13</td>
                    <td>This is Item number 4-13</td>
                    <td>This is Item number 5-13</td>
                </tr>
                <tr className="bingo-sales-table-tr">
                    <td>
                        <input type="checkbox"/>
                    </td>
                    <td>14</td>
                    <td>This is Item number 1-14</td>
                    <td>This is Item number 2-14</td>
                    <td>This is Item number 3-14</td>
                    <td>This is Item number 4-14</td>
                    <td>This is Item number 5-14</td>
                </tr>
                <tr className="bingo-sales-table-tr">
                    <td>
                        <input type="checkbox"/>
                    </td>
                    <td>15</td>
                    <td>This is Item number 1-15</td>
                    <td>This is Item number 2-15</td>
                    <td>This is Item number 3-15</td>
                    <td>This is Item number 4-15</td>
                    <td>This is Item number 5-15</td>
                </tr>
                <tr className="bingo-sales-table-tr">
                    <td>
                        <input type="checkbox"/>
                    </td>
                    <td>16</td>
                    <td>This is Item number 1-16</td>
                    <td>This is Item number 2-16</td>
                    <td>This is Item number 3-16</td>
                    <td>This is Item number 4-16</td>
                    <td>This is Item number 5-16</td>
                </tr>
                <tr className="bingo-sales-table-tr">
                    <td>
                        <input type="checkbox"/>
                    </td>
                    <td>17</td>
                    <td>This is Item number 1-17</td>
                    <td>This is Item number 2-17</td>
                    <td>This is Item number 3-17</td>
                    <td>This is Item number 4-17</td>
                    <td>This is Item number 5-17</td>
                </tr>
                <tr className="bingo-sales-table-tr">
                    <td>
                        <input type="checkbox"/>
                    </td>
                    <td>18</td>
                    <td>This is Item number 1-18</td>
                    <td>This is Item number 2-18</td>
                    <td>This is Item number 3-18</td>
                    <td>This is Item number 4-18</td>
                    <td>This is Item number 5-18</td>
                </tr>
                <tr className="bingo-sales-table-tr">
                    <td>
                        <input type="checkbox"/>
                    </td>
                    <td>19</td>
                    <td>This is Item number 1-19</td>
                    <td>This is Item number 2-19</td>
                    <td>This is Item number 3-19</td>
                    <td>This is Item number 4-19</td>
                    <td>This is Item number 5-19</td>
                </tr>
                <tr className="bingo-sales-table-tr">
                    <td>
                        <input type="checkbox"/>
                    </td>
                    <td>20</td>
                    <td>This is Item number 1-20</td>
                    <td>This is Item number 2-20</td>
                    <td>This is Item number 3-20</td>
                    <td>This is Item number 4-20</td>
                    <td>This is Item number 5-20</td>
                </tr>
            </tbody>
            </table>
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
  )(TableComponent);
  