import React, { FC, useEffect, useState } from "react";
import { Checkbox, Form, Input } from "antd";
import { getUserData } from "../../../../../../../../utilities/utilities";

const CheckboxComponent: FC<any> = ({ id }) => {
  return (
    <div className="row align-content-end" style={{ width: 150 }}>
      <div className="col-4">
        <Checkbox name="C" value="C" disabled={true} />
      </div>

      <div className="col-4">
        <Checkbox name="NC" value="NC" disabled={true} />
      </div>

      <div className="col-4">
        <Checkbox name="NA" value="NA" disabled={true} />
      </div>
    </div>
  );
};

export default CheckboxComponent;
