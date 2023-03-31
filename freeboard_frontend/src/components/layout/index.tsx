import { useRouter } from "next/router";
import Banner from "./banner";

interface IPropsLayout {
  children: JSX.Element;
}

const hiddenBannerPath = [
  "/boards/new",
  "/boards/detail/[id]",
  "/boards/detail/[id]/edit",
];

const Layout = (props: IPropsLayout) => {
  const router = useRouter();
  const isHiddenBanner = hiddenBannerPath.includes(router.pathname);
  return (
    <>
      <div>Header</div>
      {!isHiddenBanner && <Banner />}
      <div>{props.children}</div>
      <div>Footer</div>
    </>
  );
};

export default Layout;
