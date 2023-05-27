import ImageUpload from "../../../commons/imageUpload/ImageUpload.container";
import DefaultButton from "../../commons/button/DefaultButton";
import * as S from "./UsedItemsWrite.styles";
import { IUsedItemsPresenterPageProps } from "./UsedItemsWrite.types";
import { v4 as uuidv4 } from "uuid";
import NumberFormat from "../../commons/validation/NumberFormat";
import ContentsFormat from "../../commons/validation/ContentsFormat";
import DefaultFormat from "../../commons/validation/DefaultFormat";
import RegisterPatternFormat from "../../commons/validation/RegisterPatternFormat";

export default function BoardWritePresenterPage(
  props: IUsedItemsPresenterPageProps
) {
  // console.log(props.data);
  const usedItem = props?.data?.fetchUseditem;
  console.log(usedItem);
  // const test = usedItem?.tags?.map((tag) => `#${tag}`);
  return (
    <S.Wrapper>
      <form onSubmit={props.handleSubmit(props.onSubmit)}>
        <S.HeaderTitle>
          {props.isEdit ? "상품 수정" : "상품 등록"}
        </S.HeaderTitle>
        <S.WriterWrap>
          <S.Label>상품명</S.Label>
          <S.InputWrap>
            <DefaultFormat
              control={props.control}
              name="name"
              required={true}
              maxLength={30}
              placeholder="상품명을 입력해주세요."
              value={usedItem?.name ?? ""}
            />
          </S.InputWrap>
          {props.errors.name?.type === "required" && (
            <S.ErrorText>상품명을 입력해주세요.</S.ErrorText>
          )}
          {props.errors.name?.type === "maxLength" && (
            <S.ErrorText>상품명은 30글자 이하로 입력해주세요.</S.ErrorText>
          )}
        </S.WriterWrap>
        <S.SubWrap>
          <S.Label>한줄요약</S.Label>
          <S.InputWrap>
            <DefaultFormat
              control={props.control}
              name="remarks"
              required={true}
              maxLength={100}
              placeholder="한줄요약을 입력해주세요."
              value={usedItem?.remarks ?? ""}
            />
          </S.InputWrap>
          {props.errors.remarks?.type === "required" && (
            <S.ErrorText>한줄요약을 입력해주세요.</S.ErrorText>
          )}
          {props.errors.remarks?.type === "maxLength" && (
            <S.ErrorText>한줄요약은 100글자 이하로 입력해주세요.</S.ErrorText>
          )}
        </S.SubWrap>
        <S.SubWrap>
          <S.Label>상품설명</S.Label>
          <S.InputWrap isContent={true}>
            <ContentsFormat
              control={props.control}
              name="contents"
              required={true}
              maxLength={1000}
              placeholder="상품설명을 입력해주세요."
              value={usedItem?.contents ?? ""}
            />
          </S.InputWrap>
          {props.errors.contents?.type === "required" && (
            <S.ErrorText>상품설명을 입력해주세요.</S.ErrorText>
          )}
          {props.errors.contents?.type === "maxLength" && (
            <S.ErrorText>상품설명은 1000글자 이하로 입력해주세요.</S.ErrorText>
          )}
        </S.SubWrap>
        <S.SubWrap>
          <S.Label>판매가격</S.Label>
          <S.InputWrap>
            <NumberFormat
              control={props.control}
              name="price"
              required={true}
              thousandSeparator={true}
              maxLength={11}
              placeholder="판매가격을 입력해주세요."
              value={String(usedItem?.price) ?? ""}
            />
          </S.InputWrap>
          {props.errors.price?.type === "required" && (
            <S.ErrorText>판매가격을 입력해주세요.</S.ErrorText>
          )}
          {props.errors.price?.type === "maxLength" && (
            <S.ErrorText>판매가격은 1십억원 아래로 입력해주세요.</S.ErrorText>
          )}
        </S.SubWrap>
        <S.SubWrap>
          <S.Label>태그입력</S.Label>
          <S.InputWrap>
            <RegisterPatternFormat
              register={props.register}
              maxLength={30}
              placeholder="태그1, 태그2, 태그3"
              // pattern={/^.*#.*$/}
            />
          </S.InputWrap>
          {props.errors.tags?.type === "pattern" && (
            <S.ErrorText>태그는 시작할 때 #을 입력해주세요.</S.ErrorText>
          )}
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
        <S.SubmitWrap>
          <DefaultButton
            onClick={() => {
              history.back();
            }}
            text="이전으로"
          />
          <DefaultButton text={props.isEdit ? "수정하기" : "등록하기"} />
        </S.SubmitWrap>
      </form>
    </S.Wrapper>
  );
}
