import styled from "@emotion/styled";
import { color } from "../../../styles/common";
import { cssProps } from "./confirmModal.types";

export const Header = styled.div`
  text-align: center;
  margin: 40px 0 20px 0;
  font-weight: bold;
  font-size: 16px;
`;

export const Img = styled.img`
  width: 70px;
  margin-bottom: 20px;
`;

export const Footer = styled.div`
  display: flex;
  margin-top: 50px;
  justify-content: flex-end;
`;

export const Button = styled.div`
  background-color: ${(props: cssProps) =>
    props.isCancel ? "#ddd" : color.primary};
  border-radius: 5px;
  width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  margin-left: 5px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    opacity: 75%;
  }
`;
