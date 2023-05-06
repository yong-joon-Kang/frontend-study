import styled from "@emotion/styled";
import { Controller } from "react-hook-form";
import { ValidationProps } from "./type";

export const ContentsInput = styled.textarea`
  width: 100%;
  height: 100%;
  font-size: 18px;
  border: none;
  outline: none;
  resize: none;
`;

function ContentsFormat(props: ValidationProps) {
  return (
    <>
      <Controller
        control={props.control}
        name={props.name}
        rules={{ required: props.required, maxLength: props.maxLength }}
        render={({ field }) => (
          <ContentsInput
            {...field}
            placeholder={props.placeholder}
            defaultValue={props.value}
          ></ContentsInput>
        )}
      />
    </>
  );
}

export default ContentsFormat;
