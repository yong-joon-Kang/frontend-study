import styled from "@emotion/styled";
import { StyleToPresenterProps } from "./OneRow.types";

export const Wrap = styled.div`
  display: flex;
  border: 1px solid;
  justify-content: space-between;
`;

export const Part = styled.div`
  width: ${(props: StyleToPresenterProps) =>
    props.isImgPart ? "100px" : "auto"};
  display: flex;
  flex-direction: column;
  flex: ${(props: StyleToPresenterProps) => (props.isMiddle ? 1 : 0.1)};
  ${(props: StyleToPresenterProps) =>
    props.isRight ? "text-align: center; justify-content: center;" : ""};
`;

export const Img = styled.img`
  width: 100%;
`;

export const PartTitle = styled.div`
  width: 100%;
`;

export const PartContents = styled.div`
  width: 100%;
`;

export const PartTags = styled.div`
  width: 100%;
`;
