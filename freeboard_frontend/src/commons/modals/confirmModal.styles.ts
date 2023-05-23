import styled from "@emotion/styled";
import { color } from "../../../styles/common";

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
  background-color: ${(props) => (props.isCancel ? "#ddd" : color.primary)};
  border-radius: 5px;
  width: ${(props) => (props.btnFnc === "charging" ? "100%" : "50px")};
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${(props) => (props.btnFnc === "charging" ? "40px" : "30px")};
  margin-left: ${(props) => props.btnFnc !== "charging" && "7px"};
  font-weight: bold;
  cursor: pointer;

  &:hover {
    opacity: 75%;
  }
`;
