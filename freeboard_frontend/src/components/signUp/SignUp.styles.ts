import styled from "@emotion/styled";
import { ISignUpBtnProps } from "./SignUp.types";

export const Wrap = styled.div`
  margin: 100px auto;
  width: 400px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  background-color: #fff;
  padding: 69px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const SubWrap = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  flex-direction: column;
`;

export const Input = styled.input`
  outline: none;
  height: 40px;
  font-size: 16px;
  border: none;
  border-bottom: 1px solid #aaa;
`;

export const ErrorMsg = styled.div`
  color: red;
  font-size: 14px;
`;

export const SignUpBtn = styled.div`
  cursor: pointer;
  width: 100%;
  background-color: ${(props: ISignUpBtnProps) =>
    props.isAbled ? "#53bd53" : "#aaa"};
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  margin-top: 30px;
`;
