import CartPresenter from "./Cart.presenter";
import { FETCH_USED_ITEM } from "../detail/UsedItemsDetail.queries";
import { useQuery } from "@apollo/client";
import {
  IQuery,
  IQueryFetchUseditemArgs,
} from "../../../commons/types/generated/types";
import { useEffect, useState } from "react";

function CartContainer() {
  const [cart, setCart] = useState([]);
  useEffect(() => {
    const result = localStorage.getItem("cart");
    if (result) {
      setCart(JSON.parse(result));
    }
  }, []);
  // const { data } = useQuery<
  //   Pick<IQuery, "fetchUseditem">,
  //   IQueryFetchUseditemArgs
  // >(FETCH_USED_ITEM, {
  //   // variables: {
  //   //   useditemId:
  //   // }
  // });
  return <CartPresenter cart={cart} />;
}

export default CartContainer;
