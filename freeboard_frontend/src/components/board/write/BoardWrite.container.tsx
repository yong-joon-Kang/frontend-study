/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
import BoardWritePresenterPage from "./BoardWrite.presenter";
import { CREATE_BOARD, EDIT_BOARD } from "./BoardWrite.queries";
import { useMutation } from "@apollo/client";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/router";
import {
  IBoardWriteContainerPageProps,
  IUpdateVariables,
} from "./BoardWrite.types";
import {
  IMutation,
  IMutationCreateBoardArgs,
  IMutationUpdateBoardArgs,
} from "../../../commons/types/generated/types";
import { useDaumPostcodePopup } from "react-daum-postcode";
import { message } from "antd";

export default function BoardWriteContainerPage(
  props: IBoardWriteContainerPageProps
) {
  const [createBoard] = useMutation<
    Pick<IMutation, "createBoard">,
    IMutationCreateBoardArgs
  >(CREATE_BOARD);
  const [updateBoard] = useMutation<
    Pick<IMutation, "updateBoard">,
    IMutationUpdateBoardArgs
  >(EDIT_BOARD);

  const [writer, setWriter] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [postCode, setPostCode] = useState("");
  const [zoneCode, setZoneCode] = useState("");

  const [writerErr, setWriterErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [titleErr, setTitleErr] = useState("");
  const [contentsErr, setContentsErr] = useState("");

  const [isActive, setIsActive] = useState(Boolean);

  const [messageApi, contextHolder] = message.useMessage(); // 비밀번호 에러 alert

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
            createBoardInput: {
              writer: writer,
              password: password,
              title: title,
              contents: contents,
            },
          },
        });
        // console.log(result);
        router.push({
          pathname: `/boards/detail/${String(result?.data?.createBoard._id)}`,
          query: { crud: "create" },
        });
      }
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
    }
  };

  const onSubmitUpdate = async () => {
    try {
      const updateVariables: IUpdateVariables = {
        boardId: String(router.query.id),
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
      // alert("정상적으로 수정되었습니다.");

      router.push(`/boards/detail/${String(result?.data?.updateBoard._id)}`);
    } catch (error) {
      if (error instanceof Error) {
        messageApi.open({
          type: "error",
          content: "비밀번호가 일치하지 않습니다.",
        });
      }
    }
  };

  // ==========================START:: 우편번호 검색 팝업 기능

  const open = useDaumPostcodePopup();

  const handleComplete = (data: any) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    console.log(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'

    setPostCode(fullAddress);
    setZoneCode(data.zonecode);
  };

  const onClickPostCode = () => {
    open({ onComplete: handleComplete });
  };

  // ==========================END:: 우편번호 검색 팝업 기능

  return (
    <>
      {contextHolder}
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
        onClickPostCode={onClickPostCode}
        postCode={postCode}
        zoneCode={zoneCode}
      />
    </>
  );
}
