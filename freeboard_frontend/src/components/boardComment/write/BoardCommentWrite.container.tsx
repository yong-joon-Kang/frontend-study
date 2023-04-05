import BoardCommentWritePresenterPage from "./BoardCommentWrite.presenter";
import { useMutation } from "@apollo/client";
import { CREATE_BOARD_COMMENT } from "./BoardCommentWrite.queries";
import { FETCH_BOARD_COMMENTS } from "../list/BoardCommentList.queries";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import {
  IMutation,
  IMutationCreateBoardCommentArgs,
} from "../../../commons/types/generated/types";
import { message } from "antd";
import { IEditComment } from "./BoardCommentWrite.types";

export default function BoardCommentWriteContainerPage(
  editCmtProps: IEditComment
) {
  const [contents, setContents] = useState("");
  const [contentsLength, setContentsLength] = useState("");
  const [writer, setWriter] = useState("");
  const [password, setPw] = useState("");
  const [rateCnt, setRateCnt] = useState(5);
  const [messageApi, contextHolder] = message.useMessage(); // 비밀번호 에러 alert

  const router = useRouter();

  const [createBoardComment] = useMutation<
    Pick<IMutation, "createBoardComment">,
    IMutationCreateBoardCommentArgs
  >(CREATE_BOARD_COMMENT);
  const onClickCmtWrite = async () => {
    try {
      if (!writer) {
        messageApi.open({
          type: "error",
          content: "작성자를 입력해주세요",
        });
        return false;
      }

      if (!password) {
        messageApi.open({
          type: "error",
          content: "비밀번호를 입력해주세요",
        });
        return false;
      }

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

      const result = await createBoardComment({
        variables: {
          boardId: String(router.query.id),
          createBoardCommentInput: {
            writer: writer,
            password: password,
            contents: contents,
            rating: rateCnt,
          },
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

      setContents("");
      setContentsLength("0");
      setWriter("");
      setPw("");

      console.log(result);
    } catch (error) {}
  };

  const onChangeTextArea = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContents(event.target.value);
    setContentsLength(String(event.target.value.length));
  };

  const onChangeWriter = (event: ChangeEvent<HTMLInputElement>) => {
    setWriter(event.target.value);
  };

  const onChangePw = (event: ChangeEvent<HTMLInputElement>) => {
    setPw(event.target.value);
  };

  return (
    <>
      {contextHolder}
      <BoardCommentWritePresenterPage
        onClickCmtWrite={onClickCmtWrite}
        onChangeTextArea={onChangeTextArea}
        onChangeWriter={onChangeWriter}
        onChangePw={onChangePw}
        contents={contents}
        contentsLength={contentsLength}
        writer={writer}
        password={password}
        setRateCnt={setRateCnt}
        id={editCmtProps.id}
        isEdit={editCmtProps.isEdit}
        editWriter={editCmtProps.writer}
        editContents={editCmtProps.contents}
        editRating={editCmtProps.rating}
      />
    </>
  );
}
