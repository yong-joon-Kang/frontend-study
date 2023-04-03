import styled from "@emotion/styled";
import { useState, MouseEvent } from "react";

const PageWrap = styled.div`
  display: flex;
`;

const PageNum = styled.span`
  width: 35px;
  text-align: center;
  cursor: pointer;
  margin: 0 5px;
  color: ${(props: IPageProps) => (props.isActive ? "#ffd600" : "")};
  font-weight: ${(props: IPageProps) => (props.isActive ? "bold" : "")};
`;

const PrevNextBtn = styled.span`
  cursor: pointer;
`;

interface IProps {
  refetch: any;
  count: number | undefined;
}

interface IPageProps {
  isActive: boolean;
}

function Pagination(props: IProps) {
  const [startPage, setStartPage] = useState(1);
  const [activedPage, setActivedPage] = useState(1);

  const lastPageNum = props.count ? Math.ceil(props.count / 10) : 0;

  const onClickPage = (event: MouseEvent<HTMLSpanElement>) => {
    props.refetch({ page: Number(event.currentTarget.id) });
    setActivedPage(Number(event.currentTarget.id));
  };

  const onClickPrev = () => {
    if (startPage === 1) return;
    setStartPage((prev) => prev - 10);
    props.refetch({ page: startPage - 10 });
    setActivedPage(startPage - 10);
  };

  const onClickNext = () => {
    if (startPage + 10 > lastPageNum) return;
    setStartPage((prev) => prev + 10);
    props.refetch({ page: startPage + 10 });
    setActivedPage(startPage + 10);
  };
  return (
    <PageWrap>
      <PrevNextBtn onClick={onClickPrev}>이전</PrevNextBtn>
      {new Array(10).fill(1).map(
        (el, index) =>
          index + startPage <= lastPageNum && (
            <PageNum
              key={index + startPage}
              id={String(index + startPage)}
              onClick={onClickPage}
              isActive={activedPage === index + startPage}
            >
              {index + startPage}
            </PageNum>
          )
      )}
      <PrevNextBtn onClick={onClickNext}>다음</PrevNextBtn>
    </PageWrap>
  );
}

export default Pagination;
