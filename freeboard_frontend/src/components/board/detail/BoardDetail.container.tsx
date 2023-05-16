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

export default function BoardDetailContainerPage() {
  const router = useRouter();

  const { data } = useQuery<Pick<IQuery, "fetchBoard">, IQueryFetchBoardArgs>(
    FETCH_BOARD,
    {
      variables: {
        boardId: String(router.query.id),
      },
      fetchPolicy: "network-only",
    }
  );

  console.log(data);

  const onClickBoardList = () => {
    router.push("/boards/list");
  };

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
    router.push({
      pathname: "/boards/list",
      // query: { isSuccess: true },
    });
  };

  const onClickBoardEdit = () => {
    router.push(`/boards/detail/${String(router.query.id)}/edit`);
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
        onClickBoardList={onClickBoardList}
        onToggleModal={onToggleModal}
        onClickBoardEdit={onClickBoardEdit}
        onClickCountLike={onClickCountLike}
        onClickCountDislike={onClickCountDislike}
      />
    </>
  );
}
