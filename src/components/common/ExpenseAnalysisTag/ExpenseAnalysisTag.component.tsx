import Tag from "antd/lib/tag";
import { FC } from "react";
import {
  BudgetStatus,
  ExpenseAnalysisType,
} from "../../../constants/Constants";

const ExpenseAnalysisTagComponent: FC<{
  planned: number;
  performed: number;
  type: string;
}> = ({ performed, planned, type }) => {
  const renderType = () => {
    if (planned && planned > 0) {
      if (type === ExpenseAnalysisType.PERFORMANCE) {
        if (planned - performed > 0) {
          return <Tag color="red">{BudgetStatus.UNDER_PERFORMED}</Tag>;
        } else if (planned === performed)
          return <Tag color="green">{BudgetStatus.PERFORMED_AS_PLANNED}</Tag>;
        else {
          return <Tag color="blue">{BudgetStatus.OVER_PERFORMED}</Tag>;
        }
      } else {
        if (planned - performed < 0) {
          return <Tag color="red">{BudgetStatus.OVER_BUDGET}</Tag>;
        } else if (planned - performed > 0)
          return <Tag color="green">{BudgetStatus.UNDER_BUDGET}</Tag>;
        else {
          return <Tag color="blue">{BudgetStatus.ON_BUDGET}</Tag>;
        }
      }
    } else return <Tag color="orange">{BudgetStatus.UNDETERMINED}</Tag>;
  };

  return renderType();
};
export default ExpenseAnalysisTagComponent;
