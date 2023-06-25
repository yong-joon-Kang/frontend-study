import * as S from "./Cart.styles";
import { IProps } from "./Cart.types";
import OneItem from "./oneItem";

function CartPresenter(props: IProps) {
  return (
    <div>
      <S.Title>장바구니</S.Title>
      <S.Header>
        <S.HeaderLeftWrap>
          <S.CheckBox
            onChange={props.onChangeAll}
            style={{ width: "30px", height: "30px" }}
            type="checkbox"
            checked={props.allChecked}
          />
          <S.Label>전체선택</S.Label>
        </S.HeaderLeftWrap>
        <S.DeleteBtn onClick={props.onClickDelete}>선택 삭제</S.DeleteBtn>
      </S.Header>

      {JSON.stringify(props?.cartData) !== "[{}]" &&
        props?.cartData.map((el: any, index: number) => (
          <OneItem
            key={index}
            el={el}
            index={index}
            onChangeOne={props.onChangeOne}
            onClickQuantityBtn={props.onClickQuantityBtn}
            onChangeInput={props.onChangeInput}
          />
          // <S.ItemWrap key={el._id}>
          //   <S.CheckBox
          //     onChange={() => {
          //       props.onChangeOne(index);
          //     }}
          //     style={{ width: "30px", height: "30px" }}
          //     type="checkbox"
          //     checked={el.isChecked}
          //   />
          //   <S.RightWrap>
          //     <S.Img src={`https://storage.googleapis.com/${el.images?.[0]}`} />
          //   </S.RightWrap>
          //   <S.MiddleWrap>
          //     <S.Name>{el.name}</S.Name>
          //     <S.Price>{getComma(String(el.oneItemTotalPrice))}원</S.Price>
          //   </S.MiddleWrap>
          //   <S.LeftWrap>
          //     <S.Quantity>
          //       <S.QuantityBtn
          //         onClick={() => {
          //           props.onClickQuantityBtn(index, "minus");
          //         }}
          //       >
          //         -
          //       </S.QuantityBtn>
          //       <S.Input
          //         value={Number(el.quantity)}
          //         maxLength={3}
          //         onChange={() => {
          //           props.onChangeInput(event, index);
          //         }}
          //       />
          //       <S.QuantityBtn
          //         onClick={() => {
          //           props.onClickQuantityBtn(index, "plus");
          //         }}
          //       >
          //         +
          //       </S.QuantityBtn>
          //     </S.Quantity>
          //   </S.LeftWrap>
          // </S.ItemWrap>
        ))}
      <S.Label>합계: {}</S.Label>
    </div>
  );
}

export default CartPresenter;
