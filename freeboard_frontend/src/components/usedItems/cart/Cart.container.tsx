import CartPresenter from "./Cart.presenter";
import { ChangeEvent, useEffect, useState } from "react";
import { message } from "antd";

function CartContainer() {
  const [messageApi, contextHolder] = message.useMessage();
  const [allChecked, setAllChecked] = useState(false);

  // 장바구니 정보
  const [cartData, setCartData] = useState([{}]);

  useEffect(() => {
    const result = localStorage.getItem("cart");
    if (result) {
      const cartObj = JSON.parse(result).map((el: any) => ({
        ...el,
        quantity: 1,
        isChecked: false,
        oneItemTotalPrice: el.price,
      }));

      let TotalPrice = 0;
      cartObj.map((el) => (TotalPrice += Number(el.price)));
      console.log(TotalPrice);

      setCartData(cartObj);
    }
  }, []);

  const onChangeInput = (
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const copyCartData = [...cartData];
    const result = event.target.value
      .replace(/[^0-9.]/g, "")
      .replace(/(\..*)\./g, "$1");

    copyCartData[index] = {
      ...copyCartData[index],
      quantity: Number(result),
      oneItemTotalPrice: copyCartData[index].price * Number(result),
    };
    setCartData(copyCartData);
  };

  const onClickQuantityBtn = (index: number, unit: string) => {
    const copyCartData = [...cartData];
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
      copyCartData.map((el) => (el.isChecked = true));
      setAllChecked(true);
    } else {
      copyCartData.map((el) => (el.isChecked = false));
      setAllChecked(false);
    }

    setCartData(copyCartData);
  };

  const onChangeOne = (index: number) => {
    const copyCartData = [...cartData];
    copyCartData[index] = {
      ...copyCartData[index],
      isChecked: !copyCartData[index].isChecked,
    };

    setCartData(copyCartData);

    const allChecked = copyCartData.every((el) => el.isChecked);
    setAllChecked(allChecked);
  };

  const onClickDelete = () => {
    const copyCartData = [...cartData];
    if (copyCartData.every((el) => !el.isChecked)) {
      messageApi.warning({ content: "삭제할 항목이 없습니다!" });
      return;
    }
    const resultData = copyCartData.filter((el) => !el.isChecked);
    setCartData(resultData);
    localStorage.setItem("cart", JSON.stringify(resultData));
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
      />
    </>
  );
}

export default CartContainer;
