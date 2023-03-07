import BoardWritePresenterPage from "./BoardWrite.presenter";
import { CREATE_BOARD, EDIT_BOARD } from "./BoardWrite.queries";
import { useMutation } from "@apollo/client";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/router";
import {
  IBoardWriteContainerPageProps,
  IUpdateVariables,
} from "./BoardWrite.types";
import { IMutation } from "../../../commons/types/generated/types";

export default function BoardWriteContainerPage(
  props: IBoardWriteContainerPageProps
) {
  const [createBoard] =
    useMutation<Pick<IMutation, "createBoard">>(CREATE_BOARD);
  const [updateBoard] = useMutation<Pick<IMutation, "updateBoard">>(EDIT_BOARD);

  const [writer, setWriter] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  const [writerErr, setWriterErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [titleErr, setTitleErr] = useState("");
  const [contentsErr, setContentsErr] = useState("");

  const [isActive, setIsActive] = useState(Boolean);

  const router = useRouter();

  const onWriterChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setWriter(event.target.value);

    if (event.target.value && password && title && contents) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  };

  const onPasswordChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);

    if (writer && event.target.value && title && contents) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  };

  const onTitleChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);

    if (writer && password && event.target.value && contents) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  };

  const onContentsChanged = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContents(event.target.value);

    if (writer && password && title && event.target.value) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  };

  const onSubmit = async () => {
    if (!writer) {
      setWriterErr("작성자는 필수입력 입니다.");
    } else {
      setWriterErr("");
    }

    if (!password) {
      setPasswordErr("비밀번호는 필수입력 입니다.");
    } else {
      setPasswordErr("");
    }

    if (!title) {
      setTitleErr("제목은 필수입력 입니다.");
    } else {
      setTitleErr("");
    }

    if (!contents) {
      setContentsErr("내용은 필수입력 입니다.");
    } else {
      setContentsErr("");
    }

    try {
      if (writer && password && title && contents) {
        const result = await createBoard({
          variables: {
            writer: writer,
            password: password,
            title: title,
            contents: contents,
          },
        });
        console.log(result);
        alert("정상적으로 등록되었습니다.");
        router.push(`/boards/detail/${result?.data?.createBoard._id}`);
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const onSubmitUpdate = async () => {
    try {
      const updateVariables: IUpdateVariables = {
        boardId: router.query.id,
        password: password,
        updateBoardInput: {},
      };
      if (title) updateVariables.updateBoardInput.title = title;
      if (contents) updateVariables.updateBoardInput.contents = contents;

      console.log(updateVariables);

      const result = await updateBoard({
        variables: updateVariables,
      });
      console.log(result);
      alert("정상적으로 수정되었습니다.");
      router.push(`/boards/detail/${result?.data?.updateBoard._id}`);
    } catch (error: any) {
      console.log(error.message);
      alert(error.message);
    }
  };

  return (
    <BoardWritePresenterPage
      writerErr={writerErr}
      passwordErr={passwordErr}
      titleErr={titleErr}
      contentsErr={contentsErr}
      isActive={isActive}
      isEdit={props.isEdit}
      fetchBoardDataList={props.fetchBoardDataList}
      onWriterChanged={onWriterChanged}
      onPasswordChanged={onPasswordChanged}
      onTitleChanged={onTitleChanged}
      onContentsChanged={onContentsChanged}
      onSubmit={onSubmit}
      onSubmitUpdate={onSubmitUpdate}
    />
  );
}
