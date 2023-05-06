/* eslint-disable react/no-unknown-property */
import styled from "@emotion/styled";
import { ValidationProps } from "./type";

export const Input = styled.input`
  outline: none;
  flex: 1;
  font-size: 18px;
  border: none;
`;

function RegisterPatternFormat(props: ValidationProps) {
  return (
    <>
      <Input
        type="text"
        register={props.register}
        // name="tags"
        defaultValue={props.defaultValue}
        placeholder={props.placeholder}
        {...props.register("tags", {
          required: false,
          pattern: props.pattern,
        })}
      />
    </>
  );
}

export default RegisterPatternFormat;
