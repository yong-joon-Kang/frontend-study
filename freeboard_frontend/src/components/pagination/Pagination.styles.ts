import styled from "@emotion/styled";
import { IPageProps } from "./Pagination.types";

export const PageWrap = styled.div`
  display: flex;
  justify-content: center;
`;

export const PageNum = styled.span`
  width: 35px;
  text-align: center;
  cursor: pointer;
  margin: 0 5px;
  color: ${(props: IPageProps) => (props.isActive ? "#ffd600" : "")};
  font-weight: ${(props: IPageProps) => (props.isActive ? "bold" : "")};
`;

export const PrevNextBtn = styled.span`
  cursor: pointer;
`;
