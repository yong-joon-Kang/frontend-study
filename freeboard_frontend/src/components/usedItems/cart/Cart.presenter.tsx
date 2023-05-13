import { getComma } from "../../../commons/libraries/utils";
import { IUseditem } from "../../../commons/types/generated/types";
import * as S from "./Cart.styles";
import { IProps } from "./Cart.types";

function CartPresenter(props: IProps) {
  // console.log(props?.cartData);
  return (
    <div>
      <div>장바구니</div>
      <span>전체선택</span>
      <div onClick={props.onClickDelete}>선택 삭제</div>
      <input
        onChange={props.onChangeAll}
        style={{ width: "30px", height: "30px" }}
        type="checkbox"
        checked={props.allChecked}
      />
      {props?.cartData.map((el: any, index: number) => (
        <S.ItemWrap key={el._id}>
          <input
            onChange={() => {
              props.onChangeOne(index);
            }}
            style={{ width: "30px", height: "30px" }}
            type="checkbox"
            checked={el.isChecked}
          />
          <S.RightWrap>
            <S.Img src={`https://storage.googleapis.com/${el.images?.[0]}`} />
          </S.RightWrap>
          <S.MiddleWrap>
            <S.Name>{el.name}</S.Name>
            <S.Price>{getComma(String(el.price))}원</S.Price>
          </S.MiddleWrap>
          <S.LeftWrap>
            <S.Quantity>
              <S.QuantityBtn
                onClick={() => {
                  props.onClickQuantityBtn(index, "minus");
                }}
              >
                -
              </S.QuantityBtn>
              <S.Input
                value={Number(el.quantity)}
                maxLength={3}
                onChange={() => {
                  props.onChangeInput(event, index);
                }}
              />
              <S.QuantityBtn
                onClick={() => {
                  props.onClickQuantityBtn(index, "plus");
                }}
              >
                +
              </S.QuantityBtn>
            </S.Quantity>
          </S.LeftWrap>
        </S.ItemWrap>
      ))}
    </div>
  );
}

export default CartPresenter;
