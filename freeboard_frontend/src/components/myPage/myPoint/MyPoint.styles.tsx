import { color } from "../../../../styles/common";
import styled from "@emotion/styled";
import { cssProps } from "./MyPoint.types";

export const Wrap = styled.div`
  display: flex;
`;

export const MyInfoWrap = styled.div`
  width: 200px;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 30px;
`;

export const MyListWrap = styled.div``;

export const Table = styled.div`
  border-top: 1px solid #111;
  border-bottom: 1px solid #111;
`;

export const ListHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

export const HeaderRightWrap = styled.div``;

export const OneRow = styled.div`
  width: 100%;
  border: 1px solid;
  display: flex;
`;

export const Label = styled.span`
  font-weight: ${(props: cssProps) =>
    (props.isHeader ?? props.isName) && "bold"};
  font-size: ${(props) => props.isName && "1.3em"};
`;

export const MyUseditemsTab = styled.span`
  cursor: pointer;
  ${(props: cssProps) =>
    props.clickedTab === "fetchUseditemsISold" &&
    `border-bottom:2px solid ${color.primary};`};

  color: ${(props) =>
    props.clickedTab === "fetchUseditemsISold" ? "#000" : "#ccc"};
`;

export const MyPickedTab = styled.span`
  cursor: pointer;
  ${(props: cssProps) =>
    props.clickedTab === "fetchUseditemsIPicked" &&
    `border-bottom:2px solid ${color.primary}`};

  color: ${(props) =>
    props.clickedTab === "fetchUseditemsIPicked" ? "#000" : "#ccc"};
`;

export const searchInput = {
  flex: "1",
  marginLeft: "30px",
};

export const row = {
  width: "800px",
  height: "50px",
};

export const tdCss = {
  borderTop: "1px solid #ddd",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
