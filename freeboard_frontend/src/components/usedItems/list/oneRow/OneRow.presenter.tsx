import * as S from "./OneRow.styles";
import { IContainerProps } from "./OneRow.types";
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
        <div>
          <span>{props.list.seller?.name}</span>
          <span>{props.list.pickedCount}</span>
        </div>
      </S.Part>
      <S.Part isRight={true}>{props.list.price}</S.Part>
    </S.Wrap>
  );
}

export default OneRowPresenter;
