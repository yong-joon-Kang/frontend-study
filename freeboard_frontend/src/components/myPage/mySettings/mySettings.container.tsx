import { useState } from "react";
import ImageUpload from "../../../commons/imageUpload/ImageUpload.container";
import * as S from "./mySettings.styles";
import { useRecoilState } from "recoil";
import { userInfoState } from "../../../commons/libraries/recoil";
import { gql, useMutation } from "@apollo/client";
import {
  IMutation,
  IMutationUpdateUserArgs,
} from "../../../commons/types/generated/types";
import { Modal } from "antd";

const UPDATE_USER_INPUT = gql`
  mutation updateUser($updateUserInput: UpdateUserInput!) {
    updateUser(updateUserInput: $updateUserInput) {
      _id
      name
    }
  }
`;

function mySettingsContainer() {
  const [userInfoObj, setUserInfo] = useRecoilState(userInfoState);

  const [name, setName] = useState(userInfoObj.name ?? "");
  const [fileUrls, setFileUrls] = useState([userInfoObj.picture ?? ""]);

  const [updateUserInput] = useMutation<
    Pick<IMutation, "updateUser">,
    IMutationUpdateUserArgs
  >(UPDATE_USER_INPUT);

  const onClickBtn = async () => {
    const updateUserInputObj = {};
    if (userInfoObj.picture === fileUrls[0] && userInfoObj.name === name) {
      Modal.warning({ content: "수정한 것이 없습니다." });
      return false;
    }

    if (userInfoObj.picture !== fileUrls[0])
      updateUserInputObj.picture = fileUrls[0];
    if (userInfoObj.name !== name) updateUserInputObj.name = name;

    try {
      await updateUserInput({
        variables: {
          updateUserInput: updateUserInputObj,
        },
      });
      Modal.success({ content: "성공적으로 변경되었습니다." });
      setUserInfo({ name: name, picture: fileUrls[0] });
      localStorage.setItem(
        "userInfo",
        `{ "name": "${name}", "picture": "${fileUrls[0]}" }`
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <S.Wrap>
      <S.Title>프로필 수정</S.Title>
      <S.RowWrap>
        <S.Label>프로필 사진</S.Label>
        <ImageUpload
          setFileUrls={setFileUrls}
          fileUrls={fileUrls}
          index={0}
          isProfile={true}
        />
      </S.RowWrap>
      <S.RowWrap>
        <S.Label>닉네임</S.Label>
        <S.Input
          defaultValue={userInfoObj.name}
          onChange={(event) => {
            setName(event.target.value);
          }}
          placeholder="변경할 닉네임을 입력해주세요."
        />
      </S.RowWrap>

      <S.RowWrap>
        <S.Button onClick={onClickBtn}>프로필 수정</S.Button>
      </S.RowWrap>
    </S.Wrap>
  );
}

export default mySettingsContainer;
