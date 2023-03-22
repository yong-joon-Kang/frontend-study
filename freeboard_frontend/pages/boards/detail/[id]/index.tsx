import BoardDetail from "../../../../src/components/board/detail/BoardDetail.container";
import BoardCommentWrite from "../../../../src/components/boardComment/write/BoardCommentWrite.container";
import BoardCommentList from "../../../../src/components/boardComment/list/BoardCommentList.container";
import { useRouter } from "next/router";
import { message } from "antd";

export default function detailPage() {
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage(); // alert Message
  console.log(router.query.crud);

  if (router.query.crud === "create") {
    console.log("gooood");
    messageApi.open({
      type: "success",
      content: "success",
    });
  }

  return (
    <>
      {contextHolder}
      <BoardDetail />
      <BoardCommentWrite />
      <BoardCommentList />
    </>
  );
}
