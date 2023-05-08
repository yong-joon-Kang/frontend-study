import * as S from "./OneRow.styles";
import { IContainerProps } from "./OneRow.types";
import { getComma } from "../../../../commons/libraries/utils";
import LikeIcon from "../../../commons/icon/LikeIcon";
function OneRowPresenter(props: IContainerProps) {
  return (
    <S.Wrap>
      <S.Part isImgPart={true}>
        <S.Img
          src={`https://storage.googleapis.com/${props.list.images[0]}`}
          alt={props.list.images}
        />
      </S.Part>
      <S.Part isMiddle={true}>
        <S.PartTitle>{props.list.name}</S.PartTitle>
        <S.PartContents>{props.list.contents}</S.PartContents>
        <S.PartTags>{props.list.tags}</S.PartTags>
        <S.PartBottom>
          <S.BottomContent>
            <S.SellerPicture
              src={`https://storage.googleapis.com/${props.list?.seller?.picture}`}
            />
            {props.list.seller?.name}
          </S.BottomContent>
          <S.BottomContent>
            <LikeIcon />
            &nbsp;
            {props.list.pickedCount}
          </S.BottomContent>
        </S.PartBottom>
      </S.Part>
      <S.Part isRight={true}>
        <S.Price>{getComma(props.list.price)}원</S.Price>
      </S.Part>
    </S.Wrap>
  );
}

export default OneRowPresenter;
