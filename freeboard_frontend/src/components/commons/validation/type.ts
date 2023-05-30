export interface ValidationProps {
  val: any;
  onChangeReactQuill?: (value: string) => void;
  ref?: any;
  pattern?: RegExp;
  defaultValue?: string | number | readonly string[] | undefined;
  register?: any;
  control?: any;
  name?: string;
  required?: boolean;
  maxLength: number;
  thousandSeparator?: boolean;
  placeholder: string;
  value?: string;
  onChange?: (value: string) => void;
}
