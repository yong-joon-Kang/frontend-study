import { useApolloClient } from "@apollo/client";
import { FETCH_USED_ITEM } from "../../../components/usedItems/detail/UsedItemsDetail.queries";
import { Modal } from "antd";

export function useDeletedErrorMsg() {
  const client = useApolloClient();

  const onClickDeleted = async (id: string): Promise<boolean> => {
    try {
      await client.query({
        query: FETCH_USED_ITEM,
        variables: {
          useditemId: id,
        },
        fetchPolicy: "network-only",
      });
      return false; // 처리 성공 시 true 반환
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes("상품이 존재하지 않습니다.")) {
          Modal.error({
            content: "상품이 존재하지 않습니다.",
            onOk: () => {
              location.reload();
            },
          });
        } else {
          Modal.error({
            content: "상품을 조회할 수 없습니다. 관리자에게 문의해주세요.",
          });
        }
      }
      return true; // 처리 실패 시 false 반환
    }
  };

  return { onClickDeleted };
}
