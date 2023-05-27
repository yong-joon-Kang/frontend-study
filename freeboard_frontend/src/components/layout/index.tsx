import { useRouter } from "next/router";
import Banner from "./banner";
import Header from "./Header";
import Footer from "./Footer";
import styled from "@emotion/styled";
import { useLogined } from "../../commons/customHooks/useLogined/useLogined";

interface IPropsLayout {
  children: JSX.Element;
}

const hiddenBannerPath = [
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
  width: auto;
  height: auto;
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  /* width: 100%; */
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 1000px;
`;

const Layout = (props: IPropsLayout) => {
  useLogined();
  const router = useRouter();
  const isHiddenBanner = hiddenBannerPath.includes(router.pathname);

  return (
    <LayoutWrap>
      <Header />
      {!isHiddenBanner && <Banner />}
      <Content>{props.children}</Content>
      <Footer />
    </LayoutWrap>
  );
};

export default Layout;
