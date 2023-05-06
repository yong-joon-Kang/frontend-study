export interface ValidationProps {
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
}
