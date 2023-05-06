import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  ApolloLink,
} from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";

import { useRecoilState } from "recoil";
import {
  accessTokenState,
  logOutState,
  userNameState,
} from "../../commons/libraries/recoil";
import { useEffect } from "react";

interface IProps {
  children: JSX.Element;
}

// 페이지가 이동되면 app.tsx부터 다시 리렌더링 되기 때문에 캐시 초기화되어
// 불필요한 api요청이 없도록 방지하기 위해 함수 밖에서 만들어줌 (globalState 캐시 유지)
const GLOBAL_STATE = new InMemoryCache();

const ApolloSettings = (props: IProps) => {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  const [, setUserName] = useRecoilState(userNameState);
  const [isLogOut] = useRecoilState(logOutState);

  useEffect(() => {
    const result = localStorage.getItem("accessToken");
    if (result) {
      setAccessToken(result);
      setUserName("");
    }
  }, []);

  // 새로고침 할 때
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const userName = localStorage.getItem("userName");
    setAccessToken(accessToken ?? "");
    setUserName(userName ?? "");
  }, []);

  // 로그아웃을 눌렀을 때
  useEffect(() => {
    if (!accessToken && isLogOut) {
      localStorage.setItem("accessToken", "");
      localStorage.setItem("userName", "");
      client.clearStore(); // 캐시된 서버 데이터(로그인 정보 등) 초기화
      location.reload();
    }
  }, [isLogOut]);

  const uploadLink = createUploadLink({
    uri: "http://backendonline.codebootcamp.co.kr/graphql",
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  const client = new ApolloClient({
    link: ApolloLink.from([uploadLink as unknown as ApolloLink]),
    cache: GLOBAL_STATE,
  });
  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
};

export default ApolloSettings;
