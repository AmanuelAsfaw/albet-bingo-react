import { Fragment } from "react"
import { SubBillType, max_selectedNumbers, numberWithOdd } from "./Ticketing.util"
import axios from "axios"
import { MainUrl } from "../../../constants/Url"
// import { initAxios as axios } from "../../../utilities/utilities"


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

export function getMaximumPayout( stake: number,length: number){
    if(length > 0){
        // setMaxPayOut(stake * numberWithOdd[length])
        const max_odd = numberWithOdd[length]
        return stake * max_odd
    }
    return 0
}

export function getMinimumPayout( stake: number,length: number){
    if(length === 1){
        return stake * 3.8
    }
    else if(length === 2){
        return stake * 15
    }
    else if(length === 3){
        return stake * 3
    }
    else if(length === 4  || length === 5 || length === 6  ){
        return stake
    }
    
    return 0
}

export function getMaximumPayoutForList(sub_bills: SubBillType[]){
    
    let max_pay = 0;
    for (let index = 0; index < sub_bills.length; index++) {
        const element = sub_bills[index];
        const selected_numbers = element.selected_numbers.toString().split(',')
        const max_ = getMaximumPayout(element.stake, selected_numbers.length)
        
        max_pay = max_pay + max_
    }
    return max_pay
}

export function getMinimumPayoutForList(sub_bills: SubBillType[]){
    let min_pay = 100000;
    for (let index = 0; index < sub_bills.length; index++) {
        const element = sub_bills[index];
        const selected_numbers = element.selected_numbers.toString().split(',')
        const max_ = getMaximumPayout(element.stake, selected_numbers.length)
        if( max_ < min_pay){
            min_pay = max_
        }
    }
    return min_pay
}

export function AddToBetSlip( setDisableBetSlip: Function, setBetSlip: Function, selectedNumbers: number[], subBillList: SubBillType[], stake: number){
    setBetSlip(null)
    let selected_numbers: { numbers: number[]; stake: number }[] = []
    if(subBillList.length == 0){
        selected_numbers = [{"numbers":selectedNumbers, "stake":stake}]
    }
    else if(subBillList.length > 0){
        selected_numbers = subBillList.map((element) => {
            return {"numbers":element.selected_numbers, "stake":element.stake}
        })
    }
    if(selectedNumbers.length > 0 || subBillList.length > 0){     
        setDisableBetSlip(true)       
        axios.post(MainUrl+'/casher/add_bill',
            {
                "game_id": 200,
                "selected_numbers" : selected_numbers,
                "stake": stake,
            }
        )
        .then((response) => {
            setBetSlip(response.data)
            setDisableBetSlip(false)
        })
        .catch(error => {
            console.log('AddToBetSlip error catch');
            console.error(error);
            setDisableBetSlip(false)
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
