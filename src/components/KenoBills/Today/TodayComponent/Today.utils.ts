import axios from "axios";
import { ApiCallState } from "../../../../redux/Utils";
import { API_BASE_URI } from "../../../../redux/ApiCall";
import { Category } from "../../../../redux/Category/Category.type";
import { KenoBill } from "../../../../redux/KenoBills/KenoBill.type";
import { TodayKenoBill } from "../../../../redux/KenoBills/Today/Today.type";
import { getMaximumPayout, getMaximumPayoutForList, getMinimumPayout, getMinimumPayoutForList } from "../../../Ticketing/util/Tecketing.UI.util";

export type CategoryPropType = {
  category: ApiCallState<Category[]>;
  fetchAll: Function;
};
export type TodayPropType = {
  today_bills: ApiCallState<KenoBill[]>;
  fetchAll: Function;
};
export type AddCategoryPropType = {
  fetchAll: Function;
};

export type EditCategoryType = {
  category: ApiCallState<Category>;
  fetchAll: Function;
  fetchOne: Function;
  id?: number;
};

export const sendCategory = (data: any) =>
  axios.post(API_BASE_URI + "/category", data);

export const deleteCategory = (id: any) =>
  axios.delete(API_BASE_URI + `/category/${id}`);

  
export const returnPrintUrl = (bill:TodayKenoBill) => {
  const time = new Date(bill.date);
  if(bill.has_multiple){
    console.log(bill.sub_bills);
    var str_sub_bills = ''
    for (let index = 0; index < bill.sub_bills.length; index++) {
      const element = bill.sub_bills[index];
      const length_ = element.selected_numbers.toString().split(',').length
      str_sub_bills = str_sub_bills +'?len='+length_+'&stake='+element.stake+'&'+element.selected_numbers.toString().split(',').join('&')
    }
    return "albet://type=5&game="+bill.game.game_number+"&ticket="+bill.unique_key+"&stack="+bill.stake
    +"&minpay="+getMinimumPayoutForList(bill.sub_bills)+"&maxpay="+getMaximumPayoutForList(bill.sub_bills)+"&date="+time.getTime()+"&casher="+bill.casher.user.username
    +"&branch="+bill.casher.branch.title+"&odd="+3.5+str_sub_bills
  }
  else{
    const selected_numbers = bill.selected_numbers.toString().split(',')
    return "albet://type=1&game="+bill.game.game_number+"&ticket="+bill.unique_key+"&stack="+bill.stake
    +"&minpay="+getMinimumPayout(bill.stake, selected_numbers.length)+"&maxpay="+getMaximumPayout(bill.stake,selected_numbers.length)+"&date="+time.getTime()+"&casher="+bill.casher.user.username
    +"&branch="+bill.casher.branch.title+"&odd="+3.5+"?"+ selected_numbers.join("&");
  }
}