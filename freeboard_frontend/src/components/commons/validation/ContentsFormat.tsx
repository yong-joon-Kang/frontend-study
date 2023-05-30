// import styled from "@emotion/styled";
import { Controller } from "react-hook-form";
import { ValidationProps } from "./type";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { useMemo } from "react";
import styled from "@emotion/styled";

export const ErrorText = styled.div`
  color: red;
`;

// export const ContentsInput = styled.textarea`
//   width: 100%;
//   height: 100%;
//   font-size: 18px;
//   border: none;
//   outline: none;
//   resize: none;
// `;

function ContentsFormat(props: ValidationProps) {
  const ReactQuill = dynamic(async () => await import("react-quill"), {
    ssr: false,
  });

  const MemoizedReactQuill = useMemo(() => ReactQuill, []);

  const contentsValue = props.watch("contents");

  return (
    <>
      <Controller
        name="contents"
        control={props.control}
        rules={{ required: true, maxLength: props.maxLength }}
        render={({ field }) => (
          <MemoizedReactQuill
            placeholder={props.placeholder}
            style={{ height: "300px", marginBottom: "100px" }}
            theme="snow"
            defaultValue={props.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
          />
        )}
      />
      {props.errors.contents?.type === "required" && (
        <ErrorText>상품설명을 입력해주세요.</ErrorText>
      )}
      {props.isSubmitted &&
        !props.errors.contents &&
        contentsValue === "<p><br></p>" && (
          <ErrorText>상품설명을 입력해주세요.</ErrorText>
        )}
      {props.errors.contents?.type === "maxLength" && (
        <ErrorText>상품설명은 1000글자 이하로 입력해주세요.</ErrorText>
      )}
    </>
  );
}

export default ContentsFormat;
