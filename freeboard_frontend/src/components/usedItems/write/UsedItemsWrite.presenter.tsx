import ImageUpload from "../../../commons/imageUpload/ImageUpload.container";
import DefaultButton from "../../commons/button/DefaultButton";
import * as S from "./UsedItemsWrite.styles";
import { IUsedItemsPresenterPageProps } from "./UsedItemsWrite.types";
import { v4 as uuidv4 } from "uuid";
import NumberFormat from "../../commons/validation/NumberFormat";
import DefaultFormat from "../../commons/validation/DefaultFormat";
import RegisterPatternFormat from "../../commons/validation/RegisterPatternFormat";
import { MemoizedKakaoMap } from "../../commons/kakaoMap/KakaoMap";
import { useRef, useState } from "react";
import { Controller } from "react-hook-form";
import { useMoveToPage } from "../../../commons/customHooks/useMoveToPage/useMoveToPage";
import "react-quill/dist/quill.snow.css";
import _ from "lodash";
import ContentsFormat from "../../commons/validation/ContentsFormat";

export default function BoardWritePresenterPage(
  props: IUsedItemsPresenterPageProps
) {
  const { onClickMoveToPage } = useMoveToPage();

  const usedItem = props?.data?.fetchUseditem;
  // console.log(usedItem);

  const addressRef = useRef("");

  const [address, setAddress] = useState(null);

  const handleDebounce = _.debounce((event) => {
    props.setValue("address", event.target.value);
    setAddress(event.target.value);
  }, 300);

  return (
    <S.Wrapper>
      <form onSubmit={props.handleSubmit(props.onSubmit)}>
        <S.HeaderTitle>
          {props.isEdit ? "상품 수정" : "상품 등록"}
        </S.HeaderTitle>
        <S.WriterWrap>
          <S.Label>상품명</S.Label>
          <S.InputWrap>
            {usedItem?.name ?? ""}
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
          <ContentsFormat
            control={props.control}
            errors={props.errors}
            maxLength={1000}
            placeholder="상품설명을 입력해주세요."
            isSubmitted={props.isSubmitted}
            watch={props.watch}
            value={usedItem?.contents}
          />
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
              placeholder="#태그1 #태그2 #태그3"
              pattern={/^.*#.*$/}
              val={usedItem?.tags ?? []}
            />
          </S.InputWrap>
          {props.errors.tags?.type === "pattern" && (
            <S.ErrorText>태그는 시작할 때 #을 입력해주세요.</S.ErrorText>
          )}
        </S.SubWrap>
        <S.SubWrap>
          <S.FlexRow>
            <div style={{ flex: "2" }}>
              <S.Label>거래위치</S.Label>
              <MemoizedKakaoMap
                address={address ?? usedItem?.useditemAddress?.address}
              />
            </div>
            <div style={{ marginLeft: "50px;", flex: "2" }}>
              <S.Label>주소</S.Label>
              <S.FlexRow alignCenter={true}>
                {/* <S.Img src="/location.png" /> */}
                <S.InputWrap>
                  {/* <Controller
                    name="address"
                    control={props.control}
                    render={({ field }) => (
                      <S.Input
                        {...field}
                        ref={addressRef}
                        placeholder="검색할 주소를 입력해주세요."
                        defaultValue={usedItem?.useditemAddress?.address}
                        // onChange={handleDebounce}
                      />
                    )}
                  /> */}
                  <input
                    type="text"
                    defaultValue={usedItem?.useditemAddress?.address}
                    onChange={handleDebounce}
                  />
                </S.InputWrap>
              </S.FlexRow>
              <div style={{ marginBottom: "16px" }}></div>
            </div>
          </S.FlexRow>
        </S.SubWrap>
        <S.SubWrap>
          <S.Label>사진 첨부</S.Label>
          <S.FlexRow>
            {new Array(3).fill("").map((_el, index) => (
              <ImageUpload
                key={uuidv4()}
                file={props.file}
                setFile={props.setFile}
                fileUrls={props.fileUrls}
                setFileUrls={props.setFileUrls}
                index={index}
                isProduct={true}
                // imageUrls={usedItem?.images ?? []}
                registedFileUrl={usedItem?.images?.[index] ?? ""}
              />
            ))}
          </S.FlexRow>
        </S.SubWrap>
        <S.SubmitWrap>
          <DefaultButton
            onClick={
              props.isEdit
                ? onClickMoveToPage(`/usedItems/detail/${usedItem?._id}`)
                : onClickMoveToPage("/usedItems/list")
            }
            text={props.isEdit ? "이전으로" : "목록으로"}
          />
          <DefaultButton
            isSubmitting={props.isSubmitting}
            text={props.isEdit ? "수정하기" : "등록하기"}
          />
        </S.SubmitWrap>
      </form>
    </S.Wrapper>
  );
}
