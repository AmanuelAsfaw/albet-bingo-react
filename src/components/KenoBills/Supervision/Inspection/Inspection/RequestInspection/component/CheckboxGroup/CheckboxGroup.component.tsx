import React, { FC, useEffect, useState } from "react";
import { Checkbox } from "antd";

const CheckboxComponent: FC<any> = ({
  id,
  inspection_itemsAction,
  handleChange,
}) => {
  const [value, setValue] = useState<any>(null);
  const [inspection_items] = inspection_itemsAction;

  useEffect(() => {
    if (value !== null) handleChange(id, value);
  }, [handleChange, id, value]);

  const onChange = (e: any) => {
    setValue(e.target.value);
  };

  const checkIsChecked = (name: string) => {
    const index: number = inspection_items.findIndex(
      (ele: any) => ele.inspection_form_item_id === id
    );

    if (index === -1) return false;
    else {
      return inspection_items[index].value === name;
    }
  };

  return (
    <div className="row align-content-end" style={{ width: 150 }}>
      <div className="col-4">
        <Checkbox
          name="C"
          value="C"
          onChange={onChange}
          checked={checkIsChecked("C")}
          disabled={false}
        />
      </div>

      <div className="col-4">
        <Checkbox
          name="NC"
          value="NC"
          onChange={onChange}
          checked={checkIsChecked("NC")}
          disabled={false}
        />
      </div>

      <div className="col-4">
        <Checkbox
          name="NA"
          value="NA"
          onChange={onChange}
          checked={checkIsChecked("NA")}
          disabled={false}
        />
      </div>
    </div>
  );
};

export default CheckboxComponent;
