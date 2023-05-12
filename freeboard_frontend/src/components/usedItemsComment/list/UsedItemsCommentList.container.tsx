import UsedItemsCommentListPresenterPage from "./UsedItemsCommentList.presenter";
import { useMutation, useQuery } from "@apollo/client";
import { MouseEvent, useState } from "react";

import {
  DELETE_USEDITEM_QUESTION,
  FETCH_USEDITEM_QUESTIONS,
} from "./UsedItemsCommentList.queries";
import { useRouter } from "next/router";

import { IMutation, IQuery } from "../../../commons/types/generated/types";
import ConfirmModalPresenter from "../../../commons/modals/confirmModal.presenter";
import { message } from "antd";

export default function UsedItemsCommentListContainerPage() {
  const [hasMore, setHasMore] = useState(true);
  const [isEditArr, setIsEditArr] = useState(Array(10).fill(false));
  const [deleteUseditemQuestion] = useMutation<
    Pick<IMutation, "deleteUseditemQuestion">
  >(DELETE_USEDITEM_QUESTION);

  const router = useRouter();

  const { data, fetchMore } = useQuery<Pick<IQuery, "fetchUseditemQuestions">>(
    FETCH_USEDITEM_QUESTIONS,
    {
      variables: {
        page: 1,
        useditemId: String(router.query.id),
      },
    }
  );

  const onClickUpdate = (event: MouseEvent<HTMLSpanElement>) => {
    const isEdit = [...isEditArr];
    isEdit[Number(event.currentTarget.id)] = true;
    setIsEditArr(isEdit);
  };
  // console.log("isEditArr============");
  // console.log(isEditArr);
  // =================START:: board Comment 삭제 시
  const [ismodalToggle, setModalToggle] = useState(false);
  const [commentId, setCommentId] = useState("");
  // const [password, setPassword] = useState("");
  const [messageApi, contextHolder] = message.useMessage(); // 비밀번호 에러 alert

  const onToggleModal = (event: MouseEvent<HTMLImageElement>) => {
    setCommentId(event.currentTarget.id);
    setModalToggle(!ismodalToggle);
    // if (!ismodalToggle) setPassword("");
  };

  const handleOk = () => {
    setModalToggle(!ismodalToggle);
    onClickDelete(commentId);
  };

  const onClickDelete = async (commentId: string) => {
    try {
      await deleteUseditemQuestion({
        variables: {
          useditemQuestionId: commentId,
        },
        refetchQueries: [
          {
            query: FETCH_USEDITEM_QUESTIONS,
            variables: {
              page: 1,
              useditemId: router.query.id,
            },
          },
        ],
      });
    } catch (error) {
      if (error instanceof Error) {
        messageApi.open({
          type: "error",
          content: error,
        });
      }
    }
  };

  // =================END:: board Comment 삭제 시

  const onLoadMore = () => {
    if (data)
      fetchMore({
        variables: {
          page: Math.ceil(Number(data?.fetchUseditemQuestions.length) / 10) + 1,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          console.log(fetchMoreResult.fetchUseditemQuestions);
          if (fetchMoreResult.fetchUseditemQuestions.length === 0) {
            setHasMore(false);
            return {
              fetchUseditemQuestions: [...prev.fetchUseditemQuestions],
            };
          }

          return {
            fetchUseditemQuestions: [
              ...prev.fetchUseditemQuestions,
              ...fetchMoreResult.fetchUseditemQuestions,
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
        btnFnc="usedItemQuestionDelete"
      />
      <UsedItemsCommentListPresenterPage
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
