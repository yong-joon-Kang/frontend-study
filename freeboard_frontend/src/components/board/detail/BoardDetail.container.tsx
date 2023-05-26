import BoardDetailPresenterPage from "./BoardDetail.presenter";
import {
  FETCH_BOARD,
  DELETE_BOARD,
  LIKE_BOARD,
  DISLIKE_BOARD,
} from "./BoardDetail.queries";
import { useQuery, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import {
  IMutation,
  IQuery,
  IQueryFetchBoardArgs,
} from "../../../commons/types/generated/types";
import ConfirmModalPresenter from "../../../commons/modals/confirmModal.presenter";
import { useState } from "react";
import { useMoveToPage } from "../../../commons/customHooks/useMoveToPage/useMoveToPage";

export default function BoardDetailContainerPage() {
  const router = useRouter();
  const { onClickMoveToPage } = useMoveToPage();

  const { data } = useQuery<Pick<IQuery, "fetchBoard">, IQueryFetchBoardArgs>(
    FETCH_BOARD,
    {
      variables: {
        boardId: String(router.query.id),
      },
      fetchPolicy: "network-only",
    }
  );

  const [deleteBoard] =
    useMutation<Pick<IMutation, "deleteBoard">>(DELETE_BOARD);

  const [ismodalToggle, setModalToggle] = useState(false);

  const onToggleModal = () => {
    setModalToggle(!ismodalToggle);
  };

  const handleOk = () => {
    setModalToggle(!ismodalToggle);
    onClickBoardDelete();
  };

  const onClickBoardDelete = async () => {
    await deleteBoard({
      variables: {
        boardId: router.query.id,
      },
    });
    onClickMoveToPage("/boards/list")();
  };

  const [likeBoard] = useMutation(LIKE_BOARD);

  const onClickCountLike = async () => {
    await likeBoard({
      variables: {
        boardId: router.query.id,
      },
      refetchQueries: [
        {
          query: FETCH_BOARD,
          variables: {
            boardId: router.query.id,
          },
        },
      ],
    });
  };

  const [dislikeBoard] = useMutation(DISLIKE_BOARD);
  const onClickCountDislike = async () => {
    await dislikeBoard({
      variables: {
        boardId: router.query.id,
      },
      refetchQueries: [
        {
          query: FETCH_BOARD,
          variables: {
            boardId: router.query.id,
          },
        },
      ],
    });
  };

  return (
    <>
      <ConfirmModalPresenter
        onToggleModal={onToggleModal}
        handleOk={handleOk}
        ismodalToggle={ismodalToggle}
        btnFnc="boardDelete"
      />
      <BoardDetailPresenterPage
        data={data}
        onToggleModal={onToggleModal}
        onClickMoveToPage={onClickMoveToPage}
        onClickCountLike={onClickCountLike}
        onClickCountDislike={onClickCountDislike}
        router={router}
      />
    </>
  );
}
