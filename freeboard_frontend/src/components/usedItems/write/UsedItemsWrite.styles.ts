import styled from "@emotion/styled";
import { ICssprops, ISubmitBtnProps } from "./UsedItemsWrite.types";

export const Wrapper = styled.div`
  width: 60%;
  margin: 50px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.2);
  padding: 50px;
  display: flex;
  flex-direction: column;
`;

export const HeaderTitle = styled.div`
  font-family: "Noto Sans CJK KR";
  font-style: normal;
  font-weight: 700;
  font-size: 36px;
  line-height: 53px;
  text-align: center;
`;

export const WriterWrap = styled.div`
  margin-top: 50px;
`;

export const SubWrap = styled.div`
  width: 100%;
  margin: 50px 0;
`;

export const RightWrap = styled.div`
  float: right;
`;

export const LeftWrap = styled.div`
  float: left;
`;

export const Label = styled.div`
  font-family: "Noto Sans CJK KR";
  font-style: normal;
  font-size: 16px;
  width: 100%;
  margin-bottom: 10px;
`;

export const InputWrap = styled.div`
  padding: 10px;
  width: 100%;
  height: ${(props: ICssprops) => (props.isContent ? "250px" : "42px")};
  border: 1px solid #bdbdbd;
  display: flex;
`;

export const Input = styled.input`
  outline: none;
  flex: 1;
  font-size: 18px;
  border: none;
`;

export const ContentsInput = styled.textarea`
  width: 100%;
  height: 100%;
  font-size: 18px;
  border: none;
  outline: none;
  resize: none;
`;

export const AddrNumInput = styled.input`
  float: left;
  border: 1px solid #bdbdbd;
  margin-right: 20px;
  width: 50px;
  height: 52px;
  padding-left: 15px;
  margin-bottom: 10px;
`;

export const AddrNumBtn = styled.button`
  float: left;
  width: 120px;
  height: 56px;
  background: #000;
  border: 1px solid #000;
  color: #fff;
  cursor: pointer;
`;

export const RadioBtn = styled.input`
  cursor: pointer;
`;

export const SubmitWrap = styled.div`
  width: 100%;
  justify-content: center;
  display: flex;
`;

export const SubmitBtn = styled.button`
  background: ${(props: ISubmitBtnProps) => {
    if (props.isActive) {
      return "#FFD600";
    } else {
      return "#BDBDBD";
    }
  }};
  width: 170px;
  height: 52px;
  border: none;
  font-weight: bold;
  cursor: pointer;
`;
export const ErrorText = styled.div`
  color: red;
`;

export const UploadWrap = styled.div`
  display: flex;
  flex-direction: row;
`;
