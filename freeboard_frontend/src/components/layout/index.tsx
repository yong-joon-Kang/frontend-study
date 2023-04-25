import { useRouter } from "next/router";
import Banner from "./banner";
import Header from "./Header";
import Footer from "./Footer";
import styled from "@emotion/styled";

interface IPropsLayout {
  children: JSX.Element;
}

const hiddenBannerPath = [
  "/",
  "/signIn",
  "/signUp",
  "/signUpSuccess",
  "/OpenApi",
  "/boards/new",
  "/boards/detail/[id]",
  "/boards/detail/[id]/edit",
  "/usedItems/cart",
];

const LayoutWrap = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 1050px;
`;

const Layout = (props: IPropsLayout) => {
  const router = useRouter();
  const isHiddenBanner = hiddenBannerPath.includes(router.pathname);

  return (
    <LayoutWrap>
      <Header />
      <Content>
        {!isHiddenBanner && <Banner />}
        {props.children}
      </Content>
      <Footer />
    </LayoutWrap>
  );
};

export default Layout;
