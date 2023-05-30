/* eslint-disable react/no-unknown-property */
import styled from "@emotion/styled";
import { ValidationProps } from "./type";
import { useEffect, useState } from "react";

export const Input = styled.input`
  outline: none;
  flex: 1;
  font-size: 18px;
  border: none;
`;

function RegisterPatternFormat(props: ValidationProps) {
  const [tagValue, setTagValue] = useState("");
  useEffect(() => {
    const value = props.val?.map((el: any) => `#${el}`).join(" ");
    setTagValue(value);
  }, [props]);

  const handleChange = (event: any) => {
    setTagValue(event.target.value);
  };

  return (
    <>
      <Input
        type="text"
        register={props.register}
        placeholder={props.placeholder}
        {...props.register("tags", {
          required: false,
          pattern: props.pattern,
        })}
        value={tagValue}
        onChange={handleChange}
      />
    </>
  );
}

export default RegisterPatternFormat;
