import styled from "@emotion/styled";
import { StyleToPresenterProps } from "./OneRow.types";
import { HeartFilled } from "@ant-design/icons";

export const Wrap = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #ccc;
  cursor: pointer;
  :hover {
    background-color: #eee;
  }
`;

export const Part = styled.div`
  width: ${(props: StyleToPresenterProps) =>
    props.isImgPart ? "100px" : "auto"};
  display: flex;
  flex-direction: column;
  flex: ${(props: StyleToPresenterProps) => (props.isMiddle ? 1 : 0.2)};
  padding-left: ${(props: StyleToPresenterProps) =>
    props.isMiddle ? "10px" : ""};
  ${(props: StyleToPresenterProps) =>
    props.isRight ? "text-align: center; justify-content: center;" : ""};
  width: 150px;
  height: 150px;
  padding: 10px;
  justify-content: center;
`;

export const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

export const PartTitle = styled.div`
  width: 700px;
  font-size: 20px;
  margin-bottom: 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const PartContents = styled.div`
  width: 700px;
  font-size: 14px;
  margin-bottom: 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const PartTags = styled.div`
  width: 100%;
  font-size: 14px;
  color: #bbb;
  margin-bottom: 10px;
`;

export const SellerPicture = styled.img`
  width: 40px;
  border-radius: 30px;
  margin-right: 5px;
`;

export const LikeIcon = styled(HeartFilled)`
  color: #ffd600;
  margin: 0 5px 0 15px;
`;

export const Price = styled.span`
  font-size: 18px;
  font-weight: bold;
`;

export const PartBottom = styled.span``;
