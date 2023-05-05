import styled from "@emotion/styled";
import { Controller } from "react-hook-form";
import { ValidationProps } from "./type";

export const Input = styled.input`
  outline: none;
  flex: 1;
  font-size: 18px;
  border: none;
`;

function DefaultFormat(props: ValidationProps) {
  return (
    <>
      <Controller
        control={props.control}
        name={props.name}
        rules={{ required: props.required, maxLength: props.maxLength }}
        render={({ field }) => (
          <Input {...field} placeholder={props.placeholder}></Input>
        )}
      />
    </>
  );
}

export default DefaultFormat;
