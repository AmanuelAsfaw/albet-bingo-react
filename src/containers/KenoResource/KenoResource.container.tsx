import { Card } from "antd";
import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import KenoResourceComponent from "../../components/KenoResource";

const KenoBillsContainer: FC<{}> = ({}) => {
  useEffect(() => {}, []);

  return (
    <>
      <KenoResourceComponent  />
    </>
  );
};

/**
 * Map State to Props
 *
 * @param state
 */
const mapStateToProps = (state: any) => ({});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(KenoBillsContainer);
