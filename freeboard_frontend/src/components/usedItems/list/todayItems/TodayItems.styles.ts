import styled from "@emotion/styled";
import { HeartFilled } from "@ant-design/icons";

export const Wrap = styled.div`
  position: absolute;
  right: -240px;
  top: 123px;
  border: 1px solid;
  width: 160px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
`;

export const Title = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

export const ItemWrap = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  height: 200px;
  width: 100%;
  margin: 10px 0;
  padding: 10px;
`;

export const Img = styled.img`
  width: 100px;
`;

export const PartTitle = styled.div`
  font-size: 18px;
  width: 160px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const PartContents = styled.div`
  font-size: 15px;
  color: #4f4f4f;
  width: 160px;
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
export const Price = styled.span`
  font-size: 18px;
  font-weight: bold;
`;

export const LikeIcon = styled(HeartFilled)`
  color: #ffd600;
  margin: 0 5px 0 15px;
`;

export const LikeWrap = styled.div`
  text-align: right;
`;

export const ImgWrap = styled.div`
  width: 100%;
  height: 100px;
  text-align: center;
`;
