import { useRouter } from "next/router";

export function useMoveToPage() {
  const router = useRouter();

  const onClickMoveToPage = (page: string) => () => {
    router.push(page);
    if (page !== "/signIn") localStorage.setItem("prevPage", page);
  };

  return { onClickMoveToPage };
}
