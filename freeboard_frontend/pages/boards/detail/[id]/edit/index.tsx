import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { FETCH_BOARD } from "../../../../../src/components/board/detail/BoardDetail.queries";
import CreateBoardPage from "../../../new";
export default function EditBoardPage() {
  const router = useRouter();

  const { data } = useQuery(FETCH_BOARD, {
    variables: {
      boardId: router.query.id,
    },
  });

  //console.log('editPage=============')
  //console.log(data)

  return <CreateBoardPage isEdit={true} fetchBoardDataList={data} />;
}
