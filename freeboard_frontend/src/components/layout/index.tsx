import { useRouter } from "next/router";
import Banner from "./banner";
import Header from "./Header";
import Footer from "./Footer";
import styled from "@emotion/styled";
import NavMenu from "./NavMenu";
import { useState, useRef, useEffect } from "react";

interface IPropsLayout {
  children: JSX.Element;
}

const hiddenBannerPath = [
  "/",
  "/OpenApi",
  "/boards/new",
  "/boards/detail/[id]",
  "/boards/detail/[id]/edit",
];

const LayoutWrap = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MiddleWrap = styled.div`
  display: flex;
  flex-direction: row;
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Layout = (props: IPropsLayout) => {
  const router = useRouter();
  const isHiddenBanner = hiddenBannerPath.includes(router.pathname);
  const [isToggleMenu, setIsToggleMenu] = useState(false);
  const divRef = useRef();
  // console.log(divRef);
  const onClickMenu = () => {
    setIsToggleMenu(!isToggleMenu);
  };

  const onClickBoardList = () => {
    router.push("/boards/list");
    setIsToggleMenu(false);
  };

  const onClickOpenApi = () => {
    router.push("/OpenApi");
    setIsToggleMenu(false);
  };

  // 다른 컴포넌트 클릭 시 NavMenu 닫음
  useEffect(() => {
    // console.log("처음 실행");
    const handleClickOutside = (event: MouseEvent) => {
      if (event.target?.innerHTML === "Menu") return;
      if (divRef?.current && !divRef?.current?.contains(event.target as Node)) {
        // console.log("다른 컴포넌트 클릭 시");
        setIsToggleMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [divRef]);

  return (
    <LayoutWrap>
      <Header onClickMenu={onClickMenu} />

      <MiddleWrap>
        <NavMenu
          isToggleMenu={isToggleMenu}
          onClickBoardList={onClickBoardList}
          onClickOpenApi={onClickOpenApi}
          ref={divRef}
        ></NavMenu>
        <Content>
          {!isHiddenBanner && <Banner />}
          {props.children}contents
        </Content>
      </MiddleWrap>
      <Footer />
    </LayoutWrap>
  );
};

export default Layout;
