import { NumericFormat } from "react-number-format";
import { Controller } from "react-hook-form";
import styled from "@emotion/styled";
import { ValidationProps } from "./type";

export const Input = styled.input`
  outline: none;
  flex: 1;
  font-size: 18px;
  border: none;
`;

function NumberFormat(props: ValidationProps) {
  return (
    <>
      <Controller
        control={props.control}
        name={props.name}
        rules={{ required: props.required, maxLength: props.maxLength }}
        render={({ field }) => (
          <NumericFormat
            {...field}
            thousandSeparator={props.thousandSeparator}
            placeholder={props.placeholder}
            style={{
              outline: "none",
              flex: "1",
              fontSize: "18px",
              border: "none",
            }}
          />
        )}
      />
    </>
  );
}

export default NumberFormat;
