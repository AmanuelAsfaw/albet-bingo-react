import { Checkbox } from "antd";
import { FC, useEffect, useState } from "react";
import {
  Inspection,
  InspectionItem,
} from "../../../../../../../../redux/Inspection/Inspection.type";

const CheckboxComponent: FC<{
  inspection_item: InspectionItem;
  inspection: Inspection | null;

  checkAllValueAction: any;
  handleChange: Function;
}> = ({
  inspection_item,
  handleChange,
  inspection,

  checkAllValueAction,
}) => {
  const [value, setValue] = useState<any>(inspection_item.value);

  const [checkAllValue, checkAllSetValue] = checkAllValueAction;

  useEffect(() => {
    if (value !== null) handleChange(inspection_item.id, value);
  }, [value]);

  const onChange = (e: any) => {
    if (checkAllValue && e.target.value !== checkAllValue)
      checkAllSetValue(null);

    setValue(e.target.value);
  };

  const checkIsChecked = (name: string) => {
    const index: any = inspection?.inspection_items.findIndex(
      (e) => e.id === inspection_item.id
    );

    if (index === -1) return false;
    else {
      return inspection?.inspection_items[index].value === name;
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
