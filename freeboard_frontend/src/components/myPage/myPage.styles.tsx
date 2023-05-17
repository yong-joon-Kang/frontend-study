import { color } from "../../../styles/common";
import styled from "@emotion/styled";

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

export const ProfileImg = styled.img`
  width: 80px;
  height: 80px;
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
  font-weight: ${(props) => (props.isHeader || props.isName) && "bold"};
  font-size: ${(props) => props.isName && "1.3em"};
`;

export const MyUseditemsTab = styled.span`
  cursor: pointer;
  ${(props) =>
    props.clickedTab === "fetchUseditemsISold" &&
    `border-bottom:2px solid ${color.primary}`}
`;

export const MyPickedTab = styled.span`
  cursor: pointer;
  ${(props) =>
    props.clickedTab === "fetchUseditemsIPicked" &&
    `border-bottom:2px solid ${color.primary}`}
`;

export const LabelWrap = styled.span`
  display: flex;
  align-items: center;
  ${(props) => (props.isWrap1 ? "margin-top: 10px;" : "margin-bottom: 23px")};
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
