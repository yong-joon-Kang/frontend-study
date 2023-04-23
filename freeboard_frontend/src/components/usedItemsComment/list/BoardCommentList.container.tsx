import BoardCommentListPresenterPage from "./BoardCommentList.presenter";
import { useMutation, useQuery } from "@apollo/client";
import { ChangeEvent, MouseEvent, useState } from "react";

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
import ConfirmModalPresenter from "../../../commons/modals/confirmModal.presenter";
import { message } from "antd";

export default function BoardCommentListContainerPage() {
  const [hasMore, setHasMore] = useState(true);
  const [isEditArr, setIsEditArr] = useState(Array(10).fill(false));
  const [deletaBoardComment] =
    useMutation<Pick<IMutation, "deleteBoardComment">>(DELETE_BOARD_COMMENT);

  const router = useRouter();
  const { data, fetchMore } = useQuery<
    Pick<IQuery, "fetchBoardComments">,
    IQueryFetchBoardCommentsArgs
  >(FETCH_BOARD_COMMENTS, {
    variables: {
      page: 1,
      boardId: String(router.query.id),
    },
  });

  const onClickUpdate = (event: MouseEvent<HTMLSpanElement>) => {
    const isEdit = [...isEditArr];
    isEdit[Number(event.currentTarget.id)] = true;
    setIsEditArr(isEdit);
  };
  // =================START:: board Comment 삭제 시
  const [ismodalToggle, setModalToggle] = useState(false);
  const [commentId, setCommentId] = useState("");
  const [password, setPassword] = useState("");
  const [messageApi, contextHolder] = message.useMessage(); // 비밀번호 에러 alert

  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const onToggleModal = (event: MouseEvent<HTMLImageElement>) => {
    setCommentId(event.currentTarget.id);
    setModalToggle(!ismodalToggle);
    if (!ismodalToggle) setPassword("");
  };

  const handleOk = () => {
    setModalToggle(!ismodalToggle);
    onClickDelete(commentId);
  };

  const onClickDelete = async (commentId: string) => {
    try {
      await deletaBoardComment({
        variables: {
          password: password,
          boardCommentId: commentId,
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
        if (password != null) {
          messageApi.open({
            type: "error",
            content: "비밀번호가 일치하지 않습니다.",
          });
        }
      }
    }
  };

  // =================END:: board Comment 삭제 시

  const onLoadMore = () => {
    fetchMore({
      variables: {
        page: Math.ceil(Number(data?.fetchBoardComments.length) / 10) + 1,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        console.log(fetchMoreResult.fetchBoardComments);
        if (fetchMoreResult.fetchBoardComments.length === 0) {
          setHasMore(false);
          return {
            fetchBoardComments: [...prev.fetchBoardComments],
          };
        }

        return {
          fetchBoardComments: [
            ...prev.fetchBoardComments,
            ...fetchMoreResult.fetchBoardComments,
          ],
        };
      },
    });
  };
  return (
    <>
      {contextHolder}
      <ConfirmModalPresenter
        onToggleModal={onToggleModal}
        handleOk={handleOk}
        ismodalToggle={ismodalToggle}
        btnFnc="boardCommentDelete"
        onChangePassword={onChangePassword}
        password={password}
      />
      <BoardCommentListPresenterPage
        data={data}
        onClickUpdate={onClickUpdate}
        isEditArr={isEditArr}
        onToggleModal={onToggleModal}
        onLoadMore={onLoadMore}
        hasMore={hasMore}
        setIsEditArr={setIsEditArr}
      />
    </>
  );
}
