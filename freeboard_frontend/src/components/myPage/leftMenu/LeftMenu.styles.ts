import styled from "@emotion/styled";
import { CssProps } from "./LeftMenu.types";
import { color } from "../../../../styles/common";

export const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 100px;
`;

export const Title = styled.div`
  font-weight: bold;
  margin-bottom: 48px;
  font-size: 1.5em;
`;

export const Img = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 5px;
`;

export const ProfileRadius = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ProfileImgWrap = styled.div`
  position: relative;
`;

export const SettingImg = styled.img`
  width: 25px;
  height: 25px;
  position: absolute;
  bottom: 0px;
  right: 0px;
  cursor: pointer;
`;

export const ProfileImg = styled.img`
  width: 100%;
  height: 100%;
`;

export const MyInfoSubWrap1 = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 28px 0 76.5px 0;
`;

export const MyInfoSubWrap2 = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.span`
  font-weight: ${(props: CssProps) =>
    (props.isHeader ?? props.isName) && "bold"};
  font-size: ${(props) => props.isName && "1.3em"};
`;

export const Charging = styled.span`
  border-radius: 10%;
  padding: 5px 10px;
  background-color: ${color.primary};
  color: #111;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const LabelWrap = styled.span`
  display: flex;
  align-items: center;
  ${(props: CssProps) =>
    props.isWrap1 ? "margin-top: 10px;" : "margin-bottom: 23px"};
`;
