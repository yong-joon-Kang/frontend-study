import * as S from "./Pagination.styles";
import { IContainerProps } from "./Pagination.types";
function PaginationPresenter(props: IContainerProps) {
  return (
    <S.PageWrap>
      <S.PrevNextBtn onClick={props.onClickPrev}>이전</S.PrevNextBtn>
      {new Array(10).fill(1).map(
        (_el, index) =>
          index + props.startPage <= props.lastPageNum && (
            <S.PageNum
              key={index + props.startPage}
              id={String(index + props.startPage)}
              onClick={props.onClickPage}
              isActive={props.activedPage === index + props.startPage}
            >
              {index + props.startPage}
            </S.PageNum>
          )
      )}
      <S.PrevNextBtn onClick={props.onClickNext}>다음</S.PrevNextBtn>
    </S.PageWrap>
  );
}

export default PaginationPresenter;
