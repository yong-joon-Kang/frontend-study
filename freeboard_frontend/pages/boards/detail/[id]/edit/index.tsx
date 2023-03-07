import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import {
  IQuery,
  IQueryFetchBoardArgs,
} from "../../../../../src/commons/types/generated/types";
import { FETCH_BOARD } from "../../../../../src/components/board/detail/BoardDetail.queries";
import CreateBoardPage from "../../../new";
export default function EditBoardPage() {
  const router = useRouter();

  const { data } = useQuery<Pick<IQuery, "fetchBoard">, IQueryFetchBoardArgs>(
    FETCH_BOARD,
    {
      variables: {
        boardId: String(router.query.id),
      },
    }
  );

  //console.log('editPage=============')
  //console.log(data)

  return <CreateBoardPage isEdit={true} fetchBoardDataList={data} />;
}
