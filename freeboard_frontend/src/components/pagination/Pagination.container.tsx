import { useState, MouseEvent } from "react";
import PaginationPresenter from "./Pagination.presenter";
import { IProps } from "./Pagination.types";

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
    <PaginationPresenter
      onClickPage={onClickPage}
      onClickPrev={onClickPrev}
      onClickNext={onClickNext}
      activedPage={activedPage}
      startPage={startPage}
      lastPageNum={lastPageNum}
    />
  );
}

export default Pagination;
