import { useMoveToPage } from "../../../commons/customHooks/useMoveToPage/useMoveToPage";
import ImageUpload from "../../../commons/imageUpload/ImageUpload.container";
import DefaultButton from "../../commons/button/DefaultButton";
import * as S from "./BoardWrite.styles";
import { IBoardWritePresenterPageProps } from "./BoardWrite.types";
import { v4 as uuidv4 } from "uuid";

export default function BoardWritePresenterPage(
  props: IBoardWritePresenterPageProps
) {
  const fetchBoard = props.fetchBoardDataList?.fetchBoard;
  const { onClickMoveToPage } = useMoveToPage();

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
            defaultValue={fetchBoard?.writer ?? ""}
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
          defaultValue={fetchBoard?.title}
          placeholder="제목을 적어주세요."
        />
        <S.ErrorText>{props.titleErr}</S.ErrorText>
      </S.SubWrap>
      <S.SubWrap>
        <S.Label>내용</S.Label>
        <S.ContentsInput
          onChange={props.onContentsChanged}
          defaultValue={fetchBoard?.contents}
          placeholder="내용을 적어주세요."
        />
        <S.ErrorText>{props.contentsErr}</S.ErrorText>
      </S.SubWrap>
      <S.SubWrap>
        <S.Label>주소</S.Label>
        <S.AddrNumInput
          type="text"
          placeholder="07592"
          readOnly
          defaultValue={
            (props.zipcode || fetchBoard?.boardAddress?.zipcode) ?? ""
          }
        />
        <S.AddrNumBtn onClick={props.onClickPostCode}>
          우편번호 검색
        </S.AddrNumBtn>
        <S.TitleInput
          type="text"
          readOnly
          defaultValue={
            (props.address || fetchBoard?.boardAddress?.address) ?? ""
          }
        />
        <S.TitleInput
          type="text"
          defaultValue={fetchBoard?.boardAddress?.addressDetail ?? ""}
          onChange={props.onChangeDetailAddress}
        />
      </S.SubWrap>
      <S.SubWrap>
        <S.Label>유튜브</S.Label>
        <S.TitleInput
          type="text"
          defaultValue={fetchBoard?.youtubeUrl ?? ""}
          onChange={props.onChangeYoutubeUrl}
          placeholder="전체 링크를 복사하여 넣어주세요."
        />
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
              setFile={props.setFile}
              file={props.file}
            />
          ))}
        </S.UploadWrap>
      </S.SubWrap>
      {/* <S.SubWrap>
        <S.Label>메인 설정</S.Label>
        <label>
          <S.RadioBtn type="radio" name="chkMainOption" /> 유튜브
        </label>
        <label>
          <S.RadioBtn type="radio" name="chkMainOption" /> 사진
        </label>
      </S.SubWrap> */}
      <S.SubmitWrap>
        <DefaultButton
          text={props.isEdit ? "이전으로" : "목록으로"}
          onClick={
            props.isEdit
              ? onClickMoveToPage(`/boards/detail/${fetchBoard?._id}`)
              : onClickMoveToPage("/boards/list")
          }
        />
        <DefaultButton
          isSubmitting={props.isSubmitting}
          text={props.isEdit ? "수정하기" : "등록하기"}
          onClick={props.isEdit ? props.onSubmitUpdate : props.onSubmit}
          isActive={props.isActive}
        />
      </S.SubmitWrap>
    </S.Wrapper>
  );
}
