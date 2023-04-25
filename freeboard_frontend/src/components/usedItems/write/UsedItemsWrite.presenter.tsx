import ImageUpload from "../../../commons/imageUpload/ImageUpload.container";
import * as S from "./UsedItemsWrite.styles";
import { IUsedItemsPresenterPageProps } from "./UsedItemsWrite.types";
import { v4 as uuidv4 } from "uuid";

export default function BoardWritePresenterPage(
  props: IUsedItemsPresenterPageProps
) {
  // const fetchBoard = props.fetchBoardDataList?.fetchBoard;
  return (
    <S.Wrapper>
      <form onSubmit={props.handleSubmit(props.onClickSubmit)}>
        <S.HeaderTitle>
          {props.isEdit ? "게시물 수정" : "상품 등록"}
        </S.HeaderTitle>
        <S.WriterWrap>
          <S.Label>상품명</S.Label>
          <S.InputWrap>
            <S.Input
              type="text"
              placeholder="상품명을 적어주세요."
              {...props.register("name")}
            />
          </S.InputWrap>
          <S.ErrorText>{props.writerErr}</S.ErrorText>
        </S.WriterWrap>
        <S.SubWrap>
          <S.Label>한줄요약</S.Label>
          <S.InputWrap>
            <S.Input
              type="text"
              placeholder="한줄요약을 적어주세요."
              {...props.register("remarks")}
            />
          </S.InputWrap>
          <S.ErrorText>{props.titleErr}</S.ErrorText>
        </S.SubWrap>
        <S.SubWrap>
          <S.Label>상품설명</S.Label>
          <S.InputWrap isContent={true}>
            <S.ContentsInput
              placeholder="상품설명을 적어주세요."
              {...props.register("contents")}
            />
          </S.InputWrap>
          <S.ErrorText>{props.contentsErr}</S.ErrorText>
        </S.SubWrap>
        <S.SubWrap>
          <S.Label>판매가격</S.Label>
          <S.InputWrap>
            <S.Input
              type="text"
              placeholder="판매가격을 적어주세요."
              {...props.register("price")}
            />
          </S.InputWrap>
          <S.ErrorText>{props.titleErr}</S.ErrorText>
        </S.SubWrap>
        <S.SubWrap>
          <S.Label>태그입력</S.Label>
          <S.InputWrap>
            <S.Input
              type="text"
              placeholder="#태그 #태그 #태그"
              {...props.register("tags")}
            />
          </S.InputWrap>
          <S.ErrorText>{props.titleErr}</S.ErrorText>
        </S.SubWrap>
        <S.SubWrap>
          <S.Label>주소</S.Label>
          <S.AddrNumInput type="text" placeholder="07592" readOnly />
          <S.AddrNumBtn onClick={props.onClickPostCode}>
            우편번호 검색
          </S.AddrNumBtn>
          <S.Input type="text" readOnly />
          <S.Input type="text" onChange={props.onChangeDetailAddress} />
        </S.SubWrap>
        <S.SubWrap>
          <S.Label>유튜브</S.Label>
          <S.Input type="text" onChange={props.onChangeYoutubeUrl} />
        </S.SubWrap>
        <S.SubWrap>
          <S.Label>사진 첨부</S.Label>
          <S.UploadWrap>
            {props.fileUrls.map((_el, index) => (
              <ImageUpload
                key={uuidv4()}
                fileUrls={props.fileUrls}
                index={index}
                setFileUrls={props.setFileUrls}
                isProduct={true}
              />
            ))}
          </S.UploadWrap>
        </S.SubWrap>
        <S.SubWrap>
          <S.Label>메인 설정</S.Label>
          <label>
            <S.RadioBtn type="radio" name="chkMainOption" /> 유튜브
          </label>
          <label>
            <S.RadioBtn type="radio" name="chkMainOption" /> 사진
          </label>
        </S.SubWrap>
        <S.SubmitWrap>
          <S.SubmitBtn
            onClick={props.isEdit ? props.onSubmitUpdate : props.onSubmit}
            isActive={props.isActive}
          >
            {props.isEdit ? "수정하기" : "등록하기"}
          </S.SubmitBtn>
        </S.SubmitWrap>
      </form>
    </S.Wrapper>
  );
}
