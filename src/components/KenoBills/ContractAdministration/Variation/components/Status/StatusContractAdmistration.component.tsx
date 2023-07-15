import { Tag } from "antd";
import moment from "moment";
import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { StatusPropType } from "../../util/Variation.util";

const StatusVariationComponent: FC<StatusPropType> = ({
    expiry_date
 }) => {
    const dateFormat = "DD-MM-YYYY";

    const Render = () => {
        const item: any[] = [];
        var ExpiryDate = moment(expiry_date,dateFormat)
        var result= ExpiryDate.diff(moment(), 'days')
        if (
            result > 30
        ) {
          item.push(
            <Tag color={"green"}>
              {"Active"}
            </Tag>
          );
        } else if (
          result >= 0 && result <= 30
        ) {
          item.push(
            <Tag color={"yellow"}>
              {"Active"}
            </Tag>
          );
        } else if (
           result < 0
        ) {
          item.push(
            <Tag color={"red"} key={item.length}>
              {"Inactive"}
            </Tag>
          );
        }
        return item;
      };
    
      return <>{Render()}</>;
};

/**
 * Map State to Props
 *
 * @param state
 */
const mapStateToProps = (state: any) => ({
 
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  
});

export default connect(mapStateToProps, mapDispatchToProps)(StatusVariationComponent);
