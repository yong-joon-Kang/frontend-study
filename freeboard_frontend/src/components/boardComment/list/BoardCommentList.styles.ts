import styled from "@emotion/styled";
import { Rate } from "antd";
import { mideaQuery } from "../../../../styles/common";

export const Wrapper = styled.div`
  width: 1200px;
  margin: 50px;
  border-top: 1px solid #aaa;
  padding-top: 30px;

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

export const StarRate = styled(Rate)`
  margin-left: 20px;
`;

export const CommentListWrap = styled.div``;

export const CommentList = styled.div`
  border-bottom: 1px solid #aaa;
  height: 100px;
  margin-bottom: 10px;
`;

export const CommentHeader = styled.div`
  display: flex;
  position: relative;
  width: 100%;
`;

export const ProfileImg = styled.img`
  height: 50px;
  margin-right: 10px;
`;

export const MiddleWrap = styled.div``;

export const Writer = styled.div``;

export const Contents = styled.div``;

export const Date = styled.div`
  color: #aaa;
  font-size: 13px;
  margin-top: 10px;
`;

export const UpdateBtn = styled.img`
  height: 20px;
  cursor: pointer;
`;

export const DeleteBtn = styled.img`
  height: 20px;
  cursor: pointer;
`;

export const RightWrap = styled.div`
  position: absolute;
  right: 0;
`;
