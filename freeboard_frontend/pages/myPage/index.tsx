import { useState } from "react";
import LeftMenu from "../../src/components/myPage/leftMenu/LeftMenu";
import styled from "@emotion/styled";
import MyCartPageContainer from "../../src/components/myPage/myCartPage/MyCartPage.container";
import MyPointContainer from "../../src/components/myPage/myPoint/MyPoint.container";
import MyProfileContainer from "../../src/components/myPage/MyProfile/MyProfile.container";
import MySettingsContainer from "../../src/components/myPage/mySettings/mySettings.container";

export const Wrap = styled.div`
  display: flex;
`;

function index() {
  const [currPage, setCurrPage] = useState("myCartPage");

  const onClickMenu = (pageNm: string) => {
    setCurrPage(pageNm);
  };
  return (
    <Wrap>
      <LeftMenu onClickMenu={onClickMenu} />
      {/* <MyBoard></MyBoard> */}
      {currPage === "myCartPage" && <MyCartPageContainer />}
      {currPage === "myPoint" && <MyPointContainer />}
      {currPage === "myProfile" && <MyProfileContainer />}
      {currPage === "mySettings" && <MySettingsContainer />}
    </Wrap>
  );
}

export default index;
