import UsedItemsDetailPresenterPage from "./UsedItemsDetail.presenter";
import {
  FETCH_USED_ITEM,
  DELETE_BOARD,
  TOGGLE_USEDITEM_PICK,
} from "./UsedItemsDetail.queries";
import { useQuery, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import {
  IMutation,
  IQuery,
  IQueryFetchUseditemArgs,
  IUseditem,
} from "../../../commons/types/generated/types";
import ConfirmModalPresenter from "../../../commons/modals/confirmModal.presenter";
import { useEffect, useState } from "react";
import { Modal } from "antd";
import { IUsedItemsDetailPresenterPageProps } from "./UsedItemsDetail.types";
import BoardCommentListContainerPage from "../../usedItemsComment/list/UsedItemsCommentList.container";
import BoardWriteContainerPage from "../../board/write/BoardWrite.container";
import BoardCommentWriteContainerPage from "../../boardComment/write/BoardCommentWrite.container";
import UsedItemsCommentWriteContainerPage from "../../usedItemsComment/write/UsedItemsCommentWrite.container";
import UsedItemsCommentListContainerPage from "../../usedItemsComment/list/UsedItemsCommentList.container";

export default function UsedItemsDetailContainerPage() {
  const [userName, setUserName] = useState("");
  const router = useRouter();

  const { data } = useQuery<
    Pick<IQuery, "fetchUseditem">,
    IQueryFetchUseditemArgs
  >(FETCH_USED_ITEM, {
    variables: {
      useditemId: String(router.query.id),
    },
  });

  const onClickUsedItemsList = () => {
    router.push("/usedItems/list");
  };

  // const [deleteUsedItems] =
  //   useMutation<Pick<IMutation, "deleteUsedItems">>(DELETE_BOARD);

  const [ismodalToggle, setModalToggle] = useState(false);

  const onToggleModal = () => {
    setModalToggle(!ismodalToggle);
  };

  const handleOk = () => {
    setModalToggle(!ismodalToggle);
    router.push("/usedItems/cart");
  };

  const onClickUsedItemsDelete = async () => {
    // await deleteUsedItems({
    //   variables: {
    //     boardId: router.query.id,
    //   },
    // });
    // router.push({
    //   pathname: "/boards/list",
    //   // query: { isSuccess: true },
    // });
  };

  // interface ICart {
  //   _id: string;
  //   name: string;
  //   remarks: string;
  //   contents: string;
  //   price: string;
  //   tags: string[];
  //   images: string[];
  //   buyer:
  // }

  const onClickInCart = (cart: IUseditem) => {
    // 1. 기존 장바구니 가져오기
    const cartStorage = JSON.parse(localStorage.getItem("cart") ?? "[]");

    // 2. 같은 상품인지 확인하기
    const result = cartStorage.filter((el: any) => el._id === cart._id);
    if (result.length > 0) {
      Modal.error({ content: "이미 같은 상품이 존재합니다!" });
      return false;
    }

    // 3. 장바구니에 담기
    cartStorage.push(cart);
    localStorage.setItem("cart", JSON.stringify(cartStorage));

    onToggleModal();
  };

  const onClickUsedItemsEdit = () => {
    router.push(`/usedItems/detail/${String(router.query.id)}/edit`);
  };

  const [toggleUsedItemPick] = useMutation(TOGGLE_USEDITEM_PICK);

  const onClickCountLike = async () => {
    await toggleUsedItemPick({
      variables: {
        useditemId: router.query.id,
      },
      refetchQueries: [
        {
          query: FETCH_USED_ITEM,
          variables: {
            useditemId: router.query.id,
          },
        },
      ],
    });
  };

  useEffect(() => {
    setUserName(localStorage.getItem("userName") ?? "");
  }, []);

  return (
    <>
      <ConfirmModalPresenter
        onToggleModal={onToggleModal}
        handleOk={handleOk}
        ismodalToggle={ismodalToggle}
        btnFnc="cartIn"
      />
      <UsedItemsDetailPresenterPage
        data={data}
        userName={userName}
        onClickInCart={onClickInCart}
        onClickUsedItemsList={onClickUsedItemsList}
        onToggleModal={onToggleModal}
        onClickUsedItemsEdit={onClickUsedItemsEdit}
        onClickCountLike={onClickCountLike}
      />
      <UsedItemsCommentWriteContainerPage />
      <UsedItemsCommentListContainerPage />
    </>
  );
}
