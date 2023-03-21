import BoardCommentListPresenterPage from "./BoardCommentList.presenter";
import { useMutation, useQuery } from "@apollo/client";
import { MouseEvent, useState } from "react";

import {
  FETCH_BOARD_COMMENTS,
  DELETE_BOARD_COMMENT,
} from "./BoardCommentList.queries";
import { useRouter } from "next/router";

import {
  IMutation,
  IQuery,
  IQueryFetchBoardCommentsArgs,
} from "../../../commons/types/generated/types";

export default function BoardCommentListContainerPage() {
  const [isEdit, setIsEdit] = useState(false);
  const [deletaBoardComment] =
    useMutation<Pick<IMutation, "deleteBoardComment">>(DELETE_BOARD_COMMENT);

  const router = useRouter();
  const { data } = useQuery<
    Pick<IQuery, "fetchBoardComments">,
    IQueryFetchBoardCommentsArgs
  >(FETCH_BOARD_COMMENTS, {
    variables: {
      page: 1,
      boardId: String(router.query.id),
    },
  });

  const onClickUpdate = () => {
    setIsEdit(true);
  };

  const onClickDelete = async (event: MouseEvent<HTMLImageElement>) => {
    const myPassword = prompt("비밀번호를 입력하세요");
    try {
      await deletaBoardComment({
        variables: {
          password: myPassword,
          boardCommentId: event.currentTarget.id,
        },
        refetchQueries: [
          {
            query: FETCH_BOARD_COMMENTS,
            variables: {
              page: 1,
              boardId: router.query.id,
            },
          },
        ],
      });
    } catch (error) {
      if (error instanceof Error) {
        if (myPassword != null) {
          alert(error.message);
        }
      }
    }
  };

  return (
    <BoardCommentListPresenterPage
      data={data}
      onClickUpdate={onClickUpdate}
      onClickDelete={onClickDelete}
      isEdit={isEdit}
    />
  );
}
