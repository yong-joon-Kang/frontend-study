import * as S from "./LeftMenu.styles";
import { useRecoilState } from "recoil";
import { userInfoState } from "../../../commons/libraries/recoil";
import { IProps } from "./LeftMenu.types";
import { useState } from "react";
import ConfirmModalPresenter from "../../../commons/modals/confirmModal.presenter";

function LeftMenu(props: IProps) {
  const [userInfo] = useRecoilState(userInfoState);

  const options = [
    { value: 100, label: "100" },
    { value: 500, label: "500" },
    { value: 1000, label: "1,000" },
    { value: 2000, label: "2,000" },
    { value: 5000, label: "5,000" },
    { value: 10000, label: "10,000" },
    { value: 50000, label: "50,000" },
    { value: 100000, label: "100,000" },
  ];

  const [selectedOption, setSelectedOption] = useState({
    value: false,
    label: "포인트 선택",
  });

  const [ismodalToggle, setModalToggle] = useState(false);

  const onToggleModal = () => {
    setModalToggle(!ismodalToggle);
  };

  const handleOk = () => {
    setModalToggle(!ismodalToggle);
    // props.onClickBoardDelete?.();
  };

  const onClickCharging = () => {
    onToggleModal();
  };

  // useEffect(() => {
  //   refetch({
  //     page: 1,
  //     search: searchKeyword,
  //     isSoldout: selectedOption.value,
  //   });
  // }, [selectedOption]);

  return (
    <>
      <ConfirmModalPresenter
        onToggleModal={onToggleModal}
        handleOk={handleOk}
        ismodalToggle={ismodalToggle}
        btnFnc="charging"
        options={options}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
      />
      <S.Wrap>
        <S.Title>MYPAGE</S.Title>
        <S.ProfileImgWrap>
          <S.ProfileRadius>
            <S.ProfileImg
              src={
                userInfo.picture
                  ? `https://storage.googleapis.com/${userInfo.picture}`
                  : "/profileDef.png"
              }
            />
          </S.ProfileRadius>
          <S.SettingImg
            onClick={() => {
              props.onClickMenu("mySettings");
            }}
            src="/setting.png"
          />
        </S.ProfileImgWrap>
        <S.MyInfoSubWrap1>
          <S.Label isName={true}>{userInfo.name}</S.Label>
          <S.LabelWrap isWrap1={true}>
            <S.Img src="/myPoint.png" />
            <S.Label>{userInfo?.userPoint?.amount}</S.Label>
          </S.LabelWrap>
          <S.LabelWrap isWrap1={true}>
            <S.Charging onClick={onClickCharging}>충전하기</S.Charging>
          </S.LabelWrap>
        </S.MyInfoSubWrap1>
        <S.MyInfoSubWrap2>
          <S.LabelWrap>
            <S.Img src="/myCart.png" />
            <S.Label
              onClick={() => {
                props.onClickMenu("myCartPage");
              }}
            >
              내 장터
            </S.Label>
          </S.LabelWrap>
          <S.LabelWrap>
            <S.Img src="/myPointDef.png" />
            <S.Label
              onClick={() => {
                props.onClickMenu("myPoint");
              }}
            >
              내 포인트
            </S.Label>
          </S.LabelWrap>
          <S.LabelWrap>
            <S.Img src="/profileDef.png" />
            <S.Label
              onClick={() => {
                props.onClickMenu("myProfile");
              }}
            >
              내 프로필
            </S.Label>
          </S.LabelWrap>
        </S.MyInfoSubWrap2>
      </S.Wrap>
    </>
  );
}

export default LeftMenu;
