import { ICurrLengthProps } from "./BoardCommentWrite.types";
import styled from "@emotion/styled";
import { Rate } from "antd";
import { mideaQuery } from "../../../../styles/common";

export const Wrapper = styled.div`
  width: 1200px;
  margin: 30px 0;
  padding-top: 30px;
  position: relative;

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

export const CommentWriteWrap = styled.div``;

export const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

export const StarRate = styled(Rate)`
  display: block;
  margin-bottom: 20px;
`;

export const WriterInput = styled.input`
  height: 30px;
  border: 1px solid #bdbdbd;
  outline: none;
  margin-right: 20px;
  margin-bottom: 20px;
  padding-left: 10px;
`;

export const CommentImg = styled.img`
  height: 25px;
  margin-right: 5px;
`;

export const StarScore = styled.div``;

export const TextAreaWrap = styled.div`
  border: 1px solid #bdbdbd;
  height: 140px;
  width: 100%;
`;

export const TextArea = styled.textarea`
  resize: none;
  width: 98%;
  height: 90px;
  border: none;
  overflow: hidden;
  outline: none;
  padding: 15px 0 0 15px;
`;

export const ContentsLength = styled.span`
  color: #aaa;
  padding-left: 10px;
`;

export const CurrLength = styled.span`
  ${(props: ICurrLengthProps) => {
    if (Number(props.length) > 100) {
      return "color: red; font-weight: bold";
    } else if (Number(props.length) > 70) {
      return "color: orange";
    } else {
      return "color: #aaa";
    }
  }}
`;

export const MaxLength = styled.span``;

export const WriteBtn = styled.button`
  float: right;
  width: 100px;
  height: 32px;
  background: #000;
  color: #fff;
`;

export const DeleteBtn = styled.img`
  height: 20px;
  cursor: pointer;
  position: absolute;
  right: 0;
`;
