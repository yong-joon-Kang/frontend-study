import UsedItemsCommentWritePresenterPage from "./UsedItemsCommentWrite.presenter";
import { useMutation } from "@apollo/client";
import {
  CREATE_USEDITEM_QUESTION,
  CREATE_USEDITEM_QUESTION_ANSWER,
  UPDATE_USEDITEM_QUESTION,
  UPDATE_USEDITEM_QUESTION_ANSWER,
} from "./UsedItemsCommentWrite.queries";
// import { FETCH_BOARD_COMMENTS } from "../list/UsedItemsCommentList.queries";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";
import {
  IMutation,
  IMutationCreateUseditemQuestionAnswerArgs,
  IMutationCreateUseditemQuestionArgs,
  IMutationUpdateUseditemQuestionAnswerArgs,
  IMutationUpdateUseditemQuestionArgs,
  IUpdateUseditemQuestionInput,
} from "../../../commons/types/generated/types";
import { Modal, message } from "antd";
import { IProps } from "./UsedItemsCommentWrite.types";
import { FETCH_USEDITEM_QUESTIONS } from "../list/UsedItemsCommentList.queries";
import { FETCH_USEDITEM_QUESTION_ANSWERS } from "../list/usedItemsCommentOneRow/usedItemsCommentOneRow.queries";

export default function UsedItemsCommentWriteContainerPage(props: IProps) {
  const [contents, setContents] = useState("");
  const [contentsLength, setContentsLength] = useState("");
  const [messageApi, contextHolder] = message.useMessage(); // 비밀번호 에러 alert

  const router = useRouter();

  const [createUseditemQuestion] = useMutation<
    Pick<IMutation, "createUseditemQuestion">,
    IMutationCreateUseditemQuestionArgs
  >(CREATE_USEDITEM_QUESTION);

  const [updateUseditemQuestion] = useMutation<
    Pick<IMutation, "updateUseditemQuestion">,
    IMutationUpdateUseditemQuestionArgs
  >(UPDATE_USEDITEM_QUESTION);

  const [createUseditemQuestionAnswer] = useMutation<
    Pick<IMutation, "createUseditemQuestionAnswer">,
    IMutationCreateUseditemQuestionAnswerArgs
  >(CREATE_USEDITEM_QUESTION_ANSWER);

  const [updateUseditemQuestionAnswer] = useMutation<
    Pick<IMutation, "updateUseditemQuestionAnswer">,
    IMutationUpdateUseditemQuestionAnswerArgs
  >(UPDATE_USEDITEM_QUESTION_ANSWER);

  useEffect(() => {
    // console.log("useEffect 실행");
    if (props.contents) setContents(props.contents);
  }, []);

  const onClickCmtWrite = async () => {
    try {
      if (!contents) {
        messageApi.open({
          type: "error",
          content: "내용을 입력해주세요",
        });
        return false;
      }

      if (Number(contentsLength) > 100) {
        messageApi.open({
          type: "error",
          content: "100글자 이상 입력할 수 없습니다.",
        });
        return false;
      }

      if (!localStorage.getItem("accessToken")) {
        Modal.warning({ content: "로그인이 필요합니다!" });
        router.push("/signIn");
        return;
      }

      if (props.isEdit) {
        console.log("update");
        const updateUseditemQuestionInput: IUpdateUseditemQuestionInput = {
          contents: "",
        };
        if (contents) updateUseditemQuestionInput.contents = contents;
        await updateUseditemQuestion({
          variables: {
            useditemQuestionId: props.id ?? "",
            updateUseditemQuestionInput,
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
        const isEditArr = [...(props.isEditArr ?? [])];
        isEditArr[Number(props.index)] = false;
        if (props.setIsEditArr) props.setIsEditArr(isEditArr);
      } else {
        console.log("등록");
        console.log(props.isAnswer);
        const result = await createUseditemQuestion({
          variables: {
            useditemId: String(router.query.id),
            createUseditemQuestionInput: {
              contents: contents,
            },
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

        console.log(result);
      }

      setContents("");
      setContentsLength("0");
    } catch (error) {}
  };

  const onClickAnswerWrite = async () => {
    // console.log(props.useditemQuestionId);
    console.log(contents);
    if (!contents) {
      messageApi.open({
        type: "error",
        content: "내용을 입력해주세요",
      });
      return false;
    }

    if (Number(contentsLength) > 100) {
      messageApi.open({
        type: "error",
        content: "100글자 이상 입력할 수 없습니다.",
      });
      return false;
    }

    if (!localStorage.getItem("accessToken")) {
      Modal.warning({ content: "로그인이 필요합니다!" });
      router.push("/signIn");
      return;
    }

    if (props.isEdit) {
      console.log(props.useditemQuestionId);
      await updateUseditemQuestionAnswer({
        variables: {
          updateUseditemQuestionAnswerInput: {
            contents: contents,
          },
          useditemQuestionAnswerId: props.id ?? "",
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
      const isEditArr = [...(props.isEditArr ?? [])];
      isEditArr[Number(props.index)] = false;
      if (props.setIsEditArr) props.setIsEditArr(isEditArr);
    } else {
      await createUseditemQuestionAnswer({
        variables: {
          createUseditemQuestionAnswerInput: {
            contents: contents,
          },
          useditemQuestionId: props.useditemQuestionId ?? "",
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
      if (props.setIsAnswer) props.setIsAnswer(false);
    }
  };
  const onChangeTextArea = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContents(event.target.value);
    setContentsLength(String(event.target.value.length));
  };
  // console.log("그럼 여기는?========================");
  // console.log(props.isEdit);
  return (
    <>
      {contextHolder}
      <UsedItemsCommentWritePresenterPage
        onClickCmtWrite={onClickCmtWrite}
        onChangeTextArea={onChangeTextArea}
        contents={contents}
        contentsLength={contentsLength}
        id={props.id ?? ""}
        isEdit={Boolean(props.isEdit)}
        editContents={props.contents ?? ""}
        isEditArr={props.isEditArr}
        setIsEditArr={props.setIsEditArr}
        index={Number(props.index)}
        isAnswer={Boolean(props.isAnswer)}
        onClickAnswerWrite={onClickAnswerWrite}
      />
    </>
  );
}
