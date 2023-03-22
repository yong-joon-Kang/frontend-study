import * as S from "./BoardWrite.styles";
import { IBoardWritePresenterPageProps } from "./BoardWrite.types";

export default function BoardWritePresenterPage(
  props: IBoardWritePresenterPageProps
) {
  return (
    <S.Wrapper>
      <S.HeaderTitle>
        {props.isEdit ? "게시물 수정" : "게시물 등록"}
      </S.HeaderTitle>
      <S.WriterWrap>
        <S.LeftWrap>
          <S.Label>작성자</S.Label>
          <S.WriterInput
            type="text"
            onChange={props.onWriterChanged}
            defaultValue={props.fetchBoardDataList?.fetchBoard.writer ?? ""}
            placeholder="이름을 적어주세요."
            readOnly={props.isEdit}
          />
          <S.ErrorText>{props.writerErr}</S.ErrorText>
        </S.LeftWrap>
        <S.RightWrap>
          <S.Label>비밀번호</S.Label>
          <S.WriterInput
            type="password"
            onChange={props.onPasswordChanged}
            placeholder="비밀번호를 적어주세요."
          />
          <S.ErrorText>{props.passwordErr}</S.ErrorText>
        </S.RightWrap>
      </S.WriterWrap>
      <S.SubWrap>
        <S.Label>제목</S.Label>
        <S.TitleInput
          type="text"
          onChange={props.onTitleChanged}
          defaultValue={props.fetchBoardDataList?.fetchBoard.title}
          placeholder="제목을 적어주세요."
        />
        <S.ErrorText>{props.titleErr}</S.ErrorText>
      </S.SubWrap>
      <S.SubWrap>
        <S.Label>내용</S.Label>
        <S.ContentsInput
          onChange={props.onContentsChanged}
          defaultValue={props.fetchBoardDataList?.fetchBoard.contents}
          placeholder="내용을 적어주세요."
        />
        <S.ErrorText>{props.contentsErr}</S.ErrorText>
      </S.SubWrap>
      <S.SubWrap>
        <S.Label>주소</S.Label>
        <S.AddrNumInput
          type="text"
          placeholder="07592"
          defaultValue={props.zoneCode}
        />
        <S.AddrNumBtn onClick={props.onClickPostCode}>
          우편번호 검색
        </S.AddrNumBtn>
        <S.TitleInput type="text" defaultValue={props.postCode} />
        <S.TitleInput type="text" />
      </S.SubWrap>
      <S.SubWrap>
        <S.Label>유튜브</S.Label>
        <S.TitleInput type="text" />
      </S.SubWrap>
      <S.SubWrap>
        <S.Label>사진 첨부</S.Label>
        <S.UploadBtn>
          <S.Plus>+</S.Plus>
          <S.UploadText>Upload</S.UploadText>
        </S.UploadBtn>
        <S.UploadBtn>
          <S.Plus>+</S.Plus>
          <S.UploadText>Upload</S.UploadText>
        </S.UploadBtn>
        <S.UploadBtn>
          <S.Plus>+</S.Plus>
          <S.UploadText>Upload</S.UploadText>
        </S.UploadBtn>
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
    </S.Wrapper>
  );
}
