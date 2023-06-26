/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
import BoardWritePresenterPage from "./BoardWrite.presenter";
import { CREATE_BOARD, EDIT_BOARD } from "./BoardWrite.queries";
import { useMutation } from "@apollo/client";
import { ChangeEvent, useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  IBoardWriteContainerPageProps,
  IUpdateBoardInput,
} from "./BoardWrite.types";
import {
  IMutation,
  IMutationCreateBoardArgs,
  IMutationUpdateBoardArgs,
} from "../../../commons/types/generated/types";
import { useDaumPostcodePopup } from "react-daum-postcode";
import { message } from "antd";
import { useMoveToPage } from "../../../commons/customHooks/useMoveToPage/useMoveToPage";
import { UPLOAD_FILE } from "../../../commons/imageUpload/ImageUpload.queries";

export default function BoardWriteContainerPage(
  props: IBoardWriteContainerPageProps
) {
  const { onClickMoveToPage } = useMoveToPage();

  const [createBoard] = useMutation<
    Pick<IMutation, "createBoard">,
    IMutationCreateBoardArgs
  >(CREATE_BOARD);
  const [updateBoard] = useMutation<
    Pick<IMutation, "updateBoard">,
    IMutationUpdateBoardArgs
  >(EDIT_BOARD);

  // 기존 imageUrl
  const [registedFileUrls, setRegistedFileUrls] = useState(["", "", ""]);

  useEffect(() => {
    setRegistedFileUrls(
      props?.fetchBoardDataList?.fetchBoard?.images ?? ["", "", ""]
    );
  }, []);

  useEffect(() => {
    if (props?.fetchBoardDataList) {
      const fileUrlArr = props?.fetchBoardDataList?.fetchBoard?.images;
      if (fileUrlArr) setFileUrls(fileUrlArr);
    }
  }, [props]);

  const [file, setFile] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [writer, setWriter] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [zipcode, setZipCode] = useState("");
  const [address, setAddress] = useState("");
  const [detailAddress, setDetailAddress] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [fileUrls, setFileUrls] = useState(["", "", ""]);

  const [writerErr, setWriterErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [titleErr, setTitleErr] = useState("");
  const [contentsErr, setContentsErr] = useState("");

  const [isActive, setIsActive] = useState(Boolean);

  const [messageApi, contextHolder] = message.useMessage();

  const [uploadFile] = useMutation(UPLOAD_FILE);

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

  const onChangeYoutubeUrl = (event: ChangeEvent<HTMLInputElement>) => {
    setYoutubeUrl(event.target.value);
  };

  const onSubmit = async () => {
    if (isActive) setIsSubmitting(true);
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
      const resultFile = file.map(
        async (el, index) =>
          // file태그가 존재하고 fileUrls가 존재할 때
          el &&
          fileUrls[index] &&
          (await uploadFile({
            variables: {
              file: el,
            },
          }))
      );

      // undefined를 공백으로 치환
      let cloudResultUrls: any = [];
      cloudResultUrls = await Promise.all(resultFile);
      const images: any[] | null | undefined = [];
      new Array(3)
        .fill("")
        .map((_el, index) =>
          cloudResultUrls[index]
            ? images.push(cloudResultUrls[index]?.data.uploadFile.url)
            : images.push("")
        );

      if (writer && password && title && contents) {
        const result = await createBoard({
          variables: {
            createBoardInput: {
              writer: writer,
              password: password,
              title: title,
              contents: contents,
              boardAddress: {
                zipcode: zipcode,
                address: address,
                addressDetail: detailAddress,
              },
              images,
              youtubeUrl: youtubeUrl,
            },
          },
        });
        onClickMoveToPage(`/boards/detail/${result?.data?.createBoard._id}`)();
      }
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
    }
  };

  const onSubmitUpdate = async () => {
    // const currentFileUrls = JSON.stringify(fileUrls);
    // const defaultFileUrls = JSON.stringify(
    //   props.fetchBoardDataList?.fetchBoard.images
    // );
    // const isChangedFileUrls = currentFileUrls !== defaultFileUrls;

    try {
      let images: string[] = [];

      // file 업로드 할게 없으면
      if (file.length === 0) {
        // 이미지 변경사항이 있다면 fileUrls의 결과를 images에 넣어준다!
        images = [...fileUrls];
      } else {
        // file 업로드 할게 있다면!
        // file을 업로드 후 나온 순수url을 registed에 넣는다! 그리고 images에 넣어준다!
        const resultFile = file.map(
          async (el, index) =>
            // file태그가 존재하고 fileUrls가 존재할 때
            el &&
            fileUrls[index] &&
            (await uploadFile({
              variables: {
                file: el,
              },
            }))
        );
        // console.log("resultFileresultFileresultFileresultFileresultFile");
        // console.log(resultFile);

        // 업로드 후 return된 순수urls
        let cloudResultUrls: any = [];
        cloudResultUrls = await Promise.all(resultFile);

        console.log(
          "cloudResultUrlscloudResultUrlscloudResultUrlscloudResultUrls"
        );
        console.log(cloudResultUrls);

        // registed와 합치기
        const registedUrls = [...registedFileUrls];
        new Array(3).fill("").map(
          (_el, index) =>
            cloudResultUrls[index] // 신규 이미지 있으면 신규이미지 넣어줌
              ? (registedUrls[index] =
                  cloudResultUrls[index]?.data.uploadFile.url)
              : !fileUrls[index] && (registedUrls[index] = "") // 신규 이미지 없고 fileUrls 없을 때 공백 넣어줌
        );

        console.log(
          "registedUrlsregistedUrlsregistedUrlsregistedUrlsregistedUrls"
        );
        console.log(registedUrls);

        images = registedUrls;
      }

      console.log("imagesimagesimagesimagesimagesimagesimagesimagesimages");
      console.log(images);

      const isChangedFileUrls =
        JSON.stringify(images) !== JSON.stringify(registedFileUrls);

      if (
        // 수정한게 하나도 없을 때
        !title &&
        !contents &&
        !zipcode &&
        !address &&
        !detailAddress &&
        !youtubeUrl &&
        !isChangedFileUrls
      ) {
        messageApi.open({
          type: "warning",
          content: "수정한 것이 없습니다.",
        });
        return;
      }

      const updateBoardInput: IUpdateBoardInput = {};
      if (title) updateBoardInput.title = title;
      if (contents) updateBoardInput.contents = contents;
      if (youtubeUrl) updateBoardInput.youtubeUrl = youtubeUrl;
      if (zipcode || address || detailAddress) {
        updateBoardInput.boardAddress = {};
        if (zipcode) updateBoardInput.boardAddress.zipcode = zipcode;
        if (address) updateBoardInput.boardAddress.address = address;
        if (detailAddress)
          updateBoardInput.boardAddress.addressDetail = detailAddress;
      }
      if (isChangedFileUrls) updateBoardInput.images = images;

      const result = await updateBoard({
        variables: {
          boardId: String(router.query.id),
          password: password,
          updateBoardInput: updateBoardInput,
        },
      });
      console.log(result);
      // alert("정상적으로 수정되었습니다.");
      onClickMoveToPage(`/boards/detail/${result?.data?.updateBoard._id}`)();
    } catch (error) {
      if (error instanceof Error) {
        messageApi.open({
          type: "error",
          content: error.message,
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

    setAddress(fullAddress);
    setZipCode(data.zonecode);
  };

  const onClickPostCode = () => {
    open({ onComplete: handleComplete });
  };

  // ==========================END:: 우편번호 검색 팝업 기능

  const onChangeDetailAddress = (event: ChangeEvent<HTMLInputElement>) => {
    setDetailAddress(event.target.value);
  };

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
        zipcode={zipcode}
        address={address}
        onChangeDetailAddress={onChangeDetailAddress}
        setFileUrls={setFileUrls}
        fileUrls={fileUrls}
        onChangeYoutubeUrl={onChangeYoutubeUrl}
        isSubmitting={isSubmitting}
        file={file}
        setFile={setFile}
      />
    </>
  );
}
