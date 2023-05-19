import styled from "@emotion/styled";

export const Wrap = styled.div`
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

export const Label = styled.span`
  font-weight: ${(props) => (props.isHeader || props.isName) && "bold"};
  font-size: ${(props) => props.isName && "1.3em"};
`;

export const LabelWrap = styled.span`
  display: flex;
  align-items: center;
  ${(props) => (props.isWrap1 ? "margin-top: 10px;" : "margin-bottom: 23px")};
`;
