import { Card } from "antd";
import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import KenoGamesComponent from "../../components/KenoGames";

const KenoGamesContainer: FC<{}> = ({}) => {
  useEffect(() => {}, []);

  return (
    <>
      <KenoGamesComponent  />
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

export default connect(mapStateToProps, mapDispatchToProps)(KenoGamesContainer);
