import styled from "@emotion/styled";
import { ISubmitBtnProps } from "./BoardWrite.types";

export const Wrapper = styled.div`
  width: 1200px;
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
  display: flex;
  justify-content: space-between;
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

export const WriterInput = styled.input`
  width: 560px;
  height: 52px;
  border: 1px solid #bdbdbd;
  padding-left: 15px;
`;

export const TitleInput = styled.input`
  width: 1182px;
  height: 52px;
  border: 1px solid #bdbdbd;
  padding-left: 15px;
  margin-bottom: 10px;
`;

export const ContentsInput = styled.textarea`
  width: 1170px;
  height: 380px;
  border: 1px solid #bdbdbd;
  resize: none;
  padding: 15px;
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

export const UploadBtn = styled.button`
  height: 78px;
  width: 78px;
  backrground: #bdbdbd;
  border: 1px solid #bdbdbd;
  margin-right: 20px;
  cursor: pointer;
`;

export const Plus = styled.div`
  font-size: 24px;
`;

export const UploadText = styled.div`
  font-size: 16px;
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
    if (props.isActive === true) {
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
