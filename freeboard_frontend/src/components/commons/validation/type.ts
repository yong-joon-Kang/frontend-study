export interface ValidationProps {
  control: any;
  name: string;
  required: boolean;
  maxLength: number;
  thousandSeparator?: boolean;
  placeholder: string;
}
