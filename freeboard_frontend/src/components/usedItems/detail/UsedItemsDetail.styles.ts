import { LikeOutlined, DislikeOutlined } from "@ant-design/icons";
import styled from "@emotion/styled";
import { LikeType } from "./UsedItemsDetail.types";
import { mideaQuery } from "../../../../styles/common";

export const Wrapper = styled.div`
  width: 1200px;
  margin: 50px;

  @media (max-width: ${mideaQuery.width1300}) {
    width: ${mideaQuery.width1000};
  }

  @media (max-width: ${mideaQuery.width1100}) {
    width: ${mideaQuery.width800};
  }

  @media (max-width: ${mideaQuery.width900}) {
    width: ${mideaQuery.width600};
  }

  @media (max-width: ${mideaQuery.width700}) {
    width: ${mideaQuery.width500};
  }
`;

export const CardWrapper = styled.div`
  min-height: 847px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.2);
  padding: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Header = styled.div`
  width: 100%;
  padding-bottom: 10px;
  border-bottom: 1px solid #bdbdbd;
`;

export const HeadLeft = styled.div`
  float: left;
  width: 30%;
  align-items: center;
  display: flex;
`;

export const ProfileImg = styled.img`
  width: 50px;
  margin-right: 10px;
`;

export const ProfileDetailWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ContentHeader = styled.div``;

export const ContentsRight = styled.div`
  float: right;
`;

export const ContentsLeft = styled.div`
  float: left;
`;

export const Remarks = styled.div`
  font-size: 20px;
  color: #bbb;
  margin-bottom: 15px;
`;

export const Name = styled.div`
  font-size: 2em;
  margin-bottom: 30px;
`;

export const Price = styled.div`
  font-size: 2em;
  margin-bottom: 30px;
  font-weight: bold;
`;

export const ProfileName = styled.div`
  padding-left: 3px;
`;

export const ProfileDate = styled.div``;

export const LinkImg = styled.img``;

export const LocationImg = styled.img`
  float: right;
`;

export const HeadRight = styled.div`
  float: right;
`;

export const Contents = styled.div`
  width: 100%;
  padding: 30px 0 0 30px;
  display: flex;
  flex-direction: column;
`;

export const Footer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 100px;
`;

export const LikeWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 30px;
  color: ${(props: LikeType) => (props.isLikeIcon ? "#ffd600;" : "#828282")};
  cursor: pointer;
  font-size: 50px;
`;

export const LikeIcon = styled(LikeOutlined)`
  font-size: 25px;
`;

export const LikeCnt = styled.span`
  font-size: 16px;
`;

export const DislikeIcon = styled(DislikeOutlined)`
  font-size: 25px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 50px;
`;

export const Button = styled.div`
  border: 1px solid black;
  width: 200px;
  height: 40px;
  justify-content: center;
  display: flex;
  align-items: center;
  margin: 0 15px;
  cursor: pointer;
`;

export const UploadImg = styled.img`
  width: 300px;
`;
