import { Fragment } from "react"
import { max_selectedNumbers, numberWithOdd } from "./Ticketing.util"
import axios from "axios"

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
    if(length === 1 || length === 2){
        // setMinPayOut(stake * numberWithOdd[length])
        return stake * numberWithOdd[length]
    }
    else if(length === 3 || length === 4 || length === 4){
        // setMinPayOut(stake * numberWithOdd[2])
        return stake * numberWithOdd[2]
    }
    else if(length === 6){
        // setMinPayOut(stake * numberWithOdd[3])
        return stake * numberWithOdd[3]
    }
    return 0
}


export function AddToBetSlip( setBetSlip: Function, selectedNumbers: number[]){
    setBetSlip(null)
    if(selectedNumbers.length > 0){            
        axios.post('http://127.0.0.1:8000/casher/add_bill',
            {
                "game_id": 200,
                "selected_numbers" : selectedNumbers
            }
        )
        .then((response) => {
            setBetSlip(response.data)
        })
        .catch(error => {
            console.log('AddToBetSlip error catch');
            console.error(error);
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
