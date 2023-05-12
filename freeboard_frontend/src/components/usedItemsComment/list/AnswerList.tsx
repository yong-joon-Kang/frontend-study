import UsedItemsCommentListPresenter from "./UsedItemsCommentList.presenter";
import { useMutation, useQuery } from "@apollo/client";
import { MouseEvent, useState } from "react";

import { DELETE_USEDITEM_QUESTION_ANSWER } from "./UsedItemsCommentList.queries";

import {
  IMutation,
  IQuery,
  IQueryFetchUseditemQuestionAnswersArgs,
} from "../../../commons/types/generated/types";
import ConfirmModalPresenter from "../../../commons/modals/confirmModal.presenter";
import { message } from "antd";
import { FETCH_USEDITEM_QUESTION_ANSWERS } from "./usedItemsCommentOneRow/usedItemsCommentOneRow.queries";
import { IPropsAnswerList } from "./UsedItemsCommentList.types";

export default function AnswerListPage(props: IPropsAnswerList) {
  const [isEditArr, setIsEditArr] = useState(Array(10).fill(false));
  const [deleteUseditemQuestionAnswer] = useMutation<
    Pick<IMutation, "deleteUseditemQuestionAnswer">
  >(DELETE_USEDITEM_QUESTION_ANSWER);

  const { data } = useQuery<
    Pick<IQuery, "fetchUseditemQuestionAnswers">,
    IQueryFetchUseditemQuestionAnswersArgs
  >(FETCH_USEDITEM_QUESTION_ANSWERS, {
    variables: {
      page: 1,
      useditemQuestionId: props.useditemQuestionId,
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
  const [messageApi, contextHolder] = message.useMessage(); // 비밀번호 에러 alert

  const onToggleModal = (event: MouseEvent<HTMLImageElement>) => {
    setCommentId(event.currentTarget.id);
    setModalToggle(!ismodalToggle);
  };

  const handleOk = () => {
    setModalToggle(!ismodalToggle);
    onClickDelete(commentId);
  };

  const onClickDelete = async (commentId: string) => {
    try {
      await deleteUseditemQuestionAnswer({
        variables: {
          useditemQuestionAnswerId: commentId,
        },
        refetchQueries: [
          {
            query: FETCH_USEDITEM_QUESTION_ANSWERS,
            variables: {
              page: 1,
              useditemQuestionId: props.useditemQuestionId,
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

  return (
    <>
      {contextHolder}
      <ConfirmModalPresenter
        onToggleModal={onToggleModal}
        handleOk={handleOk}
        ismodalToggle={ismodalToggle}
        btnFnc="usedItemQuestionDelete"
      />
      <UsedItemsCommentListPresenter
        data={data}
        onClickUpdate={onClickUpdate}
        isEditArr={isEditArr}
        onToggleModal={onToggleModal}
        setIsEditArr={setIsEditArr}
        isAnswer={props.isAnswer}
        useditemQuestionId={props.useditemQuestionId}
      />
    </>
  );
}
