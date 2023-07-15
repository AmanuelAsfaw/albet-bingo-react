export type AutoCompleterPropType = {
  value?: any;
  options: { option: any; value: any; key: number }[];
  onChange: any;
  placeholder: string;
  label: string;
  name?:string
  rules?:any[]
};
