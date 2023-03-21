import BoardDetailPresenterPage from "./BoardDetail.presenter";
import { FETCH_BOARD, DELETE_BOARD } from "./BoardDetail.queries";
import { useQuery, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import {
  IMutation,
  IQuery,
  IQueryFetchBoardArgs,
} from "../../../commons/types/generated/types";

export default function BoardDetailContainerPage() {
  const router = useRouter();

  const { data } = useQuery<Pick<IQuery, "fetchBoard">, IQueryFetchBoardArgs>(
    FETCH_BOARD,
    {
      variables: {
        boardId: String(router.query.id),
      },
    }
  );

  const onClickBoardList = () => {
    router.push("/boards/list");
  };

  const [deleteBoard] =
    useMutation<Pick<IMutation, "deleteBoard">>(DELETE_BOARD);

  const onClickBoardDelete = async () => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      await deleteBoard({
        variables: {
          boardId: router.query.id,
        },
      });

      alert("게시글이 정상적으로 삭제되었습니다.");

      router.push("/boards/list");
    }
  };

  const onClickBoardEdit = () => {
    router.push(`/boards/detail/${router.query.id}/edit`);
  };

  return (
    <>
      <BoardDetailPresenterPage
        data={data}
        onClickBoardList={onClickBoardList}
        onClickBoardDelete={onClickBoardDelete}
        onClickBoardEdit={onClickBoardEdit}
      />
    </>
  );
}
