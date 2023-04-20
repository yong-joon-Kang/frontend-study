import styled from "@emotion/styled";
import { ISignUpBtnProps } from "./SignUp.types";

export const Wrap = styled.div`
  margin: 100px auto;
  width: 400px;
  height: 550px;
  border: 1px solid #aaa;
  background-color: #f5f5f5;
  padding: 30px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const SubWrap = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

export const Label = styled.div`
  width: 100%;
  margin-bottom: 5px;
`;

export const Input = styled.input`
  outline: none;
  height: 40px;
  font-size: 16px;
  padding-left: 10px;
  border: 1px solid #aaa;
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
`;
