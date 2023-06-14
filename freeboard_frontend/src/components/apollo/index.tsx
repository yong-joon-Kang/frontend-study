import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  fromPromise,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { createUploadLink } from "apollo-upload-client";
import { useRecoilState, useRecoilValueLoadable } from "recoil";
import {
  accessTokenState,
  loginState,
  restoreAccessTokenLoadable,
  userInfoState,
} from "../../commons/libraries/recoil";
import { useEffect } from "react";
import { getAccessToken } from "../../commons/libraries/getAccessToken";

interface IProps {
  children: JSX.Element;
}

// 캐시 유지
const GLOBAL_STATE = new InMemoryCache();

const ApolloSettings = (props: IProps) => {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  const [isLogin] = useRecoilState(loginState);
  const [, setUserInfo] = useRecoilState(userInfoState);
  const aaa = useRecoilValueLoadable(restoreAccessTokenLoadable);

  // 새로고침 할 때
  useEffect(() => {
    aaa.toPromise().then((newAccessToken) => {
      console.log("newAccessToken==============================");
      console.log(newAccessToken);
      setAccessToken(newAccessToken);
    });
  }, []);

  useEffect(() => {
    console.log("isLogin 변경 시");
    // 로그아웃인 경우
    if (!isLogin) {
      console.log("로그아웃 한 경우===================");
      setAccessToken("");
      setUserInfo({});
      client.clearStore(); // 캐시된 서버 데이터(로그인 정보 등) 초기화 ( accessToken 초기화 )
    }
  }, [isLogin]);

  const errorLink = onError(({ graphQLErrors, operation, forward }) => {
    // 1-1. 에러 캐치
    if (graphQLErrors) {
      for (const err of graphQLErrors) {
        // 1-2. 해당 에러가 토큰만료 에러인지 체크(UNAUTHENTICATED)
        // console.log("api요청 시 무슨 에러인가??=======================");
        // console.log(err.extensions.code);
        if (err.extensions.code === "UNAUTHENTICATED") {
          return fromPromise(
            // 2-1. refreshToken으로 accessToken을 재발급 받기
            getAccessToken().then((newAccessToken) => {
              // 2-2. 재발급 받은 accessToken 저장하기
              setAccessToken(newAccessToken);

              // 3-1. 재발급 받은 accessToken으로 방금 실패한 쿼리의 정보 수정하기
              operation.setContext({
                headers: {
                  ...operation.getContext().headers, // 만료된 토큰이 있는 상태
                  Authorization: `Bearer ${newAccessToken}`, // 새로 발급 받은 토큰으로 변경
                },
              });
            })
          ).flatMap(() => forward(operation)); // 3-2. 방금 수정한 쿼리 재요청하기
        }
      }
    }
  });
  const uploadLink = createUploadLink({
    uri: "https://backendonline.codebootcamp.co.kr/graphql",
    headers: { Authorization: `Bearer ${accessToken}` },
    credentials: "include",
  });

  const client = new ApolloClient({
    link: ApolloLink.from([errorLink, uploadLink as unknown as ApolloLink]),
    cache: GLOBAL_STATE, // 페이지 전환(_app.tsx 리렌더) 되어도, 캐시 유지
    connectToDevTools: true,
  });
  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
};

export default ApolloSettings;
