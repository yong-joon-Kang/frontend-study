import BoardCommentWritePresenterPage from "./BoardCommentWrite.presenter";
import { useMutation } from "@apollo/client";
import { CREATE_BOARD_COMMENT } from "./BoardCommentWrite.queries";
import { FETCH_BOARD_COMMENTS } from "../list/BoardCommentList.queries";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";

export default function BoardCommentWriteContainerPage() {
  const [contents, setContents] = useState("");
  const [contentsLength, setContentsLength] = useState("");
  const [writer, setWriter] = useState("");
  const [password, setPw] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  const router = useRouter();

  const [createBoardComment] = useMutation(CREATE_BOARD_COMMENT);
  const onClickCmtWrite = async () => {
    try {
      if (!writer) {
        alert("작성자를 입력해주세요");
        return false;
      }

      if (!password) {
        alert("비밀번호를 입력해주세요");
        return false;
      }

      if (!contents) {
        alert("내용을 입력해주세요");
        return false;
      }

      if (Number(contentsLength) > 100) {
        alert("100글자 이상 입력할 수 없습니다.");
        return false;
      }

      const result = await createBoardComment({
        variables: {
          boardId: router.query.id,
          createBoardCommentInput: {
            writer: writer,
            password: password,
            contents: contents,
            rating: 5,
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
    } catch (error: any) {
      console.log(error.message);
    }
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

  const onClickUpdate = () => {
    setIsEdit(true);
  };

  const onClickDelete = () => {};

  return (
    <BoardCommentWritePresenterPage
      onClickCmtWrite={onClickCmtWrite}
      onChangeTextArea={onChangeTextArea}
      onChangeWriter={onChangeWriter}
      onChangePw={onChangePw}
      onClickUpdate={onClickUpdate}
      onClickDelete={onClickDelete}
      contents={contents}
      contentsLength={contentsLength}
      writer={writer}
      password={password}
      isEdit={isEdit}
    />
  );
}
