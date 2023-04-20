import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  ApolloLink,
} from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";

import { useRecoilState } from "recoil";
import { accessTokenState } from "../../commons/libraries/recoil";

interface IProps {
  children: JSX.Element;
}

// 페이지가 이동되면 app.tsx부터 다시 리렌더링 되기 때문에 캐시 초기화되어
// 불필요한 api요청이 없도록 방지하기 위해 함수 밖에서 만들어줌 (globalState 캐시 유지)
const GLOBAL_STATE = new InMemoryCache();

const ApolloSettings = (props: IProps) => {
  const [accessToken] = useRecoilState(accessTokenState);
  console.log(accessToken);
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
