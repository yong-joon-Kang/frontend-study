import CartPresenter from "./Cart.presenter";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { Modal, message } from "antd";
import { IUseditem } from "../../../commons/types/generated/types";
import { useApolloClient, useMutation } from "@apollo/client";
import { FETCH_USED_ITEM } from "../detail/UsedItemsDetail.queries";
import { CREATE_POINT_TRANSACTIONOFBUYING_AND_SELLING } from "./Cart.queries";
import { useRecoilState } from "recoil";
import { userInfoState } from "../../../commons/libraries/recoil";

function CartContainer() {
  const [messageApi, contextHolder] = message.useMessage();
  const [allChecked, setAllChecked] = useState(false);

  const client = useApolloClient();
  const [createPointTransactionOfBuyingAndSelling] = useMutation(
    CREATE_POINT_TRANSACTIONOFBUYING_AND_SELLING
  );

  // 장바구니 정보
  const [cartData, setCartData] = useState<IUseditem[]>([]);
  const [checkedPrice, setCheckedPrice] = useState(0);

  const [userInfo] = useRecoilState(userInfoState);

  useMemo(() => {
    console.log("useMemouseMemouseMemouseMemouseMemouseMemouseMemo");
    const priceArray = cartData.map(
      (el) => el.isChecked && el.oneItemTotalPrice
    );

    const total = priceArray.reduce((a, c) => Number(a) + Number(c), 0);
    setCheckedPrice(total);
  }, [cartData]);

  useEffect(() => {
    const result = localStorage.getItem("cart");
    if (result) {
      const cartObj = JSON.parse(result).map((el: IUseditem) => ({
        ...el,
        quantity: 1,
        isChecked: false,
        oneItemTotalPrice: el.price,
      }));

      let TotalPrice = 0;
      cartObj.map((el: IUseditem) => (TotalPrice += Number(el.price)));
      console.log(TotalPrice);

      setCartData(cartObj);
    }
  }, []);

  const onChangeInput = (
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const copyCartData: any = [...cartData];
    const result = event.target.value
      .replace(/[^0-9.]/g, "")
      .replace(/(\..*)\./g, "$1");

    if (copyCartData)
      copyCartData[index] = {
        ...copyCartData[index],
        quantity: Number(result),
        oneItemTotalPrice: copyCartData[index].price * Number(result),
      };
    setCartData(copyCartData);
  };

  const onClickQuantityBtn = (index: number, unit: string) => {
    const copyCartData: any = [...cartData];
    if (unit === "minus") {
      if (copyCartData[index].quantity < 2) return;
      copyCartData[index] = {
        ...copyCartData[index],
        quantity: Number(copyCartData[index].quantity) - 1,
        oneItemTotalPrice:
          copyCartData[index].price *
          (Number(copyCartData[index].quantity) - 1),
      };
    } else {
      if (copyCartData[index].quantity > 998) return;
      copyCartData[index] = {
        ...copyCartData[index],
        quantity: Number(copyCartData[index].quantity) + 1,
        oneItemTotalPrice:
          copyCartData[index].price *
          (Number(copyCartData[index].quantity) + 1),
      };
    }
    setCartData(copyCartData);
  };

  const onChangeAll = (event: ChangeEvent<HTMLInputElement>) => {
    const copyCartData = [...cartData];

    if (event.target.checked) {
      copyCartData.map((el: any) => (el.isChecked = true));
      setAllChecked(true);
    } else {
      copyCartData.map((el: any) => (el.isChecked = false));
      setAllChecked(false);
    }

    setCartData(copyCartData);
  };

  const onChangeOne = (index: number) => {
    const copyCartData: any = [...cartData];
    copyCartData[index] = {
      ...copyCartData[index],
      isChecked: !copyCartData[index].isChecked,
    };

    setCartData(copyCartData);

    const allChecked = copyCartData.every((el: any) => el.isChecked);
    setAllChecked(allChecked);
  };

  const onClickDelete = () => {
    const copyCartData = [...cartData];
    if (copyCartData.every((el: any) => !el.isChecked)) {
      messageApi.warning({ content: "삭제할 항목이 없습니다!" });
      return;
    }
    const resultData = copyCartData.filter((el: any) => !el.isChecked);
    setCartData(resultData);
    localStorage.setItem("cart", JSON.stringify(resultData));
  };

  const onClickBuying = async () => {
    // 선택된 상품이 있는지?
    if (!cartData.some((el) => el.isChecked)) {
      Modal.warning({
        content: "선택된 상품이 없습니다.",
      });

      return false;
    }

    // 보유한 포인트로 선택된 상품을 살 수 있는지?
    if (userInfo.userPoint)
      if (userInfo?.userPoint?.amount < Number(checkedPrice)) {
        Modal.warning({
          content: "포인트가 부족합니다! 충전 후 다시 구매해주세요.",
        });

        return false;
      }

    let soldOutCnt = 0;
    for (const el of cartData) {
      // console.log("el.isChecked=============================");
      // console.log(el.isChecked);
      if (!el.isChecked) continue;
      try {
        // 품절된 상품이 있는지?
        const result = await client.query({
          query: FETCH_USED_ITEM,
          variables: {
            useditemId: el._id,
          },
        });
        console.log(result.data.fetchUseditem.buyer);
        if (result.data.fetchUseditem.buyer) {
          const filteredCart = JSON.parse(
            localStorage.getItem("cart") ?? ""
          ).filter((cart: IUseditem) => cart._id !== el._id);
          localStorage.setItem("cart", JSON.stringify(filteredCart));

          Modal.error({
            content: "품절된 상품이 존재합니다.",
            onOk: () => {
              location.reload();
            },
          });
          console.log("품절된 상품 존재로 빠짐");
          soldOutCnt++;
        }
      } catch (error) {}
    }
    console.log(soldOutCnt);
    for (const el of cartData) {
      if (soldOutCnt === 0) {
        await createPointTransactionOfBuyingAndSelling({
          variables: {
            useritemId: el._id,
          },
        });
        const filteredCart = JSON.parse(
          localStorage.getItem("cart") ?? ""
        ).filter((cart: IUseditem) => cart._id !== el._id);
        localStorage.setItem("cart", JSON.stringify(filteredCart));
        Modal.success({
          content: "상품이 정상적으로 구매되었습니다!",
          onOk: () => {
            location.reload();
          },
        });
      }
    }
  };

  return (
    <>
      {contextHolder}
      <CartPresenter
        cartData={cartData}
        onChangeInput={onChangeInput}
        onClickQuantityBtn={onClickQuantityBtn}
        onChangeAll={onChangeAll}
        onChangeOne={onChangeOne}
        allChecked={allChecked}
        onClickDelete={onClickDelete}
        checkedPrice={checkedPrice}
        onClickBuying={onClickBuying}
      />
    </>
  );
}

export default CartContainer;
